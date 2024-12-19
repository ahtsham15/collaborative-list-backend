"""
ASGI config for collaborative_todo project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/asgi/
"""

# import os

# from django.core.asgi import get_asgi_application

# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'collaborative_todo.settings')

# application = get_asgi_application()

import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.urls import path
from tasks.consumers import TestConsumer

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'collaborative_todo.settings')

django_asgi_app = get_asgi_application()

# Define your WebSocket routing with dynamic room_name
ws_patterns = [
    # Here <str:room_name> captures dynamic room name (e.g., task list ID)
    path("ws/test/<str:room_name>/", TestConsumer.as_asgi()),
]

application = ProtocolTypeRouter({
    "http": django_asgi_app,
    "websocket": AuthMiddlewareStack(
        URLRouter(ws_patterns)
    ),
})
