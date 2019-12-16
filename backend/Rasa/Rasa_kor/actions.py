# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/core/actions/#custom-actions/


# This is a simple example for a custom action which utters "Hello World!"

from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import SlotSet
import requests
import redis
from bs4 import BeautifulSoup as bs
from datetime import datetime, timedelta
import json

fallback_message = "I can't understand!"

time = ["아침", "점심", "저녁"]
engineering = ["교수식당", "푸드코트"]
agricultural = ["점심", "저녁", "주문"]
eng_ggang = ["푸드코트"]
dormitory = [
    "아침, 919",
    "아침, 901",
    "점심, 919",
    "점심, 901",
    "저녁, 919",
    "저녁, 901",
]
idxerr_msg = "메뉴를 불러오는 중 에러가 발생했습니다.<br>글 남겨주시면 감사하겠습니다."

copystore_msg = "중앙도서관(62동) 4층: 9-20<br>학생회관(63동) 2층: 9-19<br>법대(15동) 1층: 9-18<br>동원관(113동) 1층: 9-18<br>사회대(16동) 2층: 9-18<br>사범대(12동) 1층: 9-18<br>농생대(200동) 1층: 9-18<br>공대신양(44-1동) 2층: 9-22"


class ActionMeal(Action):
    def name(self) -> Text:
        return "action_meal"

    def meal_parser(self, meal) -> Text:
        """
        This function can handle unexpected input but sounds valid.
        Feel free to add the case.
        """
        if meal == "학생회관" or meal == "학관":
            return "학생회관"
        elif meal == "전망대" or meal == "농대" or meal == "농식":
            return "전망대"
        elif meal == "서당골" or meal == "사범대":
            return "서당골"
        elif meal == "아름드리" or meal == "예술":
            return "아름드리"
        else:
            return meal

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        meal = tracker.get_slot("meal")
        if not meal:
            dispatcher.utter_message(fallback_message)
            return [SlotSet("meal", meal)]
        meal = self.meal_parser(meal)
        cached = redis.StrictRedis(host="127.0.0.1", port=6379, db=2)
        dt = datetime.now() + timedelta(hours=9)
        tg_str = str(dt.month) + str(dt.day) + meal + "kor"
        tg = cached.get(tg_str)
        if not tg:
            response = requests.get("http://mini.snu.ac.kr/cafe/today")
            if response.status_code != 200:
                dispatcher.ustter_message("mini.snu.ac.kr doesn't reply")
                return [SlotSet("meal", meal)]

            parsed_soup = bs(response.content, "html.parser")

            trs = parsed_soup.find_all("tr")
            targets = []
            for tr in trs:
                for td in tr.td.contents:
                    if meal in td:
                        targets.append(tr)

            for target in targets:
                [s.extract() for s in target("span")]

            k = 0
            response_message = ""
            try:
                if targets == []:
                    if dt.weekday() > 4:
                        response_message = "주말에는 영업하지 않는 식당입니다."
                    else:
                        response_message = "정확한 식당 이름을 알려주세요."
                elif meal == "301":
                    for target in targets:
                        response_message = (
                            response_message + engineering[k] + "<br>"
                        )
                        k = k + 1
                        for child in target.contents[2].children:
                            response_message = (
                                response_message + str(child) + "<br>"
                            )
                elif meal == "공깡":
                    for target in targets:
                        response_message = (
                            response_message + eng_ggang[k] + "<br>"
                        )
                        k = k + 1
                        for child in target.contents[2].children:
                            response_message = (
                                response_message + str(child) + "<br>"
                            )
                elif meal == "두레미담":
                    for target in targets:
                        response_message = (
                            response_message + agricultural[k] + "<br>"
                        )
                        k = k + 1
                        for child in target.contents[2].children:
                            response_message = (
                                response_message + str(child) + "<br>"
                            )
                elif meal == "기숙사":
                    for target in targets:
                        response_message = (
                            response_message + dormitory[k] + "<br>"
                        )
                        k = k + 1
                        for child in target.contents[2].children:
                            response_message = (
                                response_message + str(child) + "<br>"
                            )
                else:
                    if not meal == "학생회관":
                        k = 1
                    if dt.weekday() > 4:
                        k = 1
                    for target in targets:
                        response_message = response_message + time[k] + "<br>"
                        k = k + 1
                        for child in target.contents[2].children:
                            response_message = (
                                response_message + str(child) + "<br>"
                            )
            except IndexError as e:
                dispatcher.utter_message(idxerr_msg)
                return [SlotSet("meal", meal)]

            dispatcher.utter_message(response_message)
            cached.set(tg_str, response_message)
            return [SlotSet("meal", meal)]
        try:
            tg = tg.decode("utf-8")
        except (UnicodeDecodeError, AttributeError):
            pass
        dispatcher.utter_message(tg)
        return [SlotSet("meal", meal)]


