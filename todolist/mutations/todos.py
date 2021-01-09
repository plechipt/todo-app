import graphene
from todolist.models import Todo
from graphene_django import DjangoObjectType


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo


class CreateTodo(graphene.Mutation):
    class Arguments:
        content = graphene.String()

    todo = graphene.Field(TodoType)

    def mutate(root, info, content):
        user = info.context.user
        todo = Todo.objects.create(user=user, content=content)
        todo.save()

        return CreateTodo(todo=todo)

    