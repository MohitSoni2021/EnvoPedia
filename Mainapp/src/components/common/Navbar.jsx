// import { useState } from "react";
// import { NavLink } from "react-router-dom";
// import { Menu, X } from "lucide-react";

// const NavbarComponent = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const navLinks = [
//     { path: "/search", label: "Wikipedia Search" },
//     { path: "/news", label: "News" },
//     { path: "/location", label: "Location" },
//     { path: "/map", label: "Forest Map" },
//     { path: "/details", label: "Ecosystem Booklet" },
//   ];

//   return (
//     <nav className="relative bg-gradient-to-br from-[#ecf0f1] to-[#e5e9f2] rounded-2xl shadow-md">
//       <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-[#2e4053]">Ecopedia</h1>

//         {/* Desktop Nav */}
//         <div className="hidden md:flex space-x-6">
//           {navLinks.map((link) => (
//             <NavLink
//               key={link.path}
//               to={link.path}
//               className={({ isActive }) =>
//                 `text-[#2e4053] hover:text-[#1a202c] font-medium rounded-lg px-4 py-2 ${
//                   isActive ? "bg-[#e5e9f2] shadow-md" : ""
//                 }`
//               }
//             >
//               {link.label}
//             </NavLink>
//           ))}
//         </div>

//         {/* Mobile Toggle */}
//         <div className="md:hidden">
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="text-[#2e4053] focus:outline-none rounded-lg px-4 py-2 bg-[#e5e9f2] shadow-md"
//           >
//             {isOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden bg-[#ecf0f1] rounded-2xl shadow-md px-6 py-4 space-y-2">
//           {navLinks.map((link) => (
//             <NavLink
//               key={link.path}
//               to={link.path}
//               onClick={() => setIsOpen(false)}
//               className={({ isActive }) =>
//                 `block text-[#2e4053] hover:text-[#1a202c] font-medium rounded-lg px-4 py-2 ${
//                   isActive ? "bg-[#e5e9f2] shadow-md" : ""
//                 }`
//               }
//             >
//               {link.label}
//             </NavLink>
//           ))}
//         </div>
//       )}
//     </nav>
//   );
// };

// export default NavbarComponent;




import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Leaf } from "lucide-react";

const NavbarComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { path: "/search", label: "Wikipedia Search" },
    { path: "/news", label: "News" },
    { path: "/location", label: "Location" },
    { path: "/map", label: "Forest Map" },
    { path: "/details", label: "Ecosystem Booklet" },
  ];

  return (
    <nav className="glass-nav sticky top-0 z-50 rounded-2xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Leaf className="text-emerald-600" size={24} />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            Ecopedia
          </h1>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-emerald-500/10 to-blue-500/10 text-gray-800 font-medium"
                    : "text-gray-600 hover:bg-white/50"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-white/50 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass-nav absolute top-full left-0 right-0 mt-2 rounded-2xl">
          <div className="px-6 py-4 space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-emerald-500/10 to-blue-500/10 text-gray-800 font-medium"
                      : "text-gray-600 hover:bg-white/50"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarComponent;