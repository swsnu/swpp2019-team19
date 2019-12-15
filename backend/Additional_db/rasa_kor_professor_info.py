from rasa_kor.models import IntentKor, ActionKor, StoryKor, EntityKor, SlotKor

IntentKor(
    intent_name="request_professor_info", intent_tokens=["[*] 교수님", "[*] 교수님에 대해 알려줘",],
).save()
action = ActionKor(action_name="action_professor_info", action_type="action")
action.save()
action.intent.add(IntentKor.objects.get(intent_name="request_professor_info"))
story = StoryKor(story_name="교수님 정보 검색")
story.save()
story.story_path_1.add(IntentKor.objects.get(intent_name="request_professor_info"))
target_intent = IntentKor.objects.get(intent_name="request_professor_info")
EntityKor(
    entity_name="prof",
    entity_tokens=[
        "강유",
        "권태경",
        "김건희",
        "김명수",
        "김선",
        "김종권",
        "김지홍",
        "김진수",
        "김태현",
        "김형주",
        "문병로",
        "문봉기",
        "민상렬",
        "박근수",
        "사티",
        "서진욱",
        "송현오",
        "신영길",
        "엄현상",
        "에거",
        "염헌영",
        "유승주",
        "이광근",
        "이상구",
        "이영기",
        "이재욱",
        "이재진",
        "이제희",
        "이창건",
        "장병탁",
        "전병곤",
        "전화숙",
        "최양희",
        "허순회",
        "허충길",
    ],
    intent=target_intent,
).save()

SlotKor(slot_name="prof").save()
