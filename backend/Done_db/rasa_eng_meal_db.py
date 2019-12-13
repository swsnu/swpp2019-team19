from rasa_eng.models import IntentEng, ActionEng, StoryEng, EntityEng, SlotEng

IntentEng(
    intent_name="request_menu",
    intent_tokens=[
        "Today's menu at [*]",
        "Tell me the menu at [*]",
        "[*] menu",
    ],
).save()
action = ActionEng(action_name="action_meal", action_type="action")
action.save()
action.intent.add(IntentEng.objects.get(intent_name="request_menu"))
story = StoryEng(story_name="menu")
story.save()
story.story_path_1.add(IntentEng.objects.get(intent_name="request_menu"))
target_intent = IntentEng.objects.get(intent_name="request_menu")
EntityEng(
    entity_name="meal",
    entity_tokens=[
        "Student Center",
        "No.3",
        "D75-1",
        "두레미담",
        "서당골",
        "사범대",
        "아름드리",
        "예술",
        "감골식당",
        "Dongwon",
        "Jahayeon",
        "220",
        "301",
        "302",
        "Dormitory",
        "기숙사",
        "901",
        "공깡",
    ],
    intent=target_intent,
).save()

SlotEng(slot_name="meal").save()
