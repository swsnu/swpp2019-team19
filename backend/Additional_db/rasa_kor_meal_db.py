from rasa_kor.models import IntentKor, ActionKor, StoryKor, EntityKor, SlotKor

IntentKor(
    intent_name="request_menu",
    intent_tokens=["오늘 [*] 메뉴 뭐야?", "[*] 메뉴", "[*] 뭐 나오는지 알려줘",],
).save()
action = ActionKor(action_name="action_meal", action_type="action")
action.save()
action.intent.add(IntentKor.objects.get(intent_name="request_menu"))
story = StoryKor(story_name="menu")
story.save()
story.story_path_1.add(IntentKor.objects.get(intent_name="request_menu"))

target_intent = IntentKor.objects.get(intent_name="request_menu")
EntityKor(
    entity_name="meal",
    entity_tokens=[
        "학생회관",
        "전망대",
        "농대",
        "두레미담",
        "서당골",
        "사범대",
        "아름드리",
        "예술",
        "감골식당",
        "동원관",
        "자하연",
        "220동",
        "301동",
        "302동",
        "기숙사",
        "919",
        "901",
        "공깡",
    ],
    intent=target_intent,
).save()

SlotKor(slot_name="meal").save()
