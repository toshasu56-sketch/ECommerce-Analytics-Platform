import SalesForecastChart from "../components/SalesForecastChart";
import Notifications from "../components/Notifications";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useRef } from "react";
import { saveAs } from "file-saver";
import { useEffect, useState } from "react";
import KpiCard from "../components/KpiCard";
import RevenueChart from "../components/RevenueChart";
import CategoryChart from "../components/CategoryChart";
import TopProductsChart from "../components/TopProductsChart";
import MonthlyRevenueChart from "../components/MonthlyRevenueChart";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ProductTable from "../components/ProductTable";
import TopCustomersChart from "../components/TopCustomersChart";
import CategoryPieChart from "../components/CategoryPieChart";

import {
  getDashboardData,
  getRevenueTrend,
  getCategorySales,
  getMonthlyRevenue,
  getTopProducts,
  getProducts,
  getTopCustomers,
} from "../services/api";

function Dashboard() {
  const [data, setData] = useState(null);
  const [revenueData, setRevenueData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [topProductsData, setTopProductsData] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [products, setProducts] = useState([]);
  const [topCustomersData, setTopCustomersData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const dashboardRef = useRef(null);
const productsRef = useRef(null);
const customersRef = useRef(null);
const analyticsRef = useRef(null);
const revenueRef = useRef(null);

const exportToCSV = () => {
  const headers = ["ID", "Name", "Category", "Price"];

  const rows = filteredProducts.map((product) => [
    product.id,
    product.name,
    product.category,
    product.price,
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  saveAs(blob, "products.csv");
};

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

const loadDashboard = () => {
  getDashboardData().then(setData);
  getRevenueTrend().then(setRevenueData);
  getCategorySales().then(setCategoryData);
  getTopProducts().then(setTopProductsData);
  getMonthlyRevenue().then(setMonthlyRevenue);
  getProducts().then(setProducts);
  getTopCustomers().then(setTopCustomersData);
};
useEffect(() => {
  loadDashboard();
setLastUpdated(new Date());
  const interval = setInterval(() => {
    loadDashboard();
  }, 10000); // refresh every 10 seconds

  return () => clearInterval(interval);
}, []);
  useEffect(() => {
    getDashboardData().then(setData);
    getRevenueTrend().then(setRevenueData);
    getCategorySales().then(setCategoryData);
    getTopProducts().then(setTopProductsData);
    getMonthlyRevenue().then(setMonthlyRevenue);
    getProducts().then(setProducts);
    getTopCustomers().then(setTopCustomersData);
  }, []);
// fiter products based on search term and selected category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const filteredRevenueData = revenueData.filter((item) => {
  if (!startDate || !endDate) return true;

  return (
    item.date >= startDate &&
    item.date <= endDate
  );
});

const filteredMonthlyRevenue = monthlyRevenue.filter((item) => {
  if (!startDate || !endDate) return true;
const forecastData = monthlyRevenue.map((item, index) => ({
  month: item.month,
  actual: item.revenue,
  forecast:
    index >= monthlyRevenue.length - 3
      ? Math.round(item.revenue * 1.08)
      : null,
}));
  const monthDate = item.month + "-01";

  return (
    monthDate >= startDate &&
    monthDate <= endDate
  );
});

const forecastData = filteredMonthlyRevenue.map((item, index, array) => ({
  month: item.month,
  actual: item.revenue,
  forecast:
    index >= array.length - 3
      ? Math.round(item.revenue * 1.08)
      : null,
}));

// ================= Dashboard Insights =================

const totalRevenue = data ? data.revenue : 0;

const topCategory =
  categoryData.length > 0
    ? categoryData.reduce((a, b) =>
        a.sales > b.sales ? a : b
      )
    : null;

const topProduct =
  topProductsData.length > 0
    ? topProductsData.reduce((a, b) =>
        a.sales > b.sales ? a : b
      )
    : null;

const topCustomer =
  topCustomersData.length > 0
    ? topCustomersData.reduce((a, b) =>
        a.totalSpent > b.totalSpent ? a : b
      )
    : null;
    <Notifications darkMode={darkMode} />
    
  // Pagination Logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  if (!data) {
    return <h2>Loading Dashboard...</h2>;
  }

  return (
    <div style={{ display: "flex" }}>
<Sidebar
  sidebarOpen={sidebarOpen}
  setSidebarOpen={setSidebarOpen}
  dashboardRef={dashboardRef}
  productsRef={productsRef}
  customersRef={customersRef}
  analyticsRef={analyticsRef}
  revenueRef={revenueRef}
/>

<div
  style={{
    flex: 1,
    marginLeft: sidebarOpen ? "250px" : "80px",
width: sidebarOpen
  ? "calc(100% - 250px)"
  : "calc(100% - 80px)",
boxSizing: "border-box",
    padding: "20px",
    background: darkMode ? "#111827" : "#f3f4f6",
    color: darkMode ? "#ffffff" : "#000000",
    minHeight: "100vh",
    transition: "margin-left 0.3s ease",
  }}
>
        <Navbar />

        <div
  ref={dashboardRef}
  style={{
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "10px",
  }}
>
  <button
    onClick={() => setDarkMode(!darkMode)}
    style={{
      background: darkMode ? "#facc15" : "#111827",
      color: darkMode ? "#000" : "#fff",
      border: "none",
      padding: "10px 20px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
  </button>
</div>

        {/* KPI Cards */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          <KpiCard
  title="Total Revenue"
  value={`₹${data.revenue.toLocaleString()}`}
  trend="12.5%"
  positive={true}
  darkMode={darkMode}
/>

<KpiCard
  title="Total Orders"
  value={data.orders}
  trend="8.2%"
  positive={true}
/>

<KpiCard
  title="Customers"
  value={data.customers}
  trend="5.7%"
  positive={true}
/>

<KpiCard
  title="Avg Order Value"
  value={`₹${data.avgOrder.toFixed(2)}`}
  trend="1.3%"
  positive={false}
/>
</div>
  <h2>Date Filter</h2>

  <div style={{ display: "flex", gap: "20px" }}>
    <div>
      <label>From</label>
      <br />
      <input
  type="date"
  value={startDate}
  onChange={(e) => setStartDate(e.target.value)}
  style={{
    background: darkMode ? "#374151" : "#fff",
    color: darkMode ? "#fff" : "#000",
    border: "1px solid #ccc",
    padding: "8px",
    borderRadius: "6px",
  }}
/>
    </div>

    <div>
      <label>To</label>
      <br />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        style={{
          background: darkMode ? "#374151" : "#fff",
          color: darkMode ? "#fff" : "#000",
          border: "1px solid #ccc",
          padding: "8px",
          borderRadius: "6px",
        }}
      />
    </div>
        </div>
<div
  style={{
    marginTop: "20px",
    background: darkMode ? "#1f2937" : "white",
    color: darkMode ? "white" : "black",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  }}
>
  <div
  style={{
    marginTop: "25px",
    background: darkMode ? "#1f2937" : "#ffffff",
    color: darkMode ? "#ffffff" : "#111827",
    borderRadius: "14px",
    padding: "25px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
  }}
>
  <h2
    style={{
      marginBottom: "20px",
      color: darkMode ? "#ffffff" : "#111827",
    }}
  >
    🤖 Dashboard Insights
  </h2>
<div id="insights">
   {/* Dashboard Insights */}
</div>
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
      gap: "15px",
    }}
  >
    <div>
      💰 Revenue Generated
      <h3 style={{ color: "#22c55e" }}>
        ₹{totalRevenue.toLocaleString()}
      </h3>
    </div>

    <div>
      🏆 Best Selling Category
      <h3 style={{ color: "#3b82f6" }}>
        {topCategory?.category}
      </h3>
      <small>
        ₹{topCategory?.sales?.toLocaleString()}
      </small>
    </div>

    <div>
      📦 Top Product
      <h3 style={{ color: "#f59e0b" }}>
        {topProduct?.name}
      </h3>
      <small>
        ₹{topProduct?.sales?.toLocaleString()}
      </small>
    </div>

    <div>
      👑 Highest Spending Customer
      <h3 style={{ color: "#ec4899" }}>
        {topCustomer?.name}
      </h3>
      <small>
        ₹{topCustomer?.totalSpent?.toLocaleString()}
      </small>
    </div>

    <div>
      📈 Revenue Trend
      <h3 style={{ color: "#22c55e" }}>
        Growing
      </h3>
    </div>

    <div>
      📊 Orders Overview
      <h3>
        {data.orders.toLocaleString()} Orders
      </h3>
    </div>
  </div>
</div>


<div id="notifications">
    <Notifications darkMode={darkMode} />
</div>
<div id="forecast">
    <SalesForecastChart
        data={forecastData}
        darkMode={darkMode}
    />

  </div>
</div>

        {/* Charts */}
        <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
    gap: "20px",
    marginTop: "30px",
  }}
>
  <div ref={analyticsRef}>
  <div id="analytics">
  <RevenueChart data={filteredRevenueData} />
</div>
</div>

<div id="category">
  <CategoryChart data={categoryData} />
</div>
</div>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
    gap: "20px",
    marginTop: "30px",
  }}
