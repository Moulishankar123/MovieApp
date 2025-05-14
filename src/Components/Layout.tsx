// import { useState } from "react";
// import { Link, Outlet, useNavigate } from "react-router-dom";
// import { Modal, Button, TextInput } from "@mantine/core";

// const Layout = () => {
//     const navigate = useNavigate();
//     const [isAuth, setIsAuth] = useState(localStorage.getItem("auth") === "true");
//     const [loginOpen, setLoginOpen] = useState(false);
//     const [email, setEmail] = useState("");

//     const handleLogin = () => {
//         localStorage.setItem("auth", "true");
//         setIsAuth(true);
//         setLoginOpen(false);
//     };

//     const handleLogout = () => {
//         localStorage.removeItem("auth");
//         setIsAuth(false);
//         navigate("/");
//     };

//     return (
//         <>
//             <nav className="bg-black backdrop-blur-md px-6 py-4 flex justify-between items-center">
//                 <h1 className="text-xl font-bold text-white">My Movie App</h1>
//                 <ul className="flex gap-6 text-sm md:text-base text-white items-center">
//                     <li className="hover:text-yellow-400 cursor-pointer">
//                         <Link to="/">Home</Link>
//                     </li>
//                     <li className="hover:text-yellow-400 cursor-pointer">
//                         <Link to="/movie">Movies</Link>
//                     </li>
//                     <li className="hover:text-yellow-400 cursor-pointer"><Link to="/people">People</Link></li>
//                     <li>
//                         <div>
//                             {isAuth ? (
//                                 <Button variant="outline" color="red" onClick={handleLogout}>
//                                     Logout
//                                 </Button>
//                             ) : (
//                                 <Button onClick={() => setLoginOpen(true)}>
//                                     Login
//                                 </Button>
//                             )}
//                         </div>
//                     </li>
//                 </ul>
//             </nav>

//             <Outlet />

//             <Modal opened={loginOpen} onClose={() => setLoginOpen(false)} title="Login" centered>
//                 <TextInput
//                     label="Email"
//                     placeholder="your@email.com"
//                     value={email}
//                     onChange={(e) => setEmail(e.currentTarget.value)}
//                 />
//                 <Button className="mt-4" onClick={handleLogin} fullWidth>
//                     Login
//                 </Button>
//             </Modal>
//         </>
//     );
// };

// export default Layout;


import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Modal, Button, TextInput } from "@mantine/core";
import { HiMenu, HiX } from "react-icons/hi";

const Layout = () => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(localStorage.getItem("auth") === "true");
  const [loginOpen, setLoginOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogin = () => {
    localStorage.setItem("auth", "true");
    setIsAuth(true);
    setLoginOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setIsAuth(false);
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      <nav className="bg-black backdrop-blur-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">My Movie App</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-sm md:text-base text-white items-center">
          <li className="hover:text-yellow-400">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-yellow-400">
            <Link to="/movie">Movies</Link>
          </li>
          <li className="hover:text-yellow-400">
            <Link to="/people">People</Link>
          </li>
          <li>
            {isAuth ? (
              <Button variant="outline" color="red" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button onClick={() => setLoginOpen(true)}>Login</Button>
            )}
          </li>
        </ul>

        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-white">
            {mobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden bg-black text-white px-6 pb-4 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block hover:text-yellow-400"
          >
            Home
          </Link>
          <Link
            to="/movie"
            onClick={() => setMobileMenuOpen(false)}
            className="block hover:text-yellow-400"
          >
            Movies
          </Link>
          <Link
            to="/people"
            onClick={() => setMobileMenuOpen(false)}
            className="block hover:text-yellow-400"
          >
            People
          </Link>
          {isAuth ? (
            <Button variant="outline" color="red" fullWidth onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button fullWidth onClick={() => {
              setLoginOpen(true);
              setMobileMenuOpen(false);
            }}>
              Login
            </Button>
          )}
        </div>
      )}

      <Outlet />

      <Modal
        opened={loginOpen}
        onClose={() => setLoginOpen(false)}
        title="Login"
        centered
      >
        <TextInput
          label="Email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <Button className="mt-4" onClick={handleLogin} fullWidth>
          Login
        </Button>
      </Modal>
    </>
  );
};

export default Layout;
