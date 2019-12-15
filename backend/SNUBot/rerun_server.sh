#!/bin/bash
tmux send-keys -t django:0.0 C-z 'python manage.py makemigrations' Enter
tmux send-keys -t rasa_eng_update:0.0 C-z 'rm models/*' Enter
tmux send-keys -t rasa_eng_update:0.0 C-z 'rasa train' Enter
tmux send-keys -t rasa_kor_update:0.0 C-z 'rm models/*' Enter
tmux send-keys -t rasa_kor_update:0.0 C-z 'rasa train' Enter
sleep 5
tmux send-keys -t django:0.0 C-z 'python manage.py migrate' Enter
sleep 5
fuser -k 8001/tcp
tmux send-keys -t django:0.0 C-z 'uwsgi --socket :8001 --module SNUBot.wsgi' Enter
sleep 30
fuser -k 5010/tcp
tmux send-keys -t rasa_eng:0.0 C-z 'python -m rasa run -m ./models --endpoints ./endpoints.yml --port 5010 --log-file ./logs/rasa.log -vv --enable-api --cors "*"' Enter
fuser -k 5055/tcp
tmux send-keys -t rasa_eng_action:0.0 C-z 'rasa run actions' Enter
fuser -k 5005/tcp
tmux send-keys -t rasa_kor:0.0 C-z 'python -m rasa run -m ./models --endpoints ./endpoints.yml --port 5005 --log-file ./logs/rasa.log -vv --enable-api --cors "*"' Enter
fuser -k 5060/tcp
tmux send-keys -t rasa_kor_action:0.0 C-z 'python -m rasa run actions --port 5060' Enter
