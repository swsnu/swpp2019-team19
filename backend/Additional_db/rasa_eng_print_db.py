from rasa_eng.models import IntentEng, ActionEng, StoryEng, EntityEng, SlotEng

IntentEng(
    intent_name="where_to_print",
    intent_tokens=[
        "Where can I print?",
        "Where is copy store?",
        "Where is copy room?",
        "Tell me where i can print",
        "Tell me about the copy store",
        "Tell me about the copy room",
        "How to print in the SNU",
        "Could you tell me where is copy store?",
        "Could you tell me where is copy room?",
    ],
).save()
action = ActionEng(
    action_name="utter_print",
    action_type="text",
    text_value="Central Library(No.62) 4FL: 9-20<br>Student Union Building(No.63) 2FL: 9-19<br>College of Law(No.15) 1FL: 9-18<br>Dongwongwan(No.113) 1FL: 9-18<br>College of Social Science(No.16) 2FL: 9-18<br>College of Education(No.12) 1FL: 9-18<br>College of Agricultural and Life Science(No.200) 1FL: 9-18<br>Shinyang Hall I(No.44-1) 2FL: 9-22",
)
action.save()
action.intent.add(IntentEng.objects.get(intent_name="where_to_print"))
story = StoryEng(story_name="ask copy store")
story.save()
story.story_path_1.add(IntentEng.objects.get(intent_name="where_to_print"))
