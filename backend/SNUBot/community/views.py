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
from django.core.cache import cache
from django.contrib.auth import login, authenticate, logout
from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from .models import Article, Vote, Comment
from operator import itemgetter
from django.shortcuts import get_object_or_404
import math


@require_http_methods(["GET"])
@ensure_csrf_cookie
def token(request):
    return HttpResponse(status=204)


@require_http_methods(["POST"])
@ensure_csrf_cookie
def signup(request):
    try:
        req_data = json.loads(request.body.decode())
        username = req_data["username"]
        email = req_data["email"]
        nickname = req_data["nickname"]
        password = req_data["password"]
    except (KeyError, JSONDecodeError):
        return HttpResponseBadRequest()
    try:
        User.objects.create_user(
            username=username, email=email, nickname=nickname, password=password
        )
    except (IntegrityError):
        return HttpResponse(status=409)
    return HttpResponse(status=201)


@require_http_methods(["POST", "PUT"])
@ensure_csrf_cookie
def signin(request):
    if request.method == "POST":
        try:
            req_data = json.loads(request.body.decode())
            username = req_data["username"]
            password = req_data["password"]
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
            username = req_data["username"]
            current_password = req_data["current_password"]
            new_password = req_data["new_password"]
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()
        user = authenticate(
            request, username=username, password=current_password
        )
        if user is not None:
            target_user = User.objects.get(username=username)
            target_user.set_password(new_password)
            target_user.save()
            return HttpResponse(status=204)
        else:
            return HttpResponse(status=401)


@require_http_methods(["GET", "PUT", "DELETE"])
@ensure_csrf_cookie
@login_required
def account(request):
    if request.method == "GET":
        response_dict = {
            "username": request.user.get_username(),
            "email": request.user.email,
            "nickname": request.user.nickname,
            "super": request.user.is_superuser,
        }
        return JsonResponse(response_dict, safe=False)
    elif request.method == "PUT":
        try:
            req_data = json.loads(request.body.decode())
            username = req_data["username"]
            new_nickname = req_data["new_nickname"]
            new_email = req_data["new_email"]
            current_password = req_data["current_password"]
            new_password = req_data["new_password"]
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()
        user = authenticate(
            request, username=username, password=current_password
        )
        if user is not None:
            target_user = User.objects.get(username=username)
            target_user.set_password(new_password)
            target_user.email = new_email
            target_user.nickname = new_nickname
            target_user.save()
            login(request, target_user)
            return HttpResponse(status=204)
        else:
            return HttpResponse(status=401)
    else:
        try:
            req_data = json.loads(request.body.decode())
            username = req_data["username"]
            current_password = req_data["current_password"]
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest
        user = authenticate(
            request, username=username, password=current_password
        )
        if user is not None:
            target_user = User.objects.get(username=username)
            target_user.delete()
            return HttpResponse(status=204)
        else:
            return HttpResponse(status=401)


@require_http_methods(["GET"])
@ensure_csrf_cookie
def signout(request):
    if request.user.is_authenticated:
        logout(request)
        return HttpResponse(status=204)
    else:
        return HttpResponse(status=401)


@require_http_methods(["POST"])
@ensure_csrf_cookie
# This function require lots of parameter so it can't reduce its Cognitive Complixity
# NOSONAR
def boards(request):
    try:
        req_data = json.loads(request.body.decode())
        board_name = req_data["boardName"]
        article_count = req_data["articlesPerRequest"]
        cur_page_num = req_data["currentPageNumber"]
        tag = req_data["filterCriteria"]
        sort_criteria = req_data["sortCriteria"]
        search_criteria = req_data["searchCriteria"]
        search_keyword = req_data["searchKeyword"]
    except (KeyError, JSONDecodeError):
        return HttpResponseBadRequest()
    if board_name == "all":
        article_list = cache.get("articles_all")
        if not article_list:
            article_list = [
                article
                for article in Article.objects.select_related("vote")
                .filter(board=board_name)
                .values(
                    "id",
                    "title",
                    "content",
                    "author__nickname",
                    "tag",
                    "vote__like",
                    "vote__dislike",
                )
            ]
            cache.set("articles_all", article_list)
    else:
        article_list = cache.get("articles_hot")
        if not article_list:
            article_list = [
                article
                for article in Article.objects.select_related("vote")
                .filter(board=board_name)
                .values(
                    "id",
                    "title",
                    "content",
                    "author__nickname",
                    "tag",
                    "vote__like",
                    "vote__dislike",
                )
            ]
            cache.set("articles_hot", article_list)
    if tag != "all":
        article_list = list(filter(lambda t: t["tag"] == tag, article_list))
    for article in article_list:
        article["vote_diff"] = article["vote__like"] - article["vote__dislike"]
    if search_keyword != "":
        if search_criteria == "nickname":
            article_list = [
                article
                for article in article_list
                if article["author__nickname"].find(search_keyword) != -1
            ]
        else:  # if search_criteria == 'title':
            article_list = [
                article
                for article in article_list
                if article["title"].find(search_keyword) != -1
            ]
    if sort_criteria == "good":
        article_list = sorted(
            article_list, key=itemgetter("vote_diff"), reverse=True
        )
    elif sort_criteria == "new":
        article_list.reverse()
    max_page = math.ceil(len(article_list) / article_count)
    if len(article_list) > article_count:
        article_list = article_list[
            article_count * (cur_page_num - 1) : article_count * cur_page_num
        ]
    return_list = [max_page, article_list]
    return JsonResponse(return_list, safe=False)


