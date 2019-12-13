from rasa_kor.models import IntentKor, ActionKor, StoryKor, EntityKor, SlotKor

IntentKor.objects.all().delete()
ActionKor.objects.all().delete()
StoryKor.objects.all().delete()
IntentKor(
    intent_name="greet", intent_tokens=["어이", "안녕", "반가워", "안녕하세요"],
).save()
IntentKor(
    intent_name="goodbye", intent_tokens=["잘가", "나중에 봐", "빠이", "바이",],
).save()


action = ActionKor(
    action_name="utter_greet", action_type="text", text_value="안녕! 잘지내?"
)
action.save()
action.intent.add(IntentKor.objects.get(intent_name="greet"))

action = ActionKor(
    action_name="utter_goodbye", action_type="text", text_value="다음에 봐!"
)
action.save()
action.intent.add(IntentKor.objects.get(intent_name="goodbye"))

action = ActionKor(
    action_name="utter_fallback",
    action_type="text",
    text_value="무슨 뜻인지 모르겠어요.",
)
action.save()


story = StoryKor(story_name="greet")
story.save()
story.story_path_1.add(IntentKor.objects.get(intent_name="greet"))

story = StoryKor(story_name="say goodbye")
story.save()
story.story_path_1.add(IntentKor.objects.get(intent_name="goodbye"))

