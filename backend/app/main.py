from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import auth, dashboard, predictions
from app.core.database import init_db

app = FastAPI(title='KrushiMitra AI API', version='1.0.0')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(auth.router)
app.include_router(predictions.router)
app.include_router(dashboard.router)
init_db()


@app.get('/health')
def health_check():
    return {'status': 'ok', 'service': 'krushimitra-api'}
