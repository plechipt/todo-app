import graphene
from .mutations.users import *
from .mutations.jwt import *


class UserMutation(AuthMutation, graphene.ObjectType):
    register = Register.Field()
    login = Login.Field()
    logout = Logout.Field()
    verify_access_token = VerifyAccessToken.Field()

    
class UserQuery(graphene.ObjectType):
    me = graphene.Field(UserType)

    def resolve_me(self, info):
        user = info.context.user

        if user.is_authenticated:
            return user
        else:
            return None