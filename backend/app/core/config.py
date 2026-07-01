import os
from dataclasses import dataclass


@dataclass
class Settings:
    app_name: str = 'KrushiMitra AI API'
    debug: bool = True
    secret_key: str = os.getenv('SECRET_KEY', 'dev-secret-key-change-me')
    algorithm: str = 'HS256'
    access_token_expire_minutes: int = int(os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES', '60'))
    model_path: str = os.getenv('MODEL_PATH', '../ai/models/mobilenetv2_final.keras')
    class_names_path: str = os.getenv('CLASS_NAMES_PATH', '../ai/models/class_names.json')


settings = Settings()
