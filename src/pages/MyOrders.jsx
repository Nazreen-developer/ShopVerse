import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyOrders = () => {

  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const API = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {

    const fetchOrders = async () => {

      try {

        const { data } = await axios.get(`${API}/api/orders`);

        setOrders(data);

      } catch (error) {

        console.log("Orders fetch error", error);

      }

    };

    fetchOrders();

  }, []);

  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  return (
    <div className="bg-white border border-[#C19A6B] rounded-xl shadow-sm p-6 min-h-[400px]">

      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        My Orders
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full text-sm text-left">

          <thead className="bg-[#F9F5F0] text-gray-700 uppercase text-xs">

            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Shipping Address</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Status</th>
            </tr>

          </thead>

          <tbody>

            {orders.length > 0 ? (

              orders.map((order) => (

                <tr
                  key={order._id}
                  onClick={() => handleRowClick(order._id)}
                  className="hover:bg-gray-50 transition cursor-pointer"
                >

                  <td className="px-4 py-3">

                    <img
                      src={order.orderItems[0]?.image}
                      alt={order.orderItems[0]?.name}
                      className="w-16 h-16 object-cover rounded-md border"
                    />

                  </td>

                  <td className="px-4 py-3 font-medium text-gray-800">
                    #{order._id}
                  </td>

                  <td className="px-4 py-3 text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3 text-gray-600">
                    {order.shippingAddress?.city},{" "}
                    {order.shippingAddress?.country}
                  </td>

                  <td className="px-4 py-3 font-semibold text-gray-800">
                    ₹{order.totalPrice}
                  </td>

                  <td className="px-4 py-3">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.isPaid
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {order.isPaid ? "Paid" : "Unpaid"}
                    </span>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No Orders Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default MyOrders;