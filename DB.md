# Setting DB

## Install mySQL
```
sudo apt-get update
sudo apt-get install mysql-server
sudo ufw allow mysql
```

## Setting Korean
```
ls /etc/mysql/my.cnf -l
```
if my.cnf is link file, replace following path to original path
```
sudo vim /etc/mysql/my.cnf
```
add following line to the bottom of the file
```
[client]
default-character-set=utf8

[mysql]
default-character-set=utf8

[mysqld]
collation-server = utf8_unicode_ci
init-connect='SET NAMES utf8'
character-set-server = utf8
```

## Start mySQL
```
sudo systemctl start mysql
```
if you want to auto-start when re-boot
```
sudo systemctl enable mysql
``` 

## Make Table for SNUBot
```
sudo /usr/bin/mysql -u root -p
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

## Install for django(It might not need to install, please check it)
```
sudo apt-get install libmysqlclient-dev
pip install mysqlclient
```

## Check DB at shell
```
sudo /usr/bin/mysql -u SNUBot -p
Enter password: SNUBot

mysql> SHOW DATABASES;
looks like
+--------------------+
| Database           |
+--------------------+
| information_schema |
| SNUBot             |
+--------------------+
2 rows in set (0.00 sec)

mysql> SELECT DATABASE();
looks like
+------------+
| DATABASE() |
+------------+
| NULL       |
+------------+
mysql> USE SNUBot;

mysql> SELECT DATABASE();
looks like
+------------+
| DATABASE() |
+------------+
| SNUBot     |
+------------+
1 row in set (0.00 sec)

mysql> SHOW TABLES;
+------------------------------+
| Tables_in_SNUBot             |
+------------------------------+
| auth_group                   |
| auth_group_permissions       |
| auth_permission              |
| auth_user                    |
| auth_user_groups             |
| auth_user_user_permissions   |
| community_article            |
| community_vote               |
| community_vote_dislike_voter |
| community_vote_like_voter    |
| django_admin_log             |
| django_content_type          |
| django_migrations            |
| django_session               |
+------------------------------+
14 rows in set (0.00 sec)

mysql> DESC community_article;
+-----------+-------------+------+-----+---------+----------------+
| Field     | Type        | Null | Key | Default | Extra          |
+-----------+-------------+------+-----+---------+----------------+
| id        | int(11)     | NO   | PRI | NULL    | auto_increment |
| title     | varchar(64) | NO   |     | NULL    |                |
| content   | longtext    | NO   |     | NULL    |                |
| tag       | varchar(10) | NO   |     | NULL    |                |
| board     | varchar(10) | NO   |     | NULL    |                |
| date      | datetime(6) | NO   |     | NULL    |                |
| author_id | int(11)     | NO   | MUL | NULL    |                |
+-----------+-------------+------+-----+---------+----------------+
7 rows in set (0.00 sec)
```
you can update data using shell like following. update whose field name match with Value 
```
usage
mysql> UPDATE (TableName)
SET (FieldName1)=(UpdateData1), (FieldName2)=(UpdateData2), ...
WHERE (TargetFieldName)=(Value);

example
mysql> UPDATE community_article
SET title='modified title, by mySQL query'
WHERE author_id=20;
```

## Remove Database
if you want to remove previous database
```
sudo /usr/bin/mysql -u SNUBot -p
mysql> DROP DATABASE SNUBot
```

## mySQL Document
- [tutorial](https://dev.mysql.com/doc/refman/5.7/en/tutorial.html)
- [server](https://dev.mysql.com/doc/refman/5.7/en/server-administration.html)
- [shell for python](https://dev.mysql.com/doc/refman/5.7/en/mysql-shell-tutorial-python.html)