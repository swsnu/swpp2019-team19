from django.test import TestCase, Client
from .models import IntentKor, ActionKor, StoryKor, EntityKor, SlotKor
from account.models import User
import json


signin_api = "/api/signin/"
intents_api = "/rasa_kor/intents/"
intent_api = "/rasa_kor/intent/"
actions_api = "/rasa_kor/actions/"
action_api = "/rasa_kor/action/"
stories_api = "/rasa_kor/stories/"
story_api = "/rasa_kor/story/"
entities_api = "/rasa_kor/entities/"
entity_api = "/rasa_kor/entity/"
slots_api = "/rasa_kor/slots/"
slot_api = "/rasa_kor/slot/"

content_type = "application/json"


class RasaKorTestCase(TestCase):
    def setUp(self):
        User.objects.create_superuser(
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
        IntentKor(
            intent_name="greet",
            intent_tokens=[
                "hey",
                "hello",
                "hi",
                "good morning",
                "good evening",
                "hey there",
            ],
        ).save()
        IntentKor(
            intent_name="goodbye",
            intent_tokens=[
                "bye",
                "goodbye",
                "see you around",
                "see you later",
                "catch you later",
            ],
        ).save()

        IntentKor(
            intent_name="request_menu",
            intent_tokens=[
                "Today's menu at [*]",
                "Tell me the menu at [*]",
                "[*] menu",
            ],
        ).save()

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
            action_name="utter_fallback",
            action_type="text",
            text_value="I can't understand!",
        )
        action.save()

        action = ActionKor(action_name="action_meal", action_type="action")
        action.save()
        action.intent.add(IntentKor.objects.get(intent_name="request_menu"))

        story = StoryKor(story_name="greet")
        story.save()
        story.story_path_1.add(IntentKor.objects.get(intent_name="greet"))

        story = StoryKor(story_name="sad goodbye")
        story.save()
        story.story_path_1.add(IntentKor.objects.get(intent_name="goodbye"))

        story = StoryKor(story_name="menu 1")
        story.save()
        story.story_path_1.add(
            IntentKor.objects.get(intent_name="request_menu")
        )

        target_intent = IntentKor.objects.get(intent_name="request_menu")
        EntityKor(
            entity_name="meal",
            entity_tokens=[
                "Student Center",
                "No.3",
                "D75-1",
                "Dongwon",
                "Jahayeon",
                "220",
                "301",
                "302",
                "Dormitory",
                "901",
            ],
            intent=target_intent,
        ).save()

        SlotKor(slot_name="meal").save()

    def test_not_superuser(self):
        client = Client()
        response = client.post(
            signin_api,
            json.dumps({"username": "test2", "password": "user1234"}),
            content_type=content_type,
        )
        self.assertEqual(response.status_code, 204)
        response = client.get(intents_api)
        self.assertEqual(response.status_code, 401)

    def test_intents(self):
        client = Client()
        response = client.post(
            signin_api,
            json.dumps({"username": "test1", "password": "user1234"}),
            content_type=content_type,
        )
        self.assertEqual(response.status_code, 204)
        response = client.get(intents_api)
        self.assertEqual(response.status_code, 200)
        response = client.post(
            intents_api,
            json.dumps({"intent_name": "test_intent"}),
            content_type=content_type,
        )
        self.assertEqual(response.status_code, 400)
        response = client.post(
            intents_api,
            json.dumps(
                {"intent_name": "test_intent", "intent_tokens": ["hi", "bye"]}
            ),
            content_type=content_type,
        )
        self.assertEqual(response.status_code, 201)

    def test_intent_detail(self):
        client = Client()
        response = client.post(
            signin_api,
            json.dumps({"username": "test1", "password": "user1234"}),
            content_type=content_type,
        )
        self.assertEqual(response.status_code, 204)
        id = IntentKor.objects.get(intent_name="greet").id
        response = client.get(intent_api + "1111/")
        self.assertEqual(response.status_code, 404)
        response = client.get(intent_api + str(id) + "/")
        self.assertEqual(response.status_code, 200)
        response = client.put(
            intent_api + str(id) + "/",
            json.dumps({"intent_name": "test_intent"}),
            content_type=content_type,
        )
        self.assertEqual(response.status_code, 400)
        response = client.put(
            intent_api + "111111/",
            json.dumps(
                {
                    "intent_name": "test_intent",
                    "intent_tokens": ["hello", "bye"],
                }
            ),
            content_type=content_type,
        )
        self.assertEqual(response.status_code, 404)
        response = client.put(
            intent_api + str(id) + "/",
            json.dumps(
                {
                    "intent_name": "test_intent",
                    "intent_tokens": ["hello", "bye"],
                }
            ),
            content_type=content_type,
        )

        self.assertEqual(response.status_code, 201)
        response = client.get(intent_api + str(id) + "/")
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(
            str(response.content, encoding="utf8"),
            {
                "id": id,
                "intent_name": "test_intent",
                "intent_tokens": ["hello", "bye"],
            },
        )
        response = client.delete(intent_api + str(id) + "/")
        self.assertEqual(response.status_code, 200)
        response = client.get(intent_api + str(id) + "/")
        self.assertEqual(response.status_code, 404)
        response = client.delete(intent_api + "11111/")
        self.assertEqual(response.status_code, 404)

    def test_actions(self):
        client = Client()
        response = client.post(
            signin_api,
            json.dumps({"username": "test1", "password": "user1234"}),
            content_type=content_type,
        )
        self.assertEqual(response.status_code, 204)
        response = client.get(actions_api)
        self.assertEqual(response.status_code, 200)
        response = client.post(
            actions_api,
            json.dumps(
                {
                    "action_name": "test_action",
                    "action_type": "text",
                    "text_value": "test_action_hi",
                    "intent_list": ["intent_1", "intent_2"],
                }
            ),
            content_type=content_type,
        )
        self.assertEqual(response.status_code, 400)
        response = client.post(
            actions_api,
            json.dumps(
                {
                    "action_name": "test_action",
                    "action_type": "text",
                    "text_value": "test_action_hi",
                    "image_value": "",
                    "intent_list": ["non_exist"],
                }
            ),
            content_type=content_type,
        )
        self.assertEqual(response.status_code, 404)
        response = client.post(
            actions_api,
            json.dumps(
                {
                    "action_name": "test_action",
                    "action_type": "text",
                    "text_value": "test_action_hi",
                    "image_value": "",
                    "intent_list": ["greet"],
                }
            ),
            content_type=content_type,
        )
        self.assertEqual(response.status_code, 201)

    def test_action_detail(self):
        client = Client()
        response = client.post(
            signin_api,
            json.dumps({"username": "test1", "password": "user1234"}),
            content_type=content_type,
        )
        self.assertEqual(response.status_code, 204)
        id = ActionKor.objects.get(action_name="utter_goodbye").id
        response = client.get(action_api + str(id) + "/")
        self.assertEqual(response.status_code, 200)
        response = client.get(action_api + "11111/")
        self.assertEqual(response.status_code, 404)
        response = client.put(
            action_api + str(id) + "/",
            json.dumps({"action_name": "test_action"}),
            content_type=content_type,
        )
        self.assertEqual(response.status_code, 400)
        response = client.put(
            action_api + str(id) + "/",
            json.dumps(
                {
                    "action_name": "test_action",
                    "action_type": "text",
                    "text_value": "test_action_hi",
                    "image_value": "",
                    "intent_list": ["not_exist_intent"],
                }
            ),
            content_type=content_type,
        )
        self.assertEqual(response.status_code, 404)
        response = client.put(
            action_api + str(id) + "/",
            json.dumps(
                {
                    "action_name": "test_action",
                    "action_type": "text",
                    "text_value": "test_action_hi",
                    "image_value": "",
                    "intent_list": ["greet", "goodbye"],
                }
            ),
            content_type=content_type,
        )
        self.assertEqual(response.status_code, 201)

        response = client.put(
            action_api + "11111/",
            json.dumps(
                {
                    "action_name": "test_action",
                    "action_type": "text",
                    "text_value": "test_action_hi",
                    "image_value": "",
                    "intent_list": ["greet", "goodbye"],
                }
            ),
            content_type=content_type,
        )
        self.assertEqual(response.status_code, 404)
        response = client.get(action_api + str(id) + "/")
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
        response = client.delete(action_api + str(id) + "/")
        self.assertEqual(response.status_code, 200)
        response = client.get(action_api + str(id) + "/")
        self.assertEqual(response.status_code, 404)
        response = client.delete(action_api + "11111/")
        self.assertEqual(response.status_code, 404)

    def test_stories(self):
        client = Client()
        response = client.post(
            signin_api,
            json.dumps({"username": "test1", "password": "user1234"}),
            content_type=content_type,
        )
        self.assertEqual(response.status_code, 204)
        response = client.get(stories_api)
        self.assertEqual(response.status_code, 200)
        response = client.post(
            stories_api,
            json.dumps({"story_name": "test_story", "story_path_1": []}),
            content_type=content_type,
        )
        self.assertEqual(response.status_code, 400)
        response = client.post(
            stories_api,
            json.dumps(
                {
                    "story_name": "test_story",
                    "story_path_1": ["non_exist"],
                    "story_path_2": ["greet"],
                }
            ),
            content_type=content_type,
        )
        self.assertEqual(response.status_code, 404)
        response = client.post(
            stories_api,
            json.dumps(
                {
                    "story_name": "test_story",
                    "story_path_1": ["goodbye"],
                    "story_path_2": ["non_eixst"],
                }
            ),
            content_type=content_type,
        )
        self.assertEqual(response.status_code, 404)
        response = client.post(
            stories_api,
            json.dumps(
                {
                    "story_name": "test_story",
                    "story_path_1": ["goodbye"],
                    "story_path_2": ["greet"],
                }
            ),
            content_type=content_type,
        )
        self.assertEqual(response.status_code, 201)

    def test_story_detail(self):
        client = Client()
        response = client.post(
            signin_api,
            json.dumps({"username": "test1", "password": "user1234"}),
            content_type=content_type,
        )
        self.assertEqual(response.status_code, 204)
        id = StoryKor.objects.get(story_name="greet").id
        response = client.get(story_api + str(id) + "/")
        self.assertEqual(response.status_code, 200)
        response = client.get(story_api + "11111/")
        self.assertEqual(response.status_code, 404)
        response = client.put(
            story_api + str(id) + "/",
            json.dumps({"story_name": "test_story"}),
            content_type=content_type,
        )
        self.assertEqual(response.status_code, 400)
        response = client.put(
            story_api + str(id) + "/",
            json.dumps(
                {
                    "story_name": "test_story",
                    "story_path_1": ["non_exist"],
                    "story_path_2": ["goodbye"],
                }
            ),
            content_type=content_type,
        )
        self.assertEqual(response.status_code, 404)
        response = client.put(
            story_api + str(id) + "/",
            json.dumps(
                {
                    "story_name": "test_story",
                    "story_path_1": ["greet"],
                    "story_path_2": ["non_exist"],
                }
            ),
            content_type=content_type,
        )
        self.assertEqual(response.status_code, 404)
        response = client.put(
            story_api + str(id) + "/",
            json.dumps(
                {
                    "story_name": "test_story",
                    "story_path_1": ["greet"],
                    "story_path_2": ["goodbye"],
                }
            ),
            content_type=content_type,
        )
        self.assertEqual(response.status_code, 201)
        response = client.put(
            story_api + "11111/",
            json.dumps(
                {
                    "story_name": "test_story",
                    "story_path_1": ["greet"],
                    "story_path_2": ["goodbye"],
                }
            ),
            content_type=content_type,
        )
        self.assertEqual(response.status_code, 404)
        response = client.get(story_api + str(id) + "/")
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(
            str(response.content, encoding="utf8"),
            {
                "id": id,
                "story_name": "test_story",
                "story_path_1": ["greet"],
                "story_path_2": ["goodbye"],
            },
        )
        response = client.delete(story_api + str(id) + "/")
        self.assertEqual(response.status_code, 200)
        response = client.get(story_api + str(id) + "/")
        self.assertEqual(response.status_code, 404)
        response = client.delete(story_api + "11111/")
        self.assertEqual(response.status_code, 404)

    def test_entities(self):
        client = Client()
        response = client.post(
            signin_api,
            json.dumps({"username": "test1", "password": "user1234"}),
            content_type=content_type,
        )
        self.assertEqual(response.status_code, 204)
        response = client.get(entities_api)
        self.assertEqual(response.status_code, 200)
        response = client.post(
            entities_api,
            json.dumps(
                {
                    "entity_name": "test_entity",
                    "entity_tokens": ["cafe1", "cafe2"],
                }
            ),
            content_type=content_type,
        )
        self.assertEqual(response.status_code, 400)
        response = client.post(
            entities_api,
            json.dumps(
                {
                    "entity_name": "test_entity",
                    "entity_tokens": ["cafe1", "cafe2"],
                    "intent": "non_exist",
                }
            ),
            content_type=content_type,
        )
        self.assertEqual(response.status_code, 404)
        response = client.post(
            entities_api,
            json.dumps(
                {
                    "entity_name": "test_entity",
                    "entity_tokens": ["cafe1", "cafe2"],
                    "intent": "greet",
                }
            ),
            content_type=content_type,
        )
        self.assertEqual(response.status_code, 201)

    def test_entity_detail(self):
        client = Client()
        response = client.post(
            signin_api,
            json.dumps({"username": "test1", "password": "user1234"}),
            content_type=content_type,
        )
        self.assertEqual(response.status_code, 204)
        id = EntityKor.objects.get(entity_name="meal").id
        response = client.get(entity_api + str(id) + "/")
        self.assertEqual(response.status_code, 200)
        response = client.get(entity_api + "11111/")
        self.assertEqual(response.status_code, 404)
        response = client.put(
            entity_api + str(id) + "/",
            json.dumps({"entity_name": "test_entity"}),
            content_type=content_type,
        )
        self.assertEqual(response.status_code, 400)
        response = client.put(
            entity_api + str(id) + "/",
            json.dumps(
                {
                    "entity_name": "test_entity",
                    "entity_tokens": ["cafe1", "cafe2", "cafe3"],
                    "intent": "non_exist",
                }
            ),
            content_type=content_type,
        )
        self.assertEqual(response.status_code, 404)
        response = client.put(
            entity_api + str(id) + "/",
            json.dumps(
                {
                    "entity_name": "test_entity",
                    "entity_tokens": ["cafe1", "cafe2", "cafe3"],
                    "intent": "greet",
                }
            ),
            content_type=content_type,
        )
        self.assertEqual(response.status_code, 201)
        response = client.put(
            entity_api + "11111/",
            json.dumps(
                {
                    "entity_name": "test_entity",
                    "entity_tokens": ["cafe1", "cafe2", "cafe3"],
                    "intent": "greet",
                }
            ),
            content_type=content_type,
        )
        self.assertEqual(response.status_code, 404)
        response = client.get(entity_api + str(id) + "/")
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(
            str(response.content, encoding="utf8"),
            {
                "entity_name": "test_entity",
                "entity_tokens": ["cafe1", "cafe2", "cafe3"],
                "intent": "greet",
            },
        )
        response = client.delete(entity_api + str(id) + "/")
        self.assertEqual(response.status_code, 200)
        response = client.get(entity_api + str(id) + "/")
        self.assertEqual(response.status_code, 404)
        response = client.delete(entity_api + "11111/")
        self.assertEqual(response.status_code, 404)

    def test_slots(self):
        client = Client()
        response = client.post(
            signin_api,
            json.dumps({"username": "test1", "password": "user1234"}),
            content_type=content_type,
        )
        self.assertEqual(response.status_code, 204)
        response = client.get(slots_api)
        self.assertEqual(response.status_code, 200)
        response = client.post(
            slots_api,
            json.dumps({"slot_name": "test_slot",}),
            content_type=content_type,
        )
        self.assertEqual(response.status_code, 400)
        response = client.post(
            slots_api,
            json.dumps({"slot_name": "test_slot", "slot_type": "text",}),
            content_type=content_type,
        )
        self.assertEqual(response.status_code, 201)

    def test_slot_detail(self):
        client = Client()
        response = client.post(
            signin_api,
            json.dumps({"username": "test1", "password": "user1234"}),
            content_type=content_type,
        )
        self.assertEqual(response.status_code, 204)
        id = SlotKor.objects.get(slot_name="meal").id
        response = client.get(slot_api + str(id) + "/")
        self.assertEqual(response.status_code, 200)
        response = client.get(slot_api + "11111/")
        self.assertEqual(response.status_code, 404)
        response = client.put(
            slot_api + str(id) + "/",
            json.dumps({"slot_name": "test_slot"}),
            content_type=content_type,
        )
        self.assertEqual(response.status_code, 400)
        response = client.put(
            slot_api + str(id) + "/",
            json.dumps({"slot_name": "test_slot", "slot_type": "text",}),
            content_type=content_type,
        )
        self.assertEqual(response.status_code, 201)
        response = client.put(
            slot_api + "11111/",
            json.dumps({"slot_name": "test_slot", "slot_type": "text",}),
            content_type=content_type,
        )
        self.assertEqual(response.status_code, 404)
        response = client.get(slot_api + str(id) + "/")
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(
            str(response.content, encoding="utf8"),
            {"id": id, "slot_name": "test_slot", "slot_type": "text",},
        )
        response = client.delete(slot_api + str(id) + "/")
        self.assertEqual(response.status_code, 200)
        response = client.get(slot_api + str(id) + "/")
        self.assertEqual(response.status_code, 404)
        response = client.delete(slot_api + "11111/")
        self.assertEqual(response.status_code, 404)

    def test_makefile(self):
        client = Client()
        response = client.post(
            signin_api,
            json.dumps({"username": "test1", "password": "user1234"}),
            content_type=content_type,
        )
        self.assertEqual(response.status_code, 204)
        response = client.get("/rasa_kor/makefile/")
        self.assertEqual(response.status_code, 200)

