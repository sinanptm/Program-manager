import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../components/Admin/Login";
import AdminOutlet from "../components/AdminOutlet";
import LoadingFallback from '../components/LoadingFallback'

const EditTeams = lazy(() => import("../components/Admin/EditTeams"));
const EditParticipants = lazy(() => import("../components/Admin/EditParticipants"));
const EditPrograms = lazy(() => import("../components/Admin/EditPrograms"));
const ProgramDetails = lazy(() => import("../components/Admin/ProgramDetails"));
const ErrorScreen = lazy(()=> import("../screens/ErrorScreen"));


const Admin = () => {
  const auth = useSelector(state=>state.auth);

  
  if (!auth.auth) {
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
            <Route path="*" element={<ErrorScreen isAdmin={true} />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default Admin;