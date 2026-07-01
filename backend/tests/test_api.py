import os
import unittest

from fastapi.testclient import TestClient
from sqlalchemy import inspect

os.environ['DATABASE_URL'] = 'sqlite:///./test_auth.db'

from app.core.database import engine, init_db
from app.main import app


class ApiTests(unittest.TestCase):
    def test_health_endpoint(self):
        client = TestClient(app)
        response = client.get('/health')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['status'], 'ok')

    def test_database_initialization_creates_expected_tables(self):
        init_db()
        inspector = inspect(engine)
        tables = inspector.get_table_names()
        self.assertIn('users', tables)
        self.assertIn('scans', tables)

    def test_farmer_registration_returns_token_and_persists_user(self):
        init_db()
        client = TestClient(app)
        payload = {
            'full_name': 'New Farmer',
            'email': 'newfarmer@example.com',
            'phone': '+94770000000',
            'username': 'newfarmer',
            'password': 'strongpass123',
            'role': 'farmer',
        }

        response = client.post('/auth/register', json=payload)

        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.json().get('access_token'))
        self.assertEqual(response.json().get('role'), 'farmer')


if __name__ == '__main__':
    unittest.main()
