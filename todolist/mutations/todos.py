import graphene
#from django_graphql_ratelimit import ratelimit
from graphene_django import DjangoObjectType

from todolist.models import Todo
from users.models import CustomUser


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo


class CreateTodo(graphene.Mutation):
    class Arguments:
        content = graphene.String()

    todo = graphene.Field(TodoType)

    #@ratelimit(key="ip", rate="30/m", block=True)
    def mutate(root, info, content):
        request = info.context
        user = info.context.user

        if user.is_authenticated is False:
            session_id = request.headers['X-Session-Id']
            user = CustomUser.objects.filter(session_id=session_id)

            if not user:
                user = CustomUser.objects.create(session_id=session_id)
                user.username = session_id
                user.save()
            else:
                user = user[0]

        todo = Todo.objects.create(user=user, content=content)
        todo.save()

        return CreateTodo(todo=todo)


class UpdateTodo(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        new_content = graphene.String()

    todo = graphene.Field(TodoType)

    def mutate(root, info, id, new_content):
        todo = Todo.objects.get(id=id)

        todo.content = new_content        
        todo.save()

        return UpdateTodo(todo=todo)


class DeleteTodo(graphene.Mutation):
    class Arguments:
        id = graphene.ID()

    message = graphene.String()

    def mutate(root, info, id):
        todo_doesnt_exist = Todo.objects.filter(id=id).count() == 0

        if todo_doesnt_exist:
            return DeleteTodo(message="Post doesn't exist")

        todo = Todo.objects.get(id=id)
        todo.delete()

        return DeleteTodo(message='Success')


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
    