import {
  Modal,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Stack,
  useMediaQuery,
  Theme,
  IconButton,
  TextField, // Add the TextField component from Material-UI
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from '@mui/icons-material/Delete';
import CartContext from "contexts/Cart/CartContext";
import React, { useContext, useState } from "react";
import { useGetIdentity } from "@refinedev/core";

const ItemCard = styled(Card)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  boxShadow: theme.shadows[2],
}));

const ItemImage = styled("img")({
  width: "80px",
  height: "80px",
  borderRadius: "8px",
  marginRight: "16px",
});
const ItemDetails = styled("div")({
  flexGrow: 1,
  marginRight: "16px",
});

const ItemCost = styled(Typography)({
  fontWeight: "bold",
});

interface CartItemProps {
  item: {
    photo: string;
    reference: string;
    material: string;
    size: string;
    quantity: number;
    cost: number;
  };
  onDecrease: () => void;
  onDelete: (reference: string, size: string) => void;
}


const CartItem: React.FC<CartItemProps> = ({ item, onDecrease, onDelete }) => {

  const handleDelete = () => {
    onDelete(item.reference, item.size);
  };
  return (
    <ItemCard>
      <ItemImage src={item.photo} alt={item.reference} />
      <ItemDetails>
        <Typography variant="body1"   textTransform="capitalize">{item.reference}</Typography>
        <Typography variant="body2">tipo: {item.material}</Typography>
        <Typography variant="body2">tamanho: {item.size}</Typography>
        <Typography variant="body2">Quantidade: {item.quantity}</Typography>
      </ItemDetails>
      <ItemCost variant="body1">€{item.cost}</ItemCost>
      <IconButton
        aria-label="Decrease"
        onClick={onDecrease}
        disabled={item.quantity === 1}
      >
        <RemoveIcon />
      </IconButton>
      <IconButton
        aria-label="Delete"
        onClick={handleDelete} // Call the handleDelete function instead of onDelete directly
      >
        <DeleteIcon />
      </IconButton>
    </ItemCard>
  );
};


interface OrdersModalProps {
  open: boolean;
  onClose: () => void;
  
}

export const OrdersModal: React.FC<OrdersModalProps> = ({ onClose, open }) => {
  const { data: user } = useGetIdentity<{
    email: string;
  }>();

  const { cartItems, clearCart, increase, decrease,removeFromCart, itemCount, handleCheckout } =
    useContext(CartContext);

  const [note, setNote] = useState(""); // State for storing the order note

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote(e.target.value);
  };
  
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
          note: note, // Include the note in the request body
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
            <Typography variant="h4">Encomendas</Typography>
            {cartItems.length > 0 ? (
              <>
                {cartItems.map((item: any, index: number) => (
                  <CartItem key={index} item={item} onDecrease={() => decrease(item)}  onDelete= {() => removeFromCart(item)}/>
                ))}
                <Stack
                  direction={isMobile ? "column" : "row"}
                  spacing={2}
                  alignItems="center"
                  mt={isMobile ? 2 : 4}
                >
                  <Typography variant="h6" sx={{ mb: isMobile ? 2 : 0 }}>
                    Total: €
                    {cartItems.reduce(
                      (total, item) => total + item.cost * (item.quantity ?? 0),
                      0
                    )}
                  </Typography>
                  {/* Note input field */}
                  <TextField
                    label="Order Note"
                    variant="outlined"
                    value={note}
                    onChange={handleNoteChange}
                  />
                  <Button
                    variant="contained"
                    startIcon={<ShoppingCartOutlinedIcon />}
                    onClick={checkout(cartItems)}
                    disabled={cartItems.length === 0}
                  >
                    Finalizar
                  </Button>
                </Stack>
              </>
            ) : (
              <Typography variant="body1">Carrinho vazio</Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};
