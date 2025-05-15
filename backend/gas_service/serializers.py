from rest_framework import serializers
from django.contrib.auth.models import User
from .models import ServiceRequest, ServiceRequestAttachment, ServiceRequestComment, UserProfile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['email'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        return user

class UserProfileSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email')
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')

    class Meta:
        model = UserProfile
        fields = ('account_number', 'address', 'phone', 'email', 'first_name', 'last_name')

class ServiceRequestCommentSerializer(serializers.ModelSerializer):
    user_name = serializers.SerializerMethodField()

    class Meta:
        model = ServiceRequestComment
        fields = ('id', 'user', 'text', 'created_at', 'user_name')

    def get_user_name(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}"

class ServiceRequestAttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceRequestAttachment
        fields = ('id', 'file', 'uploaded_at')

class ServiceRequestSerializer(serializers.ModelSerializer):
    comments = ServiceRequestCommentSerializer(many=True, read_only=True)
    attachments = ServiceRequestAttachmentSerializer(many=True, read_only=True)
    assigned_to_name = serializers.SerializerMethodField()

    class Meta:
        model = ServiceRequest
        fields = '__all__'

    def get_assigned_to_name(self, obj):
        if obj.assigned_to:
            return f"{obj.assigned_to.first_name} {obj.assigned_to.last_name}"
        return None