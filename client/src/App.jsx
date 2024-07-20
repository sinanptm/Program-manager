import { Outlet } from "react-router-dom";
import NavBar from "./components/Navbar";
import Container from "@mui/material/Container";

const App = () => {
  return (
    <>
      <NavBar />
      <Container maxWidth="xl" sx={{ mt: "20px" }}>
        <Outlet />
      </Container>
    </>
  );
};

export default App;
