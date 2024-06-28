import Produto from "../components/Produto";
import NavBar from "../components/NavBar";
import { Grid, Skeleton } from "@mui/material";
import { IProdutoData } from "../interfaces/IProdutoData";
import { useQuery } from "@tanstack/react-query";
import AlertComponent from "../components/Alert/Alert";

function Produtos() {
  const { data: products } = useQuery<IProdutoData[]>({
    queryKey: ["products"],
    queryFn: () =>
      fetch("https://fakestoreapi.com/products").then((res) => res.json()),
  });

  return (
    <>
      <NavBar />
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        padding={4}
        spacing={4}
        height={450}
        columns={{ xs: 2, sm: 8, md: 12 }}
      >
        {products?.length
          ? products.map((item, key) => (
              <Grid
                key={key}
                item
                xs={2}
                sm={4}
                md={4}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <Produto produto={item} />
              </Grid>
            ))
          : Array(10)
              .fill(null)
              .map((_, index) => (
                <Grid
                  key={index}
                  item
                  xs={2}
                  sm={4}
                  md={4}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <Skeleton
                    variant="rectangular"
                    height={"320px"}
                    sx={{ borderRadius: 1, flexGrow: 1 }}
                  />
                </Grid>
              ))}
      </Grid>
      {<AlertComponent />}
    </>
  );
}

export default Produtos;
