#!/bin/bash
for filename in ../Additional_db/*.py; do
  python3 manage.py shell < $filename
  mv $filename ../Done_db/
done