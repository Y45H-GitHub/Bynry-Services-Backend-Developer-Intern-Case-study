from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth import login, logout
from django.contrib.auth.models import User
from .models import ServiceRequest, ServiceRequestComment, UserProfile
from .serializers import (
    UserSerializer,
    UserProfileSerializer,
    ServiceRequestSerializer,
    ServiceRequestCommentSerializer
)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    @action(detail=False, methods=['post'])
    def register(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            profile_data = {
                'user': user,
                'account_number': f'ACC{user.id}',
                'address': request.data.get('address', ''),
                'phone': request.data.get('phone', '')
            }
            UserProfile.objects.create(**profile_data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def login(self, request):
        user = User.objects.filter(email=request.data.get('email')).first()
        if user and user.check_password(request.data.get('password')):
            login(request, user)
            profile = UserProfile.objects.get(user=user)
            data = UserProfileSerializer(profile).data
            return Response(data)
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def logout(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)

class ServiceRequestViewSet(viewsets.ModelViewSet):
    serializer_class = ServiceRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return ServiceRequest.objects.all()
        return ServiceRequest.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def add_comment(self, request, pk=None):
        service_request = self.get_object()
        data = {
            'service_request': service_request.id,
            'user': request.user.id,
            'text': request.data.get('text')
        }
        serializer = ServiceRequestCommentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)