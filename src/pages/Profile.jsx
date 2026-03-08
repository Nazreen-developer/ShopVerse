import React from "react";
import MyOrders from "./MyOrders";

const Profile = () => {
  return (
    <div className="bg-[#F4F1EC] min-h-screen pt-32 px-6 pb-16">
      {/* pb-16 added for bottom spacing */}

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* LEFT SIDEBAR */}
        <div className="bg-white border border-[#C19A6B] rounded-xl shadow-sm p-6 h-fit min-h-[40vh]">
          <h2 className="text-2xl font-bold text-gray-800">
            Admin User
          </h2>

          <p className="text-gray-600 mt-2">
            admin@example.com
          </p>

          <button className="mt-6 w-full bg-[#C19A6B] text-white py-2 rounded-lg font-semibold hover:opacity-90 transition">
            Logout
          </button>
        </div>

        {/* RIGHT SECTION */}
        <div className="md:col-span-3">
          <MyOrders />
        </div>

      </div>
    </div>
  );
};

export default Profile;