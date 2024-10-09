import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/User/Landing";
import A_Landing from "./pages/Admin/A_Landing";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/admin" element={<A_Landing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
