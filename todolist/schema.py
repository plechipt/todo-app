import graphene
from .mutations.todos import *


class TodoMutation(graphene.ObjectType):
    create_todo = CreateTodo.Field()
    delete_todo = DeleteTodo.Field()
    set_completed = SetCompleted.Field()
    toggle_completed = ToggleCompleted.Field()


class TodoQuery(graphene.ObjectType):
    todos = graphene.List(TodoType)
    user_todos = graphene.List(TodoType)

    def resolve_todos(root, info, **kwargs):
        return Todo.objects.all()

    def resolve_user_todos(root, info, **kwargs):
        user = info.context.user

        return Todo.objects.filter(user=user)