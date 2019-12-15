from rasa_eng.models import IntentEng, ActionEng, StoryEng, EntityEng, SlotEng

IntentEng(
    intent_name="request_professor_info",
    intent_tokens=[
        "give me the link of professor [*] website",
        "give me the info of professor [*]",
    ],
).save()
action = ActionEng(action_name="action_professor_info", action_type="action")
action.save()
action.intent.add(IntentEng.objects.get(intent_name="request_professor_info"))
story = StoryEng(story_name="get professor info")
story.save()
story.story_path_1.add(IntentEng.objects.get(intent_name="request_professor_info"))
target_intent = IntentEng.objects.get(intent_name="request_professor_info")
EntityEng(
    entity_name="prof",
    entity_tokens=[
        "U Kang",
        "Yanghee Choi",
        "Byung-Gon Chun",
        "Bernhard Egger",
        "Hyeonsang Eom",
        "Soonhoi Ha",
        "Chung-Kil Hur",
        "Wha Sook Jeon",
        "Chong-kwon Kim",
        "Gunhee Kim",
        "Hyoung-Joo Kim",
        "Jihong Kim",
        "Jin-Soo Kim",
        "Myung-Soo Kim",
        "Sun Kim",
        "Taehyun Kim",
        "Taekyoung Kwon",
        "Chang-Gun Lee",
        "Jae Wook Lee",
        "Jaejin Lee",
        "Jehee Lee",
        "Sang-goo Lee",
        "Youngki Lee",
        "Sang Lyul Min",
        "Bongki Moon",
        "Byung-Ro Moon",
        "Kunsoo Park",
        "Srinivasa Rao Satti",
        "Jinwook Seo",
        "Yeong Gil Shin",
        "Hyun Oh Song",
        "Heon Young Yeom",
        "Kwangkeun Yi",
        "Sungjoo Yoo",
        "Byoung-Tak Zhang",
    ],
    intent=target_intent,
).save()

SlotEng(slot_name="prof").save()
