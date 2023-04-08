import os

import graphene
import stripe
from graphene_django.types import DjangoObjectType
from graphql_jwt.decorators import login_required


STRIPE_SECRET_KEY = os.getenv('STRIPE_SECRET_KEY')
PRODUCT_PRICE = os.getenv('STRIPE_COFFEE_PRODUCT')

BASE_URL = os.getenv('HOST_URL')

class CreateCheckoutSession(graphene.Mutation):
    session = graphene.JSONString()

    def mutate(root, info, input=None):
        stripe.api_key = STRIPE_SECRET_KEY

        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price': PRODUCT_PRICE,
                'quantity': 1,
            }],
            mode='payment',
            success_url=f'{BASE_URL}?success=true',
            cancel_url=f'{BASE_URL}',
        )

        return CreateCheckoutSession(session=session)
