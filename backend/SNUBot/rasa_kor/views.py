from django.http import (
    HttpResponse,
    JsonResponse,
)
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.generic import View
from django.utils.decorators import method_decorator
from django.db import transaction
from .models import IntentKor, ActionKor, StoryKor, EntityKor, SlotKor
from custom.decorator import require_super_user
from custom.rasa_factory import RasaFactory


class IntentsView(View, RasaFactory):
    @method_decorator(ensure_csrf_cookie)
    @method_decorator(transaction.atomic)
    @method_decorator(require_super_user)
    def get(self, request):
        return JsonResponse(self.intents_get("kor"), status=200, safe=False)

    @method_decorator(ensure_csrf_cookie)
    @method_decorator(transaction.atomic)
    @method_decorator(require_super_user)
    def post(self, request):
        return HttpResponse(status=self.intents_post("kor", request))


class IntentView(View, RasaFactory):
    @method_decorator(ensure_csrf_cookie)
    @method_decorator(transaction.atomic)
    @method_decorator(require_super_user)
    def get(self, request, id):
        intent = self.intent_detail_get("kor", id)
        if intent != 404:
            return JsonResponse(intent, status=200, safe=False)
        else:
            return HttpResponse(status=404)

    @method_decorator(ensure_csrf_cookie)
    @method_decorator(transaction.atomic)
    @method_decorator(require_super_user)
    def put(self, request, id):
        return HttpResponse(status=self.intent_detail_put("kor", id, request))

    @method_decorator(ensure_csrf_cookie)
    @method_decorator(transaction.atomic)
    @method_decorator(require_super_user)
    def delete(self, request, id):
        return HttpResponse(status=self.intent_detail_delete("kor", id))


class ActionsView(View, RasaFactory):
    @method_decorator(ensure_csrf_cookie)
    @method_decorator(transaction.atomic)
    @method_decorator(require_super_user)
    def get(self, request):
        return JsonResponse(self.actions_get("kor"), status=200, safe=False)

    @method_decorator(ensure_csrf_cookie)
    @method_decorator(transaction.atomic)
    @method_decorator(require_super_user)
    def post(self, request):
        return HttpResponse(status=self.actions_post("kor", request))


class ActionView(View, RasaFactory):
    @method_decorator(ensure_csrf_cookie)
    @method_decorator(transaction.atomic)
    @method_decorator(require_super_user)
    def get(self, request, id):
        action = self.action_detail_get("kor", id)
        if action != 404:
            return JsonResponse(action, status=200, safe=False)
        else:
            return HttpResponse(status=404)

    @method_decorator(ensure_csrf_cookie)
    @method_decorator(transaction.atomic)
    @method_decorator(require_super_user)
    def put(self, request, id):
        return HttpResponse(status=self.action_detail_put("kor", id, request))

    @method_decorator(ensure_csrf_cookie)
    @method_decorator(transaction.atomic)
    @method_decorator(require_super_user)
    def delete(self, request, id):
        return HttpResponse(status=self.action_detail_delete("kor", id))


class StoriesView(View, RasaFactory):
    @method_decorator(ensure_csrf_cookie)
    @method_decorator(transaction.atomic)
    @method_decorator(require_super_user)
    def get(self, request):
        return JsonResponse(self.stories_get("kor"), status=200, safe=False)

    @method_decorator(ensure_csrf_cookie)
    @method_decorator(transaction.atomic)
    @method_decorator(require_super_user)
    def post(self, request):
        return HttpResponse(status=self.stories_post("kor", request))


class StoryView(View, RasaFactory):
    @method_decorator(ensure_csrf_cookie)
    @method_decorator(transaction.atomic)
    @method_decorator(require_super_user)
    def get(self, request, id):
        story = self.story_detail_get("kor", id)
        if story != 404:
            return JsonResponse(story, status=200, safe=False)
        else:
            return HttpResponse(status=404)

    @method_decorator(ensure_csrf_cookie)
    @method_decorator(transaction.atomic)
    @method_decorator(require_super_user)
    def put(self, request, id):
        return HttpResponse(status=self.story_detail_put("kor", id, request))

    @method_decorator(ensure_csrf_cookie)
    @method_decorator(transaction.atomic)
    @method_decorator(require_super_user)
    def delete(self, request, id):
        return HttpResponse(status=self.story_detail_delete("kor", id))


class EntitiesView(View, RasaFactory):
    @method_decorator(ensure_csrf_cookie)
    @method_decorator(transaction.atomic)
    @method_decorator(require_super_user)
    def get(self, request):
        return JsonResponse(self.entities_get("kor"), status=200, safe=False)

    @method_decorator(ensure_csrf_cookie)
    @method_decorator(transaction.atomic)
    @method_decorator(require_super_user)
    def post(self, request):
        return HttpResponse(status=self.entities_post("kor", request))


class EntityView(View, RasaFactory):
    @method_decorator(ensure_csrf_cookie)
    @method_decorator(transaction.atomic)
    @method_decorator(require_super_user)
    def get(self, request, id):
        entity = self.entity_detail_get("kor", id)
        if entity != 404:
            return JsonResponse(entity, status=200, safe=False)
        else:
            return HttpResponse(status=entity)

    @method_decorator(ensure_csrf_cookie)
    @method_decorator(transaction.atomic)
    @method_decorator(require_super_user)
    def put(self, request, id):
        return HttpResponse(status=self.entity_detail_put("kor", id, request))

    @method_decorator(ensure_csrf_cookie)
    @method_decorator(transaction.atomic)
    @method_decorator(require_super_user)
    def delete(self, request, id):
        return HttpResponse(status=self.entity_detail_delete("kor", id))


class SlotsView(View, RasaFactory):
    @method_decorator(ensure_csrf_cookie)
    @method_decorator(transaction.atomic)
    @method_decorator(require_super_user)
    def get(self, request):
        return JsonResponse(self.slots_get("kor"), status=200, safe=False)

    @method_decorator(ensure_csrf_cookie)
    @method_decorator(transaction.atomic)
    @method_decorator(require_super_user)
    def post(self, request):
        return HttpResponse(status=self.slots_post("kor", request))


class SlotView(View, RasaFactory):
    @method_decorator(ensure_csrf_cookie)
    @method_decorator(transaction.atomic)
    @method_decorator(require_super_user)
    def get(self, request, id):
        slot = self.slot_detail_get("kor", id)
        if slot != 404:
            return JsonResponse(slot, status=200, safe=False)
        else:
            return HttpResponse(status=404)

    @method_decorator(ensure_csrf_cookie)
    @method_decorator(transaction.atomic)
    @method_decorator(require_super_user)
    def put(self, request, id):
        return HttpResponse(status=self.slot_detail_put("kor", id, request))

    @method_decorator(ensure_csrf_cookie)
    @method_decorator(transaction.atomic)
    @method_decorator(require_super_user)
    def delete(self, request, id):
        return HttpResponse(status=self.slot_detail_delete("kor", id))


class MakeFileView(View, RasaFactory):
    @method_decorator(ensure_csrf_cookie)
    @method_decorator(transaction.atomic)
    @method_decorator(require_super_user)
    def get(self, request):
        return HttpResponse(status=self.make_train_file("kor"))
