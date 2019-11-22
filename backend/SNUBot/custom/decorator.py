from django.http import HttpResponse


def require_super_user(func):
    def wrapper(request, *args, **kwargs):
        if request.user.is_superuser:
            return func(request, *args, **kwargs)
        else:
            return HttpResponse(status=401)

    return wrapper
