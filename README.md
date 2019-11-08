# swpp2019-team19

[![Build Status](https://travis-ci.com/swsnu/swpp2019-team19.svg?branch=master)](https://travis-ci.com/swsnu/swpp2019-team19)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=swsnu_swpp2019-team19&metric=alert_status)](https://sonarcloud.io/dashboard?id=swsnu_swpp2019-team19)
[![Coverage Status](https://coveralls.io/repos/github/swsnu/swpp2019-team19/badge.svg?branch=master)](https://coveralls.io/github/swsnu/swpp2019-team19?branch=master)



### Frontend
```
cd frontend
yarn install
yarn start
```


### Backend
Before you start, activate your virtual environment

#### DB
```
sudo apt-get update
sudo apt-get install mysql-server
sudo ufw allow mysql
sudo systemctl start mysql
sudo /usr/bin/mysql -u root -p
```
```
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY '{Your Password}';
mysql> CREATE DATABASE SNUBot;
mysql> CREATE USER 'SNUBot'@'localhost' IDENTIFIED BY 'SNUBot';
mysql> FLUSH PRIVILEGES;
mysql> GRANT ALL PRIVILEGES ON SNUBot.* to SNUBot@localhost;
mysql> FLUSH PRIVILEGES;
mysql> SELECT User, Host, authentication_string FROM mysql.user;
looks like this
+------------------+-----------+-------------------------------------------+
| User             | Host      | authentication_string                     |
+------------------+-----------+-------------------------------------------+
| root             | localhost |                                           |
| mysql.session    | localhost | *THISISNOTAVALIDPASSWORDTHATCANBEUSEDHERE |
| mysql.sys        | localhost | *THISISNOTAVALIDPASSWORDTHATCANBEUSEDHERE |
| debian-sys-maint | localhost | *7ACAB03EC0407C41295B499351B42422733CB3D0 |
| SNUBot           | localhost | *E3BB74A6B6602A192529C9CE550704029890C658 |
+------------------+-----------+-------------------------------------------+
```

```
sudo apt-get install libmysqlclient-dev
pip install mysqlclient
```

#### SNUBot
```
cd backend/SNUBot
pip install -r requirements.txt
bash init.sh
python manage.py runserver
```

#### Rasa
```
cd backend/Rasa
pip install rasa-x --extra-index-url https://pypi.rasa.com/simple
rasa train
mkdir log
touch log/rasa.log
python -m rasa run -m ./models --endpoints ./projects/endpoints.yml --port 5005 --log-file ./logs/rasa.log -vv --enable-api --cors "*"
```