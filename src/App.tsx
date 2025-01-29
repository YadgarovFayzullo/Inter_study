import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Redaction from "./pages/Redaction";
import Rules from "./pages/Rules";
import Archive from "./pages/Archive";
import Admin from "./pages/Admin";
import AdminBook from "./pages/AdminBook";
import AdminNews from "./pages/AdminNews";
import AdminArchive from "./pages/AdminArchive";
import Protected from "./utils/Protected";
import Partnership from "./components/Partners";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
// import AdminAnalytics from "./pages/AdminAnalytics"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/redaction" element={<Redaction />} />
        <Route path="/partners" element={<Partnership />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/adminAnalytics" element={<AdminAnalytics/>} /> */}

        {/* Protected admin routes */}
        <Route path="/admin" element={<Protected element={<Admin />} />} />
        <Route
          path="/adminNews"
          element={<Protected element={<AdminNews />} />}
        />
        <Route
          path="/adminBook"
          element={<Protected element={<AdminBook />} />}
        />
        <Route
          path="/adminArchive"
          element={<Protected element={<AdminArchive />} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
