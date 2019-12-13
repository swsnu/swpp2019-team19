#!/bin/bash
find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
find . -path "*/migrations/*.pyc" -delete
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py createsuperuser
for filename in ../Init_db/*.py; do
  python3 manage.py shell < $filename
done
for filename in ../Additional_db/*.py; do
  python3 manage.py shell < $filename
done