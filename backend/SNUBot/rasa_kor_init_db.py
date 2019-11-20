from rasa_kor.models import IntentKor, ActionKor, StoryKor

IntentKor.objects.all().delete()
ActionKor.objects.all().delete()
StoryKor.objects.all().delete()
IntentKor(intent_name="greet", intent_tokens=["어이", "안녕", "반가워", "안녕하세요"],).save()
IntentKor(intent_name="goodbye", intent_tokens=["잘가", "나중에 봐", "빠이", "바이",],).save()
IntentKor(intent_name="affirm", intent_tokens=["응", "그래", "물론이지", "맞아",],).save()
IntentKor(
    intent_name="deny", intent_tokens=["아니", "그렇지 않아", "그렇게 생각하지 않아", "틀렸어",]
).save()
IntentKor(
    intent_name="mood_great", intent_tokens=["완벽해", "놀라워", "매우 좋아", "환상적이야", "좋아",]
).save()
IntentKor(
    intent_name="mood_unhappy",
    intent_tokens=["슬퍼", "매우 슬퍼", "행복하지 않아", "불행해", "나빠", "매우 나빠", "끔찍해",],
).save()
IntentKor(
    intent_name="bot_challenge", intent_tokens=["너 누구니?", "정체가 뭐야?", "누구야?",]
).save()

action = ActionKor(action_name="utter_greet", action_type="text", text_value="안녕! 잘지내?")
action.save()
action.intent.add(IntentKor.objects.get(intent_name="greet"))

action = ActionKor(action_name="utter_cheer_up", action_type="text", text_value="힘 내!")
action.save()
action.intent.add(IntentKor.objects.get(intent_name="mood_unhappy"))

action = ActionKor(
    action_name="utter_did_that_help", action_type="text", text_value="도움이 됐니?"
)
action.save()
action.intent.add(IntentKor.objects.get(intent_name="mood_unhappy"))

action = ActionKor(action_name="utter_happy", action_type="text", text_value="좋아 계속해봐!")
action.save()
action.intent.add(IntentKor.objects.get(intent_name="mood_great"))
action.intent.add(IntentKor.objects.get(intent_name="affirm"))

action = ActionKor(action_name="utter_goodbye", action_type="text", text_value="다음에 봐!")
action.save()
action.intent.add(IntentKor.objects.get(intent_name="goodbye"))

action = ActionKor(
    action_name="utter_iamabot", action_type="text", text_value="나는 스누봇이야"
)
action.save()
action.intent.add(IntentKor.objects.get(intent_name="bot_challenge"))

action = ActionKor(
    action_name="utter_fallback", action_type="text", text_value="무슨 뜻인지 모르겠어요...ㅠㅠ"
)
action.save()


story = StoryKor(story_name="happy path")
story.save()
story.story_path_1.add(IntentKor.objects.get(intent_name="greet"))
story.story_path_2.add(IntentKor.objects.get(intent_name="mood_great"))

story = StoryKor(story_name="sad path")
story.save()
story.story_path_1.add(IntentKor.objects.get(intent_name="greet"))
story.story_path_2.add(IntentKor.objects.get(intent_name="mood_unhappy"))
story.story_path_3.add(IntentKor.objects.get(intent_name="affirm"))
story.story_path_3.add(IntentKor.objects.get(intent_name="deny"))


story = StoryKor(story_name="say goodbye")
story.save()
story.story_path_1.add(IntentKor.objects.get(intent_name="goodbye"))


story = StoryKor(story_name="bot challenge")
story.save()
story.story_path_1.add(IntentKor.objects.get(intent_name="bot_challenge"))
