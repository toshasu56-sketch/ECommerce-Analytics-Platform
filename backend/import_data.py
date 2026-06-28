import pandas as pd
from sqlalchemy import create_engine
import os

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)

# Read CSV files
customers = pd.read_csv("customers.csv")
products = pd.read_csv("products.csv")
orders = pd.read_csv("orders.csv")

# Upload to PostgreSQL
customers.to_sql("customers", engine, if_exists="replace", index=False)
products.to_sql("products", engine, if_exists="replace", index=False)
orders.to_sql("orders", engine, if_exists="replace", index=False)

print("✅ Database imported successfully!")