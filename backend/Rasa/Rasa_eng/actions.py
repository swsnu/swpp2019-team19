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
from bs4 import BeautifulSoup
from datetime import datetime, timedelta

time = ["breakfast", "lunch", "dinner"]
engineering = ["prof", "foodcourt"]
agricultural = ["lunch", "dinner", "order"]
eng_ggang = ["foodcourt"]
idxerr_msg = (
    "Error occured during loading menu.<br>Please post a article about it."
)
cached_date = ""


class ActionMeal(Action):
    def name(self) -> Text:
        return "action_meal"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        meal = tracker.get_slot("meal")
        cached = redis.StrictRedis(host="127.0.0.1", port=6379, db=2)
        dt = datetime.now() + timedelta(hours=9)
        tg_str = str(dt.month) + str(dt.day) + meal + "eng"
        tg = cached.get(tg_str)
        if not tg:
            response = requests.get("http://mini.snu.kr/cafe/today/-/eng")
            if response.status_code != 200:
                dispatcher.ustter_message("mini.snu.ac.kr doesn't reply")
                return [SlotSet("meal", meal)]

            parsed_soup = BeautifulSoup(response.content, "html.parser")

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
                else:
                    if not (
                        meal == "Student Center"
                        or meal == "Dormitory"
                        or meal == "901"
                    ):
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
        dispatcher.utter_message(tg)
        return [SlotSet("meal", meal)]
