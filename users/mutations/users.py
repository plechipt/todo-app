import graphene
from django import forms
from graphene_django import DjangoObjectType
from django.contrib.auth.forms import UserCreationForm
from graphene_django.forms.mutation import DjangoModelFormMutation
from django.contrib.auth import authenticate, login, logout
from graphql_jwt.decorators import login_required

from users.models import CustomUser


class UserType(DjangoObjectType):
    class Meta:
        model = CustomUser

class RegisterForm(UserCreationForm):

    class Meta:
        model = CustomUser
        fields = ['username', 'password1', 'password2']


class CreateAnonymousUser(graphene.Mutation):
    user = graphene.Field(UserType)

    def mutate(self, info):
        request = info.context
        session_id = request.headers['X-Session-Id']

        user, created = CustomUser.objects.get_or_create(session_id=session_id)

        if created:
            user.username = session_id 
            user.save()

        return user 


class Register(DjangoModelFormMutation):
    user = graphene.Field(UserType)

    class Meta:
        form_class = RegisterForm
        return_field_name = 'user'

    
class Login(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)

    message = graphene.String()

    def mutate(self, info, username, password):
        request = info.context
        user = authenticate(username=username, password=password)
        current_user = request.user

        if user is None:
            message = "You provided wrong credentials!"

        elif current_user.is_authenticated:
            message = 'User is already authenticated!'

        else:
            message = 'Success!'
            login(request, user)

        return Login(message)


class Logout(graphene.Mutation):
    message = graphene.String()

    def mutate(self, info, input=None):
        request = info.context
        user = request.user

        if user.is_authenticated:
            message = 'Success!'
            logout(request)
        
        else:
            message = 'User is not authenticated!'

        return Logout(message)


class VerifyAccessToken(graphene.Mutation):
    is_expired = graphene.String()

    def mutate(self, info, input=None):
        is_expired = None
        request = info.context
        user = request.user
        access_token = request.COOKIES.get('accessToken')
        refresh_token = request.COOKIES.get('refreshToken')

        token_expired = refresh_token != None and access_token == None
        user_is_not_authenticated = user.is_authenticated == False

        if token_expired:
            is_expired = True
      
        elif user_is_not_authenticated:
            is_expired = None
        
        else:
            is_expired = False

        return VerifyAccessToken(is_expired)