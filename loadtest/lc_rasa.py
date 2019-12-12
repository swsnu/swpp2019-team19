from locust import HttpLocust, TaskSet, task, between
import requests, json
import random
from simplejson import JSONDecodeError


class UserBehavior(TaskSet):
    @task(1)
    def postHi(self):
        data = {"sender": "testuser1", "message": "hi"}
        failurl = "theresnourllikethis"
        url = "/webhooks/rest/webhook"
        with self.client.post(
            url, json.dumps(data), catch_response=True
        ) as response:
            print(response.status_code)
            try:
                res_text = response.json()
            except JSONDecodeError as e:
                response.failure("Got wrong resonse")
            print(res_text)
            if res_text is "" or res_text is None:
                response.failure("Got wrong response")
            if res_text[0]["text"] != "Hey! How are you?":
                response.failure("Got wrong response")

    @task(2)
    def postMenu(self):
        data = {
            "sender": "testuser1",
            "message": "Tell me the menu at Student Center",
        }
        failurl = "theresnourllikethis"
        url = "/webhooks/rest/webhook"
        with self.client.post(
            url, json.dumps(data), catch_response=True
        ) as response:
            print(response.status_code)
            try:
                res_text = response.json()
            except JSONDecodeError as e:
                response.failure("Got wrong resonse")
            print(res_text)
            if res_text is "" or res_text is None:
                response.failure("Got wrong response")
            if (
                res_text[0]["text"]
                != "breakfast<br>spicy pork stew with potatos<br>lunch<br>fried chicken with teriyaki sauce<br><br/><br>stir-fried meat patties and vegetables<br><br/><br>kimchi stew<br><br/><br>bowl of rice topped with sliced pork& mini udon<br>dinner<br>pork bulgogi<br><br/><br>hot spicy beef stew<br>"
            ):
                response.failure("Got wrong response")

    @task(3)
    def postBye(self):
        data = {"sender": "testuser1", "message": "bye"}
        failurl = "theresnourllikethis"
        url = "/webhooks/rest/webhook"
        with self.client.post(
            url, json.dumps(data), catch_response=True
        ) as response:
            print(response.status_code)
            try:
                res_text = response.json()
            except JSONDecodeError as e:
                response.failure("Got wrong resonse")
            print(res_text)
            if res_text is "" or res_text is None:
                response.failure("Got wrong response")
            if res_text[0]["text"] != "Goodbye, have a nice day!":
                response.failure("Got wrong response")


class WebsiteUser(HttpLocust):
    task_set = UserBehavior
    wait_time = between(1, 3)

