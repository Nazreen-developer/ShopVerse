import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const OrderDetailsPage = () => {

  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  const API = import.meta.env.VITE_BACKEND_URL;

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

        setOrderDetails(data);

      } catch (error) {

        console.log("Order fetch error", error);

      }

    };

    fetchOrder();

  }, [id]);

  if (!orderDetails)
    return <div className="text-center py-20">Loading...</div>;

  return (

    <div className="min-h-screen bg-[#f8f5f0] py-10 px-4">

      <div className="max-w-6xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-[#eadfd3]">

        <h2 className="text-3xl font-bold mb-8 text-[#A47149]">
          Order Details
        </h2>

        <div className="flex justify-between mb-8 border-b border-[#f1e6dc] pb-6">

          <div>

            <h3 className="text-xl font-semibold text-[#A47149]">
              Order ID: #{orderDetails._id}
            </h3>

            <p className="text-gray-500 mt-1">
              {new Date(orderDetails.createdAt).toLocaleDateString()}
            </p>

          </div>

          <div className="flex flex-col items-end">

            <span
              className={`px-4 py-1 rounded-full text-sm font-medium mb-2 ${
                orderDetails.isPaid
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {orderDetails.isPaid ? "Paid" : "Pending"}
            </span>

            <span
              className={`px-4 py-1 rounded-full text-sm font-medium ${
                orderDetails.isDelivered
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {orderDetails.isDelivered ? "Delivered" : "Pending"}
            </span>

          </div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">

          <div>

            <h4 className="text-lg font-semibold text-[#A47149] mb-2">
              Payment Info
            </h4>

            <p className="text-gray-600">
              Status: {orderDetails.isPaid ? "Paid" : "Unpaid"}
            </p>

          </div>

          <div>

            <h4 className="text-lg font-semibold text-[#A47149] mb-2">
              Shipping Info
            </h4>

            <p className="text-gray-600">
              {orderDetails.shippingAddress?.city},{" "}
              {orderDetails.shippingAddress?.country}
            </p>

          </div>

        </div>

        <div className="overflow-x-auto">

          <h4 className="text-lg font-semibold text-[#A47149] mb-4">
            Products
          </h4>

          <table className="min-w-full text-gray-700">

            <thead className="bg-[#f3ebe3]">

              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Qty</th>
                <th className="py-3 px-4 text-left">Total</th>
              </tr>

            </thead>

            <tbody>

              {orderDetails.orderItems.map((item, index) => (

                <tr key={index} className="border-b border-[#f1e6dc]">

                  <td className="py-4 px-4 flex items-center">

                    <img
                      src={`${API}${item.image}`}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg mr-4"
                    />

                    <Link
                      to={`/product/${item.productId}`}
                      className="text-[#C19A6B] font-medium"
                    >
                      {item.name}
                    </Link>

                  </td>

                  <td className="py-4 px-4">₹{item.price}</td>

                  <td className="py-4 px-4">{item.quantity}</td>

                  <td className="py-4 px-4 font-semibold text-[#A47149]">
                    ₹{item.price * item.quantity}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        <div className="mt-8">

          <Link
            to="/my-orders"
            className="text-[#C19A6B] hover:text-[#A47149] font-medium"
          >
            ← Back to My Orders
          </Link>

        </div>

      </div>

    </div>

  );

};

export default OrderDetailsPage;