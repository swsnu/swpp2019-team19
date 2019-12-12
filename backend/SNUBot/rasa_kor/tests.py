from django.test import TestCase, Client
from .models import IntentKor, ActionKor, StoryKor
from account.models import User
import json


class RasaKorTestCase(TestCase):
    def setUp(self):
        user1 = User.objects.create_superuser(
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
        IntentKor.objects.create(
            intent_name="greet",
            intent_tokens=[
                "hey",
                "hello",
                "hi",
                "good morning",
                "good evening",
                "hey there",
            ],
        )
        IntentKor.objects.create(
            intent_name="goodbye",
            intent_tokens=[
                "bye",
                "goodbye",
                "see you around",
                "see you later",
                "catch you later",
            ],
        )
        IntentKor.objects.create(
            intent_name="bot_challenge",
            intent_tokens=[
                "are you a bot?",
                "are you a human",
                "am I talking to a bot?",
                "am I talking to a human?",
            ],
        )
        action = ActionKor(
            action_name="utter_greet",
            action_type="text",
            text_value="Hey! How are you?",
        )
        action.save()
        action.intent.add(IntentKor.objects.get(intent_name="greet"))
        action = ActionKor(
            action_name="utter_goodbye",
            action_type="text",
            text_value="Goodbye, have a nice day!",
        )
        action.save()
        action.intent.add(IntentKor.objects.get(intent_name="goodbye"))
        action = ActionKor(
            action_name="utter_iamabot",
            action_type="text",
            text_value="I am a bot, powered by Rasa.",
        )
        action.save()
        action.intent.add(IntentKor.objects.get(intent_name="bot_challenge"))
        story = StoryKor(story_name="greet path")
        story.save()
        story.story_path_1.add(IntentKor.objects.get(intent_name="greet"))
        story.story_path_2.add(IntentKor.objects.get(intent_name="goodbye"))
        story = StoryKor(story_name="bot path")
        story.save()
        story.story_path_1.add(IntentKor.objects.get(intent_name="bot_challenge"))

    def test_intents(self):
        client = Client()
        response = client.post(
            "/api/signin/",
            json.dumps({"username": "test1", "password": "user1234"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 204)
        response = client.get("/rasa_kor/intents/")
        self.assertEqual(response.status_code, 200)
        response = client.post(
            "/rasa_kor/intents/",
            json.dumps({"intent_name": "test_intent"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)
        response = client.post(
            "/rasa_kor/intents/",
            json.dumps({"intent_name": "test_intent", "intent_tokens": ["hi", "bye"]}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 201)

    def test_intent_detail(self):
        client = Client()
        response = client.post(
            "/api/signin/",
            json.dumps({"username": "test1", "password": "user1234"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 204)
        id = IntentKor.objects.get(intent_name="greet").id
        response = client.get("/rasa_kor/intent/" + str(id) + "/")
        self.assertEqual(response.status_code, 200)
        response = client.put(
            "/rasa_kor/intent/" + str(id) + "/",
            json.dumps({"intent_name": "test_intent"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)
        response = client.put(
            "/rasa_kor/intent/" + str(id) + "/",
            json.dumps(
                {"intent_name": "test_intent", "intent_tokens": ["hello", "bye"]}
            ),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 201)
        response = client.get("/rasa_kor/intent/" + str(id) + "/")
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(
            str(response.content, encoding="utf8"),
            {"id": id, "intent_name": "test_intent", "intent_tokens": ["hello", "bye"]},
        )
        response = client.delete("/rasa_kor/intent/" + str(id) + "/")
        self.assertEqual(response.status_code, 200)
        response = client.get("/rasa_kor/intent/" + str(id) + "/")
        self.assertEqual(response.status_code, 404)

    def test_actions(self):
        client = Client()
        response = client.post(
            "/api/signin/",
            json.dumps({"username": "test1", "password": "user1234"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 204)
        response = client.get("/rasa_kor/actions/")
        self.assertEqual(response.status_code, 200)
        response = client.post(
            "/rasa_kor/actions/",
            json.dumps(
                {
                    "action_name": "test_action",
                    "action_type": "text",
                    "text_value": "test_action_hi",
                    "intent_list": ["intent_1", "intent_2"],
                }
            ),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)
        response = client.post(
            "/rasa_kor/actions/",
            json.dumps(
                {
                    "action_name": "test_action",
                    "action_type": "text",
                    "text_value": "test_action_hi",
                    "image_value": "",
                    "intent_list": ["greet"],
                }
            ),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 201)

    def test_action_detail(self):
        client = Client()
        response = client.post(
            "/api/signin/",
            json.dumps({"username": "test1", "password": "user1234"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 204)
        id = ActionKor.objects.get(action_name="utter_goodbye").id
        response = client.get("/rasa_kor/action/" + str(id) + "/")
        self.assertEqual(response.status_code, 200)
        response = client.put(
            "/rasa_kor/action/" + str(id) + "/",
            json.dumps({"action_name": "test_action"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)
        response = client.put(
            "/rasa_kor/action/" + str(id) + "/",
            json.dumps(
                {
                    "action_name": "test_action",
                    "action_type": "text",
                    "text_value": "test_action_hi",
                    "image_value": "",
                    "intent_list": ["greet", "goodbye"],
                }
            ),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 201)
        response = client.get("/rasa_kor/action/" + str(id) + "/")
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(
            str(response.content, encoding="utf8"),
            {
                "id": id,
                "action_name": "test_action",
                "action_type": "text",
                "text_value": "test_action_hi",
                "image_value": "",
                "intent": ["greet", "goodbye"],
            },
        )
        response = client.delete("/rasa_kor/action/" + str(id) + "/")
        self.assertEqual(response.status_code, 200)
        response = client.get("/rasa_kor/action/" + str(id) + "/")
        self.assertEqual(response.status_code, 404)

        def test_stories(self):
            client = Client()

        response = client.post(
            "/api/signin/",
            json.dumps({"username": "test1", "password": "user1234"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 204)
        response = client.get("/rasa_kor/actions/")
        self.assertEqual(response.status_code, 200)
        response = client.post(
            "/rasa_kor/stories/",
            json.dumps(
                {"story_name": "test_story", "story_path_1": [],}
            ),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)
        response = client.post(
            "/rasa_kor/stories/",
            json.dumps(
                {
                    "story_name": "test_story",
                    "story_path_1": [],
                    "story_path_2": [],
                    "story_path_3": [],
                }
            ),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 201)

    def test_story_detail(self):
        client = Client()
        response = client.post(
            "/api/signin/",
            json.dumps({"username": "test1", "password": "user1234"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 204)
        id = StoryKor.objects.get(story_name="greet path").id
        response = client.get("/rasa_kor/story/" + str(id) + "/")
        self.assertEqual(response.status_code, 200)
        response = client.put(
            "/rasa_kor/story/" + str(id) + "/",
            json.dumps({"story_name": "test_story"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)
        response = client.put(
            "/rasa_kor/story/" + str(id) + "/",
            json.dumps(
                {
                    "story_name": "test_story",
                    "story_path_1": ["greet"],
                    "story_path_2": [],
                }
            ),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 201)
        response = client.get("/rasa_kor/story/" + str(id) + "/")
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(
            str(response.content, encoding="utf8"),
            {
                "id": id,
                "story_name": "test_story",
                "story_path_1": ["greet"],
                "story_path_2": [],
            },
        )
        response = client.delete("/rasa_kor/story/" + str(id) + "/")
        self.assertEqual(response.status_code, 200)
        response = client.get("/rasa_kor/story/" + str(id) + "/")
        self.assertEqual(response.status_code, 404)

