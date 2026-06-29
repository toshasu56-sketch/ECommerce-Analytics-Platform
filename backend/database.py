import pandas as pd
from sqlalchemy import create_engine

DATABASE_URL = "postgresql://ecommerce_analytics_1kdt_user:YYUU9eOTLjSBqNqXNkaiBlYBkb5n9nsF@dpg-d8vnssjtqb8s73f15q4g-a.oregon-postgres.render.com/ecommerce_analytics_1kdt"

engine = create_engine(DATABASE_URL)