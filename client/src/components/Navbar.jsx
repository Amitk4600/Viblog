import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Create from "@mui/icons-material/Create";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../features/authSlice";

const settings = ["Profile", "Story", "Logout"];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
  [theme.breakpoints.down("xs")]: {
    display: "none",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
const MobileSearchBar = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "100%", // Position it below the AppBar
  left: 0,
  right: 0,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  display: "flex",
  alignItems: "center",
  margin: theme.spacing(1),
  zIndex: 1000, // Ensure it appears above other elements
}));

const MobileSearchInput = styled(InputBase)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(1),
  marginLeft: theme.spacing(2),
  border: "1px solid #ddd",
  borderRadius: theme.shape.borderRadius,
}));

function NavBar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = (settings) => {
    if (settings === "Logout") {
      dispatch(userLoggedOut());
      navigate("/", { replace: true });
    }
    if (settings === "Story") {
      navigate("/stories", { replace: true });
    } else {
      setAnchorElUser(null);
    }
  };
  const toggleSearchBar = () => {
    setIsSearchOpen((prev) => !prev);
  };

  return (
    <Box sx={{ position: "relative" }}>
      <AppBar position="static" sx={{ backgroundColor: "#fff" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link to="/home">
              <img
                src="/images/logo.png"
                width={120}
                height={50}
                alt="Viblog Logo"
              />
            </Link>
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                ml: 3,
              }}
            >
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ display: "flex", alignItems: "center", color: "#000" }}>
              <Box
                sx={{
                  display: { xs: "flex", sm: "none" },
                  alignItems: "center",
                }}
              >
                <IconButton onClick={toggleSearchBar}>
                  <SearchIcon />
                </IconButton>
              </Box>

              <IconButton component={Link} to="/new-story" color="inherit">
                <Create />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  Create
                </Typography>
              </IconButton>

              <IconButton color="inherit">
                <NotificationsIcon />
              </IconButton>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => handleCloseUserMenu(setting)}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {isSearchOpen && (
        <MobileSearchBar sx={{ display: { xs: "flex", sm: "none" } }}>
          <SearchIcon />
          <MobileSearchInput
            placeholder="Search"
            inputProps={{ "aria-label": "mobile search" }}
          />
        </MobileSearchBar>
      )}
    </Box>
  );
}

export default NavBar;
