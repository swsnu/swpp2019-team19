from rasa_eng.models import  IntentEng, ActionEng, StoryEng

IntentEng(
  intent_name="request_override_file",
  intent_tokens=[
    "give me override file",
    "give me cho an gee",
    "how can I get override file",
    "how can I get cho an gee",
    "give me override form",
    "how can I get override form",
  ]
).save()
action = ActionEng(
  action_name="utter_give_override_file",
  action_type="text",
  text_value="Click <a href='https://cse.snu.ac.kr/sites/default/files/node--notice/Over-ride%20Form_4.hwp'>here</a> to open the override form",
)
action.save()
action.intent.add(IntentEng.objects.get(intent_name="request_override_file"))

story = StoryEng(story_name="request_override_file")
story.save()
story.story_path_1.add(IntentEng.objects.get(intent_name="request_override_file"))