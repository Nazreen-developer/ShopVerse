import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await axios.get("/admin/users");
        const products = await axios.get("/admin/products");
        const orders = await axios.get("/admin/orders");

        const statsData = [
          {
            title: "Total Users",
            value: users.data.length,
          },
          {
            title: "Total Orders",
            value: orders.data.length,
            link: "/admin/orders",
          },
          {
            title: "Total Products",
            value: products.data.length,
            link: "/admin/products",
          },
        ];

        setStats(statsData);

        setChartData([
          { name: "Users", value: users.data.length },
          { name: "Products", value: products.data.length },
          { name: "Orders", value: orders.data.length },
        ]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>

      <h1 className="text-3xl font-bold mb-8 text-[#4E342E]">
        Admin Dashboard
      </h1>

      {/* STAT CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

        {stats.map((item, index) => (

          <div
            key={index}
            onClick={() => item.link && navigate(item.link)}
            className={`bg-white p-6 rounded-2xl shadow-md border-l-4 border-[#C19A6B]
            ${item.link ? "cursor-pointer hover:scale-105 hover:shadow-xl" : ""}`}
          >
            <h3 className="text-gray-500 text-sm">
              {item.title}
            </h3>

            <p className="text-3xl font-bold text-[#5D4037]">
              {item.value}
            </p>

          </div>

        ))}

      </div>


      {/* GRAPH */}

      <div className="bg-white p-6 rounded-xl shadow-md">

        <h2 className="text-xl font-semibold mb-4 text-[#4E342E]">
          Store Overview
        </h2>

        <ResponsiveContainer width="100%" height={300}>

          <BarChart data={chartData}>

            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />

            <Bar
              dataKey="value"
              fill="#C19A6B"
              radius={[6, 6, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default AdminDashboard;