from rest_framework import serializers
from .models import Curriculum, Experience, Formation, Hobby, Info, Language, Skill

class InfoSerializer(serializers.ModelSerializer):
    lastname = serializers.CharField(required=False)  
    
    class Meta:
        model = Info
        fields = ['id', 'lastname', 'firstname', 'type_of_contract', 'date_of_birth', 'place_of_birth', 'address', 'city', 'state', 'zipcode', 'phone', 'email', 'photo', 'motivation']
        
    def validate_lastname(self, value):
        if not value:
            raise serializers.ValidationError("The lastname field cannot be empty.")
        return value

class HobbySerializer(serializers.ModelSerializer):
    class Meta:
        model = Hobby
        fields = '__all__'

    def validate_title_hobby(self, value):
        if not value: 
            raise serializers.ValidationError("The title_hobby field cannot be empty.")
        return value
        
class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'
        
    def validate_title_skill(self, value):
        if not value:
            raise serializers.ValidationError("The title_skill field cannot be empty.")
        return value    
        
class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ['id', 'title_language', 'niveau_language']  
        
    def validate_title_language(self, value):
        if not value:
            raise serializers.ValidationError("The title_language field cannot be empty.")
        
        return value   
        
class FormationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Formation
        fields = ['id', 'title_formation', 'description_formation', 'business', 'start_date_of_formation', 'end_date_of_formation', 'location_formation']
    
    def validate_title_formation(self, value):
        if not value:
            raise serializers.ValidationError("The title_formation field cannot be empty.")
        return value   
        
class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ['id', 'title_experience', 'description_experience', 'business', 'start_date_of_experience', 'end_date_of_experience', 'location_experience']  
        
    def validate_title_experience(self, value):
        if not value:
            raise serializers.ValidationError("The title_experience field cannot be empty.")
        return value    

class CurriculumSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Curriculum
        fields = ['id', 'title', 'user', 'created_at', 'updated_at', 'infos', 'hobbies', 'formations', 'experiences', 'skills', 'languages']
        
    
    infos = InfoSerializer(many=True, read_only=True)
    hobbies = HobbySerializer(many=True, read_only=True)
    formations = FormationSerializer(many=True, read_only=True)
    experiences = ExperienceSerializer(many=True, read_only=True)
    skills = SkillSerializer(many=True, read_only=True)
    languages = LanguageSerializer(many=True, read_only=True)

class CurriculumCretateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Curriculum
        fields = ['id', 'title', 'user', 'created_at', 'updated_at', 'infos', 'hobbies', 'formations', 'experiences', 'skills', 'languages']

    def create(self, validated_data):
        infos_data = validated_data.pop('infos', [])
        hobbies_data = validated_data.pop('hobbies', [])
        formations_data = validated_data.pop('formations', [])
        experiences_data = validated_data.pop('experiences', [])
        skills_data = validated_data.pop('skills', [])
        languages_data = validated_data.pop('languages', [])
        
        curriculum = Curriculum.objects.create(**validated_data)
    
        if infos_data:
            infos_instances = [Info.objects.create(**info_data) if isinstance(info_data, dict) else info_data for info_data in infos_data]
            curriculum.infos.set(infos_instances)
    
        if hobbies_data:
            hobbies_instances = [Hobby.objects.get_or_create(**hobby_data)[0] if isinstance(hobby_data, dict) else hobby_data for hobby_data in hobbies_data]
            curriculum.hobbies.set(hobbies_instances)
            
        if formations_data:
            formations_instances = [Formation.objects.get_or_create(**formation_data)[0] if isinstance(formation_data, dict) else formation_data for formation_data in formations_data]
            curriculum.formations.set(formations_instances)
            
        if experiences_data:
            experiences_instances = [Experience.objects.get_or_create(**experience_data)[0] if isinstance(experience_data, dict) else experience_data for experience_data in experiences_data]
            curriculum.experiences.set(experiences_instances)
            
        if skills_data:
            skills_instances = [Skill.objects.get_or_create(**skill_data)[0] if isinstance(skill_data, dict) else skill_data for skill_data in skills_data]
            curriculum.skills.set(skills_instances)
            
        if languages_data:
            languages_instances = [Language.objects.get_or_create(**language_data)[0] if isinstance(language_data, dict) else language_data for language_data in languages_data]
            curriculum.languages.set(languages_instances)
                
        return curriculum


