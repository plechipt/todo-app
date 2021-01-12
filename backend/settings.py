
import os
import dj_database_url
from pathlib import Path

from backend.settings_files.basic import *
from backend.settings_files.development import *
from backend.settings_files.graphene import *

BASE_DIR = Path(__file__).resolve().parent.parent
DEBUG = False 

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Connect postgres 
db_from_env = dj_database_url.config(conn_max_age=600, ssl_require=True)
DATABASES['default'].update(db_from_env)


'''
Connect frontend to backend
'''

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR / 'build')
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

STATICFILES_DIRS = [
    os.path.join(BASE_DIR / 'build' / 'static'),
]

STATIC_ROOT = os.path.join(BASE_DIR / 'staticfiles')
