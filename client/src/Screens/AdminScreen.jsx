import React from "react";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../slices/adminSlice";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../components/Admin/Login";
import EditTeams from "../components/Admin/EditTeams";
import EditParticipants from "../components/Admin/EditParticipants";
import EditPrograms from "../components/Admin/EditPrograms";
import AdminOutlet from "../components/Admin/AdminOutlet";

const Admin = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<AdminOutlet />}>
          <Route path="teams" element={<EditTeams />} />
          <Route path="participants" element={<EditParticipants />} />
          <Route path="programs" element={<EditPrograms />} />
          <Route path="login" element={<Navigate to="/admin/edit/teams" />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Admin;
