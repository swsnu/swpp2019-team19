```
enable your venv, your venv must include rasa, mecab, python-mecab-ko
rasa train
mkdir logs
touch logs/rasa.log
python -m rasa run -m ./models --endpoints ./endpoints.yml --port 5005 --log-file ./logs/rasa.log -vv --enable-api --cors "*"
python -m rasa run actions --port 5060
```
```
post api
http://localhost:5010/webhooks/rest/webhook
content-type: application/json
send json file:
{
	"message":"안녕",
	"sender": "default"
}
response json file:
{
"recipient_id": "default",
"text": "안녕"
}
```