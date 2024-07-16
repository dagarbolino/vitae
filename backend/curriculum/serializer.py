from rest_framework import serializers
from .models import Curriculum, Experience, Formation, Hobby, Info, Language, Skill

class InfoSerializer(serializers.ModelSerializer):
    lastname = serializers.CharField(required=False)  # Rend le champ lastname optionnel
    
    class Meta:
        model = Info
        fields = ['id', 'active', 'lastname', 'firstname', 'type_of_contract', 'date_of_birth', 'place_of_birth', 'address', 'city', 'state', 'zipcode', 'phone', 'email', 'photo', 'motivation']
        
    def validate_lastname(self, value):
        if not value:
            raise serializers.ValidationError("The lastname field cannot be empty.")
        if Info.objects.filter(lastname=value).exists():
            raise serializers.ValidationError("This lastname already exists")
        return value

class HobbySerializer(serializers.ModelSerializer):
    class Meta:
        model = Hobby
        fields = '__all__'

    def validate_title_hobby(self, value):
        if not value:  # Vérifie si la valeur est None ou une chaîne vide
            raise serializers.ValidationError("The title_hobby field cannot be empty.")
        if Hobby.objects.filter(title_hobby=value).exists():
            raise serializers.ValidationError("This title already exists")
        return value
        

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'
        
    def validate_title_skill(self, value):
        if not value:
            raise serializers.ValidationError("The title_skill field cannot be empty.")
        if Skill.objects.filter(title_skill=value).exists():
            raise serializers.ValidationError("This title already exists")
        return value    
        
        
class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ['id', 'active', 'title_language', 'niveau_language']  
        
    def validate_title_language(self, value):
        if not value:
            raise serializers.ValidationError("The title_language field cannot be empty.")
        if Language.objects.filter(title_language=value).exists():
            raise serializers.ValidationError("This title already exists")
        return value   
        
        
class FormationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Formation
        fields = ['id', 'active', 'title_formation', 'description_formation', 'business', 'start_date_of_formation', 'end_date_of_formation', 'location_formation']
    
    def validate_title_formation(self, value):
        if not value:
            raise serializers.ValidationError("The title_formation field cannot be empty.")
        if Formation.objects.filter(title_formation=value).exists():
            raise serializers.ValidationError("This title already exists")
        return value   
        
        
class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ['id', 'active', 'title_experience', 'description_experience', 'business', 'start_date_of_experience', 'end_date_of_experience', 'location_experience']  
        
    def validate_title_experience(self, value):
        if not value:
            raise serializers.ValidationError("The title_experience field cannot be empty.")
        if Experience.objects.filter(title_experience=value).exists():
            raise serializers.ValidationError("This title already exists")
        return value    
        
                

        
class CurriculumSerializer(serializers.ModelSerializer):
    infos = InfoSerializer(many=True, read_only=True)
    hobbies = HobbySerializer(many=True, read_only=True)
    formations = FormationSerializer(many=True, read_only=True)
    experiences = ExperienceSerializer(many=True, read_only=True)
    skills = SkillSerializer(many=True, read_only=True)
    languages = LanguageSerializer(many=True, read_only=True)
    

    class Meta:
        model = Curriculum
        fields = ['id', 'title', 'active', 'created_at', 'updated_at', 'infos', 'hobbies', 'formations', 'experiences', 'skills', 'languages']
        
        
    def validate_title(self, value):
        if not value:
            raise serializers.ValidationError("The title field cannot be empty.")
        if Curriculum.objects.filter(title=value).exists():
            raise serializers.ValidationError("This title already exists")
        return value    

