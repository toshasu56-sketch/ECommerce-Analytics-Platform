from sqlalchemy import create_engine

DATABASE_URL = "postgresql://postgres:Data123@localhost:5432/ecommerce_analytics"

engine = create_engine(DATABASE_URL)