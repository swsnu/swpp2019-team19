# swpp2019-team19

[![Build Status](https://travis-ci.com/swsnu/swpp2019-team19.svg?branch=master)](https://travis-ci.com/swsnu/swpp2019-team19)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=swsnu_swpp2019-team19&metric=alert_status)](https://sonarcloud.io/dashboard?id=swsnu_swpp2019-team19)
[![Coverage Status](https://coveralls.io/repos/github/swsnu/swpp2019-team19/badge.svg?branch=master)](https://coveralls.io/github/swsnu/swpp2019-team19?branch=master)



## Frontend
```
cd frontend
yarn install
yarn start
```


## Backend
Before you start
* activate your virtual environment, if you don't have virtual environment or following, install it.
make sure that your `python` version is `3.5.x` or `3.6.x` for tensorflow
```
pip install django
pip install django-cors-headers
pip install rasa-x --extra-index-url https://pypi.rasa.com/simple
```
* make mySQL DB Table. Check [here](https://github.com/swsnu/swpp2019-team19/blob/master/DB.md)



### SNUBot
```
cd backend/SNUBot
bash init.sh
python manage.py runserver
```

### Rasa
```
cd backend/Rasa/Rasa_eng
rasa train
mkdir logs
touch logs/rasa.log
python -m rasa run -m ./models --endpoints ./projects/endpoints.yml --port 5005 --log-file ./logs/rasa.log -vv --enable-api --cors "*"
```
