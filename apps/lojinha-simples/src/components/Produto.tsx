import { Button, Paper, styled } from "@mui/material";
import AddShoppingCartTwoToneIcon from "@mui/icons-material/AddShoppingCartTwoTone";
import RemoveShoppingCartTwoToneIcon from "@mui/icons-material/RemoveShoppingCartTwoTone";
import { IProdutoData } from "../interfaces/IProdutoData";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addItem, removeItem, cartState, ICart } from "../store/cartSlice";
import { useControlVisibilityAlert } from "./Alert/hooks";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: "50px 20px 20px",
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "250px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 10,
}));

interface IProdutoCardProps {
  produto: IProdutoData;
  isCartView?: boolean;
}

type ButtonColorType =
  | "inherit"
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning";

const ProdutoCard = ({ produto, isCartView = false }: IProdutoCardProps) => {
  const dispatch = useAppDispatch();
  const cart: ICart = useAppSelector(cartState);
  const control = useControlVisibilityAlert(dispatch);

  function addItemCart(): void {
    const isExist = cart.products.find((item) => item.id === produto.id);

    if (isExist) {
      control("Produto já está no carrinho", "info");
      return;
    }
    control("Produto adicionado ao carrinho", "success");
    dispatch(addItem(produto));
  }

  function removeItemCart(): void {
    control("Produto removido do carrinho", "error");
    dispatch(removeItem(produto));
  }

  function handlePressButton() {
    if (isCartView) removeItemCart();
    else addItemCart();
  }

  const buttonColor: ButtonColorType = isCartView ? "error" : "primary";

  return (
    <Item>
      <img
        width={"150px"}
        height={"150px"}
        className="ProdImg"
        src={produto.image}
        alt={produto.title}
      />
      <h3>{produto.title}</h3>
      <div
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          gap: 10,
          justifyContent: "space-between",
        }}
      >
        <h2 style={{ textWrap: "nowrap" }}>R$ {produto.price}</h2>
        <Button
          color={buttonColor}
          variant="contained"
          onClick={() => handlePressButton()}
        >
          {isCartView ? (
            <RemoveShoppingCartTwoToneIcon />
          ) : (
            <AddShoppingCartTwoToneIcon />
          )}
        </Button>
      </div>
    </Item>
  );
};

export default ProdutoCard;
