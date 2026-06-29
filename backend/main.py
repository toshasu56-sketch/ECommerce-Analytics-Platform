from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from database import engine
import init_db
import import_data
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Home & Health
# -----------------------------

@app.get("/")
def home():
    return {"message": "E-Commerce Analytics API Running"}

@app.get("/health")
def health():
    return {"status": "Connected Successfully"}


# -----------------------------
# KPI APIs
# -----------------------------

@app.get("/total-orders")
def total_orders():
    with engine.connect() as conn:
        result = conn.execute(text("SELECT COUNT(*) FROM orders"))
        total = result.scalar()

    return {"total_orders": total}


@app.get("/total-customers")
def total_customers():
    with engine.connect() as conn:
        result = conn.execute(text("SELECT COUNT(*) FROM customers"))
        total = result.scalar()

    return {"total_customers": total}


@app.get("/total-revenue")
def total_revenue():
    with engine.connect() as conn:
        result = conn.execute(text("SELECT SUM(sales) FROM orders"))
        revenue = result.scalar()

    return {"total_revenue": float(revenue or 0)}


@app.get("/average-order-value")
def average_order_value():
    with engine.connect() as conn:
        result = conn.execute(text("SELECT AVG(sales) FROM orders"))
        avg_value = result.scalar()

    return {"average_order_value": float(avg_value or 0)}


# -----------------------------
# Revenue Trend
# -----------------------------

@app.get("/revenue-trend")
def revenue_trend():
    with engine.connect() as conn:
        result = conn.execute(text("""
            SELECT
                order_date,
                SUM(sales) AS revenue
            FROM orders
            GROUP BY order_date
            ORDER BY order_date
        """))

        data = [
            {
                "date": str(row[0]),
                "revenue": float(row[1])
            }
            for row in result
        ]

    return data


# -----------------------------
# Category Sales
# -----------------------------

@app.get("/category-sales")
def category_sales():
    with engine.connect() as conn:
        result = conn.execute(text("""
            SELECT
                p.category,
                SUM(o.sales) AS total_sales
            FROM orders o
            JOIN products p
                ON o.product_id = p.product_id
            GROUP BY p.category
        """))

        data = [
            {
                "category": row[0],
                "sales": float(row[1])
            }
            for row in result
        ]

    return data


# -----------------------------
# Top Products
# -----------------------------

@app.get("/top-products")
def top_products():
    with engine.connect() as conn:
        result = conn.execute(text("""
            SELECT
                p.product_name,
                SUM(o.sales) AS total_sales
            FROM orders o
            JOIN products p
                ON o.product_id = p.product_id
            GROUP BY p.product_name
            ORDER BY total_sales DESC
            LIMIT 5
        """))

        data = [
            {
                "product": row[0],
                "sales": float(row[1])
            }
            for row in result
        ]

    return data


# -----------------------------
# Monthly Revenue
# -----------------------------

@app.get("/monthly-revenue")
def monthly_revenue():
    with engine.connect() as conn:
        result = conn.execute(text("""
            SELECT
                TO_CHAR(
                    TO_DATE(order_date, 'DD-MM-YYYY'),
                    'YYYY-MM'
                ) AS month,
                SUM(sales) AS revenue
            FROM orders
            GROUP BY
                TO_CHAR(
                    TO_DATE(order_date, 'DD-MM-YYYY'),
                    'YYYY-MM'
                )
            ORDER BY month
        """))

        data = [
            {
                "month": row[0],
                "revenue": float(row[1])
            }
            for row in result
        ]

    return data


# -----------------------------
# Products Table
# -----------------------------

@app.get("/products")
def get_products():
    with engine.connect() as conn:
        result = conn.execute(text("""
            SELECT
                product_id,
                product_name,
                category,
                price
            FROM products
            ORDER BY product_name
        """))

        data = [
            {
                "id": row[0],
                "name": row[1],
                "category": row[2],
                "price": float(row[3])
            }
            for row in result
        ]

    return data


# -----------------------------
# Top Customers
# -----------------------------

@app.get("/top-customers")
def top_customers():
    with engine.connect() as conn:
        result = conn.execute(text("""
            SELECT
                c.customer_name,
                SUM(o.sales) AS total_sales
            FROM orders o
            JOIN customers c
                ON o.customer_id = c.customer_id
            GROUP BY c.customer_name
            ORDER BY total_sales DESC
            LIMIT 5
        """))

        data = [
            {
                "customer": row[0],
                "sales": float(row[1])
            }
            for row in result
        ]

    return data

@app.get("/category-kpis")
def category_kpis():
    with engine.connect() as conn:
        result = conn.execute(text("""
            SELECT
                p.category,
                SUM(o.sales) AS revenue
            FROM orders o
            JOIN products p
                ON o.product_id = p.product_id
            GROUP BY p.category
            ORDER BY revenue DESC
        """))

        data = [
            {
                "category": row[0],
                "revenue": float(row[1])
            }
            for row in result
        ]

    return data

from sqlalchemy import text

@app.get("/check-date-type")
def check_date_type():
    with engine.connect() as conn:
        result = conn.execute(text("""
            SELECT
                column_name,
                data_type
            FROM information_schema.columns
            WHERE table_name='orders';
        """))

        return [
            {
                "column": row[0],
                "type": row[1]
            }
            for row in result
        ]
