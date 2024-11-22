import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../features/auth/authApiSlice";

function Navbar() {
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography
          onClick={() => navigate("/")}
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          ChatApp
        </Typography>

        {/* Conditionally render Login/Logout button based on user data */}
        <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
