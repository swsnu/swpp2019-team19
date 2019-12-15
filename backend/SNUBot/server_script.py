import redis
import os
import time

while True:
    r = redis.StrictRedis(host="127.0.0.1", port=6379, db=0)
    flag = r.get("update_flag")
    if not flag:
        r.set("update_flag", 0)
    elif flag == b"1":
        os.system("./rerun_server.sh")
        r.set("update_flag", 0)
    else:
        time.sleep(3)

