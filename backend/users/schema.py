import graphene
from graphene_django import DjangoObjectType
import graphql_jwt
from .models import User


class UserType(DjangoObjectType):
    class Meta:
        model = User

class UserMutation:
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()


class UserQuery:
    me = graphene.Field(UserType)

    def resolve_me(self, info):
        user = info.context.user

        if user.is_authenticated:
            return user
        else:
            return None

