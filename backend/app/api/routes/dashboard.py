from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.routes.auth import get_current_user
from app.core.database import get_db
from app.models.scan import Scan

router = APIRouter(prefix='/dashboard', tags=['dashboard'])


@router.get('/farmer')
def farmer_dashboard(current_user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user['role'] != 'farmer':
        return {'message': 'Access denied'}

    scans = (
        db.query(Scan)
        .filter(Scan.user_email == current_user['email'])
        .order_by(Scan.created_at.desc())
        .limit(10)
        .all()
    )
    return {
        'message': 'Farmer dashboard ready',
        'user': current_user,
        'stats': {
            'total_scans': len(scans),
            'healthy_crops': sum(1 for scan in scans if 'healthy' in scan.disease_name.lower()),
            'diseased_crops': sum(1 for scan in scans if 'healthy' not in scan.disease_name.lower()),
        },
        'recent_scans': [
            {
                'crop': 'Unknown',
                'disease': scan.disease_name,
                'confidence': scan.confidence_percentage,
                'date': scan.created_at.strftime('%Y-%m-%d') if scan.created_at else '',
                'status': 'Healthy' if 'healthy' in scan.disease_name.lower() else 'Diseased',
            }
            for scan in scans
        ],
    }


@router.get('/admin')
def admin_dashboard(current_user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user['role'] != 'admin':
        return {'message': 'Access denied'}

    scans = db.query(Scan).order_by(Scan.created_at.desc()).limit(20).all()
    return {
        'message': 'Admin dashboard ready',
        'user': current_user,
        'stats': {
            'total_scans': len(scans),
            'healthy_crops': sum(1 for scan in scans if 'healthy' in scan.disease_name.lower()),
            'diseased_crops': sum(1 for scan in scans if 'healthy' not in scan.disease_name.lower()),
        },
        'recent_scans': [
            {
                'user': scan.user_email,
                'disease': scan.disease_name,
                'confidence': scan.confidence_percentage,
                'date': scan.created_at.strftime('%Y-%m-%d') if scan.created_at else '',
            }
            for scan in scans
        ],
    }
