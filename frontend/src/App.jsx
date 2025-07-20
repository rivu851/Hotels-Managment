import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Home from "./pages/Home";
// import Booking from "./pages/Booking";
// import Contact from "./pages/Contact";
// import MapPage from "./pages/MapPage";
// import Weather from "./pages/Weather";
// import Emergency from "./pages/Emergency";
// import TrackLocationPage from "./pages/TrackLocationPage";
// import Explore from "./pages/Explore";
// import TravelDestination from "./pages/TravelDestination";
// import Testimonials from "./components/Testimonials";
import HotelBooking from "./pages/HotelBooking";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// import Community from "./pages/Community";
// import { ExplorePage } from "./pages/explore-page";
// import FlightBooking from "./pages/FlightBooking";
// import TrainBooking from "./pages/TrainBookings";
// import CabBooking from "./pages/CabsBookings";
// import BusBooking from "./pages/BusBooking";
// import TravelDestinationPurulia from "./pages/TravelDestinationPurulia";
// import TravelDestinationKerala from "./pages/TravelDestinationKerala";
// import TravelDestinationJK from "./pages/TravelDestinationJK";
// import TravelDestinationDelhi from "./pages/TravelDestinationDelhi";
// import TravelDestinationAndaman from "./pages/TravelDestinationAndaman";
// import HiddenGemsBisnapur from "./pages/HiddenGemsBisnapur";
// import HiddenGemsDooars from "./pages/HiddenGemsDooars";
// import Digha from "./pages/Digha";
import { useAppContext } from "./context/AppContext";
import HotelApp from "./ownersec/HotelApp";
import ProtectedRoute from "./components/protectedRoute";
// import VendorApp from "./vendorsec/lib/vendorApp";
// import SouBooking_App from "./SouBooking_App";

const App = () => {
  const { user } = useAppContext();
  const isOwner = user && user.role === "Owner";

  return (
    <div className="overflow-x-hidden">
      <ToastContainer position="top-right" autoClose={3000} />
      {/* Only show Navbar if not on /hotelApp */}
      {window.location.pathname !== "/hotelApp" && <Navbar />}
      <Routes>
        <Route path="/hotelbook" element={<HotelBooking />} />
        <Route
          path="/hotelApp"
          element={<ProtectedRoute element={HotelApp} allowedRoles={["Owner"]} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="*" element={<Navigate to="/hotelbook" />} />
      </Routes>
    </div>
  );
};  

export default App;
