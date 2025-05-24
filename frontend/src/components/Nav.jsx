import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../redux/slice/authSlice'; 

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    dispatch(logoutAction());
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 shadow-lg">
      <div className="hidden lg:flex items-center justify-between px-8 py-4">
        <Link 
          to="/" 
          className="text-3xl font-bold tracking-tight hover:scale-105 transition-transform duration-300"
          style={{ fontFamily: "'Fredoka', sans-serif" }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            BUZZ
          </span>
          <span className="text-white">IN</span>
        </Link>
        <div className="flex space-x-6">
          <NavLink to="/create-buzz" text="Create Buzz" />
          <NavLink to="/manage-buzz" text="Manage Buzz" />
          <button 
            onClick={handleLogout}
            className="relative px-4 py-2 font-semibold text-white rounded-lg group overflow-hidden"
            style={{ fontFamily: "'Fredoka', sans-serif" }}
          >
            <span className="relative z-10">Logout</span>
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></span>
            <span className="absolute inset-0 border border-cyan-400 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        </div>
      </div>
      <div className="lg:hidden flex flex-col items-center py-4 px-4">
        <Link 
          to="/" 
          className="text-3xl font-bold tracking-tight mb-3 hover:scale-105 transition-transform duration-300"
          style={{ fontFamily: "'Fredoka', sans-serif" }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            BUZZ
          </span>
          <span className="text-white">IN</span>
        </Link>
        <div className="flex space-x-4 md:space-x-6">
          <NavLink to="/create-buzz" text="Create Buzz" />
          <NavLink to="/manage-buzz" text="Manage Buzz" />
          <button 
            onClick={handleLogout}
            className="relative px-4 py-2 font-semibold text-white rounded-lg group overflow-hidden"
            style={{ fontFamily: "'Fredoka', sans-serif" }}
          >
            <span className="relative z-10">Logout</span>
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></span>
            <span className="absolute inset-0 border border-cyan-400 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, text }) => {
  return (
    <Link
      to={to}
      className="relative px-4 py-2 font-semibold text-white rounded-lg group overflow-hidden"
      style={{ fontFamily: "'Fredoka', sans-serif" }}
    >
      <span className="relative z-10">{text}</span>
      <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></span>
      <span className="absolute inset-0 border border-cyan-400 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
    </Link>
  );
};

export default Navbar;