#!/bin/bash
python3 manage.py shell < ../Init_db/rasa_eng_init_db.py
python3 manage.py shell < ../Init_db/rasa_kor_init_db.py
for filename in ../Additional_db/*.py; do
  python3 manage.py shell < $filename
  mv $filename ../Done_db/
done