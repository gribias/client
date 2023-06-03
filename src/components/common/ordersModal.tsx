import {
  Modal,
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
  Stack,
  Drawer,
  useMediaQuery,
  Theme
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";

import CartContext from "contexts/Cart/CartContext";
import React, { useContext } from "react";
import { useGetIdentity } from "@refinedev/core";

interface OrdersModalProps {
  open: boolean;
  onClose: () => void;
}

export const OrdersModal: React.FC<OrdersModalProps> = ({ onClose, open }) => {
  const { data: user } = useGetIdentity<{
    email: string;
  }>();

  const { cartItems, clearCart, increase, itemCount, handleCheckout } =
    useContext(CartContext);

    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  const checkout = (cartItems: any) => {
    return async () => {
      const response = await fetch("http://localhost:8080/api/v1/orders", {
        method: "POST",
        body: JSON.stringify({
          cartItems,
          email: user?.email ?? "",
          NumberArticles: itemCount,
          Total: cartItems.reduce(
            (total: number, item: { cost: number; quantity: number }) =>
              total + item.cost * item.quantity,
            0
          ),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        handleCheckout();
      }
    };
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  // Group items by product and different sizes
  const groupedItems = cartItems.reduce((groups: any, item: any) => {
    const key = item.id + "_" + item.reference;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {});

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          maxWidth: 500,
          width: "100%",
          p: 2,
        }}
      >
        <Card>
          <CardContent>
            <Typography variant="h4">Your Orders</Typography>
            {cartItems.length > 0 ? (
              <>
                {cartItems.map((item: any, index: number) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      my: isMobile ? 1 : 2,
                      flexDirection: isMobile ? "column" : "row",
                    }}
                  >
                    <img
                      src={item.photo}
                      alt={item.reference}
                      style={{
                        marginRight: isMobile ? 0 : "8px",
                        marginBottom: isMobile ? "8px" : 0,
                        height: isMobile ? "60px" : "40px",
                        width: isMobile ? "60px" : "40px",
                      }}
                    />
                    <Box>
                      <Item>{item.reference}</Item>
                      <Item>{item.size}</Item>
                      <Item>{item.quantity}</Item>
                      <Item>{item.cost}</Item>
                    </Box>
                  </Box>
                ))}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: isMobile ? 2 : 4,
                    flexDirection: isMobile ? "column" : "row",
                  }}
                >
                  <Typography variant="h6" sx={{ mb: isMobile ? 2 : 0 }}>
                    Total: €
                    {cartItems.reduce(
                (total, item) => total + (item.cost * (item.quantity ?? 0)),
                0
                )}
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={checkout(cartItems)}
                    disabled={cartItems.length === 0}
                  >
                    Checkout
                  </Button>
                </Box>
              </>
            ) : (
              <Typography variant="body1">Your cart is empty</Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};
