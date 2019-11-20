"""
import json
from json import JSONDecodeError
from django.db import IntegrityError
from django.http import (
    HttpResponse,
    HttpResponseBadRequest,
    JsonResponse,
    HttpResponseNotFound,
    HttpResponseForbidden,
)
from account.models import User
from .models import IntentEng, ActionEng, StoryEng, EntityEng, SlotEng
from django.contrib.auth import authenticate
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_http_methods
from operator import itemgetter
from django.shortcuts import get_object_or_404
import math


@require_http_methods(["GET", "POST"])
@ensure_csrf_cookie
def intent(request):
    if request.method == "GET":
        intent = IntentEng.objects.all().values("intent_name", "intent_tokens")
        intent_json = list(intent)
        return JsonResponse(intent_json, status=200, safe=False)
    else:
        try:
            body = request.body.decode()
            intent_name = json.loads(body)["name"]
            intent_tokens = json.loads(body)["tokens"]
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()
        new_intent = IntentEng(intent_name=intent_name, intent_tokens=intent_tokens)
        new_intent.save()
        return HttpResponse(status=201)


@require_http_methods(["PUT", "DELETE"])
@ensure_csrf_cookie
def edit_intent(request, id):
    if request.method == "PUT":
        try:
            body = request.body.decode()
            intent_name = json.loads(body)["name"]
            intent_tokens = json.loads(body)["tokens"]
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
def action(request):
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
            action_name = json.loads(body)["name"]
            intent_name = json.loads(body)["intent_name"]
            action_type = json.loads(body)["action_type"]
            text_value = json.loads(body)["text_value"]
            image_value = json.loads(body)["image_value"]
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()
        target_intent = get_object_or_404(IntentEng, intent_name=intent_name)
        new_action = ActionEng(
            action_name=action_name,
            intent=target_intent,
            action_type=action_type,
            text_value=text_value,
            image_value=image_value,
        )
        new_action.save()
        return HttpResponse(status=201)


@require_http_methods(["PUT", "DELETE"])
@ensure_csrf_cookie
def edit_action(request, id):
    if request.method == "PUT":
        try:
            body = request.body.decode()
            action_name = json.loads(body)["name"]
            intent_name = json.loads(body)["intent_name"]
            action_type = json.loads(body)["action_type"]
            text_value = json.loads(body)["text_value"]
            image_value = json.loads(body)["image_value"]
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()
        action = get_object_or_404(ActionEng, pk=id)
        target_intent = get_object_or_404(IntentEng, intent_name=intent_name)
        action.action_name = action_name
        action.intent = target_intent
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
def story(request):
    if request.method == "GET":
        story_list = [
            story
            for story in StoryEng.objects.all().values(
                "story_name", "story_path_1", "story_path_2", "story_path_3",
            )
        ]
        return JsonResponse(story_list, status=200, safe=False)
    else:
        try:
            body = request.body.decode()
            action_name = json.loads(body)["name"]
            intent_name = json.loads(body)["intent_name"]
            action_type = json.loads(body)["action_type"]
            text_value = json.loads(body)["text_value"]
            image_value = json.loads(body)["image_value"]
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()
        target_intent = get_object_or_404(IntentEng, intent_name=intent_name)
        new_action = ActionEng(
            action_name=action_name,
            intent=target_intent,
            action_type=action_type,
            text_value=text_value,
            image_value=image_value,
        )
        new_action.save()
        return HttpResponse(status=201)


@require_http_methods(["PUT", "DELETE"])
@ensure_csrf_cookie
def edit_action(request, id):
    if request.method == "PUT":
        try:
            body = request.body.decode()
            action_name = json.loads(body)["name"]
            intent_name = json.loads(body)["intent_name"]
            action_type = json.loads(body)["action_type"]
            text_value = json.loads(body)["text_value"]
            image_value = json.loads(body)["image_value"]
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()
        action = get_object_or_404(ActionEng, pk=id)
        target_intent = get_object_or_404(IntentEng, intent_name=intent_name)
        action.action_name = action_name
        action.intent = target_intent
        action.action_type = action_type
        action.text_value = text_value
        action.image_value = image_value
        action.save()
        return HttpResponse(status=201)
    else:
        action = get_object_or_404(ActionEng, pk=id)
        action.delete()
        return HttpResponse(status=200)


"""

