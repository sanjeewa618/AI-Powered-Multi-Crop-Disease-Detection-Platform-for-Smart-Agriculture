from sqlalchemy import Column, DateTime, Float, Integer, String
from sqlalchemy.sql import func

from app.core.database import Base


class Scan(Base):
    __tablename__ = 'scans'

    id = Column(Integer, primary_key=True, index=True)
    user_email = Column(String(255), nullable=False, index=True)
    disease_name = Column(String(255), nullable=False)
    confidence_percentage = Column(Float, nullable=False)
    severity_level = Column(String(50), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
