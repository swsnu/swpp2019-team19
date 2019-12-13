from rasa_kor.models import IntentKor, ActionKor, StoryKor

IntentKor(
  intent_name="request_override_file",
  intent_tokens=[
    "초안지 보내줘",
    "초안지 찾아줘",
    "초안지 링크 보내줘",
    "초안지",
    "초안지 파일 보내줘",
  ]
).save()
action = ActionKor(
  action_name="utter_give_override_file",
  action_type="text",
  text_value="Click <a href='https://cse.snu.ac.kr/sites/default/files/node--notice/Over-ride%20Form_4.hwp'>here</a> to open the override form",
)
action.save()
action.intent.add(IntentKor.objects.get(intent_name="request_override_file"))

story = StoryKor(story_name="request_override_file")
story.save()
story.story_path_1.acc(IntentKor.objects.get(intent_name="request_override_file"))