import graphene
from .mutations.payments import CreateCheckoutSession

class PaymentMutation(graphene.ObjectType):
    create_checkout_session = CreateCheckoutSession.Field()