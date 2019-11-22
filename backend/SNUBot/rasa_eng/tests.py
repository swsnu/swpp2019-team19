from django.test import TestCase, Client
from .models import IntentEng, ActionEng, StoryEng
from account.models import User
import json


class RasaEngTestCase(TestCase):
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
        IntentEng.objects.create(
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
        IntentEng.objects.create(
            intent_name="goodbye",
            intent_tokens=[
                "bye",
                "goodbye",
                "see you around",
                "see you later",
                "catch you later",
            ],
        )
        IntentEng.objects.create(
            intent_name="bot_challenge",
            intent_tokens=[
                "are you a bot?",
                "are you a human",
                "am I talking to a bot?",
                "am I talking to a human?",
            ],
        )
        action = ActionEng(
            action_name="utter_greet",
            action_type="text",
            text_value="Hey! How are you?",
        )
        action.save()
        action.intent.add(IntentEng.objects.get(intent_name="greet"))
        action = ActionEng(
            action_name="utter_goodbye",
            action_type="text",
            text_value="Goodbye, have a nice day!",
        )
        action.save()
        action.intent.add(IntentEng.objects.get(intent_name="goodbye"))
        action = ActionEng(
            action_name="utter_iamabot",
            action_type="text",
            text_value="I am a bot, powered by Rasa.",
        )
        action.save()
        action.intent.add(IntentEng.objects.get(intent_name="bot_challenge"))
        story = StoryEng(story_name="greet path")
        story.save()
        story.story_path_1.add(IntentEng.objects.get(intent_name="greet"))
        story.story_path_2.add(IntentEng.objects.get(intent_name="goodbye"))
        story = StoryEng(story_name="bot path")
        story.save()
        story.story_path_1.add(IntentEng.objects.get(intent_name="bot_challenge"))

    def test_intents(self):
        client = Client()
        response = client.post(
            "/api/signin/",
            json.dumps({"username": "test1", "password": "user1234"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 204)
        response = client.get("/rasa_eng/intents/")
        self.assertEqual(response.status_code, 200)
        response = client.post(
            "/rasa_eng/intents/",
            json.dumps({"intent_name": "test_intent"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)
        response = client.post(
            "/rasa_eng/intents/",
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
        id = IntentEng.objects.get(intent_name="greet").id
        response = client.get("/rasa_eng/intent/" + str(id) + "/")
        self.assertEqual(response.status_code, 200)
        response = client.put(
            "/rasa_eng/intent/" + str(id) + "/",
            json.dumps({"intent_name": "test_intent"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)
        response = client.put(
            "/rasa_eng/intent/" + str(id) + "/",
            json.dumps(
                {"intent_name": "test_intent", "intent_tokens": ["hello", "bye"]}
            ),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 201)
        response = client.get("/rasa_eng/intent/" + str(id) + "/")
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(
            str(response.content, encoding="utf8"),
            {"id": id, "intent_name": "test_intent", "intent_tokens": ["hello", "bye"]},
        )
        response = client.delete("/rasa_eng/intent/" + str(id) + "/")
        self.assertEqual(response.status_code, 200)
        response = client.get("/rasa_eng/intent/" + str(id) + "/")
        self.assertEqual(response.status_code, 404)

    def test_actions(self):
        client = Client()
        response = client.post(
            "/api/signin/",
            json.dumps({"username": "test1", "password": "user1234"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 204)
        response = client.get("/rasa_eng/actions/")
        self.assertEqual(response.status_code, 200)
        response = client.post(
            "/rasa_eng/actions/",
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
            "/rasa_eng/actions/",
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
        id = ActionEng.objects.get(action_name="utter_goodbye").id
        response = client.get("/rasa_eng/action/" + str(id) + "/")
        self.assertEqual(response.status_code, 200)
        response = client.put(
            "/rasa_eng/action/" + str(id) + "/",
            json.dumps({"action_name": "test_action"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)
        response = client.put(
            "/rasa_eng/action/" + str(id) + "/",
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
        response = client.get("/rasa_eng/action/" + str(id) + "/")
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
        response = client.delete("/rasa_eng/action/" + str(id) + "/")
        self.assertEqual(response.status_code, 200)
        response = client.get("/rasa_eng/action/" + str(id) + "/")
        self.assertEqual(response.status_code, 404)

        def test_stories(self):
            client = Client()

        response = client.post(
            "/api/signin/",
            json.dumps({"username": "test1", "password": "user1234"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 204)
        response = client.get("/rasa_eng/actions/")
        self.assertEqual(response.status_code, 200)
        response = client.post(
            "/rasa_eng/stories/",
            json.dumps(
                {"story_name": "test_story", "story_path_1": [], "story_path_2": [],}
            ),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)
        response = client.post(
            "/rasa_eng/stories/",
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
        id = StoryEng.objects.get(story_name="greet path").id
        response = client.get("/rasa_eng/story/" + str(id) + "/")
        self.assertEqual(response.status_code, 200)
        response = client.put(
            "/rasa_eng/story/" + str(id) + "/",
            json.dumps({"story_name": "test_story"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)
        response = client.put(
            "/rasa_eng/story/" + str(id) + "/",
            json.dumps(
                {
                    "story_name": "test_story",
                    "story_path_1": ["greet"],
                    "story_path_2": [],
                    "story_path_3": [],
                }
            ),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 201)
        response = client.get("/rasa_eng/story/" + str(id) + "/")
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(
            str(response.content, encoding="utf8"),
            {
                "id": id,
                "story_name": "test_story",
                "story_path_1": ["greet"],
                "story_path_2": [],
                "story_path_3": [],
            },
        )
        response = client.delete("/rasa_eng/story/" + str(id) + "/")
        self.assertEqual(response.status_code, 200)
        response = client.get("/rasa_eng/story/" + str(id) + "/")
        self.assertEqual(response.status_code, 404)

