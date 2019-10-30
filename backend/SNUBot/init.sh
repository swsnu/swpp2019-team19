pip install django
pip install django-cors-headers
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py createsuperuser
python3 manage.py shell < ./bot.py
