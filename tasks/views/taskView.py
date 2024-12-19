from rest_framework.views import Response
from rest_framework import status
from rest_framework.views import APIView
from tasks.models.taskDoModel import TaskDo
from tasks.models.userModel import User
from tasks.serializers import TaskDoSerializer
from tasks.models.taskListModel import TaskList
from tasks.utils.constFunction import send_task_update_message


class TaskDoView(APIView):
    def post(self, request):
        if not request.user.is_authenticated:
            return Response(
                {"status": "error", "message": "Access token not provided or invalid"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        try:
            user_id = request.user.id
            try:
                user = User.objects.get(id=user_id)
                print("user: ", user)
            except User.DoesNotExist:
                return Response(
                    {"status": "error", "message": "User not found"},
                    status=status.HTTP_404_NOT_FOUND,
                )

            data = request.data.copy()
            if "is_completed" not in data:
                data["is_completed"] = False

            try:
                task_list_id = data.get("task_list")
                if task_list_id:
                    taskList = TaskList.objects.get(id=task_list_id)
                    print("TasK List: ", taskList.name)
            except TaskList.DoesNotExist:
                return Response(
                    {
                        "status": "error",
                        "message": "Invalid task list ID - task list does not exist",
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            print("data: ", data)
            serializer = TaskDoSerializer(data=data)
            if serializer.is_valid():
                task = serializer.save()
                serializer_data = serializer.data.copy()
                serializer_data["task_list"] = taskList.name
                print("serializer_data: ", serializer_data)
                room_name = "test_consumer_group"
                send_task_update_message(
                    room_name, {"message": "Task created", "data": serializer_data}
                )
                return Response(
                    {"status": "success", "data": serializer.data},
                    status=status.HTTP_201_CREATED,
                )
            else:
                return Response(
                    {"status": "error", "message": serializer.errors},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        except Exception as e:
            return Response(
                {"status": "error", "message": f"An error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def get(self, request):
        if not request.user.is_authenticated:
            return Response(
                {"status": "error", "message": "Access token not provided or invalid"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        try:
            user_id = request.user.id
            try:
                user = User.objects.get(id=user_id)
            except User.DoesNotExist:
                return Response(
                    {"status": "error", "message": "User not found"},
                    status=status.HTTP_404_NOT_FOUND,
                )
            tasks = TaskDo.objects.filter(user=user)
            serializer = TaskDoSerializer(tasks, many=True)
            return Response(
                {"status": "success", "data": serializer.data},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response(
                {"status": "error", "message": f"An error occured: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST,
            )