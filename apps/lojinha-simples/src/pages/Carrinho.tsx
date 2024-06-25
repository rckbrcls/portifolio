import NavBar from "../components/NavBar";
import { Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { ICart, cartState, cleanCart } from "../store/cartSlice";
import Produto from "../components/Produto";
import AlertComponent from "../components/Alert/Alert";
import { useControlVisibilityAlert } from "../components/Alert/hooks";

function Produtos() {
  const cart: ICart = useAppSelector(cartState);
  const dispatch = useAppDispatch();
  const control = useControlVisibilityAlert(dispatch);
  const navigate = useNavigate();

  function handleOnFinishOrder() {
    if (cart.subTotal > 0) {
      dispatch(cleanCart());
      navigate("/pedido-finalizado");
    } else control("Carrinho vazio", "info");
  }

  function handleCleanCart() {
    dispatch(cleanCart());
    control("Carrinho esvaziado", "error");
  }

  return (
    <>
      <NavBar />
      <div
        style={{
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          gap: 20,
          minHeight: "calc(100svh - 7rem - 40px)",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <Typography variant="h5">Seu carrinho de compras:</Typography>
          <Grid
            direction="row"
            justifyContent="start"
            alignItems="center"
            container
            spacing={4}
            columns={{ xs: 2, sm: 8, md: 12 }}
          >
            {cart.subTotal !== 0 ? (
              cart.products.map((item, Key) => (
                <Grid key={Key} item xs={2} sm={4} md={4}>
                  <Produto produto={item} isCartView />
                </Grid>
              ))
            ) : (
              <Grid item xs={2} sm={4} md={4}>
                <Typography variant="h5">Nada por aqui...</Typography>
              </Grid>
            )}
          </Grid>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          <Button
            onClick={() => handleCleanCart()}
            color="error"
            variant="contained"
          >
            Esvaziar carrinho
          </Button>
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <Typography variant="h6">Subtotal: {cart.subTotal}</Typography>
            <Button onClick={() => handleOnFinishOrder()} variant="contained">
              Finalizar compra
            </Button>
          </div>
        </div>
      </div>
      {<AlertComponent />}
    </>
  );
}

export default Produtos;
