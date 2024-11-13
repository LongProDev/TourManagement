import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute.jsx';

import Home from "../pages/Home";
import Tours from "../pages/Tours";
import TourDetails from "../pages/TourDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SearchResultList from "../pages/SearchResultList";
import ThankYou from "../pages/ThankYou";
import Layout from "../components/Layout/Layout.jsx";

import AdminLayout from "../components/AdminLayout/AdminLayout";
import AdminUsers from "../components/AdminManagement/Users/AdminUsers";
import AdminTours from "../components/AdminManagement/Tours/AdminTours";
import AdminReviews from "../components/AdminManagement/Reviews/AdminReviews";

const Routers = () => {
  return (
    <Routes>
      <Route path="*" element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/tours/:id" element={<TourDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/tours/search" element={<SearchResultList />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route 
          path="users" 
          element={
            <ProtectedRoute allowedRoles={['admin']} element={<AdminUsers />} />
          } 
        />
        <Route 
          path="tours" 
          element={
            <ProtectedRoute allowedRoles={['admin']} element={<AdminTours />} />
          } 
        />
        <Route 
          path="reviews" 
          element={
            <ProtectedRoute allowedRoles={['admin']} element={<AdminReviews />} />
          } 
        />
      </Route>
    </Routes>
  );
};

export default Routers;
