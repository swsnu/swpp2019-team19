from rasa_eng.models import IntentEng, ActionEng, StoryEng, EntityEng, SlotEng

IntentEng(
    intent_name="how_to_drop",
    intent_tokens=[
        "How to drop course?",
        "How to cancel course?",
        "How to course cancellations?",
        "Could you tell me how to drop course?",
        "Could you tell me how to cancel course?",
        "Could you tell me how to course cancellation?",
        "Tell me the procedure to drop course",
        "Tell me the procedure to cancel course",
        "Tell me the procedure to course cancellation",
    ],
)
action = ActionEng(
    action_name="utter_drop",
    action_type="text",
    text_value="First, login mysnu<br>Then, Click Academic Affairs in the top menu<br>Click Class/Grade->Class->Course Drop<br>Fill the Form<br>Apply",
)
action.save()
action.intent.add(IntentEng.objects.get(intent_name="how_to_drop"))
story = StoryEng(story_name="How to drop")
story.save()
story.story_path_1.add(IntentEng.objects.get(intent_name="how_to_drop"))
