import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  IconButton,
  Button,
  Badge,
} from "@mui/material";
import StorefrontTwoToneIcon from "@mui/icons-material/StorefrontTwoTone";
import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { ICart, cartState } from "../store/cartSlice";

function NavBar() {
  const cart: ICart = useAppSelector(cartState);

  return (
    <AppBar sx={{ height: "4rem" }} position="static">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        height={"100%"}
        spacing={2}
      >
        <Toolbar>
          <Link to="/carrinho">
            <IconButton>
              <Badge badgeContent={cart.quantity} color="info">
                <ShoppingCartTwoToneIcon
                  fontSize="large"
                  sx={{ color: "#003d55" }}
                />
              </Badge>
            </IconButton>
          </Link>
        </Toolbar>
        <Toolbar>
          <Link to="/produtos" style={{ textDecoration: "none" }}>
            <Button
              startIcon={
                <StorefrontTwoToneIcon
                  fontSize="large"
                  sx={{ color: "#003d55" }}
                />
              }
            >
              <Typography variant="h5" color={"#003d55"}>
                Lojinha
              </Typography>
            </Button>
          </Link>
        </Toolbar>
        <Toolbar>
          <Link to="/">
            <IconButton>
              <LogoutTwoToneIcon fontSize="large" sx={{ color: "#003d55" }} />
            </IconButton>
          </Link>
        </Toolbar>
      </Stack>
    </AppBar>
  );
}

export default NavBar;
