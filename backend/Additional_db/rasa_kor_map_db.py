from rasa_kor.models import IntentKor, ActionKor, StoryKor, EntityKor, SlotKor

IntentKor(
    intent_name="request_map",
    intent_tokens=["[*] 어디야?", "[*] 어디에 있니?", "어떻게 [*]에 가니?",],
).save()
action = ActionKor(action_name="action_map", action_type="action")
action.save()
action.intent.add(IntentKor.objects.get(intent_name="request_map"))
story = StoryKor(story_name="서울대 내 위치 검색")
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
        "컴퓨터공학부",
        "공과대학 컴퓨터공학부",
        "공과대학 재료공학부",
        "경영대학",
        "컴퓨터공학부",
        "재료공학부",
        "경제학과",
        "사회과학대학 심리학과",
        "농업생명과학대학 환경재료과학",
        "본부",
        "인문대학 영문학과",
        "생활과학대학 식품영양학과",
        "공과대학 행정실",
        "미술학과 사무실",
        "경제학부 사무실",
    ],
    intent=target_intent,
).save()

SlotKor(slot_name="place").save()
