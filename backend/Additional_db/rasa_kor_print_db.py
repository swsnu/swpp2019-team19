from rasa_kor.models import IntentKor, ActionKor, StoryKor, EntityKor, SlotKor

IntentKor(
    intent_name="where_to_print",
    intent_tokens=[
        "어디서 프린트 할 수 있어?",
        "어디서 인쇄할 수 있어?",
        "복사실 알려줘",
        "복사실 어디있어?",
        "인쇄할 수 있는 곳 알려줘",
    ],
).save()
action = ActionKor(
    action_name="utter_print",
    action_type="text",
    text_value="중앙도서관(62동) 4층: 9-20<br>학생회관(63동) 2층: 9-19<br>법대(15동) 1층: 9-18<br>동원관(113동) 1층: 9-18<br>사회대(16동) 2층: 9-18<br>사범대(12동) 1층: 9-18<br>농생대(200동) 1층: 9-18<br>공대신양(44-1동) 2층: 9-22",
)
action.save()
action.intent.add(IntentKor.objects.get(intent_name="where_to_print"))
story = StoryKor(story_name="ask copy store")
story.save()
story.story_path_1.add(IntentKor.objects.get(intent_name="where_to_print"))
