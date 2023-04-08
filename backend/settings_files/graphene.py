
import os
from datetime import timedelta

HOST_URL = os.getenv('HOST_URL')

GRAPHENE = {
    "SCHEMA": "backend.schema.schema",
    'MIDDLEWARE': [
        'graphql_jwt.middleware.JSONWebTokenMiddleware',
    ],
}

GRAPHQL_JWT = {
    #'JWT_COOKIE_DOMAIN': HOST_URL,
    'JWT_COOKIE_SAMESITE': 'None',
    'JWT_COOKIE_SECURE': True,
    'JWT_VERIFY_EXPIRATION': True,
    'JWT_LONG_RUNNING_REFRESH_TOKEN': False,
    'JWT_EXPIRATION_DELTA': timedelta(days=7),
    #'JWT_REFRESH_EXPIRATION_DELTA': timedelta(days=7),
    
    # Rename JWT cookie tokens
    'JWT_COOKIE_NAME': 'accessToken',
    #'JWT_REFRESH_TOKEN_COOKIE_NAME': 'refreshToken',
}

AUTHENTICATION_BACKENDS = [
    'graphql_jwt.backends.JSONWebTokenBackend',
    'django.contrib.auth.backends.ModelBackend',
]