class ActionMap(Action):
    def name(self) -> Text:
        return "action_map"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        place = tracker.get_slot("place")
        if not place:
            dispatcher.utter_message(fallback_message)
            return [SlotSet("place", None)]
        elif ("인쇄" in place) or ("복사" in place):
            dispatcher.utter_message(copystore_msg)
            return [SlotSet("place", None)]
        cached = redis.StrictRedis(host="127.0.0.1", port=6379, db=3)
        tg = cached.get(place)
        if not tg:
            url_prefix = "http://map.snu.ac.kr/api/search.action?search_word="
            url_suffix = "&lang_type=KOR"
            response = requests.get(url_prefix + place + url_suffix)
            if response.status_code != 200:
                dispatcher.ustter_message("mini.snu.ac.kr doesn't reply")
                return [SlotSet("place", None)]

            parsed_soup = bs(response.content, "html.parser")
            targets = []
            contents = json.loads(str(parsed_soup))["search_list"]
            for content in contents:
                floors = content["floor_info"]
                for floor in floors:
                    if floor["convin_inst_kor_nm"] == content["name"]:
                        targets.append(
                            content["name"]
                            + ": "
                            + content["vil_dong_nm"]
                            + "동 "
                            + floor["flr_nm"]
                        )
            response_message = ""
            if targets == []:
                response_message = "요청하신 장소를 찾지 못했습니다."
            else:
                for target in targets:
                    response_message += target + "<br>"
                response_message = response_message[:-5]
            dispatcher.utter_message(response_message)
            cached.set(place, response_message, 60 * 60)
            return [SlotSet("place", None)]
        try:
            tg = tg.decode("utf-8")
        except (UnicodeDecodeError, AttributeError):
            pass
        dispatcher.utter_message(tg)
        return [SlotSet("place", None)]


class ActionProfessorInfo(Action):
    def name(self) -> Text:
        return "action_professor_info"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        prof = tracker.get_slot("prof")
        if not prof:
            dispatcher.utter_message(fallback_message)
            return [SlotSet("prof", None)]
        prof = prof.replace(" ", "-")
        cached = redis.StrictRedis(host="127.0.0.1", port=6379, db=5)
        tg = cached.get(prof)
        if not tg:
            url = "https://cse.snu.ac.kr/professor/"
            response = requests.get(url + prof)
            if response.status_code != 200:
                dispatcher.utter_message("cse.snu.ac.kr doesn't reply")
                return [SlotSet("prof", None)]

            parsed_soup = bs(response.content, "html.parser")
            office = parsed_soup.select(
                "div > div.field-group-format.group_contact_info.field-group-div.group-contact-info.speed-fast.effect-none > div.field.field-name-field-office.field-type-text.field-label-inline.clearfix2 > div.field-items > div"
            )
            phone = parsed_soup.select(
                "div > div.field-group-format.group_contact_info.field-group-div.group-contact-info.speed-fast.effect-none > div.field.field-name-field-phone.field-type-text.field-label-inline.clearfix2 > div.field-items > div"
            )
            mail = parsed_soup.select(
                "div > div.field-group-format.group_contact_info.field-group-div.group-contact-info.speed-fast.effect-none > div.field.field-name-field-email.field-type-email.field-label-inline.clearfix2 > div.field-items > div"
            )
            website = parsed_soup.select(
                "div > div.field-group-format.group_contact_info.field-group-div.group-contact-info.speed-fast.effect-none > div.field.field-name-field-website.field-type-link-field.field-label-inline.clearfix2 > div.field-items > div > a"
            )
            response_message = ""
            response_message += "교수실: " + office[0].text + "<br>"
            response_message += "전화: " + phone[0].text + "<br>"
            email = mail[0].text
            email = email.replace("[at]", "@")
            email = email.replace("[dot]", ".")
            email = email.replace(" ", "")
            response_message += "이메일: " + email + "<br>"
            response_message += "웹사이트: " + website[0].get("href") + "<br>"
            dispatcher.utter_message(response_message)
            cached.set(prof, response_message, 60 * 60 * 30)
            print(response_message)
            return [SlotSet("prof", None)]
        try:
            tg = tg.decode("utf-8")
        except (UnicodeDecodeError, AttributeError):
            pass
        dispatcher.utter_message(tg)
        return [SlotSet("prof", None)]
