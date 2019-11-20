from rasa_eng.models import IntentEng, ActionEng, StoryEng
import os

eng_path = os.getcwd() + "/rasa_eng/"
nlu = open(eng_path + "nlu.md", "w")

for intent in IntentEng.objects.all():
    nlu.write("## intent:" + intent.intent_name)
    for token in intent.intent_tokens:
        nlu.write("\n\t- " + token)
    nlu.write("\n\n")

nlu.close()

stories = open(eng_path + "stories.md", "w")

for story in StoryEng.objects.all():
    path1_list = []
    path2_list = []
    path3_list = []
    for path1 in story.story_path_1.all():
        path1_str = "\n* " + path1.intent_name
        for action in path1.related_action.all():
            path1_str += "\n\t- " + action.action_name
        path1_list.append(path1_str)
    for path2 in story.story_path_2.all():
        path2_str = "\n* " + path2.intent_name
        for action in path2.related_action.all():
            path2_str += "\n\t- " + action.action_name
        path2_list.append(path2_str)
    for path3 in story.story_path_3.all():
        path3_str = "\n* " + path3.intent_name
        for action in path3.related_action.all():
            path3_str += "\n\t- " + action.action_name
        path3_list.append(path3_str)
    count = 1
    idx_1 = 0
    idx_2 = 0
    idx_3 = 0
    while idx_1 < len(path1_list):
        stories.write("## " + story.story_name + str(count))
        stories.write(path1_list[idx_1]) if idx_1 < len(path1_list) else None
        stories.write(path2_list[idx_2]) if idx_2 < len(path2_list) else None
        stories.write(path3_list[idx_3]) if idx_3 < len(path3_list) else None
        idx_3 += 1
        if idx_3 >= len(path3_list):
            idx_2 += 1
            idx_3 = 0
        if idx_2 >= len(path2_list):
            idx_1 += 1
            idx_2 = 0
        count += 1
        stories.write("\n\n")

stories.close()


domain = open(eng_path + "domain.yml", "w")

domain.write("intents:")
for intent in IntentEng.objects.all():
    domain.write("\n- " + intent.intent_name)

domain.write("\n\nactions:")
for action in ActionEng.objects.all():
    domain.write("\n- " + action.action_name)

domain.write("\n\ntemplates:")
for action in ActionEng.objects.all():
    domain.write("\n\t" + action.action_name + ":")
    if action.action_type == "text":
        domain.write('\n\t- text: "' + action.text_value + '"')
    elif action.action_type == "image":
        domain.write('\n\t- image: "' + action.image_value + '"')
    else:
        domain.write('\n\t- text: "' + action.text_value + '"')
        domain.write('\m\t- image: "' + action.image_value + '"')

domain.close()
