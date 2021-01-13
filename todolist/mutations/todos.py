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


class UpdateTodo(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        new_content = graphene.String()

    todo = graphene.Field(TodoType)

    def mutate(root, info, id, new_content):
        user = info.context.user
        todo = Todo.objects.get(id=id)

        todo.content = new_content        
        todo.save()

        return UpdateTodo(todo=todo)


class DeleteTodo(graphene.Mutation):
    class Arguments:
        id = graphene.ID()

    message = graphene.String()

    def mutate(root, info, id):
        todo = Todo.objects.get(id=id)
        todo.delete()
        message = 'Success'

        return DeleteTodo(message=message)


class SetCompleted(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        isCompleted = graphene.Boolean()

    todo = graphene.Field(TodoType)

    def mutate(root, info, id, isCompleted):
        todo = Todo.objects.get(id=id)
        todo.completed = isCompleted
        todo.save()

        return SetCompleted(todo=todo)
    

class ToggleCompleted(graphene.Mutation):
    class Arguments:
        id = graphene.ID()

    todo = graphene.Field(TodoType)

    def mutate(root, info, id):
        todo = Todo.objects.get(id=id)
        completed = todo.completed 
        opposite = not completed

        todo.completed = opposite
        todo.save()

        return ToggleCompleted(todo=todo)
    
    