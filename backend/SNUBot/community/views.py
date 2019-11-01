import json
from json import JSONDecodeError
from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse, HttpResponseNotFound, HttpResponseForbidden
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate, logout
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_http_methods
from .models import Article, Vote
from operator import itemgetter

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
        board_name = req_data['boardName']
        article_count = req_data['articlesPerRequest']
        cur_page_num = req_data['currentPageNumber']
        tag = req_data['filterCriteria']
        sort_criteria = req_data['sortCriteria']
        search_criteria = req_data['searchCriteria']
        search_keyword = req_data['searchKeyword']
    except (KeyError, JSONDecodeError):
        return HttpResponseBadRequest()
    if tag == 'all':
        article_list = [article for article in Article.objects.filter(board=board_name).values(
                'id', 'title', 'author', 'tag', 'vote')]
    else:
        article_list = [article for article in Article.objects.filter(board=board_name, tag=tag).values(
                'id', 'title', 'author', 'tag', 'vote')]
    for article in article_list:
        target_user = User.objects.get(id=article['author'])
        article['author'] = target_user.username
        target_vote = Vote.objects.get(id=article['vote'])
        article['vote'] = target_vote.like - target_vote.dislike
    if search_keyword != '':
        if search_criteria == 'username':
            article_list = [article for article in article_list if article['author'].find(search_keyword) != -1]
        else: # if search_criteria == 'title':
            article_list = [article for article in article_list if article['title'].find(search_keyword) != -1]
    if sort_criteria == 'good':
        article_list = sorted(article_list, key=itemgetter('vote'), reverse=True)
    elif sort_criteria == 'old':
        article_list.reverse()
    if len(article_list) > article_count * cur_page_num:
        article_list = article_list[article_count * (cur_page_num-1):article_count * cur_page_num]
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
    new_vote = Vote(article=new_article)
    new_vote.save()
    response_dict = {'id': new_article.id, 'title': title,
                     'content': content, 'author': author.username, 'like': new_vote.like, 'dislike': new_vote.dislike}
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
    elif (is_voted_like):
        if request_vote == 'dislike':
            target_vote.like -= 1
            target_vote.like_voter.remove(user)
    else:
        if request_vote == 'like':
            target_vote.dislike -= 1
            target_vote.dislike_voter.remove(user)
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
