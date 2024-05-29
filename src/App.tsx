import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Redaction from "./pages/Redaction"

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="redaction" element={<Redaction />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
