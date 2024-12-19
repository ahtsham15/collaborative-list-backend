from django.contrib import admin
from django.urls import path
from tasks.views.userView import RegisterView, LoginView
from tasks.views.taskListView import TaskListView, TaskListDetailView
from tasks.views.taskView import TaskDoView


from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/register/", RegisterView.as_view(), name="auth_register"),
    path("api/login/", LoginView.as_view(), name="auth_login"),
    path("api/task-list/", TaskListView.as_view(), name="task_list"),
    path(
        "api/task-list/<int:pk>/", TaskListDetailView.as_view(), name="task_list_detail"
    ),
    path("api/task-do/", TaskDoView.as_view(), name="task_do_view"),
    # path(
    #     "api/task-do/<int:id>/", TaskDoViewDetail.as_view(), name="task_do_view_detail"
    # ),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
