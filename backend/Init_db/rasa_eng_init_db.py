from rasa_eng.models import IntentEng, ActionEng, StoryEng, EntityEng, SlotEng

IntentEng.objects.all().delete()
ActionEng.objects.all().delete()
StoryEng.objects.all().delete()
EntityEng.objects.all().delete()
SlotEng.objects.all().delete()
IntentEng(
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
IntentEng(
    intent_name="goodbye",
    intent_tokens=[
        "bye",
        "goodbye",
        "see you around",
        "see you later",
        "catch you later",
    ],
).save()

IntentEng(
    intent_name="request_menu",
    intent_tokens=[
        "Today's menu at [*]",
        "Tell me the menu at [*]",
        "[*] menu",
    ],
).save()


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
    action_name="utter_fallback",
    action_type="text",
    text_value="I can't understand!",
)
action.save()

action = ActionEng(action_name="action_meal", action_type="action")
action.save()
action.intent.add(IntentEng.objects.get(intent_name="request_menu"))

story = StoryEng(story_name="greet")
story.save()
story.story_path_1.add(IntentEng.objects.get(intent_name="greet"))

story = StoryEng(story_name="sad goodbye")
story.save()
story.story_path_1.add(IntentEng.objects.get(intent_name="goodbye"))


story = StoryEng(story_name="menu 1")
story.save()
story.story_path_1.add(IntentEng.objects.get(intent_name="request_menu"))


target_intent = IntentEng.objects.get(intent_name="request_menu")
EntityEng(
    entity_name="meal",
    entity_tokens=[
        "Student Center",
        "No.3",
        "D75-1",
        "두레미담",
        "서당골",
        "사범대",
        "아름드리",
        "예술",
        "감골식당",
        "Dongwon",
        "Jahayeon",
        "220",
        "301",
        "302",
        "Dormitory",
        "기숙사",
        "901",
        "공깡",
    ],
    intent=target_intent,
).save()

SlotEng(slot_name="meal").save()
