import os
from django.contrib import admin
from django.urls import path, re_path
from graphene_django.views import GraphQLView
from graphql_jwt.decorators import jwt_cookie
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView
from django.http import HttpResponse
from django.middleware.csrf import get_token

ADMIN_PATH = os.environ.get('TODO_APP_ADMIN_PATH')

class CustomGraphQLView(GraphQLView):
    def dispatch(self, request, *args, **kwargs):
        res = super(CustomGraphQLView, self).dispatch(request, *args, **kwargs)
        csrf_token = request.COOKIES.get('csrftoken')

        return res

urlpatterns = [
    path(f'{ADMIN_PATH}/', admin.site.urls),
    path('graphql/', jwt_cookie(GraphQLView.as_view(graphiql=False))),
    path('manifest.json', TemplateView.as_view(template_name='manifest.json', content_type='application/json')),
    path('service-worker.js', TemplateView.as_view(template_name='service-worker.js', content_type='application/javascript')),
    re_path('.*', TemplateView.as_view(template_name='index.html')),
]
