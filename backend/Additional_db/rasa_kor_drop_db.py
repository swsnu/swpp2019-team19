from rasa_kor.models import IntentKor, ActionKor, StoryKor, EntityKor, SlotKor

IntentKor(
    intent_name="how_to_drop",
    intent_tokens=["드랍하는 방법 알려줘", "수업 드랍하고 싶어", "수강 취소하는 방법 알려줘", "수강 취소할래",],
).save()
action = ActionKor(
    action_name="utter_drop",
    action_type="text",
    text_value="mysnu 로그인<br>학사정보 클릭<br수업/성적->수업->정규학기 수강취소 클릭<br>취소 사유 입력<br>신청",
)
action.intent.add(IntentKor.objects.get(intent_name="how_to_drop"))
story = StoryKor(story_name="How to drop")
story.save()
story.story_path_1.add(IntentKor.objects.get(intent_name="how_to_drop"))

