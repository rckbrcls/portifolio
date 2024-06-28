import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import Produto from "../components/Produto";
import NavBar from "../components/NavBar";
import { Grid, Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import AlertComponent from "../components/Alert/Alert";
function Produtos() {
    const { data: products } = useQuery({
        queryKey: ["products"],
        queryFn: () => fetch("https://fakestoreapi.com/products").then((res) => res.json()),
    });
    return (_jsxs(_Fragment, { children: [_jsx(NavBar, {}), _jsx(Grid, { direction: "row", justifyContent: "start", alignItems: "center", padding: 4, container: true, spacing: 4, columns: { xs: 2, sm: 8, md: 12 }, children: products?.length
                    ? products.map((item, Key) => (_jsx(Grid, { item: true, xs: 2, sm: 4, md: 4, children: _jsx(Produto, { produto: item }) }, Key)))
                    : Array(10)
                        .fill(null)
                        .map((_, index) => (_jsx(Grid, { item: true, xs: 2, sm: 4, md: 4, children: _jsx(Skeleton, { variant: "rectangular", height: "320px", sx: { borderRadius: 1 } }) }, index))) }), _jsx(AlertComponent, {})] }));
}
export default Produtos;
