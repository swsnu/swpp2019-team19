from rasa_kor.models import IntentKor, ActionKor, StoryKor, EntityKor, SlotKor

IntentKor(
    intent_name="request_map",
    intent_tokens=["[*] 어디야?", "[*] 어디에 있니?", "어떻게 [*]에 가니?",],
).save()
action = ActionKor(action_name="action_map", action_type="action")
action.save()
action.intent.add(IntentKor.objects.get(intent_name="request_map"))
story = StoryKor(story_name="map")
story.save()
story.story_path_1.add(IntentKor.objects.get(intent_name="request_map"))
target_intent = IntentKor.objects.get(intent_name="request_map")
EntityKor(
    entity_name="place",
    entity_tokens=[
        "비비큐",
        "자동심장충격기",
        "도서관",
        "정보검색실",
        "지원센터",
        "식당",
        "카페",
        "편의점",
        "CU",
        "은행",
        "ATM",
        "병원",
        "사무국",
        "약국",
        "서점",
        "기념품",
        "문구",
    ],
    intent=target_intent,
).save()

SlotKor(slot_name="place").save()
