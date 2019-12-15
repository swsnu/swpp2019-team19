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

time = ["breakfast", "lunch", "dinner"]
engineering = ["prof", "foodcourt"]
agricultural = ["lunch", "dinner", "order"]
eng_ggang = ["foodcourt"]
idxerr_msg = "Error occured during loading menu.<br>Please post a article about it."


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
            return [SlotSet("meal", None)]
        meal = self.meal_parser(meal)
        cached = redis.StrictRedis(host="127.0.0.1", port=6379, db=2)
        dt = datetime.now() + timedelta(hours=9)
        tg_str = str(dt.month) + str(dt.day) + meal + "eng"
        tg = cached.get(tg_str)
        if not tg:
            response = requests.get("http://mini.snu.kr/cafe/today/-/eng")
            if response.status_code != 200:
                dispatcher.utter_message("mini.snu.ac.kr doesn't reply")
                return [SlotSet("meal", None)]

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
                    response_message = "Tell me the exact name of the cafeteria"
                elif meal == "301":
                    for target in targets:
                        response_message = response_message + engineering[k] + "<br>"
                        k = k + 1
                        for child in target.contents[2].children:
                            response_message = response_message + str(child) + "<br>"
                elif meal == "공깡":
                    for target in targets:
                        response_message = response_message + eng_ggang[k] + "<br>"
                        k = k + 1
                        for child in target.contents[2].children:
                            response_message = response_message + str(child) + "<br>"
                elif meal == "두레미담":
                    for target in targets:
                        response_message = response_message + agricultural[k] + "<br>"
                        k = k + 1
                        for child in target.contents[2].children:
                            response_message = response_message + str(child) + "<br>"
                else:
                    if not (
                        meal == "Student Center" or meal == "Dormitory" or meal == "901"
                    ):
                        k = 1
                    for target in targets:
                        response_message = response_message + time[k] + "<br>"
                        k = k + 1
                        for child in target.contents[2].children:
                            response_message = response_message + str(child) + "<br>"
            except IndexError as e:
                dispatcher.utter_message(idxerr_msg)
                return [SlotSet("meal", None)]

            dispatcher.utter_message(response_message)
            cached.set(tg_str, response_message)
            return [SlotSet("meal", None)]
        try:
            tg = tg.decode("utf-8")
        except (UnicodeDecodeError, AttributeError):
            pass
        dispatcher.utter_message(tg)
        return [SlotSet("meal", None)]


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
        cached = redis.StrictRedis(host="127.0.0.1", port=6379, db=4)
        tg = cached.get(place)
        if not tg:
            url_prefix = "http://map.snu.ac.kr/api/search.action?search_word="
            url_suffix = "&lang_type=ENG"
            response = requests.get(url_prefix + place + url_suffix)
            if response.status_code != 200:
                dispatcher.utter_message("map.snu.ac.kr doesn't reply")
                return [SlotSet("place", None)]

            parsed_soup = bs(response.content, "html.parser")
            targets = []
            contents = json.loads(str(parsed_soup))["search_list"]
            for content in contents:
                floors = content["floor_info"]
                for floor in floors:
                    if floor["convin_inst_kor_nm"] == content["ename"]:
                        targets.append(
                            content["ename"]
                            + ": build number "
                            + content["vil_dong_nm"]
                            + floor["flr_nm"]
                        )
            response_message = ""
            if targets == []:
                response_message = "We can't find the place you request"
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
        cached = redis.StrictRedis(host="127.0.0.1", port=6379, db=6)
        tg = cached.get(prof)
        if not tg:
            url = "https://cse.snu.ac.kr/en/professor/"
            response = requests.get(url + prof)
            if response.status_code != 200:
                dispatcher.utter_message(
                    "cse.snu.ac.kr doesn't reply"
                    + str(response.status_code)
                    + " "
                    + prof
                )
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
            response_message += "Office: " + office[0].text + "<br>"
            response_message += "Phone: " + phone[0].text + "<br>"
            email = mail[0].text
            email = email.replace("[at]", "@")
            email = email.replace("[dot]", ".")
            email = email.replace(" ", "")
            response_message += "Email: " + email + "<br>"
            response_message += "Website: " + website[0].get("href") + "<br>"
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
