import { Suspense, StrictMode, lazy } from "react";
import ReactDOM from "react-dom/client";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import LoadingFallback from "./components/LoadingFallback";
import ErrorBoundary from "./components/ErrorBoundary";

const TeamsList = lazy(() => import("./screens/TeamsScreen.jsx"));
const ProgramsList = lazy(() => import("./screens/ProgramScreen.jsx"));
const ParticipantsList = lazy(() => import("./screens/ParticipantScreen.jsx"));
const Admin = lazy(() => import("./screens/AdminScreen.jsx"));
const ErrorScreen = lazy(() => import("./screens/ErrorScreen"));

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Navigate to="teams" />} />
              <Route
                path="teams"
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <TeamsList />
                  </Suspense>
                }
              />
              <Route
                path="programs"
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <ProgramsList />
                  </Suspense>
                }
              />
              <Route
                path="participants"
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <ParticipantsList />
                  </Suspense>
                }
              />
              <Route
                path="admin/*"
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <Admin />
                  </Suspense>
                }
              />
              <Route path="*" element={<ErrorScreen />} />
            </Route>
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
