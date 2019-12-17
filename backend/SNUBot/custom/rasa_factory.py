import os
import json
import math
from json import JSONDecodeError
from rasa_eng.models import IntentEng, ActionEng, StoryEng, EntityEng, SlotEng
from rasa_kor.models import IntentKor, ActionKor, StoryKor, EntityKor, SlotKor
from .decorator import require_super_user
from .func import to_dict
from django.db import transaction
from django.forms.models import model_to_dict
from django.core.exceptions import ObjectDoesNotExist
from django.utils.decorators import method_decorator


class RasaFactory(object):
    """
    transaction.atomic이 원하는데로 적용이 안되고 있음
    """

    @method_decorator(transaction.atomic)
    def intents_get(self, language):
        if language == "eng":
            intent = IntentEng.objects.all().values(
                "intent_name", "intent_tokens"
            )
        elif language == "kor":
            intent = IntentKor.objects.all().values(
                "intent_name", "intent_tokens"
            )
        return list(intent)

    @method_decorator(transaction.atomic)
    def intents_post(self, language, request):
        try:
            body = request.body.decode()
            intent_name = json.loads(body)["intent_name"]
            intent_tokens = json.loads(body)["intent_tokens"]
        except (KeyError, JSONDecodeError):
            return 400
        if language == "eng":
            new_intent = IntentEng(
                intent_name=intent_name, intent_tokens=intent_tokens
            )
            new_intent.save()
        elif language == "kor":
            new_intent = IntentKor(
                intent_name=intent_name, intent_tokens=intent_tokens
            )
            new_intent.save()
        return 201

    @method_decorator(transaction.atomic)
    def intent_detail_get(self, language, id):
        if language == "eng":
            try:
                intent = IntentEng.objects.get(pk=id)
            except ObjectDoesNotExist:
                return 404
        elif language == "kor":
            try:
                intent = IntentKor.objects.get(pk=id)
            except ObjectDoesNotExist:
                return 404
        return model_to_dict(intent)

    @method_decorator(transaction.atomic)
    def intent_detail_put(self, language, id, request):
        try:
            body = request.body.decode()
            intent_name = json.loads(body)["intent_name"]
            intent_tokens = json.loads(body)["intent_tokens"]
        except (KeyError, JSONDecodeError):
            return 400
        if language == "eng":
            try:
                intent = IntentEng.objects.get(pk=id)
            except ObjectDoesNotExist:
                return 404
        elif language == "kor":
            try:
                intent = IntentKor.objects.get(pk=id)
            except ObjectDoesNotExist:
                return 404
        intent.intent_name = intent_name
        intent.intent_tokens = intent_tokens
        intent.save()
        return 201

    @method_decorator(transaction.atomic)
    def intent_detail_delete(self, language, id):
        if language == "eng":
            try:
                intent = IntentEng.objects.get(pk=id)
            except ObjectDoesNotExist:
                return 404
        elif language == "kor":
            try:
                intent = IntentKor.objects.get(pk=id)
            except ObjectDoesNotExist:
                return 404
        intent.delete()
        return 200

    @method_decorator(transaction.atomic)
    def actions_get(self, language):
        if language == "eng":
            action = ActionEng.objects.all().values(
                "action_name",
                "intent__intent_name",
                "action_type",
                "text_value",
                "image_value",
            )
        elif language == "kor":
            action = ActionKor.objects.all().values(
                "action_name",
                "intent__intent_name",
                "action_type",
                "text_value",
                "image_value",
            )
        return list(action)

    @method_decorator(transaction.atomic)
    def actions_post(self, language, request):
        try:
            body = request.body.decode()
            action_name = json.loads(body)["action_name"]
            intent_list = json.loads(body)["intent_list"]
            action_type = json.loads(body)["action_type"]
            text_value = json.loads(body)["text_value"]
            image_value = json.loads(body)["image_value"]
        except (KeyError, JSONDecodeError):
            return 400
        if language == "eng":
            new_action = ActionEng(
                action_name=action_name,
                action_type=action_type,
                text_value=text_value,
                image_value=image_value,  # 여기 테스트 안해봄
            )
            new_action.save()
            for intent in intent_list:
                try:
                    target_intent = IntentEng.objects.get(intent_name=intent)
                except ObjectDoesNotExist:
                    new_action.delete()
                    return 404
                new_action.intent.add(target_intent)
        elif language == "kor":
            new_action = ActionKor(
                action_name=action_name,
                action_type=action_type,
                text_value=text_value,
                image_value=image_value,  # 여기 테스트 안해봄
            )
            new_action.save()
            for intent in intent_list:
                try:
                    target_intent = IntentKor.objects.get(intent_name=intent)
                except ObjectDoesNotExist:
                    new_action.delete()
                    return 404
                new_action.intent.add(target_intent)
        return 201

    @method_decorator(transaction.atomic)
    def action_detail_get(self, language, id):
        if language == "eng":
            try:
                action = ActionEng.objects.get(pk=id)
            except ObjectDoesNotExist:
                return 404
        elif language == "kor":
            try:
                action = ActionKor.objects.get(pk=id)
            except ObjectDoesNotExist:
                return 404
        return to_dict(action, "intent_name")

    @method_decorator(transaction.atomic)
    def action_detail_put(self, language, id, request):
        try:
            body = request.body.decode()
            action_name = json.loads(body)["action_name"]
            intent_list = json.loads(body)["intent_list"]
            action_type = json.loads(body)["action_type"]
            text_value = json.loads(body)["text_value"]
            image_value = json.loads(body)["image_value"]
        except (KeyError, JSONDecodeError):
            return 400
        if language == "eng":
            try:
                action = ActionEng.objects.get(pk=id)
            except ObjectDoesNotExist:
                return 404
            action.intent.clear()
            for intent in intent_list:
                try:
                    target_intent = IntentEng.objects.get(intent_name=intent)
                except ObjectDoesNotExist:
                    return 404
                action.intent.add(target_intent)
            action.action_name = action_name

        elif language == "kor":
            try:
                action = ActionKor.objects.get(pk=id)
            except ObjectDoesNotExist:
                return 404
            action.intent.clear()
            for intent in intent_list:
                try:
                    target_intent = IntentKor.objects.get(intent_name=intent)
                except ObjectDoesNotExist:
                    return 404
                action.intent.add(target_intent)
            action.action_name = action_name
        action.action_type = action_type
        action.text_value = text_value
        action.image_value = image_value
        action.save()
        return 201

    @method_decorator(transaction.atomic)
    def action_detail_delete(self, language, id):
        if language == "eng":
            try:
                action = ActionEng.objects.get(pk=id)
            except ObjectDoesNotExist:
                return 404
        elif language == "kor":
            try:
                action = ActionKor.objects.get(pk=id)
            except ObjectDoesNotExist:
                return 404
        action.delete()
        return 200

    @method_decorator(transaction.atomic)
    def stories_get(self, language):
        if language == "eng":
            story_list = [
                story
                for story in StoryEng.objects.all().values(
                    "story_name",
                    "story_path_1__intent_name",
                    "story_path_2__intent_name",
                )
            ]
        elif language == "kor":
            story_list = [
                story
                for story in StoryKor.objects.all().values(
                    "story_name",
                    "story_path_1__intent_name",
                    "story_path_2__intent_name",
                )
            ]
        return story_list

    @method_decorator(transaction.atomic)
    def stories_post(self, language, request):
        try:
            body = request.body.decode()
            story_name = json.loads(body)["story_name"]
            story_path_1 = json.loads(body)["story_path_1"]
            story_path_2 = json.loads(body)["story_path_2"]
        except (KeyError, JSONDecodeError):
            return 400
        if language == "eng":
            new_story = StoryEng(story_name=story_name)
            new_story.save()
            for intent in story_path_1:
                try:
                    target_intent = IntentEng.objects.get(intent_name=intent)
                except ObjectDoesNotExist:
                    new_story.delete()
                    return 404
                new_story.story_path_1.add(target_intent)
            for intent in story_path_2:
                try:
                    target_intent = IntentEng.objects.get(intent_name=intent)
                except ObjectDoesNotExist:
                    new_story.delete()
                    return 404
                new_story.story_path_2.add(target_intent)
        elif language == "kor":
            new_story = StoryKor(story_name=story_name)
            new_story.save()
            for intent in story_path_1:
                try:
                    target_intent = IntentKor.objects.get(intent_name=intent)
                except ObjectDoesNotExist:
                    new_story.delete()
                    return 404
                new_story.story_path_1.add(target_intent)
            for intent in story_path_2:
                try:
                    target_intent = IntentKor.objects.get(intent_name=intent)
                except ObjectDoesNotExist:
                    new_story.delete()
                    return 404
                new_story.story_path_2.add(target_intent)
        return 201

    @method_decorator(transaction.atomic)
    def story_detail_get(self, language, id):
        if language == "eng":
            try:
                story = StoryEng.objects.get(pk=id)
            except ObjectDoesNotExist:
                return 404
        elif language == "kor":
            try:
                story = StoryKor.objects.get(pk=id)
            except ObjectDoesNotExist:
                return 404
        return to_dict(story, "intent_name")

    @method_decorator(transaction.atomic)
    def story_detail_put(self, language, id, request):
        try:
            body = request.body.decode()
            story_name = json.loads(body)["story_name"]
            story_path_1 = json.loads(body)["story_path_1"]
            story_path_2 = json.loads(body)["story_path_2"]
        except (KeyError, JSONDecodeError):
            return 400
        if language == "eng":
            try:
                story = StoryEng.objects.get(pk=id)
            except ObjectDoesNotExist:
                return 404
            story.story_name = story_name
            story.story_path_1.clear()
            story.story_path_2.clear()
            # 아래서 만약 404 반환할 경우 delete해야하나? -> transaction
            for intent in story_path_1:
                try:
                    target_intent = IntentEng.objects.get(intent_name=intent)
                except ObjectDoesNotExist:
                    return 404
                story.story_path_1.add(target_intent)
            for intent in story_path_2:
                try:
                    target_intent = IntentEng.objects.get(intent_name=intent)
                except ObjectDoesNotExist:
                    return 404
                story.story_path_2.add(target_intent)
        elif language == "kor":
            try:
                story = StoryKor.objects.get(pk=id)
            except ObjectDoesNotExist:
                return 404
            story.story_name = story_name
            story.story_path_1.clear()
            story.story_path_2.clear()
            # 아래서 만약 404 반환할 경우 delete해야하나? -> transaction
            for intent in story_path_1:
                try:
                    target_intent = IntentKor.objects.get(intent_name=intent)
                except ObjectDoesNotExist:
                    return 404
                story.story_path_1.add(target_intent)
            for intent in story_path_2:
                try:
                    target_intent = IntentKor.objects.get(intent_name=intent)
                except ObjectDoesNotExist:
                    return 404
                story.story_path_2.add(target_intent)
        story.save()
        return 201

    @method_decorator(transaction.atomic)
    def story_detail_delete(self, language, id):
        if language == "eng":
            try:
                story = StoryEng.objects.get(pk=id)
            except ObjectDoesNotExist:
                return 404
        elif language == "kor":
            try:
                story = StoryKor.objects.get(pk=id)
            except ObjectDoesNotExist:
                return 404
        story.delete()
        return 200

    @method_decorator(transaction.atomic)
    def entities_get(self, language):
        if language == "eng":
            entity = EntityEng.objects.all().values(
                "entity_name", "entity_tokens", "intent__intent_name"
            )

        elif language == "kor":
            entity = EntityKor.objects.all().values(
                "entity_name", "entity_tokens", "intent__intent_name"
            )
        return list(entity)

    @method_decorator(transaction.atomic)
    def entities_post(self, language, request):
        try:
            body = request.body.decode()
            entity_name = json.loads(body)["entity_name"]
            entity_tokens = json.loads(body)["entity_tokens"]
            intent = json.loads(body)["intent"]
        except (KeyError, JSONDecodeError):
            return 400
        if language == "eng":
            try:
                target_intent = IntentEng.objects.get(intent_name=intent)
            except ObjectDoesNotExist:
                return 404
            EntityEng(
                entity_name=entity_name,
                entity_tokens=entity_tokens,
                intent=target_intent,
            ).save()
        elif language == "kor":
            try:
                target_intent = IntentKor.objects.get(intent_name=intent)
            except ObjectDoesNotExist:
                return 404
            EntityKor(
                entity_name=entity_name,
                entity_tokens=entity_tokens,
                intent=target_intent,
            ).save()
        return 201

    @method_decorator(transaction.atomic)
    def entity_detail_get(self, language, id):
        if language == "eng":
            try:
                entity = EntityEng.objects.select_related("intent").get(pk=id)
            except ObjectDoesNotExist:
                return 404
            response_dict = {}
            response_dict["entity_name"] = entity.entity_name
            response_dict["entity_tokens"] = entity.entity_tokens
            response_dict["intent"] = entity.intent.intent_name
        elif language == "kor":
            try:
                entity = EntityKor.objects.select_related("intent").get(pk=id)
            except ObjectDoesNotExist:
                return 404
            response_dict = {}
            response_dict["entity_name"] = entity.entity_name
            response_dict["entity_tokens"] = entity.entity_tokens
            response_dict["intent"] = entity.intent.intent_name
        return response_dict

    @method_decorator(transaction.atomic)
    def entity_detail_put(self, language, id, request):
        try:
            body = request.body.decode()
            entity_name = json.loads(body)["entity_name"]
            entity_tokens = json.loads(body)["entity_tokens"]
            intent = json.loads(body)["intent"]
        except (KeyError, JSONDecodeError):
            return 400
        if language == "eng":
            try:
                entity = EntityEng.objects.select_related("intent").get(pk=id)
            except ObjectDoesNotExist:
                return 404
            try:
                target_intent = IntentEng.objects.get(intent_name=intent)
            except ObjectDoesNotExist:
                return 404
        elif language == "kor":
            try:
                entity = EntityKor.objects.select_related("intent").get(pk=id)
            except ObjectDoesNotExist:
                return 404
            try:
                target_intent = IntentKor.objects.get(intent_name=intent)
            except ObjectDoesNotExist:
                return 404
        entity.entity_name = entity_name
        entity.entity_tokens = entity_tokens
        entity.intent = target_intent
        entity.save()
        return 201

    @method_decorator(transaction.atomic)
    def entity_detail_delete(self, language, id):
        if language == "eng":
            try:
                entity = EntityEng.objects.get(pk=id)
            except ObjectDoesNotExist:
                return 404
        elif language == "kor":
            try:
                entity = EntityKor.objects.get(pk=id)
            except ObjectDoesNotExist:
                return 404
        entity.delete()
        return 200

    @method_decorator(transaction.atomic)
    def slots_get(self, language):
        if language == "eng":
            slot = SlotEng.objects.all().values("slot_name", "slot_type")
        elif language == "kor":
            slot = SlotKor.objects.all().values("slot_name", "slot_type")
        return list(slot)

    @method_decorator(transaction.atomic)
    def slots_post(self, language, request):
        try:
            body = request.body.decode()
            slot_name = json.loads(body)["slot_name"]
            slot_type = json.loads(body)["slot_type"]
        except (KeyError, JSONDecodeError):
            return 400
        if language == "eng":
            SlotEng(slot_name=slot_name, slot_type=slot_type).save()
        elif language == "kor":
            SlotKor(slot_name=slot_name, slot_type=slot_type).save()
        return 201

    @method_decorator(transaction.atomic)
    def slot_detail_get(self, language, id):
        if language == "eng":
            try:
                slot = SlotEng.objects.get(pk=id)
            except ObjectDoesNotExist:
                return 404
        elif language == "kor":
            try:
                slot = SlotKor.objects.get(pk=id)
            except ObjectDoesNotExist:
                return 404
        return model_to_dict(slot)

    @method_decorator(transaction.atomic)
    def slot_detail_put(self, language, id, request):
        try:
            body = request.body.decode()
            slot_name = json.loads(body)["slot_name"]
            slot_type = json.loads(body)["slot_type"]
        except (KeyError, JSONDecodeError):
            return 400
        if language == "eng":
            try:
                slot = SlotEng.objects.get(pk=id)
            except ObjectDoesNotExist:
                return 404
        elif language == "kor":
            try:
                slot = SlotKor.objects.get(pk=id)
            except ObjectDoesNotExist:
                return 404
        slot.slot_name = slot_name
        slot.slot_type = slot_type
        slot.save()
        return 201

    @method_decorator(transaction.atomic)
    def slot_detail_delete(self, language, id):
        if language == "eng":
            try:
                slot = SlotEng.objects.get(pk=id)
            except ObjectDoesNotExist:
                return 404
        elif language == "kor":
            try:
                slot = SlotKor.objects.get(pk=id)
            except ObjectDoesNotExist:
                return 404
        slot.delete()
        return 200

    @method_decorator(transaction.atomic)
    def make_train_file(self, language):
        """
        알수 없는 이유로 파일 작성에 실패한 경우에 대한 에러메세지 추가 필요
        """
        if language == "eng":
            path = os.getcwd() + "/../Rasa/Rasa_eng/"
            intent_all = IntentEng.objects.all()
            action_all = ActionEng.objects.all()
            story_all = StoryEng.objects.all()
            entity_all = EntityEng.objects.all()
            slot_all = SlotEng.objects.all()
        elif language == "kor":
            path = os.getcwd() + "/../Rasa/Rasa_kor/"
            intent_all = IntentKor.objects.all()
            action_all = ActionKor.objects.all()
            story_all = StoryKor.objects.all()
            entity_all = EntityKor.objects.all()
            slot_all = SlotKor.objects.all()
        entity_wildcard = "[*]"
        token_prefix = "\n  - "
        nlu = open(path + "data/nlu.md", "w")
        for intent in intent_all:
            nlu.write("## intent:" + intent.intent_name)
            for token in intent.intent_tokens:
                if entity_wildcard in token:
                    idx = token.find(entity_wildcard)
                    token_first = token[:idx]
                    token_last = token[idx + 3 :]
                    entities = intent.related_entity
                    entity_name = entities.entity_name
                    for entity in entities.entity_tokens:
                        nlu.write(
                            token_prefix
                            + token_first
                            + "["
                            + entity
                            + "]("
                            + entity_name
                            + ")"
                            + token_last
                        )
                else:
                    nlu.write(token_prefix + token)
            nlu.write("\n\n")
        nlu.close()
        stories = open(path + "data/stories.md", "w")
        for story in story_all:
            path1_list = []
            path2_list = []
            for path1 in story.story_path_1.all():
                path1_str = "\n* " + path1.intent_name
                for action in path1.related_action.all():
                    path1_str += token_prefix + action.action_name
                path1_list.append(path1_str)
            for path2 in story.story_path_2.all():
                path2_str = "\n* " + path2.intent_name
                for action in path2.related_action.all():
                    path2_str += token_prefix + action.action_name
                path2_list.append(path2_str)
            count = 1
            idx_1 = 0
            idx_2 = 0
            while idx_1 < len(path1_list):
                stories.write("## " + story.story_name + str(count))
                stories.write(path1_list[idx_1]) if idx_1 < len(
                    path1_list
                ) else None
                stories.write(path2_list[idx_2]) if idx_2 < len(
                    path2_list
                ) else None
                idx_2 += 1
                if idx_2 >= len(path2_list):
                    idx_1 += 1
                    idx_2 = 0
                count += 1
                stories.write("\n\n")
        stories.close()
        domain = open(path + "domain.yml", "w")
        domain.write("slots:")
        for slot in slot_all:
            domain.write("\n  " + slot.slot_name + ":")
            domain.write("\n    " + "type: " + slot.slot_type)
        domain.write("\n\nintents:")
        for intent in intent_all:
            domain.write("\n- " + intent.intent_name)
        domain.write("\n\nentities:")
        for entity in entity_all:
            domain.write(token_prefix + entity.entity_name)
        domain.write("\n\nactions:")
        for action in action_all:
            domain.write(token_prefix + action.action_name)
        domain.write("\n\ntemplates:")
        for action in action_all:
            if action.action_type == "action":
                continue
            domain.write("\n  " + action.action_name + ":")
            if action.action_type == "text":
                domain.write('\n  - text: "' + action.text_value + '"\n')
            elif action.action_type == "image":
                domain.write('\n  - image: "' + action.image_value + '"\n')
            elif action.action_type == "all":
                domain.write('\n  - text: "' + action.text_value + '"')
                domain.write('\n  - image: "' + action.image_value + '"\n')
        domain.close()
        return 200

