import React from "react";

const brands = [
  { name: "Nike", logo: "https://static.vecteezy.com/ti/vecteur-libre/p1/12560876-logo-nike-sur-fond-transparent-gratuit-vectoriel.jpg" },
  { name: "Adidas", logo: "https://static.vecteezy.com/system/resources/previews/014/414/689/non_2x/adidas-new-logo-on-transparent-background-free-vector.jpg" },
  { name: "Puma", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZT4cSpdopZwBmp2YowTlM951tEjt414NP8w&s" },
  { name: "Levis", logo: "https://i.pinimg.com/236x/7f/6c/0c/7f6c0c4aa196578274eadf8332bf092c.jpg" },
  { name: "H&M", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/1280px-H%26M-Logo.svg.png" },
  { name: "Zara", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIiP186C4NHi7v3MxJc1ZuD-GDCkN5ont8QA&s" },
  { name: "Gucci", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS98wc8Fef7nPjbBZvst0725OnH9ya6L7o7wA&s" },
  { name: "Louis Vuitton", logo: "https://blog.logomyway.com/wp-content/uploads/2020/08/lui-vuitton-logo2.jpg" },
  { name: "Rolex", logo: "https://www.freepnglogos.com/uploads/rolex-png-logo/rolex-png-logo-0.png" },
  { name: "Apple", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqL8Hp9eZVEyYd0Jrd3Zzh89L8r54Dc52O9A&s" },
];

const BrandAds = () => {
  return (
    <div className="bg-white py-5  rounded-md overflow-hidden">
      
      <h2 className="text-center text-xl font-semibold text-[#5C4033] mb-5">
        Top Product Brands
      </h2>

      <div className="relative w-full overflow-hidden">
        <div className="flex animate-scroll gap-20 w-max items-center">
          
          {[...brands, ...brands].map((brand, index) => (
            <div
              key={index}
              className="flex items-center justify-center min-w-[160px]"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-16 md:h-20 object-contain
                hover:scale-110
                transition duration-300 ease-in-out"
              />
            </div>
          ))}

        </div>
      </div>

      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          .animate-scroll {
            animation: scroll 25s linear infinite;
          }

          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}
      </style>

    </div>
  );
};

export default BrandAds;