const API = import.meta.env.VITE_API_URL;

export async function getDashboardData() {
  const [orders, customers, revenue, avgOrder] = await Promise.all([
    fetch(`${API_URL}/total-orders`).then((res) => res.json()),
    fetch(`${API_URL}/total-customers`).then((res) => res.json()),
    fetch(`${API_URL}/total-revenue`).then((res) => res.json()),
    fetch(`${API_URL}/average-order-value`).then((res) => res.json()),
  ]);

  return {
    orders: orders.total_orders,
    customers: customers.total_customers,
    revenue: revenue.total_revenue,
    avgOrder: avgOrder.average_order_value,
  };
}
export async function getRevenueTrend() {
  const response = await fetch(
    "http://127.0.0.1:8000/revenue-trend"
  );

  return response.json();
}
export async function getCategorySales() {
  const response = await fetch(
    "http://127.0.0.1:8000/category-sales"
  );

  return response.json();
}
export async function getTopProducts() {
  const response = await fetch(
    "http://127.0.0.1:8000/top-products"
  );

  return response.json();
}
export const getMonthlyRevenue = async () => {
  const response = await fetch(
  "http://127.0.0.1:8000/monthly-revenue"
);

return response.json();
};

export const getProducts = async () => {
  const response = await fetch(
    "http://127.0.0.1:8000/products"
  );

  return response.json();
};

export const getTopCustomers = async () => {
  const response = await fetch(
    "http://127.0.0.1:8000/top-customers"
  );

  return response.json();
};

export const getCategoryKpis = async () => {
  const response = await fetch(
    "http://127.0.0.1:8000/category-kpis"
  );

  return response.json();
};