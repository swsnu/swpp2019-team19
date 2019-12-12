import os
import json
import math
from json import JSONDecodeError
from django.db import IntegrityError
from django.http import (
    HttpResponse,
    HttpResponseBadRequest,
    JsonResponse,
    HttpResponseNotFound,
    HttpResponseForbidden,
)
from django.contrib.auth import authenticate
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_http_methods
from django.shortcuts import get_object_or_404
from django.db import transaction
from django.forms.models import model_to_dict
from account.models import User
from .models import IntentEng, ActionEng, StoryEng, EntityEng, SlotEng
from custom.decorator import require_super_user
from custom.func import to_dict


@require_http_methods(["GET", "POST"])
@ensure_csrf_cookie
@transaction.atomic
@require_super_user
def intents(request):
    if request.method == "GET":
        intent = IntentEng.objects.all().values("intent_name", "intent_tokens")
        intent_json = list(intent)
        return JsonResponse(intent_json, status=200, safe=False)
    else:
        try:
            body = request.body.decode()
            intent_name = json.loads(body)["intent_name"]
            intent_tokens = json.loads(body)["intent_tokens"]
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()
        new_intent = IntentEng(
            intent_name=intent_name, intent_tokens=intent_tokens,
        )
        new_intent.save()
        return HttpResponse(status=201)


@require_http_methods(["GET", "PUT", "DELETE"])
@ensure_csrf_cookie
@transaction.atomic
@require_super_user
def intent_detail(request, id):
    if request.method == "GET":
        intent = get_object_or_404(IntentEng, pk=id)
        return JsonResponse(model_to_dict(intent), status=200, safe=False)
    elif request.method == "PUT":
        try:
            body = request.body.decode()
            intent_name = json.loads(body)["intent_name"]
            intent_tokens = json.loads(body)["intent_tokens"]
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()
        intent = get_object_or_404(IntentEng, pk=id)
        intent.intent_name = intent_name
        intent.intent_tokens = intent_tokens
        intent.save()
        return HttpResponse(status=201)
    else:
        intent = get_object_or_404(IntentEng, pk=id)
        intent.delete()
        return HttpResponse(status=200)


@require_http_methods(["GET", "POST"])
@ensure_csrf_cookie
@transaction.atomic
@require_super_user
def actions(request):
    if request.method == "GET":
        action = ActionEng.objects.all().values(
            "action_name",
            "intent__intent_name",
            "action_type",
            "text_value",
            "image_value",
        )
        action_json = list(action)
        return JsonResponse(action_json, status=200, safe=False)
    else:
        try:
            body = request.body.decode()
            action_name = json.loads(body)["action_name"]
            intent_list = json.loads(body)["intent_list"]
            action_type = json.loads(body)["action_type"]
            text_value = json.loads(body)["text_value"]
            image_value = json.loads(body)["image_value"]
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()
        new_action = ActionEng(
            action_name=action_name,
            action_type=action_type,
            text_value=text_value,
            image_value=image_value,  # 여기 테스트 안해봄
        )
        new_action.save()
        for intent in intent_list:
            target_intent = get_object_or_404(IntentEng, intent_name=intent)
            new_action.intent.add(target_intent)
        return HttpResponse(status=201)


@require_http_methods(["GET", "PUT", "DELETE"])
@ensure_csrf_cookie
@transaction.atomic
@require_super_user
def action_detail(request, id):
    if request.method == "GET":
        action = get_object_or_404(ActionEng, pk=id)
        return JsonResponse(
            to_dict(action, "intent_name"), status=200, safe=False
        )
    elif request.method == "PUT":
        try:
            body = request.body.decode()
            action_name = json.loads(body)["action_name"]
            intent_list = json.loads(body)["intent_list"]
            action_type = json.loads(body)["action_type"]
            text_value = json.loads(body)["text_value"]
            image_value = json.loads(body)["image_value"]
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()
        action = get_object_or_404(ActionEng, pk=id)
        action.action_name = action_name
        action.intent.clear()
        for intent in intent_list:
            target_intent = get_object_or_404(IntentEng, intent_name=intent)
            action.intent.add(target_intent)
        action.action_type = action_type
        action.text_value = text_value
        action.image_value = image_value
        action.save()
        return HttpResponse(status=201)
    else:
        action = get_object_or_404(ActionEng, pk=id)
        action.delete()
        return HttpResponse(status=200)


