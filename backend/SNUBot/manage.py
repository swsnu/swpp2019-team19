#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
import multiprocessing as mp
import time


def main():
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "SNUBot.settings")
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


def foo():
    while True:
        print("hi")
        time.sleep(1)


if __name__ == "__main__":
    mp.set_start_method("spawn")
    q = mp.Queue()
    p1 = mp.Process(target=main)
    p2 = mp.Process(target=foo)
    p1.start()
    p2.start()
