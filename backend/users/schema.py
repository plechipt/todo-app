import graphene
import graphql_jwt
from django.dispatch import receiver
from graphql_jwt.refresh_token.signals import refresh_token_rotated

from .mutations.users import *


# Revoke refresh token after it has been used
@receiver(refresh_token_rotated)
def revoke_refresh_token(sender, request, refresh_token, **kwargs):
    refresh_token.revoke(request)


class UserMutation:
    register = Register.Field()
    login = Login.Field()
    logout = Logout.Field()
    verify_access_token = VerifyAccessToken.Field()

    # Django-graphql-jwt
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    delete_token_cookie = graphql_jwt.DeleteJSONWebTokenCookie.Field()
    delete_refresh_token_cookie = graphql_jwt.DeleteRefreshTokenCookie.Field()


class UserQuery:
    me = graphene.Field(UserType)

    def resolve_me(self, info):
        user = info.context.user

        if user.is_authenticated:
            return user
        else:
            return None