@require_http_methods(["POST"])
@ensure_csrf_cookie
def article(request):
    try:
        body = request.body.decode()
        title = json.loads(body)["title"]
        content = json.loads(body)["content"]
        author = request.user
    except (KeyError, JSONDecodeError):
        return HttpResponseBadRequest()
    new_article = Article(title=title, content=content, author=author)
    new_article.save()
    new_vote = Vote(article=new_article)
    new_vote.save()
    response_dict = {
        "id": new_article.id,
        "title": title,
        "content": content,
        "author__nickname": author.nickname,
        "like": new_vote.like,
        "dislike": new_vote.dislike,
        "tag": new_article.tag,
    }
    return JsonResponse(response_dict, status=201)


@require_http_methods(["GET", "PUT", "DELETE"])
@ensure_csrf_cookie
def article_detail(request, article_id):
    target_article = get_object_or_404(Article, pk=article_id)
    if request.method == "GET":
        response_dict = {
            "id": target_article.id,
            "title": target_article.title,
            "content": target_article.content,
            "author__nickname": target_article.author.nickname,
            "like": target_article.vote.like,
            "dislike": target_article.vote.dislike,
            "tag": target_article.tag,
        }
        return JsonResponse(response_dict, safe=False)
    elif request.method == "PUT":
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        if request.user.is_superuser:
            try:
                body = request.body.decode()
                new_tag = json.loads(body)["newTag"]
            except (KeyError, JSONDecodeError):
                return HttpResponseBadRequest()
            target_article.tag = new_tag
            target_article.save()
            response_dict = {
                "id": target_article.id,
                "title": target_article.title,
                "content": target_article.content,
                "author__nickname": target_article.author.nickname,
                "like": target_article.vote.like,
                "dislike": target_article.vote.dislike,
                "tag": target_article.tag,
            }
            return JsonResponse(response_dict, status=200)
        elif target_article.author.id is not request.user.id:
            return HttpResponseForbidden()
        try:
            body = request.body.decode()
            ar_title = json.loads(body)["title"]
            ar_content = json.loads(body)["content"]
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()
        target_article.title = ar_title
        target_article.content = ar_content
        target_article.save()
        response_dict = {
            "id": target_article.id,
            "title": target_article.title,
            "content": target_article.content,
            "author__nickname": target_article.author.nickname,
            "like": target_article.vote.like,
            "dislike": target_article.vote.dislike,
            "tag": target_article.tag,
        }
        return JsonResponse(response_dict, status=200)
    else:
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        if target_article.author.id is not request.user.id:
            return HttpResponseForbidden()
        target_article.delete()
        return HttpResponse(status=200)


@require_http_methods(["PUT"])
@ensure_csrf_cookie
def vote(request, article_id):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    user = request.user
    try:
        body = request.body.decode()
        request_vote = json.loads(body)["vote"]
    except (KeyError, JSONDecodeError):
        return HttpResponseBadRequest()
    target_vote = Vote.objects.get(article__id=article_id)
    is_voted_like = user.liker.filter(article=article_id)
    is_voted_dislike = user.disliker.filter(article=article_id)
    if (not is_voted_like) and (not is_voted_dislike):
        if request_vote == "like":
            target_vote.like += 1
            target_vote.like_voter.add(user)
        else:
            target_vote.dislike += 1
            target_vote.dislike_voter.add(user)
    elif is_voted_like:
        target_vote.like -= 1
        target_vote.like_voter.remove(user)
    else:
        target_vote.dislike -= 1
        target_vote.dislike_voter.remove(user)
    target_vote.save()
    target_article = target_vote.article
    dif = target_vote.like - target_vote.dislike
    if dif > 10:
        target_article.board = "hot"
    else:
        target_article.board = "all"
    target_article.save()
    response_dict = {"like": target_vote.like, "dislike": target_vote.dislike}
    return JsonResponse(response_dict, status=200)


@require_http_methods(["GET", "POST", "PUT", "DELETE"])
def comment(request, id):
    if request.method == "GET":
        comment = Comment.objects.filter(article=id).values(
            "article", "content", "author__nickname", "id"
        )
        comment_json = list(comment)
        return JsonResponse(comment_json, status=200, safe=False)
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    user = request.user

    if request.method == "POST":
        try:
            req_data = json.loads(request.body.decode())
            content = req_data["content"]
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()
        article = Article.objects.get(id=id)
        new_comment = Comment(article=article, content=content, author=user)
        new_comment.save()
        comments = Comment.objects.filter(article=id).values(
            "article", "content", "author__nickname", "id"
        )
        comment_json = list(comments)
        return JsonResponse(comment_json, status=201, safe=False)

    if request.method == "PUT":
        try:
            req_data = json.loads(request.body.decode())
            comment_id = req_data["commentId"]
            content = req_data["content"]
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()

        edit_comment = get_object_or_404(Comment, pk=comment_id)
        edit_comment.content = content
        edit_comment.save()
        return HttpResponse(status=201)

    if request.method == "DELETE":
        try:
            req_data = json.loads(request.body.decode())
            comment_id = req_data["commentId"]
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()

        article_to_delete = get_object_or_404(Comment, pk=comment_id)
        article_to_delete.delete()
        return HttpResponse(status=204)
