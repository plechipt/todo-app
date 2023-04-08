from django.conf import settings

def delete_token_cookie(response):
    response.delete_cookie(
       'accessToken',
        domain=settings.JWT_COOKIE_DOMAIN,
        path=settings.JWT_COOKIE_PATH,
        secure=settings.JWT_COOKIE_SECURE,
        httponly=settings.JWT_COOKIE_HTTPONLY,
        samesite='None'
    )