@require_http_methods(["GET", "POST"])
@ensure_csrf_cookie
@transaction.atomic
@require_super_user
def stories(request):
    if request.method == "GET":
        story_list = [
            story
            for story in StoryEng.objects.all().values(
                "story_name",
                "story_path_1__intent_name",
                "story_path_2__intent_name",
            )
        ]
        return JsonResponse(story_list, status=200, safe=False)
    else:
        try:
            body = request.body.decode()
            story_name = json.loads(body)["story_name"]
            story_path_1 = json.loads(body)["story_path_1"]
            story_path_2 = json.loads(body)["story_path_2"]
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()
        new_story = StoryEng(story_name=story_name)
        new_story.save()
        # 아래서 만약 404 반환할 경우 delete해야하나? -> transaction
        for intent in story_path_1:
            target_intent = get_object_or_404(IntentEng, intent_name=intent)
            new_story.story_path_1.add(target_intent)
        for intent in story_path_2:
            target_intent = get_object_or_404(IntentEng, intent_name=intent)
            new_story.story_path_2.add(target_intent)
        return HttpResponse(status=201)


@require_http_methods(["GET", "PUT", "DELETE"])
@ensure_csrf_cookie
@transaction.atomic
@require_super_user
def story_detail(request, id):
    if request.method == "GET":
        story = get_object_or_404(StoryEng, pk=id)
        return JsonResponse(
            to_dict(story, "intent_name"), status=200, safe=False
        )
    elif request.method == "PUT":
        try:
            body = request.body.decode()
            story_name = json.loads(body)["story_name"]
            story_path_1 = json.loads(body)["story_path_1"]
            story_path_2 = json.loads(body)["story_path_2"]
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()
        story = get_object_or_404(StoryEng, pk=id)
        story.story_name = story_name
        story.story_path_1.clear()
        story.story_path_2.clear()
        # 아래서 만약 404 반환할 경우 delete해야하나? -> transaction
        for intent in story_path_1:
            target_intent = get_object_or_404(IntentEng, intent_name=intent)
            story.story_path_1.add(target_intent)
        for intent in story_path_2:
            target_intent = get_object_or_404(IntentEng, intent_name=intent)
            story.story_path_2.add(target_intent)
        story.save()
        return HttpResponse(status=201)
    else:
        story = get_object_or_404(StoryEng, pk=id)
        story.delete()
        return HttpResponse(status=200)


@require_http_methods(["GET", "POST"])
@ensure_csrf_cookie
@transaction.atomic
@require_super_user
def entities(request):
    if request.method == "GET":
        entity = EntityEng.objects.all().values(
            "entity_name", "entity_tokens", "intent__intent_name"
        )
        entity_json = list(entity)
        return JsonResponse(entity_json, status=200, safe=False)
    else:
        try:
            body = request.body.decode()
            entity_name = json.loads(body)["entity_name"]
            entity_tokens = json.loads(body)["entity_tokens"]
            intent = json.loads(body)["intent"]
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()
        new_entity = EntityEng(
            entity_name=entity_name, entity_tokens=entity_tokens
        )
        new_entity.save()
        target_intent = get_object_or_404(IntentEng, intent_name=intent)
        new_entity.intent.add(target_intent)
        return HttpResponse(status=201)


