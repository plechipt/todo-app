#!/bin/bash

# Build the project
echo "Building project"
python3.9 -m pip install -r requirements.txt

echo "Collect static..."
python3.9 manage.py collectstatic --noinput --clear

