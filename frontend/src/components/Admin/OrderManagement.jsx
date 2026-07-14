import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchAllOrders,
  updateOrderStatus,
} from "../../redux/slices/adminOrderSlice";
import Pagination from "../Common/Pagination.jsx";
import { IoArrowBack, IoRefresh } from "react-icons/io5";
import { FiDownload } from "react-icons/fi";
import Breadcrumbs from "../Common/Breadcrumbs.jsx";
import Skeleton from "../Common/Skeleton.jsx";

const OrderManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [sortBy, setSortBy] = useState("latest");

  const { user } = useSelector((state) => state.auth);
  const { orders, loading, error } = useSelector((state) => state.adminOrders);

  const filteredOrders = useMemo(() => {
    let data = [...orders];
    // Search
    if (searchTerm.trim()) {
      const keyword = searchTerm.toLowerCase();
      data = data.filter(
        (order) =>
          order._id.toLowerCase().includes(keyword) ||
          order.user?.name?.toLowerCase().includes(keyword) ||
          order.user?.email?.toLowerCase().includes(keyword),
      );
    }
    // Status
    if (statusFilter !== "All") {
      data = data.filter((order) => order.status === statusFilter);
    }
    // Payment
    if (paymentFilter !== "All") {
      data = data.filter(
        (order) =>
          (order.paymentStatus || order.isPaid ? "Paid" : "Pending") ===
          paymentFilter,
      );
    }
    // Sorting
    switch (sortBy) {
      case "oldest":
        data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;

      case "highest":
        data.sort((a, b) => b.totalPrice - a.totalPrice);
        break;

      case "lowest":
        data.sort((a, b) => a.totalPrice - b.totalPrice);
        break;

      default:
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    return data;
  }, [orders, searchTerm, statusFilter, paymentFilter, sortBy]);

  // ✅ PAGINATION LOGIC
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirst, indexOfLast);

  // const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  // const processingOrders = orders.filter(
  //   (order) => order.status === "Processing",
  // ).length;
  // const deliveredOrders = orders.filter(
  //   (order) => order.status === "Delivered",
  // ).length;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    if (!user && user.role !== "admin") {
      navigate("/");
    } else {
      dispatch(fetchAllOrders());
    }
  }, [dispatch, navigate, user]);

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ id: orderId, status: newStatus }));
  };

  const pendingOrders = orders.filter(
    (order) => order.status === "Processing" || order.status === "Pending",
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered",
  ).length;

  const totalRevenue = orders
    .filter((order) => order.status === "Delivered")
    .reduce((total, order) => total + order.totalPrice, 0);

  if (loading) {
    return (
      <div className="space-y-5">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-28 animate-pulse rounded-xl bg-neutral-200"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="rounded-xl border border-red-200 bg-red-50 p-10 text-center">
          <h2 className="text-xl font-semibold text-error">
            Unable to load orders
          </h2>
          <p className="mt-3 text-body">{error}</p>
          <button
            onClick={() => dispatch(fetchAllOrders())}
            className="mt-6 rounded-lg bg-primary-500 px-6 py-3 text-white"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-8 py-8 font-manrope">
      {/* ================= BREADCRUMBS ================= */}
      <Breadcrumbs
        showHome={false}
        variant="light"
        className="mb-6"
        items={[
          {
            label: "Dashboard",
            href: "/admin",
          },
          {
            label: "Orders",
          },
        ]}
      />

      {/* ================= HERO ================= */}
      {/* <div className="mb-8 overflow-hidden rounded-xl border border-border bg-gradient-to-br from-white via-white to-primary-50 shadow-sm">
        <div className="flex flex-col justify-between gap-8 p-8 lg:flex-row lg:items-center">
       
          <div className="flex items-start gap-5">
            <button
              onClick={() => window.history.back()}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-white transition hover:bg-neutral-100"
            >
              <IoArrowBack />
            </button>
            <div>
              <h1 className="font-dm-serif text-3xl tracking-tight text-heading">
                Order Management
              </h1>
              <p className="mt-3 max-w-2xl text-[15px] leading-7 text-body">
                Manage customer orders, update order status and monitor the
                complete order lifecycle.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-primary-100 bg-white px-6 py-5 text-center shadow-sm">
            <p className="text-xs uppercase tracking-widest text-body">
              Total Orders
            </p>
            <h2 className="mt-2 text-4xl font-bold text-heading">
              {orders.length}
            </h2>
          </div>
        </div>
      </div> */}

      {/* ================= Header ================= */}
      <div className="mb-6 overflow-hidden flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        {/* <button
          type="button"
          onClick={() => window.history.back()}
          className="p-2 rounded-md hover:bg-gray-100 transition"
        >
          <IoArrowBack className="text-xl" />
        </button> */}
        <div>
          <h1 className="font-dm-serif text-3xl tracking-tight text-heading">
            Order Management
          </h1>

          <p className="mt-3 max-w-2xl text-[15px] leading-7 text-body">
            Manage customer orders, update order status and monitor the complete
            order lifecycle.
          </p>
        </div>
        {/* <div className="ml-auto flex gap-3">
          <button
            onClick={() => dispatch(fetchAllOrders())}
            className="flex items-center gap-2 rounded-lg border border-border bg-white px-4 py-2.5 font-medium hover:bg-neutral-50"
          >
            <IoRefresh />
            Refresh
          </button>

          <button className="flex items-center gap-2 rounded-lg bg-primary-500 px-5 py-2.5 font-medium text-white hover:bg-primary-600">
            <FiDownload />
            Export
          </button>
        </div> */}
      </div>

      {/* ================= QUICK STATS ================= */}
      {/* <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        
        <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-wider text-body">
            Total Orders
          </p>
          <p className="mt-3 text-3xl font-bold text-heading">
            {orders.length}
          </p>
          <p className="mt-1 text-sm text-body">All customer orders</p>
        </div>

        
        <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-wider text-body">
            Pending Orders
          </p>
          <p className="mt-3 text-3xl font-bold text-warning">
            {pendingOrders}
          </p>
          <p className="mt-1 text-sm text-body">Require attention</p>
        </div>

        
        <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-wider text-body">
            Delivered
          </p>
          <p className="mt-3 text-3xl font-bold text-success">
            {deliveredOrders}
          </p>
          <p className="mt-1 text-sm text-body">Successfully completed</p>
        </div>

        
        <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-wider text-body">Revenue</p>
          <p className="mt-3 text-3xl font-bold text-heading">
            ₹{totalRevenue.toLocaleString()}
          </p>
          <p className="mt-1 text-sm text-body">Delivered orders only</p>
        </div>
      </div> */}

      {/* ================= Filtered Orders ================= */}
      {/* <div className="mb-6 rounded-xl border border-border bg-white p-5 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-5">
         
          <input
            type="text"
            placeholder="Search Order ID, Customer..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-lg border border-border px-4 py-2.5 outline-none focus:border-primary-500"
          />

          
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-lg border border-border px-4 py-2.5"
          >
            <option>All</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>

          
          <select
            value={paymentFilter}
            onChange={(e) => {
              setPaymentFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-lg border border-border px-4 py-2.5"
          >
            <option>All</option>
            <option>Paid</option>
            <option>Pending</option>
          </select>

          
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-lg border border-border px-4 py-2.5"
          >
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Amount</option>
            <option value="lowest">Lowest Amount</option>
          </select>

         
          <button
            onClick={() => {
              setSearchTerm("");
              setStatusFilter("All");
              setPaymentFilter("All");
              setSortBy("latest");
              setCurrentPage(1);
            }}
            className="rounded-lg bg-primary-500 px-5 py-2.5 font-medium text-white hover:bg-primary-600"
          >
            Reset Filters
          </button>
        </div>
      </div> */}

      {/* ================= ORDERS CARD ================= */}
      <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
        {/* Header */}
        <div className="flex flex-col gap-6 border-b border-border p-6 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-heading">Orders</h2>
            <p className="mt-1 text-sm text-body">
              Manage customer orders, payments and delivery status.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => dispatch(fetchAllOrders())}
              className="flex h-11 items-center gap-2 rounded-md border border-border bg-white px-5 font-medium hover:bg-neutral-50"
            >
              <IoRefresh />
              Refresh
            </button>
            <button className="flex h-11 items-center gap-2 rounded-md bg-primary-500 px-5 font-medium text-white hover:bg-primary-600">
              <FiDownload />
              Export
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="grid gap-5 border-b border-border p-6 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-body">
              Total Orders
            </p>
            <h2 className="mt-2 text-4xl font-bold text-heading">
              {orders.length}
            </h2>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-body">
              Pending
            </p>
            <h2 className="mt-2 text-4xl font-bold text-warning">
              {pendingOrders}
            </h2>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-body">
              Delivered
            </p>
            <h2 className="mt-2 text-4xl font-bold text-success">
              {deliveredOrders}
            </h2>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-body">
              Revenue
            </p>
            <h2 className="mt-2 text-4xl font-bold text-heading">
              ₹{totalRevenue.toLocaleString()}
            </h2>
          </div>
        </div>

        {/* Filters */}
        <div className="grid gap-4 border-b border-border p-6 xl:grid-cols-[2fr_1fr_1fr_1fr_auto]">
          <input
            type="text"
            placeholder="Search Order ID, Customer..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="h-11 rounded-md border border-border px-4"
          />
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="h-11 rounded-md border border-border px-3"
          >
            <option>All</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>

          <select
            value={paymentFilter}
            onChange={(e) => {
              setPaymentFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="h-11 rounded-md border border-border px-3"
          >
            <option>All</option>
            <option>Paid</option>
            <option>Pending</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setCurrentPage(1);
            }}
            className="h-11 rounded-md border border-border px-3"
          >
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Amount</option>
            <option value="lowest">Lowest Amount</option>
          </select>

          <button
            onClick={() => {
              setSearchTerm("");
              setStatusFilter("All");
              setPaymentFilter("All");
              setSortBy("latest");
              setCurrentPage(1);
            }}
            className="h-11 rounded-md bg-secondary-500 px-6 font-medium text-white hover:bg-secondary-600"
          >
            Reset
          </button>
        </div>
      </div>

      {/* ================= ORDERS TABLE ================= */}
      <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="border-b border-border bg-neutral-100 text-xs uppercase tracking-wider text-neutral-500">
              <tr>
                <th className="px-6 py-4">Order</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Payment</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.length > 0 ? (
                currentOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="text-sm border-t border-neutral-100 text-body transition hover:bg-neutral-50"
                  >
                    {/* Order ID */}
                    <td className="px-6 py-4">#{order._id.slice(-8)}</td>

                    {/* Customer */}
                    <td className="px-6 py-4">
                      <p className=" text-heading">
                        {order.user?.name || "N/A"}
                      </p>
                      <p className="text-xs">{order.user?.email || ""}</p>
                    </td>

                    {/* Date and Time */}
                    <td className="px-6 py-4">
                      <p>
                        {new Date(order.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {new Date(order.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </td>

                    {/* Total Price */}
                    <td className="px-6 py-5">
                      <p className="text-lg">₹{order.totalPrice.toFixed(2)}</p>
                    </td>

                    {/* Payment */}
                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold
                        ${
                          order.paymentStatus === "Paid" || order.isPaid
                            ? "bg-green-100 text-success"
                            : "bg-yellow-100 text-warning"
                        }`}
                      >
                        {order.paymentStatus ||
                          (order.isPaid ? "Paid" : "Pending")}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="p-4">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        className="rounded-lg border border-border bg-white px-3 py-2 text-sm font-medium focus:border-primary-500"
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="p-4">
                      <button
                        onClick={() =>
                          handleStatusChange(order._id, "Delivered")
                        }
                        disabled={order.status === "Delivered"}
                        className={`rounded-lg px-5 py-2 text-sm font-semibold text-white transition
                          ${
                            order.status === "Delivered"
                              ? "cursor-not-allowed bg-neutral-400"
                              : "bg-success hover:bg-success-hover"
                          }`}
                      >
                        {order.status === "Delivered"
                          ? "Delivered"
                          : "Mark Delivered"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-8 py-20 text-center">
                    <div className="mx-auto max-w-sm">
                      <h3 className="text-xl font-semibold text-heading">
                        No Orders Found
                      </h3>
                      <p className="mt-3 text-body">
                        We couldn't find any orders matching your current
                        filters.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 border-t border-border px-6 py-5">
          <Pagination
            currentPage={currentPage}
            totalItems={filteredOrders.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onLimitChange={(limit) => {
              setItemsPerPage(limit);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
