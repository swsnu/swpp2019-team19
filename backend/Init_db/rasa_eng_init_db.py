from rasa_eng.models import IntentEng, ActionEng, StoryEng, EntityEng, SlotEng

IntentEng.objects.all().delete()
ActionEng.objects.all().delete()
StoryEng.objects.all().delete()
EntityEng.objects.all().delete()
SlotEng.objects.all().delete()
IntentEng(
    intent_name="greet",
    intent_tokens=[
        "hey",
        "hello",
        "hi",
        "good morning",
        "good evening",
        "hey there",
    ],
).save()
IntentEng(
    intent_name="goodbye",
    intent_tokens=[
        "bye",
        "goodbye",
        "see you around",
        "see you later",
        "catch you later",
    ],
).save()

action = ActionEng(
    action_name="utter_greet",
    action_type="text",
    text_value="Hey! How are you?",
)
action.save()
action.intent.add(IntentEng.objects.get(intent_name="greet"))

action = ActionEng(
    action_name="utter_goodbye",
    action_type="text",
    text_value="Goodbye, have a nice day!",
)
action.save()
action.intent.add(IntentEng.objects.get(intent_name="goodbye"))
action = ActionEng(
    action_name="utter_fallback",
    action_type="text",
    text_value="I can't understand!<br>Please <a href='https://www.snubot.me/boards'>help us improve</a> our chatbot",
)
action.save()


story = StoryEng(story_name="greet")
story.save()
story.story_path_1.add(IntentEng.objects.get(intent_name="greet"))

story = StoryEng(story_name="goodbye")
story.save()
story.story_path_1.add(IntentEng.objects.get(intent_name="goodbye"))

