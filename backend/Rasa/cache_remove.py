import redis
import time
from datetime import datetime, timedelta


date = 1214


while True:
    dt = datetime.now() + timedelta(hours=9)
    tg_str = str(dt.month) + str(dt.day)
    if int(tg_str) != date:
        r = redis.StrictRedis(host="127.0.0.1", port=6379, db=2)
        cursor = "0"
        cursor, data = r.scan(cursor, str(date) + "*", 1000)
        for cache in data:
            r.delete(cache.decode("utf-8"))
        date = int(tg_str)
    else:
        time.sleep(6000)

