import os
from django.http import HttpResponse

HOST_URL = os.getenv('HOST_URL')

def delete_cookies(request):
    print(HOST_URL)
    response = HttpResponse("Cookies Deleted")
    response.delete_cookie("accessToken", domain=HOST_URL, path="/")
    response.delete_cookie("refreshToken", domain=HOST_URL path="/")

    return response 
