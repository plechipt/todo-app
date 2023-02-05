
import os
import dj_database_url
from pathlib import Path

from backend.settings_files.basic import *
from backend.settings_files.development import *
from backend.settings_files.graphene import *

# Dotenv
from dotenv import load_dotenv
load_dotenv()

DEBUG = os.getenv('DEBUG')
SECRET_KEY = 'i6-+5%&cy7i-py74)-cjkyo=3l4ru+@3fs7u(#kq&fz4c%x4#%'
BASE_DIR = Path(__file__).resolve().parent.parent
DB_URL = os.getenv("DATABASE_URL")

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Connect postgres 
DATABASES['default'] = dj_database_url.config(
    default=DB_URL, 
    conn_max_age=600, 
    ssl_require=True
)

'''
Connect frontend to backend
'''

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
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

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles_build' / 'static'