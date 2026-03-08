import React from "react";

const features = [
  {
    id: 1,
    title: "FREE INTERNATIONAL SHIPPING",
    description: "On all orders over $100.00",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 7h13v10H3V7zm13 3h3l2 3v4h-5v-7z"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "45 DAYS RETURN",
    description: "Money back guarantee",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 4v6h6M20 20v-6h-6M5 19a9 9 0 0114-14"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: "SECURE CHECKOUT",
    description: "100% secured checkout process",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 11c1.657 0 3-1.343 3-3V6a3 3 0 10-6 0v2c0 1.657 1.343 3 3 3z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 11h14v9H5z"
        />
      </svg>
    ),
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {features.map((feature) => (
            <div key={feature.id} className="flex flex-col items-center">
              <div className="mb-4 text-black">{feature.icon}</div>
              <h3 className="font-semibold text-sm tracking-wide">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;