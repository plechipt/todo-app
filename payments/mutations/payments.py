import os

import graphene
import stripe
from graphene_django.types import DjangoObjectType
from graphql_jwt.decorators import login_required

# Get both stripe keys from environment variables
STRIPE_TEST_SECRET_KEY = os.environ.get('STRIPE_TEST_SECRET_KEY') 
STRIPE_LIVE_SECRET_KEY = os.environ.get('STRIPE_LIVE_SECRET_KEY') 

# Price code for product
TEST_PRODUCT_PRICE = 'price_1I1VSYFJBInLPu36ADPik2IN'
LIVE_PRODUCT_PRICE = 'price_1Hn5ncFJBInLPu362CpNESpw'

BASE_URL = os.environ.get('TODO_APP_BASE_URL')

class CreateCheckoutSession(graphene.Mutation):
    session = graphene.JSONString()

    def mutate(root, info, input=None):
        stripe.api_key = STRIPE_TEST_SECRET_KEY

        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price': TEST_PRODUCT_PRICE,
                'quantity': 1,
            }],
            mode='payment',
            success_url=f'{BASE_URL}?success=true',
            cancel_url=f'{BASE_URL}?canceled=true',
        )

        return CreateCheckoutSession(session=session)
