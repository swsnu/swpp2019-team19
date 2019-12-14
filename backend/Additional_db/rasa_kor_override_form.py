from rasa_kor.models import IntentKor, ActionKor, StoryKor

IntentKor(
    intent_name="request_override_file",
    intent_tokens=["초안지 보내줘", "초안지 찾아줘", "초안지 링크 보내줘", "초안지", "초안지 파일 보내줘",],
).save()
action = ActionKor(
    action_name="utter_give_override_file",
    action_type="text",
    text_value="<a href='https://cse.snu.ac.kr/sites/default/files/node--notice/2018%EB%85%84%201%ED%95%99%EA%B8%B0%20%EC%88%98%EA%B0%95%EC%8B%A0%EC%B2%AD%20%EC%A0%95%EC%A0%95%20%EC%9A%94%EC%B2%AD%EC%84%9C%28%EC%B4%88%EC%95%88%EC%A7%80%29.hwp'>여기</a> 누르면 다운로드 되요",
)
action.save()
action.intent.add(IntentKor.objects.get(intent_name="request_override_file"))

story = StoryKor(story_name="request_override_file")
story.save()
story.story_path_1.acc(IntentKor.objects.get(intent_name="request_override_file"))
