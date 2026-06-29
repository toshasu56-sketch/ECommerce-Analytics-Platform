const API_URL = import.meta.env.VITE_API_URL;

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
  const response = await fetch(`${API_URL}/revenue-trend`);
  return response.json();
}

export async function getCategorySales() {
  const response = await fetch(`${API_URL}/category-sales`);
  return response.json();
}

export async function getTopProducts() {
  const response = await fetch(`${API_URL}/top-products`);
  return response.json();
}

export const getMonthlyRevenue = async () => {
  const response = await fetch(`${API_URL}/monthly-revenue`);
  return response.json();
};

export const getProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  return response.json();
};

export const getTopCustomers = async () => {
  const response = await fetch(`${API_URL}/top-customers`);
  return response.json();
};

export const getCategoryKpis = async () => {
  const response = await fetch(`${API_URL}/category-kpis`);
  return response.json();
};