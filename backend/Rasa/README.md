```
enable your venv,
pip install rasa-x --extra-index-url https://pypi.rasa.com/simple
rasa train
mkdir log
touch log/rasa.log
python -m rasa run -m ./models --endpoints ./projects/endpoints.yml --port 5005 --log-file ./logs/rasa.log -vv --enable-api --cors "*"
```
```
post api
http://localhost:5005/webhooks/rest/webhook
content-type: application/json
send json file:
{
	"message":"goodbye",
	"sender": "default"
}
response json file:
{
"recipient_id": "default",
"text": "Bye"
}
```