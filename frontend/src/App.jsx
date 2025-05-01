import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/global.css";

// Components
import Header from "./components/header";
import Footer from "./components/footer";

// Pages
import HomePage from "./pages/home";
import AddMemberPage from "./pages/addMember";
import ViewMembersPage from "./pages/viewMembers";
import MemberDetailsPage from "./pages/memberDetails";
import NotFoundPage from "./pages/notFound";

function App() {
  return (
    <Router>
      <div className="app" style={{ width: "100vw" }}>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-member" element={<AddMemberPage />} />
            <Route path="/members" element={<ViewMembersPage />} />
            <Route path="/members/:id" element={<MemberDetailsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer position="bottom-right" />
      </div>
    </Router>
  );
}

export default App;
