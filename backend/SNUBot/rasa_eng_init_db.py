from rasa_eng.models import IntentEng, ActionEng, StoryEng

IntentEng.objects.all().delete()
ActionEng.objects.all().delete()
StoryEng.objects.all().delete()
IntentEng(
    intent_name="greet",
    intent_tokens=["hey", "hello", "hi", "good morning", "good evening", "hey there"],
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
IntentEng(
    intent_name="hungry",
    intent_tokens=["I'm hungry", "Arent'you hungry?", "hungry aren't you?"],
).save()
IntentEng(
    intent_name="not_hungry",
    intent_tokens=["I'm not hungry", "I'm full", "I don't think I'm hungry"],
).save()
IntentEng(
    intent_name="affirm",
    intent_tokens=[
        "yes",
        "indeed",
        "of course",
        "that sounds good",
        "correct",
        "that's great",
    ],
).save()
IntentEng(
    intent_name="deny",
    intent_tokens=[
        "no",
        "never",
        "i don't think so",
        "don't like that",
        "no way",
        "not really",
        "no thanks",
    ],
).save()
IntentEng(
    intent_name="mood_great",
    intent_tokens=[
        "perfect",
        "very good",
        "great",
        "amazing",
        "wonderful",
        "I am felling very good",
        "I am great",
        "I'm good",
    ],
).save()
IntentEng(
    intent_name="mood_unhappy",
    intent_tokens=[
        "sad",
        "very sad",
        "unhappy",
        "bad",
        "very bad",
        "awful",
        "terrible",
        "not very good",
        "extremely sad",
        "so sad",
    ],
).save()
IntentEng(
    intent_name="bot_challenge",
    intent_tokens=[
        "are you a bot?",
        "are you a human",
        "am I talking to a bot?",
        "am I talking to a human?",
    ],
).save()
action = ActionEng(
    action_name="utter_greet", action_type="text", text_value="Hey! How are you?",
)
action.save()
action.intent.add(IntentEng.objects.get(intent_name="greet"))
action = ActionEng(
    action_name="utter_cheer_up", action_type="text", text_value="Cheer up!",
)
action.save()
action.intent.add(IntentEng.objects.get(intent_name="mood_unhappy"))
action = ActionEng(
    action_name="utter_did_that_help",
    action_type="text",
    text_value="Did that help you?",
)
action.save()
action.intent.add(IntentEng.objects.get(intent_name="mood_unhappy"))
action = ActionEng(
    action_name="utter_happy", action_type="text", text_value="Great, carry on!",
)
action.save()
action.intent.add(IntentEng.objects.get(intent_name="mood_great"))
action.intent.add(IntentEng.objects.get(intent_name="affirm"))
action = ActionEng(
    action_name="utter_goodbye",
    action_type="text",
    text_value="Goodbye, have a nice day!",
)
action.save()
action.intent.add(IntentEng.objects.get(intent_name="Goodbye"))
action = ActionEng(
    action_name="utter_iamabot",
    action_type="text",
    text_value="I am a bot, powered by Rasa.",
)
action.save()
action.intent.add(IntentEng.objects.get(intent_name="bot_challenge"))
action = ActionEng(
    action_name="utter_suggest_meal",
    action_type="text",
    text_value="aren't you hungry?",
)
action.save()
action.intent.add(IntentEng.objects.get(intent_name="greet"))
action = ActionEng(
    action_name="utter_meal",
    action_type="text",
    text_value="today's dinner is as follows:\nTofu stew with roe of a pollack, 2,500won\nSteamed pork & spicy buckwheat noodle with mixed vegetables, 4,000won",
)
action.save()
action.intent.add(IntentEng.objects.get(intent_name="hungry"))
action = ActionEng(action_name="utter_ok", action_type="text", text_value="oh, I see",)
action.save()
action.intent.add(IntentEng.objects.get(intent_name="affirm"))
action.intent.add(IntentEng.objects.get(intent_name="deny"))
action.intent.add(IntentEng.objects.get(intent_name="not_hungry"))

story = StoryEng(story_name="happy path")
story.save()
story.story_path_1.add(IntentEng.objects.get(intent_name="greet"))
story.story_path_2.add(IntentEng.objects.get(intent_name="mood_great"))

story = StoryEng(story_name="sad path")
story.save()
story.story_path_1.add(IntentEng.objects.get(intent_name="greet"))
story.story_path_2.add(IntentEng.objects.get(intent_name="mood_unhappy"))
story.story_path_3.add(IntentEng.objects.get(intent_name="affirm"))
story.story_path_3.add(IntentEng.objects.get(intent_name="deny"))


story = StoryEng(story_name="say goodbye")
story.save()
story.story_path_1.add(IntentEng.objects.get(intent_name="goodbye"))


story = StoryEng(story_name="bot challenge")
story.save()
story.story_path_1.add(IntentEng.objects.get(intent_name="bot_challenge"))


story = StoryEng(story_name="greet-hungry-deny")
story.save()
story.story_path_1.add(IntentEng.objects.get(intent_name="greet"))
story.story_path_2.add(IntentEng.objects.get(intent_name="not_hungry"))
story.story_path_2.add(IntentEng.objects.get(intent_name="deny"))


story = StoryEng(story_name="happy greet-hungry-accept")
story.save()
story.story_path_1.add(IntentEng.objects.get(intent_name="greet"))
story.story_path_2.add(IntentEng.objects.get(intent_name="hungry"))
story.story_path_2.add(IntentEng.objects.get(intent_name="affirm"))
story.story_path_3.add(IntentEng.objects.get(intent_name="affirm"))
story.story_path_3.add(IntentEng.objects.get(intent_name="deny"))


story = StoryEng(story_name="hungry")
story.save()
story.story_path_1.add(IntentEng.objects.get(intent_name="hungry"))
story.story_path_2.add(IntentEng.objects.get(intent_name="affirm"))
story.story_path_2.add(IntentEng.objects.get(intent_name="deny"))

