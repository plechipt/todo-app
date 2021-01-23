import graphene
from users.schema import UserQuery, UserMutation
from todolist.schema import TodoQuery, TodoMutation
from payments.schema import PaymentMutation


class Query(UserQuery, TodoQuery, graphene.ObjectType):
    pass

class Mutation(UserMutation, TodoMutation, PaymentMutation, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)