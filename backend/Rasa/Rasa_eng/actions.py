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
from bs4 import BeautifulSoup

time = ["breakfast", "lunch", "dinner"]
engineering = ["prof", "foodcourt"]
agricultural = ["lunch", "dinner", "order"]
eng_ggang = ["foodcourt"]


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
        if meal == "301":
            for target in targets:
                response_message = response_message + engineering[k] + "<br>"
                # print(time[k])
                k = k + 1
                for child in target.contents[2].children:
                    # print(child)
                    response_message = response_message + str(child) + "<br>"
        elif meal == "공깡":
            for target in targets:
                response_message = response_message + eng_ggang[k] + "<br>"
                # print(time[k])
                k = k + 1
                for child in target.contents[2].children:
                    # print(child)
                    response_message = response_message + str(child) + "<br>"
        elif meal == "두레미담":
            for target in targets:
                response_message = response_message + agricultural[k] + "<br>"
                # print(time[k])
                k = k + 1
                for child in target.contents[2].children:
                    # print(child)
                    response_message = response_message + str(child) + "<br>"
        else:
            if not (
                meal == "Student Center" or meal == "Dormitory" or meal == "901"
            ):
                k = 1
            for target in targets:
                response_message = response_message + time[k] + "<br>"
                # print(time[k])
                k = k + 1
                for child in target.contents[2].children:
                    # print(child)
                    response_message = response_message + str(child) + "<br>"

        dispatcher.utter_message(response_message)
        return [SlotSet("meal", meal)]
