import os
import sys
from pathlib import Path

backend_root = Path(__file__).resolve().parent
sys.path.insert(0, str(backend_root))

os.environ.setdefault('DATABASE_URL', 'sqlite:///./app.db')
