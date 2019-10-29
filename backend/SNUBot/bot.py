'''
from SNUBot import settings
from django.core.management import setup_environ
setup_environ(settings)
'''
from django.contrib.auth.models import User  # pylint: disable=C0411, C0413, C0412, C0410
from community.models import Article, Vote  # pylint: disable=C0411, C0413, C0412, C0410
'''
초기 유저 세팅
이거 하기 전에 migrate, createsuperuser해야함
'''
for i in range(1, 41):
    username = 'user' + str(i)
    password = 'swppswpp'
    user = User.objects.create_user(username=username, password=password)
    user.save()

for i in range(1, 161):
    title = 'article ' + str(i)
    content = title + ' content'
    author = User.objects.get(id=(i) % 40+2)
    if i % 4 == 1:
        tag = 'normal'
    elif i % 4 == 2:
        tag = 'working'
    elif i % 4 == 3:
        tag = 'done'
    else:
        tag = 'rejected'
    article = Article(title=title, content=content, author=author, tag=tag)
    article.save()

for i in range(1, 161):
    article = Article.objects.get(id=i)
    vote = Vote(article=article)
    vote.save()

'''
Vote 세팅
'''
for i in range(81, 161):
    vote = Vote.objects.get(id=i)
    for j in range(2, 42 - (i % 30)):
        if ((i % 40) != j):
            user = User.objects.get(id=j)
            vote.like_voter.add(user)
            vote.like += 1
            dif = vote.like - vote.dislike
            if dif > 10:
                vote.article.board = 'hot'
            else:
                vote.article.board = 'all'
            vote.save()
            vote.article.save()
