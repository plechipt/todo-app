import graphene
from .mutations.todos import *


class TodoMutation(graphene.ObjectType):
    create_todo = CreateTodo.Field()


class TodoQuery(graphene.ObjectType):
    todos = graphene.List(TodoType)

    def resolve_todos(root, info, **kwargs):
        return Todo.objects.all()