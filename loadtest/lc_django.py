from locust import HttpLocust, TaskSet, task, between
import requests, json
import random

class UserBehavior(TaskSet):
    def on_start(self):
        self.login()

    def login(self):
        # login to the application
        response = self.client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"]

    @task(1)
    def getFirstPages(self):
        data = {
            "currentPageNumber": 1,
            "filterCriteria": "all",
            "sortCriteria": "new",
            "searchCriteria": "",
            "searchKeyword": "",
            "boardName": "all",
            "articlesPerRequest": 6,
        }
        url = "/api/boards/"
        response = self.client.post(url, json.dumps(data))

    @task(2)
    def getSecondPages(self):
        data = {
            "currentPageNumber": 2,
            "filterCriteria": "all",
            "sortCriteria": "new",
            "searchCriteria": "",
            "searchKeyword": "",
            "boardName": "all",
            "articlesPerRequest": 6,
        }
        url = "/api/boards/"
        response = self.client.post(url, json.dumps(data))

    @task(3)
    def getThirdPages(self):
        data = {
            "currentPageNumber": 3,
            "filterCriteria": "all",
            "sortCriteria": "new",
            "searchCriteria": "",
            "searchKeyword": "",
            "boardName": "all",
            "articlesPerRequest": 6,
        }
        url = "/api/boards/"
        response = self.client.post(url, json.dumps(data))

    @task(4)
    def getThirdPages(self):
        data = {
            "currentPageNumber": 4,
            "filterCriteria": "all",
            "sortCriteria": "new",
            "searchCriteria": "",
            "searchKeyword": "",
            "boardName": "all",
            "articlesPerRequest": 6,
        }
        url = "/api/boards/"
        response = self.client.post(url, json.dumps(data))

    @task(5)
    def getThirdPages(self):
        data = {
            "currentPageNumber": 5,
            "filterCriteria": "all",
            "sortCriteria": "new",
            "searchCriteria": "",
            "searchKeyword": "",
            "boardName": "all",
            "articlesPerRequest": 6,
        }
        url = "/api/boards/"
        response = self.client.post(url, json.dumps(data))

    @task(6)
    def getThirdPages(self):
        data = {
            "currentPageNumber": 6,
            "filterCriteria": "all",
            "sortCriteria": "new",
            "searchCriteria": "",
            "searchKeyword": "",
            "boardName": "all",
            "articlesPerRequest": 6,
        }
        url = "/api/boards/"
        response = self.client.post(url, json.dumps(data))

    @task(7)
    def putVote(self):
        k = random.uniform(1, 10)
        if k>8:
          user_data = {"username": "user3", "password": "swppswpp"}
          self.client.post("/api/signin/", json.dumps(user_data))
          data = {
              "vote": "like",
          }
          url = "/api/vote/110/"
          response = self.client.put(url, json.dumps(data))


class WebsiteUser(HttpLocust):
    task_set = UserBehavior
    wait_time = between(1, 6)