@require_http_methods(["GET", "PUT", "DELETE"])
@ensure_csrf_cookie
@transaction.atomic
@require_super_user
def entity_detail(request, id):
    if request.method == "GET":
        entity = get_object_or_404(EntityEng, pk=id)
        return JsonResponse(model_to_dict(entity), status=200, safe=False)
    elif request.method == "PUT":
        try:
            body = request.body.decode()
            entity_name = json.loads(body)["entity_name"]
            entity_tokens = json.loads(body)["entity_tokens"]
            intent = json.loads(body)["intent"]
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()
        entity = get_object_or_404(EntityEng, pk=id)

        entity.entity_name = entity_name
        entity.entity_tokens = entity_tokens
        entity.intent.clear()
        target_intent = get_object_or_404(IntentEng, intent_name=intent)
        entity.intent.add(target_intent)
        entity.save()
        return HttpResponse(status=201)
    else:
        entity = get_object_or_404(EntityEng, pk=id)
        entity.delete()
        return HttpResponse(status=200)


@require_http_methods(["GET", "POST"])
@ensure_csrf_cookie
@require_super_user
@transaction.atomic
def slots(request):
    if request.method == "GET":
        slot = SlotEng.objects.all().values("slot_name", "slot_type")
        slot_json = list(slot)
        return JsonResponse(slot_json, status=200, safe=False)
    else:
        try:
            body = request.body.decode()
            slot_name = json.loads(body)["slot_name"]
            slot_type = json.loads(body)["slot_type"]
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()
        new_slot = SlotEng(slot_name=slot_name, slot_type=slot_type)
        new_slot.save()
        return HttpResponse(status=201)


@require_http_methods(["GET", "PUT", "DELETE"])
@ensure_csrf_cookie
@transaction.atomic
@require_super_user
def slot_detail(request, id):
    if request.method == "GET":
        slot = get_object_or_404(SlotEng, pk=id)
        return JsonResponse(model_to_dict(slot), status=200, safe=False)
    elif request.method == "PUT":
        try:
            body = request.body.decode()
            slot_name = json.loads(body)["slot_name"]
            slot_type = json.loads(body)["slot_type"]
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()
        slot = get_object_or_404(SlotEng, pk=id)
        slot.slot_name = slot_name
        slot.slot_type = slot_type
        slot.save()
        return HttpResponse(status=201)
    else:
        slot = get_object_or_404(SlotEng, pk=id)
        slot.delete()
        return HttpResponse(status=200)


@require_http_methods(["POST"])
@ensure_csrf_cookie
@require_super_user
def make_train_file(request):
    """
    알수 없는 이유로 파일 작성에 실패한 경우에 대한 에러메세지 추가 필요
    """
    entity_wildcard = "[*]"
    eng_path = os.getcwd() + "/../Rasa/Rasa_eng/"
    nlu = open(eng_path + "data/nlu.md", "w")
    for intent in IntentEng.objects.all():
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
                        "\n  - "
                        + token_first
                        + "["
                        + entity
                        + "]("
                        + entity_name
                        + ")"
                        + token_last
                    )
            else:
                nlu.write("\n  - " + token)
        nlu.write("\n\n")
    nlu.close()
    stories = open(eng_path + "data/stories.md", "w")
    for story in StoryEng.objects.all():
        path1_list = []
        path2_list = []
        for path1 in story.story_path_1.all():
            path1_str = "\n* " + path1.intent_name
            for action in path1.related_action.all():
                path1_str += "\n  - " + action.action_name
            path1_list.append(path1_str)
        for path2 in story.story_path_2.all():
            path2_str = "\n* " + path2.intent_name
            for action in path2.related_action.all():
                path2_str += "\n  - " + action.action_name
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
    domain = open(eng_path + "domain.yml", "w")
    domain.write("slots:")
    for slot in SlotEng.objects.all():
        domain.write("\n  " + slot.slot_name + ":")
        domain.write("\n    " + "type: " + slot.slot_type)
    domain.write("\n\nintents:")
    for intent in IntentEng.objects.all():
        domain.write("\n- " + intent.intent_name)
    domain.write("\n\nentities:")
    for entity in EntityEng.objects.all():
        domain.write("\n  - " + entity.entity_name)
    domain.write("\n\nactions:")
    for action in ActionEng.objects.all():
        domain.write("\n  - " + action.action_name)
    domain.write("\n\ntemplates:")
    for action in ActionEng.objects.all():
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
    return HttpResponse(status=200)
