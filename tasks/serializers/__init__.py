try:
    # from .userSerializer import UserSerializer, LoginSerializer
    from .userSerializer import UserSerializer, LoginSerializer
except ImportError:
    from rest_framework import serializers
    from tasks.models.userModel import User
    from django.contrib.auth.hashers import make_password
    # from tasks.models.taskListModel import TaskList
    from tasks.models.taskListModel import TaskList


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','email','password']


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','email','password']

    def create(self, validated_data):
        user = User(
            username = validated_data['username'],
            email = validated_data['email'],
            password = make_password(validated_data['password'])
        )
        user.save()
        return user


class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)
    # class Meta:
    #     model = User

class TaskListSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskList
        fields = ['id','name','created_by','shared_with','created_at','description']

    def create(self, validated_data):
        task_list = TaskList(
            name = validated_data['name'],
            created_by = validated_data['created_by'],
            description = validated_data['description']
        )
        task_list.save()
        return task_list
