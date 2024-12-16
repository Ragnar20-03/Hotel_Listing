import { Link } from "react-router-dom";
import { Button } from "./Button";

export default function Header() {
  return (
    <header className="m-4 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primary">
          HotelBooker
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-gray-600 hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link to="/explore" className="text-gray-600 hover:text-primary">
                Explore
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-600 hover:text-primary">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-600 hover:text-primary">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex space-x-2">
          <Button variant="outline">Sign In</Button>
          <Button>Sign Up</Button>
        </div>
      </div>
    </header>
  );
}
