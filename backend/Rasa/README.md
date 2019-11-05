```
enable your venv, your venv must installed with rasa

python -m rasa run -m ./models --endpoints ./projects/endpoints.yml --port 5001 --log-file ./logs/rasa.log -vv --enable-api
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