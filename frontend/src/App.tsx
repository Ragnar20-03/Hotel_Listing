import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/User/Landing";
import A_Landing from "./pages/Admin/A_Landing";
import Navbar from "./components/User/Nav";
import Hotels from "./pages/Hotels";

function App() {
  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/admin" element={<A_Landing />} />
          <Route path="/hotels" element={<Hotels />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
