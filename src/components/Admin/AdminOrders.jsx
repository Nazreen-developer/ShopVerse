import { useState, useEffect } from "react";
import axios from "axios";

const AdminOrders = () => {

  const API = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [toast, setToast] = useState(null);

  // =============================
  // Fetch Orders
  // =============================
  useEffect(() => {

    const fetchOrders = async () => {

      try {

        const { data } = await axios.get(
          `${API}/api/admin/orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setOrders(data);

      } catch (error) {
        console.log("Fetch orders error:", error);
      }

    };

    fetchOrders();

  }, [API, token]);


  // =============================
  // Toast auto close
  // =============================
  useEffect(() => {

    if (toast) {
      const timer = setTimeout(() => setToast(null), 2500);
      return () => clearTimeout(timer);
    }

  }, [toast]);


  // =============================
  // Change Order Status
  // =============================
  const handleStatusChange = async (orderId, newStatus) => {

    try {

      await axios.put(
        `${API}/api/admin/orders/${orderId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const updatedOrders = orders.map((order) =>
        order._id === orderId
          ? { ...order, status: newStatus }
          : order
      );

      setOrders(updatedOrders);

      setToast(`Order updated to ${newStatus}`);

    } catch (error) {

      console.log("Status update error:", error);

    }

  };


  // =============================
  // Filter Orders
  // =============================
  const filteredOrders =
    filterStatus === "All"
      ? orders
      : orders.filter((order) => order.status === filterStatus);


  // =============================
  // Status Colors
  // =============================
  const statusColors = {
    Processing: "bg-yellow-100 text-yellow-700",
    Shipped: "bg-blue-100 text-blue-700",
    Delivered: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
  };


  return (

    <div className="p-8 relative">

      <h1 className="text-3xl font-bold mb-6 text-[#4E342E]">
        Order Management
      </h1>


      {/* Filter */}

      <div className="mb-6">

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 rounded-xl border border-gray-300 bg-[#fdfaf6]"
        >
          <option value="All">All</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>

      </div>


      {/* Orders Table */}

      <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">

        <table className="w-full text-left">

          <thead className="bg-[#f3ede7] text-[#5D4037] text-sm">

            <tr>
              <th className="py-4 px-6">Order ID</th>
              <th className="px-6">Customer</th>
              <th className="px-6">Total</th>
              <th className="px-6">Status</th>
              <th className="px-6">Change Status</th>
            </tr>

          </thead>

          <tbody>

            {filteredOrders.map((order) => {

              const customerName =
                order.user?.name ||
                `Guest (${order.guestId || "Guest"})`;

              return (

                <tr key={order._id} className="border-b">

                  {/* Order ID */}
                  <td className="py-4 px-6 font-medium">
                    #{order._id.slice(-6)}
                  </td>


                  {/* Customer */}
                  <td className="px-6">
                    {customerName}
                  </td>


                  {/* Total */}
                  <td className="px-6">
                    ₹{order.totalPrice}
                  </td>


                  {/* Status */}
                  <td className="px-6">

                    <span
                      className={`px-4 py-1.5 rounded-lg text-sm font-semibold ${statusColors[order.status]}`}
                    >
                      {order.status}
                    </span>

                  </td>


                  {/* Status Change Dropdown */}

                  <td className="px-6">

                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="px-3 py-2 border rounded-lg"
                    >

                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>

                    </select>

                  </td>

                </tr>

              );

            })}

          </tbody>

        </table>

      </div>


      {/* Toast */}

      {toast && (

        <div className="fixed bottom-6 right-6 bg-[#4E342E] text-white px-6 py-3 rounded-xl shadow-lg">
          {toast}
        </div>

      )}

    </div>

  );

};

export default AdminOrders;