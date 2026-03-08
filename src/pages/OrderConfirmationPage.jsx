import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const OrderConfirmationPage = () => {

  const { id } = useParams();

  const API = import.meta.env.VITE_BACKEND_URL;

  const [order, setOrder] = useState(null);

  const getGuestId = () => {
    return localStorage.getItem("guestId");
  };

  useEffect(() => {

    const fetchOrder = async () => {

      try {

        const token = localStorage.getItem("token");
        const guestId = getGuestId();

        const { data } = await axios.get(
          `${API}/api/orders/${id}?guestId=${guestId}`,
          {
            headers: token
              ? { Authorization: `Bearer ${token}` }
              : {}
          }
        );

        setOrder(data);

      } catch (error) {

        console.log("Order fetch error:", error);

      }

    };

    fetchOrder();

  }, [id]);

  if (!order) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg">Loading Order...</p>
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-[#f8f5f0] flex justify-center py-16 px-4">

      <div className="w-full max-w-4xl">

        <h1 className="text-4xl font-bold text-center text-[#A47149] mb-10">
          Thank You for Your Order!
        </h1>

        <div className="bg-white rounded-2xl shadow-lg border border-[#eadfd3] p-8">

          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">

            <div>

              <h2 className="text-lg font-semibold text-[#A47149]">
                Order ID: {order._id}
              </h2>

              <p className="text-gray-500 text-sm">
                Order Date: {new Date(order.createdAt).toLocaleDateString()}
              </p>

            </div>

            <div className="mt-4 md:mt-0">

              <p className="text-sm text-gray-500">
                Estimated Delivery
              </p>

              <p className="font-semibold text-[#C19A6B]">
                {new Date(
                  new Date(order.createdAt).getTime() + 7 * 24 * 60 * 60 * 1000
                ).toLocaleDateString()}
              </p>

            </div>

          </div>

          {order.orderItems.map((product, index) => (

            <div
              key={index}
              className="flex items-center gap-6 border-t border-b border-[#f1e6dc] py-6"
            >

              <img
                src={`${API}${product.image}`}
                alt={product.name}
                className="w-24 h-28 object-cover rounded-lg"
              />

              <div className="flex-1">

                <h3 className="font-semibold text-gray-800 text-lg">
                  {product.name}
                </h3>

                <p className="text-gray-500 text-sm">
                  {product.color} | {product.size}
                </p>

              </div>

              <div className="text-right">

                <p className="font-semibold text-[#A47149]">
                  ₹{product.price}
                </p>

                <p className="text-sm text-gray-500">
                  Qty: {product.quantity}
                </p>

              </div>

            </div>

          ))}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">

            <div>

              <h4 className="font-semibold text-[#A47149] mb-2">
                Payment
              </h4>

              <p className="text-gray-600">
                {order.isPaid ? "Paid Online" : "Cash on Delivery"}
              </p>

            </div>

            <div>

              <h4 className="font-semibold text-[#A47149] mb-2">
                Delivery
              </h4>

              <p className="text-gray-600">
                {order.shippingAddress.address},{" "}
                {order.shippingAddress.city},{" "}
                {order.shippingAddress.country}
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default OrderConfirmationPage;