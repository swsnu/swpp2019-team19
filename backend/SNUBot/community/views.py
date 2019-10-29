import json
from json import JSONDecodeError
from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse, HttpResponseNotFound, HttpResponseForbidden
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate, logout
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_http_methods
from .models import Article, Vote


@require_http_methods(["GET"])
@ensure_csrf_cookie
def token(request):
    return HttpResponse(status=204)


@require_http_methods(["POST"])
def signup(request):
    try:
        req_data = json.loads(request.body.decode())
        username = req_data['username']
        password = req_data['password']
    except (KeyError, JSONDecodeError):
        return HttpResponseBadRequest()
    User.objects.create_user(username=username, password=password)
    return HttpResponse(status=201)


@require_http_methods(["POST", "PUT"])
def signin(request):
    if request.method == "POST":
        try:
            req_data = json.loads(request.body.decode())
            username = req_data['username']
            password = req_data['password']
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponse(status=204)
        else:
            return HttpResponse(status=401)
    else:
        try:
            req_data = json.loads(request.body.decode())
            username = req_data['username']
            current_password = req_data['current_password']
            new_password = req_data['new_password']
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()
        user = authenticate(request, username=username,
                            password=current_password)
        if user is not None:
            target_user = User.objects.get(username=username)
            target_user.set_password(new_password)
            target_user.save()
            return HttpResponse(status=204)
        else:
            return HttpResponse(status=401)


@require_http_methods(["GET"])
def signout(request):
    if request.user.is_authenticated:
        logout(request)
        return HttpResponse(status=204)
    else:
        return HttpResponse(status=401)


@require_http_methods(["POST"])
def boards(request):
    try:
        req_data = json.loads(request.body.decode())
        board_name = req_data['board_name']
        tag = req_data['tag']
        article_count = req_data['article_count']
    except (KeyError, JSONDecodeError):
        return HttpResponseBadRequest()
    if tag == 'all':
        if board_name == 'all':
            article_list = [article for article in Article.objects.all().values(
                'id', 'title', 'author', 'tag')]
        else:
            article_list = [article for article in Article.objects.filter(board='hot').values(
                'id', 'title', 'author', 'tag')]
    else:
        if board_name == 'all':
            article_list = [article for article in Article.objects.all().filter(tag=tag).values(
                'id', 'title', 'author', 'tag')]
        else:
            article_list = [article for article in Article.objects.filter(board='hot', tag=tag).values(
                'id', 'title', 'author', 'tag')]
    if len(article_list) > article_count:
        article_list = article_list[0:article_count]
    return JsonResponse(article_list, safe=False)


@require_http_methods(["POST"])
def article(request):
    try:
        body = request.body.decode()
        title = json.loads(body)['title']
        content = json.loads(body)['content']
        author = request.user
    except (KeyError, JSONDecodeError):
        return HttpResponseBadRequest()
    new_article = Article(title=title, content=content, author=author)
    new_article.save()
    new_vote = Vote(article=article)
    new_vote.save()
    response_dict = {'id': article.id, 'title': title,
                     'content': content, 'author': author.username, 'like': vote.like, 'dislike': vote.dislike}
    return JsonResponse(response_dict, status=201)


@require_http_methods(["GET", "PUT", "DELETE"])
def article_detail(request, article_id):
    try:
        target_article = Article.objects.get(id=article_id)
    except Article.DoesNotExist:
        return HttpResponseNotFound()
    if request.method == 'GET':
        response_dict = {'id': target_article.id,
                         'title': target_article.title,
                         'content': target_article.content,
                         'author': target_article.author.username,
                         'like': target_article.vote.like,
                         'dislike': target_article.vote.dislike}
        return JsonResponse(response_dict, safe=False)
    elif request.method == 'PUT':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        if target_article.author.id is not request.user.id:
            return HttpResponseForbidden()
        try:
            body = request.body.decode()
            ar_title = json.loads(body)['title']
            ar_content = json.loads(body)['content']
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()
        target_article.title = ar_title
        target_article.content = ar_content
        target_article.save()
        response_dict = {'id': target_article.id,
                         'title': target_article.title,
                         'content': target_article.content,
                         'author': target_article.author.username,
                         'like': target_article.vote.like,
                         'dislike': target_article.vote.dislike}
        return JsonResponse(response_dict, status=200)
    else:
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        if target_article.author.id is not request.user.id:
            return HttpResponseForbidden()
        target_article.delete()
        return HttpResponse(status=200)


@require_http_methods(["PUT"])
def vote(request, article_id):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    user = request.user
    try:
        body = request.body.decode()
        request_vote = json.loads(body)['vote']
    except (KeyError, JSONDecodeError):
        return HttpResponseBadRequest()
    target_vote = Vote.objects.get(article__id=article_id)
    is_voted_like = user.liker.filter(article__id=article_id)
    is_voted_dislike = user.disliker.filter(article__id=article_id)
    if (not is_voted_like) and (not is_voted_dislike):
        if request_vote == 'like':
            target_vote.like += 1
            target_vote.like_voter.add(user)
        else:
            target_vote.dislike += 1
            target_vote.dislike_voter.add(user)
        target_vote.save()
        target_article = target_vote.article
        dif = target_vote.like - target_vote.dislike
        if dif > 10:
            target_article.board = 'hot'
        else:
            target_article.board = 'all'
        target_article.save()
        response_dict = {'like': target_vote.like,
                         'dislike': target_vote.dislike}
        return JsonResponse(response_dict, status=200)
    else:
        return HttpResponse(status=409)
