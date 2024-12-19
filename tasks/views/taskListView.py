from rest_framework import generics
from tasks.models.taskListModel import TaskList
from tasks.models.userModel import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from tasks.serializers import TaskListSerializer


class TaskListView(APIView):
    def post(self, request):
        if not request.user.is_authenticated:
            return Response(
                {"status": "error", "message": "Access token not provided or invalid"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        try:
            try:
                user = User.objects.get(username=request.user.username)
            except User.DoesNotExist:
                return Response(
                    {"status": "error", "message": "User not found"},
                    status=status.HTTP_401_UNAUTHORIZED,
                )

            request.data["created_by"] = user.id
            shared_with = request.data.get("shared_with", [])

            if not isinstance(shared_with, list):
                return Response(
                    {"status": "error", "message": "Invalid format for shared_with"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            shared_with_users = User.objects.filter(id__in=shared_with)
            shared_usernames = [user.username for user in shared_with_users]
            print("Shared usernames:", shared_usernames)
            if len(shared_with_users) != len(shared_with):
                return Response(
                    {"status": "error", "message": "Some users Id are not valid"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            serializer = TaskListSerializer(data=request.data)
            if serializer.is_valid():
                task_list = serializer.save()
                task_list.shared_with.set(shared_with_users)
                # shared_users_data = task_list.shared_with.all().values('id', 'username', 'email')
                # print("Task List shared with users details:", list(shared_users_data))
                task_list.save()
                serializer_data = serializer.data.copy()
                serializer_data["shared_with"] = shared_usernames
                # print("serializer data: ", serializer_data)
                # room_name = "test_consumer_group"
                # send_task_update_message(
                #     room_name, {"message": "Task list created", "data": serializer_data}
                # )
                serializer = TaskListSerializer(task_list)
                return Response(
                    {"status": "success", "data": serializer_data},
                    status=status.HTTP_201_CREATED,
                )
            else:
                return Response(
                    {"status": "error", "errors": serializer.errors},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        except Exception as e:
            return Response(
                {"status": "error", "message": f"Error: {e}"},
                status=status.HTTP_400_BAD_REQUEST,
            )
