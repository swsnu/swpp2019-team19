'''
from SNUBot import settings
from django.core.management import setup_environ
setup_environ(settings)
'''
from account.models import User  # pylint: disable=C0411, C0413, C0412, C0410
from community.models import Article, Vote  # pylint: disable=C0411, C0413, C0412, C0410
'''
초기 유저 세팅
이거 하기 전에 migrate, createsuperuser해야함
'''
nickname_list = [
    'Leardi',
    'Bethea', 
    'Keena', 
    'Lawson', 
    'Hellman', 
    'Knoll',
    'Burnett',
    'Philipps',
    'Richard',
    'Morrow',
    'Maack',
    'Harrold',
    'Blanco',
    'Campbell',
    'Ewing',
    'Yarbrough',
    'Freehan',
    'Deeds',
    'Miller',
    'Obleton',
    'Deleon',
    'Johns',
    'Dotson',
    'Signorile',
    'Palacios',
    'Dona',
    'Briscoe',
    'Martin',
    'Evans',
    'Macvane',
    'Engelhardt',
    'Fagan',
    'Pander',
    'Testerman',
    'Mccarty',
    'Stewart',
    'Bonds',
    'Wray',
    'Braun',
    'Kujawa'
]
title_list = [
    'Stupid bot',
    'Input error',
    'Does not reply',
    'Response time',
    'Mixed input',
    'Word error',
    'Regarding voice',
    'Regarding chat log',
    'get chat log',
    'not working',
    'language',
    '멍청한 봇',
    '입력 에러',
    '응답 에러',
    '응답 시간',
    '영어와 한국어 동시 입력',
    '특정 단어에 응답 안함',
    '음성 인식',
    '대화 내용 저장',
    '대화 내용 불러오기',
    '동작 안함',
    '서비스 언어',
]
content_list = [
    'I think this bot is stupid.',
    'It doesn\'t understand my input.',
    'This bot doesn\'t reply.',
    'response time is too long',
    'it doesn\'t reply when input both english and korean',
    'some words doesn\'t reply',
    'can i input by voice?',
    'Are you guys save our chat log?',
    'Is there a way to get a previous chat?',
    'SNUBot doesn\'t work',
    'If you have a plan to service another language?',
    '봇이 너무 멍청해요',
    '말을 입력했더니 알아먹지를 못하네요.',
    '입력했는데 대답을 안해요',
    '응답 시간이 너무 깁니다.',
    '영어와 한국어를 섞어서 입력하면 대답을 못하는 것 같아요.',
    '특정 단어를 입력하면 응답이 나오질 않아요',
    '혹시 음성으로 입력할 수 없나요?',
    '혹시 대화 내용은 저장이 되나요?',
    '이전 대화 내용을 불러올 수 있나요?',
    '챗봇이 동작하지 않아요',
    '영어와 한국어 이외의 언어도 서비스 할 계획이 있나요?',
]

for i in range(1, 41):
    username = 'user' + str(i)
    email = username+'@snubot.com'
    nickname = nickname_list[i-1]
    password = 'swppswpp'
    user = User.objects.create_user(username=username, email=email, nickname=nickname, password=password)
    user.save()

for j in range(1, 6):
    for i in range(1, 23):
        title = title_list[i-1]
        content = content_list[i-1]
        author = User.objects.get(id=(i%40 + 2))
        tag = 'normal'
        article = Article(title=title, content=content, author=author, tag=tag)
        article.save()
        vote = Vote(article=article)
        vote.save()


'''
Vote 세팅
'''
for i in range(1, 6):
    vote = Vote.objects.get(id=i)
    for j in range(2, 42):
        if ((i%40 + 2) != j):
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
            if dif > 10:
                break;

for i in range(17, 22):
    vote = Vote.objects.get(id=i)
    for j in range(2, 42):
        if ((i%40 + 2) != j):
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
            if dif > 10:
                break;
