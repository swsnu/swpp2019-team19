```
enable your venv
pip3 install -r requirements-dev.txt
pip3 install -r requirements-docs.txt
pip install rasa-x --extra-index-url https://pypi.rasa.com/simple
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