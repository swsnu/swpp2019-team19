def request_func():
    import requests, json

    data = {
        "currentPageNumber": 1,
        "filterCriteria": "all",
        "sortCriteria": "new",
        "searchCriteria": "",
        "searchKeyword": "",
        "boardName": "all",
        "articlesPerRequest": 6,
    }
    response = requests.post(
        "http://localhost:8000/api/boards/", data=json.dumps(data)
    )

    if response.status_code != 200:
        print(response.status_code)
    else:
        sample = [
            17,
            [
                {
                    "id": 110,
                    "title": "서비스 언어",
                    "content": "영어와 한국어 이외의 언어도 서비스 할 계획이 있나요?",
                    "author__nickname": "Dotson",
                    "tag": "normal",
                    "vote__like": 1,
                    "vote__dislike": 0,
                    "vote_diff": 1,
                },
                {
                    "id": 109,
                    "title": "동작 안함",
                    "content": "챗봇이 동작하지 않아요",
                    "author__nickname": "Johns",
                    "tag": "normal",
                    "vote__like": 1,
                    "vote__dislike": 0,
                    "vote_diff": 1,
                },
                {
                    "id": 108,
                    "title": "대화 내용 불러오기",
                    "content": "이전 대화 내용을 불러올 수 있나요?",
                    "author__nickname": "Deleon",
                    "tag": "normal",
                    "vote__like": 1,
                    "vote__dislike": 0,
                    "vote_diff": 1,
                },
                {
                    "id": 107,
                    "title": "대화 내용 저장",
                    "content": "혹시 대화 내용은 저장이 되나요?",
                    "author__nickname": "Obleton",
                    "tag": "normal",
                    "vote__like": 0,
                    "vote__dislike": 0,
                    "vote_diff": 0,
                },
                {
                    "id": 106,
                    "title": "음성 인식",
                    "content": "혹시 음성으로 입력할 수 없나요?",
                    "author__nickname": "Miller",
                    "tag": "normal",
                    "vote__like": 0,
                    "vote__dislike": 0,
                    "vote_diff": 0,
                },
                {
                    "id": 105,
                    "title": "특정 단어에 응답 안함",
                    "content": "특정 단어를 입력하면 응답이 나오질 않아요",
                    "author__nickname": "Deeds",
                    "tag": "normal",
                    "vote__like": 0,
                    "vote__dislike": 0,
                    "vote_diff": 0,
                },
            ],
        ]
        if response.json() != sample:
            print(response.json())
    return response


from loadtest import LoadTester

load_tester = LoadTester(n_jobs=10, worker=request_func, count=100)
load_tester.start()
