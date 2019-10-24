from django.test import TestCase, Client
from .models import Article, Vote
from django.contrib.auth.models import User
import json
# Create your tests here.


class UserTestCase(TestCase):
    def setUp(self):
        User.objects.create_user(username='test1', password='user1234')
        User.objects.create_user(username='test2', password='user1234')

    def test_csrf(self):
        client = Client(enforce_csrf_checks=True)
        response = client.post('/api/signup/', json.dumps({'username': 'chris', 'password': 'chris'}),
                               content_type='application/json')
        # Request without csrf token returns 403 response
        self.assertEqual(response.status_code, 403)
        response = client.get('/api/token/')
        self.assertEqual(response.status_code, 204)
        # Get csrf token from cookie
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/signup/', json.dumps({'username': 'chris', 'password': 'chris'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)  # Pass csrf protection

    def test_sign_up_KeyError(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/token/')
        self.assertEqual(response.status_code, 204)
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/signup/', json.dumps({'username': 'chris'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        # Request without csrf token returns 403 response
        self.assertEqual(response.status_code, 400)

    def test_sign_in_and_out(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/signin/', json.dumps(
            {'username': 'test1'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)
        response = client.post('/api/signin/', json.dumps(
            {'username': 'test1', 'password': 'user123'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)
        response = client.post('/api/signin/', json.dumps(
            {'username': 'test1', 'password': 'user1234'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 204)
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.put('/api/signin/', json.dumps(
            {'username': 'test1'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)
        response = client.put('/api/signin/', json.dumps(
            {'username': 'test1', 'current_password': 'user123', 'new_password': 'user12345'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)
        response = client.put('/api/signin/', json.dumps(
            {'username': 'test1', 'current_password': 'user1234', 'new_password': 'user12345'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 204)
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/signin/', json.dumps(
            {'username': 'test1', 'password': 'user12345'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 204)
        response = client.get('/api/signout/')
        self.assertEqual(response.status_code, 204)
        response = client.get('/api/signout/')
        self.assertEqual(response.status_code, 401)


class ArticleTestCase(TestCase):
    def setUp(self):
        User.objects.create_user(username="test1", password="user1234")
        User.objects.create_user(username="test2", password="user1234")
        User.objects.create_user(username="test3", password="user1234")
        User.objects.create_user(username="test4", password="user1234")
        User.objects.create_user(username="test5", password="user1234")
        User.objects.create_user(username="test6", password="user1234")
        User.objects.create_user(username="test7", password="user1234")
        User.objects.create_user(username="test8", password="user1234")
        User.objects.create_user(username="test9", password="user1234")
        User.objects.create_user(username="test10", password="user1234")
        User.objects.create_user(username="test11", password="user1234")
        User.objects.create_user(username="test12", password="user1234")
        User.objects.create_user(username="test13", password="user1234")
        User.objects.create_user(username="test14", password="user1234")
        User.objects.create_user(username="test15", password="user1234")
        User.objects.create_user(username="test16", password="user1234")
        User.objects.create_user(username="test17", password="user1234")
        User.objects.create_user(username="test18", password="user1234")
        User.objects.create_user(username="test19", password="user1234")
        User.objects.create_user(username="test20", password="user1234")
        Article.objects.create(title="title", content="content1",
                               tag="normal", board="hot", author=User.objects.get(id=1))
        Article.objects.create(title="title", content="content1",
                               tag="normal", board="hot", author=User.objects.get(id=2))
        Article.objects.create(title="title", content="content1",
                               tag="normal", board="hot", author=User.objects.get(id=3))
        Article.objects.create(title="title", content="content1",
                               tag="normal", board="hot", author=User.objects.get(id=4))
        Article.objects.create(title="title", content="content1",
                               tag="normal", board="hot", author=User.objects.get(id=5))
        Article.objects.create(title="title", content="content1",
                               tag="normal", board="hot", author=User.objects.get(id=6))
        Article.objects.create(title="title", content="content1",
                               tag="normal", board="hot", author=User.objects.get(id=7))
        Article.objects.create(title="title", content="content1",
                               tag="normal", board="hot", author=User.objects.get(id=8))
        Article.objects.create(title="title", content="content1",
                               tag="normal", board="hot", author=User.objects.get(id=9))
        Article.objects.create(title="title", content="content1",
                               tag="normal", board="hot", author=User.objects.get(id=10))
        Article.objects.create(title="title", content="content1",
                               tag="normal", board="hot", author=User.objects.get(id=11))
        Article.objects.create(title="title", content="content1",
                               tag="normal", board="hot", author=User.objects.get(id=12))
        Article.objects.create(title="title", content="content1",
                               tag="normal", board="hot", author=User.objects.get(id=13))
        Article.objects.create(title="title", content="content1",
                               tag="normal", board="hot", author=User.objects.get(id=14))
        Article.objects.create(title="title", content="content1",
                               tag="normal", board="hot", author=User.objects.get(id=15))
        Article.objects.create(title="title", content="content1",
                               tag="normal", board="hot", author=User.objects.get(id=16))
        Article.objects.create(title="title", content="content1",
                               tag="normal", board="hot", author=User.objects.get(id=17))
        Article.objects.create(title="title", content="content1",
                               tag="normal", board="hot", author=User.objects.get(id=18))
        Article.objects.create(title="title", content="content1",
                               tag="normal", board="hot", author=User.objects.get(id=19))
        Article.objects.create(title="title", content="content1",
                               tag="normal", board="hot", author=User.objects.get(id=20))
        Article.objects.create(title="title", content="content1",
                               tag="done", board="all", author=User.objects.get(id=1))
        Article.objects.create(title="title", content="content1",
                               tag="done", board="all", author=User.objects.get(id=2))
        Article.objects.create(title="title", content="content1",
                               tag="done", board="all", author=User.objects.get(id=3))
        Article.objects.create(title="title", content="content1",
                               tag="done", board="all", author=User.objects.get(id=4))
        Article.objects.create(title="title", content="content1",
                               tag="done", board="all", author=User.objects.get(id=5))
        Article.objects.create(title="title", content="content1",
                               tag="done", board="all", author=User.objects.get(id=6))
        Article.objects.create(title="title", content="content1",
                               tag="done", board="all", author=User.objects.get(id=7))
        Article.objects.create(title="title", content="content1",
                               tag="done", board="all", author=User.objects.get(id=8))
        Article.objects.create(title="title", content="content1",
                               tag="done", board="all", author=User.objects.get(id=9))
        Article.objects.create(title="title", content="content1",
                               tag="done", board="all", author=User.objects.get(id=10))
        Article.objects.create(title="title", content="content1",
                               tag="done", board="all", author=User.objects.get(id=11))
        Article.objects.create(title="title", content="content1",
                               tag="done", board="all", author=User.objects.get(id=12))
        Article.objects.create(title="title", content="content1",
                               tag="done", board="all", author=User.objects.get(id=13))
        Article.objects.create(title="title", content="content1",
                               tag="done", board="all", author=User.objects.get(id=14))
        Article.objects.create(title="title", content="content1",
                               tag="done", board="all", author=User.objects.get(id=15))
        Article.objects.create(title="title", content="content1",
                               tag="done", board="all", author=User.objects.get(id=16))
        Article.objects.create(title="title", content="content1",
                               tag="done", board="all", author=User.objects.get(id=17))
        Article.objects.create(title="title", content="content1",
                               tag="done", board="all", author=User.objects.get(id=18))
        Article.objects.create(title="title", content="content1",
                               tag="done", board="all", author=User.objects.get(id=19))
        Article.objects.create(title="title", content="content1",
                               tag="done", board="all", author=User.objects.get(id=20))
        Article.objects.create(title="title", content="content1",
                               tag="done", board="all", author=User.objects.get(id=1))
        Vote.objects.create(article=Article.objects.get(id=1), like="20")
        Vote.objects.get(id=1).like_voter.add(User.objects.get(id=1))
        Vote.objects.create(article=Article.objects.get(id=2), like="20")
        Vote.objects.get(id=2).like_voter.add(User.objects.get(id=1))
        Vote.objects.create(article=Article.objects.get(id=3), like="20")
        Vote.objects.get(id=3).like_voter.add(User.objects.get(id=1))
        Vote.objects.create(article=Article.objects.get(id=4), like="20")
        Vote.objects.get(id=4).like_voter.add(User.objects.get(id=1))
        Vote.objects.create(article=Article.objects.get(id=5), like="20")
        Vote.objects.get(id=5).like_voter.add(User.objects.get(id=1))
        Vote.objects.create(article=Article.objects.get(id=6), like="20")
        Vote.objects.get(id=6).like_voter.add(User.objects.get(id=1))
        Vote.objects.create(article=Article.objects.get(id=7), like="20")
        Vote.objects.get(id=7).like_voter.add(User.objects.get(id=1))
        Vote.objects.create(article=Article.objects.get(id=8), like="20")
        Vote.objects.get(id=8).like_voter.add(User.objects.get(id=1))
        Vote.objects.create(article=Article.objects.get(id=9), like="20")
        Vote.objects.get(id=9).like_voter.add(User.objects.get(id=1))
        Vote.objects.create(article=Article.objects.get(id=10), like="20")
        Vote.objects.get(id=10).like_voter.add(User.objects.get(id=1))
        Vote.objects.create(article=Article.objects.get(id=11), like="20")
        Vote.objects.get(id=11).like_voter.add(User.objects.get(id=1))
        Vote.objects.create(article=Article.objects.get(id=12), like="20")
        Vote.objects.get(id=12).like_voter.add(User.objects.get(id=1))
        Vote.objects.create(article=Article.objects.get(id=13), like="20")
        Vote.objects.get(id=13).like_voter.add(User.objects.get(id=1))
        Vote.objects.create(article=Article.objects.get(id=14), like="20")
        Vote.objects.get(id=14).like_voter.add(User.objects.get(id=1))
        Vote.objects.create(article=Article.objects.get(id=15), like="20")
        Vote.objects.get(id=15).like_voter.add(User.objects.get(id=1))
        Vote.objects.create(article=Article.objects.get(id=16), like="20")
        Vote.objects.get(id=16).like_voter.add(User.objects.get(id=1))
        Vote.objects.create(article=Article.objects.get(id=17), like="20")
        Vote.objects.get(id=17).like_voter.add(User.objects.get(id=1))
        Vote.objects.create(article=Article.objects.get(id=18), like="20")
        Vote.objects.get(id=18).like_voter.add(User.objects.get(id=1))
        Vote.objects.create(article=Article.objects.get(id=19), like="20")
        Vote.objects.get(id=19).like_voter.add(User.objects.get(id=1))
        Vote.objects.create(article=Article.objects.get(id=20), like="20")
        Vote.objects.get(id=20).like_voter.add(User.objects.get(id=1))
        Vote.objects.create(article=Article.objects.get(id=21))
        Vote.objects.create(article=Article.objects.get(id=22))
        Vote.objects.create(article=Article.objects.get(id=23))
        Vote.objects.create(article=Article.objects.get(id=24))
        Vote.objects.create(article=Article.objects.get(id=25))
        Vote.objects.create(article=Article.objects.get(id=26))
        Vote.objects.create(article=Article.objects.get(id=27))
        Vote.objects.create(article=Article.objects.get(id=28))
        Vote.objects.create(article=Article.objects.get(id=29))
        Vote.objects.create(article=Article.objects.get(id=30))
        Vote.objects.create(article=Article.objects.get(id=31))
        Vote.objects.create(article=Article.objects.get(id=32))
        Vote.objects.create(article=Article.objects.get(id=33))
        Vote.objects.create(article=Article.objects.get(id=34))
        Vote.objects.create(article=Article.objects.get(id=35))
        Vote.objects.create(article=Article.objects.get(id=36))
        Vote.objects.create(article=Article.objects.get(id=37))
        Vote.objects.create(article=Article.objects.get(id=38))
        Vote.objects.create(article=Article.objects.get(id=39))
        Vote.objects.create(article=Article.objects.get(id=40))
        Vote.objects.create(article=Article.objects.get(id=41), like="10")

    def test_board(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/signin/', json.dumps(
            {'username': 'test2', 'password': 'user1234'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 204)
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/boards/', json.dumps(
            {'board_name': 'all'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)
        response = client.post('/api/boards/', json.dumps(
            {'board_name': 'all', 'tag': 'normal', 'num_article': 4}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(len(json.loads(response.content)), 4)
        response = client.post('/api/boards/', json.dumps(
            {'board_name': 'all', 'tag': 'done', 'num_article': 40}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(len(json.loads(response.content)), 21)
        response = client.post('/api/boards/', json.dumps(
            {'board_name': 'hot', 'tag': 'normal', 'num_article': 40}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(len(json.loads(response.content)), 20)
        response = client.post('/api/boards/', json.dumps(
            {'board_name': 'hot', 'tag': 'done', 'num_article': 40}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(len(json.loads(response.content)), 0)

    def test_article(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/signin/', json.dumps(
            {'username': 'test2', 'password': 'user1234'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 204)
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/article/', json.dumps(
            {'title': 'title1'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)
        response = client.post('/api/article/', json.dumps(
            {'title': 'title1', 'content': 'content1'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)

    def test_article_detail(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.put('/api/article/1/', json.dumps(
            {'title': 'title1', 'content': 'content1'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.delete(
            '/api/article/1/', content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/signin/', json.dumps(
            {'username': 'test1', 'password': 'user1234'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 204)
        response = client.get('/api/article/1000/')
        self.assertEqual(response.status_code, 404)
        response = client.get('/api/article/1/')
        self.assertJSONEqual(str(response.content, encoding='utf8'), {
                             "id": 1, "title": "title", "content": "content1", "author": "test1", "like": 20, "dislike": 0})
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.put('/api/article/1/', json.dumps(
            {'title': 'title1'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)
        response = client.put('/api/article/1/', json.dumps(
            {'title': 'title1', 'content': 'content1'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(str(response.content, encoding='utf8'), {
                             "id": 1, "title": "title1", "content": "content1", "author": "test1", "like": 20, "dislike": 0})
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.put('/api/article/2/', json.dumps(
            {'title': 'title1', 'content': 'content1'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 403)
        response = client.delete(
            '/api/article/1/', content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 200)
        response = client.delete(
            '/api/article/2/', content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 403)

    def test_vote(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.put('/api/vote/1/', json.dumps(
            {'vote': 'like'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/api/signin/', json.dumps(
            {'username': 'test1', 'password': 'user1234'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 204)
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.put('/api/vote/1/', json.dumps(
            {}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)
        response = client.put('/api/vote/41/', json.dumps(
            {'vote': 'like'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(str(response.content, encoding='utf8'), {
                             "like": 11, "dislike": 0})
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.put('/api/vote/1/', json.dumps(
            {'vote': 'like'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 409)
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.put('/api/vote/21/', json.dumps(
            {'vote': 'dislike'}), content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(str(response.content, encoding='utf8'), {
                             "like": 0, "dislike": 1})
