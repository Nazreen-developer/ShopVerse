import { IoMdClose } from "react-icons/io";

const API = import.meta.env.VITE_BACKEND_URL;

const CartContents = ({ cartItems, removeItem }) => {

  if (!cartItems || cartItems.length === 0) {
    return (
      <p className="text-center text-gray-500">
        Cart is empty
      </p>
    );
  }

  return (

    <div className="space-y-6">

      {cartItems.map((item, index) => (

        <div
          key={index}
          className="flex items-center gap-4 border-b pb-4"
        >

          <img
            src={`${API}${item.image}`}
            alt={item.name}
            className="w-20 h-24 object-cover rounded"
          />

          <div className="flex-1">

            <h3 className="font-semibold">
              {item.name}
            </h3>

            <p className="text-sm text-gray-500">
              {item.color} | {item.size}
            </p>

            <p className="font-semibold">
              ₹{item.price}
            </p>

            <p className="text-sm text-gray-600">
              Qty: {item.quantity}
            </p>

          </div>

          <button
            onClick={() => removeItem(item)}
            className="text-red-500 hover:text-red-700"
          >
            <IoMdClose size={20} />
          </button>

        </div>

      ))}

    </div>

  );
};

export default CartContents;