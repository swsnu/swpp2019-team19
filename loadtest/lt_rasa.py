def request_func():
    import requests, json

    data = {
        "sender": "testuser1",
        "message": "Tell me the menu at Student Center",
    }
    response = requests.post(
        "http://localhost:5010/webhooks/rest/webhook", data=json.dumps(data)
    )

    if response.status_code != 200:
        print(response.status_code)
        print("failure")
    else:
        sample = "breakfast<br>scrambled eggs with tomato<br>lunch<br>bowl of rice topped with tofu in mapa sauce🥗<br><br/><br>dried pollack soup<br><br/><br>steamed pork belly in soy sauce<br><br/><br>hot and spicy chicken with cheese & hot dog<br>dinner<br>seafood and chicken fried rice with nasi goreng sauce<br><br/><br>braised mackerel pike<br>"
        if response.json()[0]["text"] != sample:
            print("failure")
            print(response.json())
        else:
            print("success")
    return response


from loadtest import LoadTester

load_tester = LoadTester(n_jobs=10, worker=request_func, count=10)
load_tester.start()
