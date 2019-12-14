#!/bin/bash
fuser -k 8001/tcp
fuser -k 5005/tcp
fuser -k 5010/tcp
fuser -k 5055/tcp
fuser -k 5060/tcp
echo 1

echo 2

tmux send-keys -t rasa_eng:0.0 C-z 'rm models/*' Enter
tmux send-keys -t rasa_eng:0.0 C-z 'rasa train' Enter
echo 3
tmux send-keys -t rasa_kor:0.0 C-z 'rm models/*' Enter
tmux send-keys -t rasa_kor:0.0 C-z 'rasa train' Enter
echo 4

tmux send-keys -t django:0.0 C-z 'uwsgi --socket :8001 --module SNUBot.wsgi' Enter
echo 5

sleep 30s
echo 6
tmux send-keys -t rasa_eng:0.0 C-z 'python -m rasa run -m ./models --endpoints ./endpoints.yml --port 5010 --log-file ./logs/rasa.log -vv --enable-api --cors "*"' Enter
echo 7

tmux send-keys -t rasa_eng_action:0.0 C-z 'rasa run actions' Enter
echo 8

tmux send-keys -t rasa_kor:0.0 C-z 'python -m rasa run -m ./models --endpoints ./endpoints.yml --port 5005 --log-file ./logs/rasa.log -vv --enable-api --cors "*"' Enter
echo 9

tmux send-keys -t rasa_kor_action:0.0 C-z 'python -m rasa run actions --port 5060' Enter
echo 10