>
  <div id="topproducts">
  <TopProductsChart data={topProductsData} />
</div>
<div ref={customersRef}>
  <div id="customers">
  <TopCustomersChart data={topCustomersData} />
</div>
</div>
</div>

<div
  id="revenue"
  ref={revenueRef}
>
  <MonthlyRevenueChart
    data={filteredMonthlyRevenue}
  />
</div>

<div id="forecast">
  <SalesForecastChart
    data={forecastData}
    darkMode={darkMode}
  />
</div>

<CategoryPieChart
  data={categoryData}
  darkMode={darkMode}
/>

        {/* Search + Filter */}
        <div
          style={{
            marginTop: "30px",
            background: darkMode ? "#374151" : "white",
            color: darkMode ? "white" : "black",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h2>Product Filters</h2>

          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            style={{
              width: "60%",
              padding: "12px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              marginBottom: "15px",
            }}
          />

          <br />

          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            style={{
              width: "50%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
          >
            <option value="All">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Sports">Sports</option>
            <option value="Books">Books</option>
            <option value="Home & Kitchen">Home & Kitchen</option>
          </select>
        </div>

<div id="export">
  <div
    style={{
      marginTop: "20px",
    marginBottom: "20px",
    display: "flex",
    justifyContent: "flex-end",
  }}
>  
</div>
  <button
    onClick={exportToCSV}
    style={{
      background: darkMode ? "#22c55e" : "#16a34a",
      color: "white",
      border: "none",
      padding: "12px 20px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    Export CSV
  </button>
</div>


        {/* Product Table */}
        <div
  id="products"
  ref={productsRef}
>
  <ProductTable
    products={currentProducts}
    darkMode={darkMode}
  />
</div>

        {/* Pagination */}
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.max(prev - 1, 1))
            }
            disabled={currentPage === 1}
            style={{
              padding: "8px 15px",
              cursor: "pointer",
            }}
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, totalPages)
              )
            }
            disabled={currentPage === totalPages}
            style={{
              padding: "8px 15px",
              cursor: "pointer",
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;