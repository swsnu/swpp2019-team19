import os
from django.http import HttpResponse, HttpResponseForbidden
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_http_methods
from custom.decorator import require_super_user
import redis

# Create your views here.


@require_http_methods(["GET"])
@ensure_csrf_cookie
@require_super_user
def replace_rasa_model(request):
    path = os.getcwd() + "/../Additional_db/"
    for root, dirs, files in os.walk(path):
        if len(files) > 0:
            os.system("./update_rasa.sh")
            return HttpResponse(status=204)
        else:
            return HttpResponse(status=409)


@require_http_methods(["GET"])
@ensure_csrf_cookie
@require_super_user
def udpate_server(request):
    r = redis.StrictRedis(host="127.0.0.1", port=6379, db=0)
    r.set("update_flag", 1)
    return HttpResponse(status=204)

