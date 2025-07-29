import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 px-4 md:px-8 lg:px-16 py-10 mt-10">
      {/* Grid container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        {/* Column 1 */}
        <div>
          <h4 className="font-semibold mb-4 text-base">Company</h4>
          <ul className="space-y-2">
            <li><Link href="/"><span className="hover:text-black transition">About Us</span></Link></li>
            <li><Link href="/"><span className="hover:text-black transition">Careers</span></Link></li>
            <li><Link href="/"><span className="hover:text-black transition">Press</span></Link></li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h4 className="font-semibold mb-4 text-base">Support</h4>
          <ul className="space-y-2">
            <li><Link href="/"><span className="hover:text-black transition">Help Center</span></Link></li>
            <li><Link href="/"><span className="hover:text-black transition">Returns</span></Link></li>
            <li><Link href="/"><span className="hover:text-black transition">Contact Us</span></Link></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h4 className="font-semibold mb-4 text-base">Legal</h4>
          <ul className="space-y-2">
            <li><Link href="/"><span className="hover:text-black transition">Privacy Policy</span></Link></li>
            <li><Link href="/"><span className="hover:text-black transition">Terms of Service</span></Link></li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h4 className="font-semibold mb-4 text-base">Stay Connected</h4>
          <p className="text-sm mb-2">
            Subscribe to our newsletter for updates.
          </p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 rounded-md border border-gray-300 text-sm w-full sm:w-auto"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-800 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="border-t border-gray-300 mt-10 pt-6 text-xs text-center text-gray-500">
        © {new Date().getFullYear()} YourCompany. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
