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


class DeleteTodo(graphene.Mutation):
    class Arguments:
        id = graphene.ID()

    message = graphene.String()

    def mutate(root, info, id):
        todo = Todo.objects.get(id=id)
        todo.delete()
        message = 'Success'

        return DeleteTodo(message=message)
    