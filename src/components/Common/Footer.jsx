import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";

const Footer = () => {
  return (
    <footer
      className="text-white"
      style={{
        background: "linear-gradient(90deg, #C19A6B 0%, #A47149 100%)",
      }}
    >
      <div
        className="max-w-7xl mx-auto px-6 py-12 
        grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10"
      >
        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Newsletter</h3>

          <p className="text-sm mb-2 text-white/90">
            Be the first to hear about new products,
            exclusive events, and online offers.
          </p>

          <p className="text-sm font-medium mb-4">
            Sign up and get 10% off your first order.
          </p>

          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 text-sm border border-white/30 bg-white/10 placeholder-white/70 text-white rounded-l-md focus:outline-none focus:ring-1 focus:ring-white"
            />
            <button className="bg-white text-[#A47149] px-4 text-sm rounded-r-md hover:bg-gray-200 transition">
              Subscribe
            </button>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white/70 cursor-pointer transition">Men's Top Wear</li>
            <li className="hover:text-white/70 cursor-pointer transition">Women's Top Wear</li>
            <li className="hover:text-white/70 cursor-pointer transition">Men's Bottom Wear</li>
            <li className="hover:text-white/70 cursor-pointer transition">Women's Bottom Wear</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white/70 cursor-pointer transition">Contact Us</li>
            <li className="hover:text-white/70 cursor-pointer transition">About Us</li>
            <li className="hover:text-white/70 cursor-pointer transition">FAQs</li>
            <li className="hover:text-white/70 cursor-pointer transition">Features</li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>

          <div className="flex space-x-4 mb-6 text-xl">
            <TbBrandMeta className="cursor-pointer hover:text-white/70 transition" />
            <IoLogoInstagram className="cursor-pointer hover:text-white/70 transition" />
            <RiTwitterXLine className="cursor-pointer hover:text-white/70 transition" />
          </div>

          <h4 className="text-sm font-semibold mb-2">Call Us</h4>
          <p className="text-sm font-medium">0123-456-789</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 py-4 text-center text-sm text-white/80">
        © 2026 ShopVerse. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;