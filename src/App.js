import React, { useEffect,useState } from 'react';
import Header from "./Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./LoginForm";
import Footer from "./Footer";
import AboutUs from "./AboutUs";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfService from "./TermsOfService";
import FAQ from "./FAQ";
import Contact from "./Contact";
import ShippingInformation from "./ShippingInformation";
import SignupPage from "./SignupPage";
import ProductDescriptionPage from "./ProductDescriptionPage";
import ProductListPage from "./ProductListPage";
import CartListPage from "./CartListPage";
import AddressConfirmation from "./AddressConfirmation";
import PaymentMethodPage from "./PaymentMethodPage";
import OrderHistoryPage from "./OrderHistoryPage";
import WishlistPage from "./WishlistPage";
import PlacedOrderPage from "./PlacedOrderPage";
import InvoicePage from "./InvoicePage";
import TrackOrderBar from "./TrackOrderBar";
import AdminDashboard from "./AdminDashboard";
import AdminCustomerDetail from "./AdminCustomerDetail";
import AdminOrderHistoryPage from "./AdminOrderHistoryPage";
import ProtectedRoute from "./ProtectedRoute";
import { ToastContainer } from 'react-toastify';
function App() 

{
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" }); // Instant scroll without smoothness
  }, []);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div
    style={{ display: "flex", flexDirection: "column", minHeight: "100vh" } }
  >
    <Router>
      <Header style={{ position: "sticky", top: 0, width: "100%" }} />
      <main style={{ flex: 1, overflowY: "auto" }}>
        <Routes>
          <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/about"  element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <AboutUs />
            </ProtectedRoute>
          }
/>
          <Route path="/Contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/TermsOfService" element={<TermsOfService />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/ProductDescriptionPage" element={<ProductDescriptionPage />} />
          <Route path="/ProductListPage" element={<ProductListPage />} />
          <Route path="/CartListPage" element={<CartListPage />} />
          <Route path="/AddressConfirmation" element={<AddressConfirmation />} />
          <Route path="/PaymentMethodPage" element={<PaymentMethodPage />} />
          <Route path="/OrderHistoryPage" element={<OrderHistoryPage />} />
          <Route path="/WishlistPage" element={<WishlistPage />} />
          <Route path="/PlacedOrderPage" element={<PlacedOrderPage />} />
          <Route path="/InvoicePage" element={<InvoicePage />} />
          <Route path="/TrackOrderBar" element={<TrackOrderBar />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/AdminCustomerDetail" element={<AdminCustomerDetail />} />
          <Route path="/AdminOrderHistoryPage" element={<AdminOrderHistoryPage />} />
          <Route
            path="/ShippingInformation"
            element={<ShippingInformation />}
          />
          <Route path="/SignupPage" element={<SignupPage />} />
        </Routes>
      </main>
      <Footer style={{ position: "relative", bottom: 0, width: "100%" }} />
    </Router>
    <ToastContainer />
  </div>
  );
}

export default App;
