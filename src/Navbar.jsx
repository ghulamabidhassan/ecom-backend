import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <h2>TEST SITE</h2>
      <ul>
        <Link className="custom-link" to="/dashboard">
          <li>Dashboard</li>
        </Link>
        <Link className="custom-link" to="/dashboard/products">
          <li>Products</li>
        </Link>
        <Link className="custom-link" to="/dashboard/orders">
          <li>My Orders</li>
        </Link>
      </ul>
      <button>Log Out</button>
    </div>
  );
};

export default Navbar;
