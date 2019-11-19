from django.test import TestCase, Client
from .models import Article, Vote, Comment
from account.models import User
import json

# Create your tests here.


class UserTestCase(TestCase):
    def setUp(self):
        User.objects.create_user(
            username="test1",
            email="test1@email.com",
            nickname="test1",
            password="user1234",
        )
        User.objects.create_user(
            username="test2",
            email="test2@email.com",
            nickname="test2",
            password="user1234",
        )
        User.objects.create_user(
            username="changeinfo",
            email="changeinfo@email.com",
            nickname="changeinfo",
            password="user1234",
        )

    def test_csrf(self):
        client = Client(enforce_csrf_checks=True)
        response = client.post(
            "/api/signup/",
            json.dumps({"username": "chris", "password": "chris"}),
            content_type="application/json",
        )
        # Request without csrf token returns 403 response
        self.assertEqual(response.status_code, 403)
        response = client.get("/api/token/")
        self.assertEqual(response.status_code, 204)
        # Get csrf token from cookie
        csrftoken = response.cookies["csrftoken"].value
        response = client.post(
            "/api/signup/",
            json.dumps(
                {
                    "username": "chris",
                    "email": "chris@chris.chirs",
                    "nickname": "chris",
                    "password": "chris",
                }
            ),
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 201)  # Pass csrf protection

    def test_sign_up_KeyError(self):
        client = Client()
        response = client.get("/api/token/")
        self.assertEqual(response.status_code, 204)
        csrftoken = response.cookies["csrftoken"].value
        response = client.post(
            "/api/signup/",
            json.dumps({"username": "chris"}),
            content_type="application/json",
        )
        # Request without csrf token returns 403 response
        self.assertEqual(response.status_code, 400)

    def test_sign_in_and_out(self):
        client = Client()
        response = client.post(
            "/api/signin/",
            json.dumps({"username": "test1"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)
        response = client.post(
            "/api/signin/",
            json.dumps({"username": "test1", "password": "user123"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 401)
        response = client.post(
            "/api/signin/",
            json.dumps({"username": "test1", "password": "user1234"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 204)
        response = client.put(
            "/api/signin/",
            json.dumps({"username": "test1"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)
        response = client.put(
            "/api/signin/",
            json.dumps(
                {
                    "username": "test1",
                    "current_password": "user123",
                    "new_password": "user12345",
                }
            ),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 401)
        response = client.put(
            "/api/signin/",
            json.dumps(
                {
                    "username": "test1",
                    "current_password": "user1234",
                    "new_password": "user12345",
                }
            ),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 204)
        response = client.post(
            "/api/signin/",
            json.dumps({"username": "test1", "password": "user12345"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 204)
        response = client.get("/api/signout/")
        self.assertEqual(response.status_code, 204)
        response = client.get("/api/signout/")
        self.assertEqual(response.status_code, 401)

    def test_accountinfo_change(self):
        client = Client()
        # not authenticated
        response = client.put(
            "/api/account/",
            json.dumps({"username": "changeinfo"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 401)
        # signin for authentication
        response = client.post(
            "/api/signin/",
            json.dumps({"username": "changeinfo", "password": "user1234"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 204)
        # fetch user info
        response = client.get(
            "api/account/",
            {
                "name": "changeinfo",
                "email": "changeinfo@email.com",
                "nickname": "changeinfo",
            },
        )
        # wrong contents put
        response = client.put(
            "/api/account/",
            json.dumps({"username": "changeinfo",}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)
        # failed second authentication
        response = client.put(
            "/api/account/",
            json.dumps(
                {
                    "username": "changeinfo",
                    "new_nickname": "changeinfo",
                    "new_email": "changeinfo@email.com",
                    "current_password": "user123",
                    "new_password": "user1234",
                }
            ),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 401)
        # succeed to change info
        response = client.put(
            "/api/signin/",
            json.dumps(
                {
                    "username": "changeinfo",
                    "new_nickname": "changeinfo",
                    "new_email": "changeinfo@email.com",
                    "current_password": "user1234",
                    "new_password": "user1234",
                }
            ),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 204)


class ArticleTestCase(TestCase):
    def setUp(self):
        User.objects.create_user(
            username="test1",
            email="test1@snubot.com",
            nickname="test1",
            password="user1234",
        )
        User.objects.create_user(
            username="test2",
            email="test2@snubot.com",
            nickname="test2",
            password="user1234",
        )
        User.objects.create_user(
            username="test3",
            email="test3@snubot.com",
            nickname="test3",
            password="user1234",
        )
        User.objects.create_user(
            username="test4",
            email="test4@snubot.com",
            nickname="test4",
            password="user1234",
        )
        User.objects.create_user(
            username="test5",
            email="test5@snubot.com",
            nickname="test5",
            password="user1234",
        )
        User.objects.create_user(
            username="test6",
            email="test6@snubot.com",
            nickname="test6",
            password="user1234",
        )
        User.objects.create_user(
            username="test7",
            email="test7@snubot.com",
            nickname="test7",
            password="user1234",
        )
        User.objects.create_user(
            username="test8",
            email="test8@snubot.com",
            nickname="test8",
            password="user1234",
        )
        User.objects.create_user(
            username="test9",
            email="test9@snubot.com",
            nickname="test9",
            password="user1234",
        )
        User.objects.create_user(
            username="test10",
            email="test10@snubot.com",
            nickname="test10",
            password="user1234",
        )
        User.objects.create_user(
            username="test11",
            email="test11@snubot.com",
            nickname="test11",
            password="user1234",
        )
        User.objects.create_user(
            username="test12",
            email="test12@snubot.com",
            nickname="test12",
            password="user1234",
        )
        User.objects.create_user(
            username="test13",
            email="test13@snubot.com",
            nickname="test13",
            password="user1234",
        )
        User.objects.create_user(
            username="test14",
            email="test14@snubot.com",
            nickname="test14",
            password="user1234",
        )
        User.objects.create_user(
            username="test15",
            email="test15@snubot.com",
            nickname="test15",
            password="user1234",
        )
        User.objects.create_user(
            username="test16",
            email="test16@snubot.com",
            nickname="test16",
            password="user1234",
        )
        User.objects.create_user(
            username="test17",
            email="test17@snubot.com",
            nickname="test17",
            password="user1234",
        )
        User.objects.create_user(
            username="test18",
            email="test18@snubot.com",
            nickname="test18",
            password="user1234",
        )
        User.objects.create_user(
            username="test19",
            email="test19@snubot.com",
            nickname="test19",
            password="user1234",
        )
        User.objects.create_user(
            username="test20",
            email="test20@snubot.com",
            nickname="test20",
            password="user1234",
        )
        Article.objects.create(
            title="title1",
            content="content1",
            tag="normal",
            board="hot",
            author=User.objects.get(username="test1"),
        )
        Article.objects.create(
            title="title2",
            content="content2",
            tag="normal",
            board="hot",
            author=User.objects.get(username="test2"),
        )
        Article.objects.create(
            title="title3",
            content="content3",
            tag="normal",
            board="hot",
            author=User.objects.get(username="test3"),
        )
        Article.objects.create(
            title="title4",
            content="content4",
            tag="normal",
            board="hot",
            author=User.objects.get(username="test4"),
        )
        Article.objects.create(
            title="title5",
            content="content5",
            tag="normal",
            board="hot",
            author=User.objects.get(username="test5"),
        )
        Article.objects.create(
            title="title6",
            content="content6",
            tag="normal",
            board="hot",
            author=User.objects.get(username="test6"),
        )
        Article.objects.create(
            title="title7",
            content="content7",
            tag="normal",
            board="hot",
            author=User.objects.get(username="test7"),
        )
        Article.objects.create(
            title="title8",
            content="content8",
            tag="normal",
            board="hot",
            author=User.objects.get(username="test8"),
        )
        Article.objects.create(
            title="title9",
            content="content9",
            tag="normal",
            board="hot",
            author=User.objects.get(username="test9"),
        )
        Article.objects.create(
            title="title10",
            content="content10",
            tag="normal",
            board="hot",
            author=User.objects.get(username="test10"),
        )
        Article.objects.create(
            title="title11",
            content="content11",
            tag="normal",
            board="hot",
            author=User.objects.get(username="test11"),
        )
        Article.objects.create(
            title="title12",
            content="content12",
            tag="normal",
            board="hot",
            author=User.objects.get(username="test12"),
        )
        Article.objects.create(
            title="title13",
            content="content13",
            tag="normal",
            board="hot",
            author=User.objects.get(username="test13"),
        )
        Article.objects.create(
            title="title14",
            content="content14",
            tag="normal",
            board="hot",
            author=User.objects.get(username="test14"),
        )
        Article.objects.create(
            title="title15",
            content="content15",
            tag="normal",
            board="hot",
            author=User.objects.get(username="test15"),
        )
        Article.objects.create(
            title="title16",
            content="content16",
            tag="normal",
            board="hot",
            author=User.objects.get(username="test16"),
        )
        Article.objects.create(
            title="title17",
            content="content17",
            tag="normal",
            board="hot",
            author=User.objects.get(username="test17"),
        )
        Article.objects.create(
            title="title18",
            content="content18",
            tag="normal",
            board="hot",
            author=User.objects.get(username="test18"),
        )
        Article.objects.create(
            title="title19",
            content="content19",
            tag="normal",
            board="hot",
            author=User.objects.get(username="test19"),
        )
        Article.objects.create(
            title="title20",
            content="content20",
            tag="normal",
            board="hot",
            author=User.objects.get(username="test20"),
        )
        Article.objects.create(
            title="title21",
            content="content21",
            tag="done",
            board="all",
            author=User.objects.get(username="test1"),
        )
        Article.objects.create(
            title="title22",
            content="content22",
            tag="done",
            board="all",
            author=User.objects.get(username="test2"),
        )
        Article.objects.create(
            title="title23",
            content="content23",
            tag="done",
            board="all",
            author=User.objects.get(username="test3"),
        )
        Article.objects.create(
            title="title24",
            content="content24",
            tag="done",
            board="all",
            author=User.objects.get(username="test4"),
        )
        Article.objects.create(
            title="title25",
            content="content25",
            tag="done",
            board="all",
            author=User.objects.get(username="test5"),
        )
        Article.objects.create(
            title="title26",
            content="content26",
            tag="done",
            board="all",
            author=User.objects.get(username="test6"),
        )
        Article.objects.create(
            title="title27",
            content="content27",
            tag="done",
            board="all",
            author=User.objects.get(username="test7"),
        )
        Article.objects.create(
            title="title28",
            content="content28",
            tag="done",
            board="all",
            author=User.objects.get(username="test8"),
        )
        Article.objects.create(
            title="title29",
            content="content29",
            tag="done",
            board="all",
            author=User.objects.get(username="test9"),
        )
        Article.objects.create(
            title="title30",
            content="content30",
            tag="done",
            board="all",
            author=User.objects.get(username="test10"),
        )
        Article.objects.create(
            title="title31",
            content="content31",
            tag="done",
            board="all",
            author=User.objects.get(username="test11"),
        )
        Article.objects.create(
            title="title32",
            content="content32",
            tag="done",
            board="all",
            author=User.objects.get(username="test12"),
        )
        Article.objects.create(
            title="title33",
            content="content33",
            tag="done",
            board="all",
            author=User.objects.get(username="test13"),
        )
        Article.objects.create(
            title="title34",
            content="content34",
            tag="done",
            board="all",
            author=User.objects.get(username="test14"),
        )
        Article.objects.create(
            title="title35",
            content="content35",
            tag="done",
            board="all",
            author=User.objects.get(username="test15"),
        )
        Article.objects.create(
            title="title36",
            content="content36",
            tag="done",
            board="all",
            author=User.objects.get(username="test16"),
        )
        Article.objects.create(
            title="title37",
            content="content37",
            tag="done",
            board="all",
            author=User.objects.get(username="test17"),
        )
        Article.objects.create(
            title="title38",
            content="content38",
            tag="done",
            board="all",
            author=User.objects.get(username="test18"),
        )
        Article.objects.create(
            title="title39",
            content="content39",
            tag="done",
            board="all",
            author=User.objects.get(username="test19"),
        )
        Article.objects.create(
            title="find title",
            content="content40",
            tag="done",
            board="all",
            author=User.objects.get(username="test20"),
        )
        Vote.objects.create(article=Article.objects.get(title="title1"), like="20")
        Vote.objects.get(article__title="title1").like_voter.add(
            User.objects.get(username="test2")
        )
        Vote.objects.create(article=Article.objects.get(title="title2"), like="20")
        Vote.objects.get(article__title="title2").like_voter.add(
            User.objects.get(username="test3")
        )
        Vote.objects.create(article=Article.objects.get(title="title3"), like="20")
        Vote.objects.get(article__title="title3").like_voter.add(
            User.objects.get(username="test4")
        )
        Vote.objects.create(article=Article.objects.get(title="title4"), like="20")
        Vote.objects.get(article__title="title4").like_voter.add(
            User.objects.get(username="test5")
        )
        Vote.objects.create(article=Article.objects.get(title="title5"), like="20")
        Vote.objects.get(article__title="title5").like_voter.add(
            User.objects.get(username="test6")
        )
        Vote.objects.create(article=Article.objects.get(title="title6"), like="20")
        Vote.objects.get(article__title="title6").like_voter.add(
            User.objects.get(username="test7")
        )
        Vote.objects.create(article=Article.objects.get(title="title7"), like="20")
        Vote.objects.get(article__title="title7").like_voter.add(
            User.objects.get(username="test8")
        )
        Vote.objects.create(article=Article.objects.get(title="title8"), like="20")
        Vote.objects.get(article__title="title8").like_voter.add(
            User.objects.get(username="test9")
        )
        Vote.objects.create(article=Article.objects.get(title="title9"), like="20")
        Vote.objects.get(article__title="title9").like_voter.add(
            User.objects.get(username="test10")
        )
        Vote.objects.create(article=Article.objects.get(title="title10"), like="20")
        Vote.objects.get(article__title="title10").like_voter.add(
            User.objects.get(username="test11")
        )
        Vote.objects.create(article=Article.objects.get(title="title11"), like="20")
        Vote.objects.get(article__title="title11").like_voter.add(
            User.objects.get(username="test12")
        )
        Vote.objects.create(article=Article.objects.get(title="title12"), like="20")
        Vote.objects.get(article__title="title12").like_voter.add(
            User.objects.get(username="test13")
        )
        Vote.objects.create(article=Article.objects.get(title="title13"), like="20")
        Vote.objects.get(article__title="title13").like_voter.add(
            User.objects.get(username="test14")
        )
        Vote.objects.create(article=Article.objects.get(title="title14"), like="20")
        Vote.objects.get(article__title="title14").like_voter.add(
            User.objects.get(username="test15")
        )
        Vote.objects.create(article=Article.objects.get(title="title15"), like="20")
        Vote.objects.get(article__title="title15").like_voter.add(
            User.objects.get(username="test16")
        )
        Vote.objects.create(article=Article.objects.get(title="title16"), like="20")
        Vote.objects.get(article__title="title16").like_voter.add(
            User.objects.get(username="test17")
        )
        Vote.objects.create(article=Article.objects.get(title="title17"), like="20")
        Vote.objects.get(article__title="title17").like_voter.add(
            User.objects.get(username="test18")
        )
        Vote.objects.create(article=Article.objects.get(title="title18"), like="20")
        Vote.objects.get(article__title="title18").like_voter.add(
            User.objects.get(username="test19")
        )
        Vote.objects.create(article=Article.objects.get(title="title19"), like="20")
        Vote.objects.get(article__title="title19").like_voter.add(
            User.objects.get(username="test20")
        )
        Vote.objects.create(article=Article.objects.get(title="title20"), like="20")
        Vote.objects.get(article__title="title20").like_voter.add(
            User.objects.get(username="test1")
        )
        Vote.objects.create(article=Article.objects.get(title="title21"))
        Vote.objects.create(article=Article.objects.get(title="title22"))
        Vote.objects.create(article=Article.objects.get(title="title23"))
        Vote.objects.create(article=Article.objects.get(title="title24"))
        Vote.objects.create(article=Article.objects.get(title="title25"))
        Vote.objects.create(article=Article.objects.get(title="title26"))
        Vote.objects.create(article=Article.objects.get(title="title27"))
        Vote.objects.create(article=Article.objects.get(title="title28"))
        Vote.objects.create(article=Article.objects.get(title="title29"))
        Vote.objects.create(article=Article.objects.get(title="title30"))
        Vote.objects.create(article=Article.objects.get(title="title31"))
        Vote.objects.create(article=Article.objects.get(title="title32"))
        Vote.objects.create(article=Article.objects.get(title="title33"))
        Vote.objects.create(article=Article.objects.get(title="title34"))
        Vote.objects.create(article=Article.objects.get(title="title35"))
        Vote.objects.create(article=Article.objects.get(title="title36"))
        Vote.objects.create(article=Article.objects.get(title="title37"))
        Vote.objects.create(article=Article.objects.get(title="title38"))
        Vote.objects.create(article=Article.objects.get(title="title39"))
        Vote.objects.create(article=Article.objects.get(title="find title"), like=10)
        Comment.objects.create(
            article=Article.objects.get(title="title1"),
            content="test1",
            author=User.objects.get(username="test1"),
        )
        Comment.objects.create(
            article=Article.objects.get(title="title1"),
            content="test2",
            author=User.objects.get(username="test2"),
        )

    def test_board(self):
        client = Client()
        response = client.post(
            "/api/boards/",
            json.dumps({"boardName": "all"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)
        response = client.post(
            "/api/boards/",
            json.dumps(
                {
                    "boardName": "all",
                    "articlesPerRequest": 20,
                    "currentPageNumber": 1,
                    "filterCriteria": "all",
                    "sortCriteria": "new",
                    "searchCriteria": "nickname",
                    "searchKeyword": "",
                }
            ),
            content_type="application/json",
        )
        self.assertEqual(len(json.loads(response.content)[1]), 20)
        response = client.post(
            "/api/boards/",
            json.dumps(
                {
                    "boardName": "all",
                    "articlesPerRequest": 20,
                    "currentPageNumber": 1,
                    "filterCriteria": "done",
                    "sortCriteria": "new",
                    "searchCriteria": "nickname",
                    "searchKeyword": "",
                }
            ),
            content_type="application/json",
        )
        self.assertEqual(len(json.loads(response.content)[1]), 20)
        response = client.post(
            "/api/boards/",
            json.dumps(
                {
                    "boardName": "all",
                    "articlesPerRequest": 20,
                    "currentPageNumber": 1,
                    "filterCriteria": "all",
                    "sortCriteria": "new",
                    "searchCriteria": "title",
                    "searchKeyword": "find title",
                }
            ),
            content_type="application/json",
        )
        self.assertEqual(len(json.loads(response.content)[1]), 1)
        response = client.post(
            "/api/boards/",
            json.dumps(
                {
                    "boardName": "all",
                    "articlesPerRequest": 20,
                    "currentPageNumber": 1,
                    "filterCriteria": "all",
                    "sortCriteria": "old",
                    "searchCriteria": "nickname",
                    "searchKeyword": "test",
                }
            ),
            content_type="application/json",
        )
        self.assertEqual(len(json.loads(response.content)[1]), 20)
        response = client.post(
            "/api/boards/",
            json.dumps(
                {
                    "boardName": "all",
                    "articlesPerRequest": 20,
                    "currentPageNumber": 1,
                    "filterCriteria": "all",
                    "sortCriteria": "good",
                    "searchCriteria": "nickname",
                    "searchKeyword": "",
                }
            ),
            content_type="application/json",
        )
        self.assertEqual(len(json.loads(response.content)[1]), 20)
        response = client.post(
            "/api/boards/",
            json.dumps(
                {
                    "boardName": "all",
                    "articlesPerRequest": 20,
                    "currentPageNumber": 1,
                    "filterCriteria": "all",
                    "sortCriteria": "good",
                    "searchCriteria": "nickname",
                    "searchKeyword": "",
                }
            ),
            content_type="application/json",
        )
        self.assertEqual(len(json.loads(response.content)[1]), 20)

    def test_article(self):
        client = Client()
        response = client.post(
            "/api/signin/",
            json.dumps({"username": "test2", "password": "user1234"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 204)
        response = client.post(
            "/api/article/",
            json.dumps({"title": "title1"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)
        response = client.post(
            "/api/article/",
            json.dumps({"title": "title1", "content": "content1"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 201)

    def test_article_detail(self):
        client = Client()
        id = Article.objects.get(title="title1").id
        response = client.put(
            "/api/article/" + str(id) + "/",
            json.dumps({"title": "title1", "content": "content1"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 401)
        response = client.delete(
            "/api/article/" + str(id) + "/", content_type="application/json"
        )
        self.assertEqual(response.status_code, 401)
        response = client.post(
            "/api/signin/",
            json.dumps({"username": "test1", "password": "user1234"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 204)
        response = client.get("/api/article/1000/")
        self.assertEqual(response.status_code, 404)
        response = client.get("/api/article/" + str(id) + "/")
        self.assertJSONEqual(
            str(response.content, encoding="utf8"),
            {
                "id": id,
                "title": "title1",
                "content": "content1",
                "author__nickname": "test1",
                "like": 20,
                "dislike": 0,
                "tag": "normal",
            },
        )
        response = client.put(
            "/api/article/" + str(id) + "/",
            json.dumps({"title": "title1"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)
        response = client.put(
            "/api/article/" + str(id) + "/",
            json.dumps({"title": "editedtitle", "content": "editedcontent"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(
            str(response.content, encoding="utf8"),
            {
                "id": id,
                "title": "editedtitle",
                "content": "editedcontent",
                "author__nickname": "test1",
                "like": 20,
                "dislike": 0,
                "tag": "normal",
            },
        )
        response = client.put(
            "/api/article/" + str(id + 1) + "/",
            json.dumps({"title": "title1", "content": "content1"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 403)
        response = client.delete(
            "/api/article/" + str(id) + "/", content_type="application/json"
        )
        self.assertEqual(response.status_code, 200)
        response = client.delete(
            "/api/article/" + str(id + 1) + "/", content_type="application/json"
        )
        self.assertEqual(response.status_code, 403)

    def test_vote(self):
        client = Client()
        id = Vote.objects.get(article__id=Article.objects.get(title="title1").id).id
        response = client.put(
            "/api/vote/" + str(id) + "/",
            json.dumps({"vote": "like"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 401)
        response = client.post(
            "/api/signin/",
            json.dumps({"username": "test1", "password": "user1234"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 204)
        response = client.put(
            "/api/vote/" + str(id) + "/",
            json.dumps({}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)
        response = client.put(
            "/api/vote/" + str(id + 39) + "/",
            json.dumps({"vote": "like"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(
            str(response.content, encoding="utf8"), {"like": 11, "dislike": 0}
        )
        response = client.put(
            "/api/vote/" + str(id + 39) + "/",
            json.dumps({"vote": "like"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(
            str(response.content, encoding="utf8"), {"like": 11, "dislike": 0}
        )
        response = client.put(
            "/api/vote/" + str(id + 39) + "/",
            json.dumps({"vote": "dislike"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(
            str(response.content, encoding="utf8"), {"like": 10, "dislike": 0}
        )
        response = client.put(
            "/api/vote/" + str(id + 39) + "/",
            json.dumps({"vote": "dislike"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(
            str(response.content, encoding="utf8"), {"like": 10, "dislike": 1}
        )
        response = client.put(
            "/api/vote/" + str(id + 39) + "/",
            json.dumps({"vote": "dislike"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(
            str(response.content, encoding="utf8"), {"like": 10, "dislike": 1}
        )
        response = client.put(
            "/api/vote/" + str(id + 39) + "/",
            json.dumps({"vote": "like"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(
            str(response.content, encoding="utf8"), {"like": 10, "dislike": 0}
        )

    def test_comment(self):
        client = Client()
        ## unauthorized user
        response = client.get("/api/comment/1/")
        self.assertEqual(response.status_code, 200)
        ## login
        response = client.post(
            "/api/signin/",
            json.dumps({"username": "test1", "password": "user1234"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 204)
        # print(Article.objects.all().values())
        # print(Comment.objects.all().values())
        article_id = Article.objects.get(title="title1").id
        # print(id)
        response = client.get("/api/comment/" + str(article_id) + "/")
        self.assertEqual(response.status_code, 200)
        self.assertIn("test1", response.content.decode())

        response = client.post(
            "/api/comment/" + str(article_id) + "/",
            json.dumps({"content": "test3"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 201)
        self.assertIn("test3", response.content.decode())

        response = client.post("/api/comment/" + str(article_id) + "/")
        self.assertEqual(response.status_code, 400)

        comment_id = Comment.objects.get(content="test2").id
        response = client.delete("/api/comment/0/")
        self.assertEqual(response.status_code, 404)

        response = client.delete("/api/comment/" + str(comment_id) + "/")
        self.assertEqual(response.status_code, 403)

        comment_id = Comment.objects.get(content="test3").id
        response = client.delete("/api/comment/" + str(comment_id) + "/")
        self.assertEqual(response.status_code, 200)

