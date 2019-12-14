from rasa_eng.models import IntentEng, ActionEng, StoryEng, EntityEng, SlotEng

IntentEng(
    intent_name="request_map",
    intent_tokens=[
        "where is [*]?",
        "Tell me where is [*]",
        "I don't know where [*] is",
    ],
).save()
action = ActionEng(action_name="action_map", action_type="action")
action.save()
action.intent.add(IntentEng.objects.get(intent_name="request_map"))
story = StoryEng(story_name="search place in SNU")
story.save()
story.story_path_1.add(IntentEng.objects.get(intent_name="request_map"))
target_intent = IntentEng.objects.get(intent_name="request_map")
EntityEng(
    entity_name="place",
    entity_tokens=[
        "BBQ",
        "Department Office",
        "Convenient Store",
        "CU",
        "library",
        "information retrieval",
        "Supporting facility",
        "AED",
        "Cafe",
        "Bank",
        "ATM",
        "Hospital",
        "Post office",
        "Health",
        "Pharmacy",
        "Book Store",
        "Gift shop",
        "Stationery store",
        "Disabled person support center",
    ],
    intent=target_intent,
).save()

SlotEng(slot_name="place").save()
