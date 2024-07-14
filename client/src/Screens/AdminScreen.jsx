import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../slices/adminSlice";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../components/Admin/Login";
import AdminOutlet from "../components/AdminOutlet";
import LoadingFallback from '../components/LoadingFallback'

// Lazy-loaded components
const EditTeams = lazy(() => import("../components/Admin/EditTeams"));
const EditParticipants = lazy(() => import("../components/Admin/EditParticipants"));
const EditPrograms = lazy(() => import("../components/Admin/EditPrograms"));
const ProgramDetails = lazy(() => import("../components/Admin/ProgramDetails"));

const Admin = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<AdminOutlet />}>
            <Route index element={<Navigate to="participants" />} />
            <Route path="participants" element={<EditParticipants />} />
            <Route path="teams" element={<EditTeams />} />
            <Route path="programs" element={<EditPrograms />} />
            <Route path="program-details/:id" element={<ProgramDetails />} />
            <Route path="login" element={<Navigate to="/admin/participants" />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default Admin;
