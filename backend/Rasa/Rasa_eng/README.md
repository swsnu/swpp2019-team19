```
enable your venv,
pip install rasa-x --extra-index-url https://pypi.rasa.com/simple
rasa train
mkdir logs
touch logs/rasa.log
python -m rasa run -m ./models --endpoints ./endpoints.yml --port 5010 --log-file ./logs/rasa.log -vv --enable-api --cors "*"
rasa run actions
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