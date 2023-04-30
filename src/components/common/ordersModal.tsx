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
    Drawer
  } from "@mui/material";
  import { styled } from '@mui/material/styles';
  import Paper from '@mui/material/Paper';
  import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
  
  import CartContext from "contexts/Cart/CartContext";
  import React, { useContext } from "react";
  //import { ICart } from "../../interfaces/cart";

  interface OrdersModalProps {
    open: boolean;
    onClose: () => void;
  }

  
  export const OrdersModal: React.FC<OrdersModalProps> = ({ onClose , open}) => {

    //ts-ignore
    const { cartItems, clearCart, increase,itemCount} = useContext(CartContext);
  
    const handleCheckout = () => {
      // Implement the checkout process here
      console.log("Checkout process initiated");
    };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
  
    return (
      <Modal open={open} onClose={onClose} BackdropComponent={Backdrop} >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
            minWidth: "300px",
            maxWidth: "800px",
            maxHeight: "80vh",
            overflow: "auto",
          }}
        >
          <Card>
            <CardContent>
              <Typography variant="h5" mb={2}>
                Encomenda
              </Typography>
              {/* //@ts-ignore */}
          
              <Stack
                spacing={2}
                direction="column"
              >
                
              {cartItems.map((item: any) => (
                <>
                
                <Divider variant="inset"  />
              <Stack spacing={2}
              key={item.id}
              direction="row"
              >    
              
                <Stack
                 direction={{ xs: 'column', sm: 'row' }}
                 spacing={{ xs: 1, sm: 2, md: 4 }}
                 justifyContent="flex-end"
                alignItems="center"
                >  
                <img src={item.photo} alt={item?.reference} width="100px" />
                  <Typography variant="subtitle1"></Typography>
                  <Stack  direction="column">
                  <Typography display="block" fontWeight="bold"> {item?.reference}</Typography>
                  <Typography variant="body1"> €{item.cost}
          { item.quantity && item.quantity > 1 &&  " x " + item.quantity }
          </Typography>
                  
                  </Stack>
                 
                  <ControlPointOutlinedIcon 
                   onClick={() => increase(item)}
                  />
                  <Typography display="block"> €{ item.quantity && item.quantity > 1 && (item.quantity * item.cost) }</Typography>
                  
                  <Divider sx={{ my: 2 }} />
                </Stack>
                </Stack>
                </>
              ))}
              </Stack>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <Typography variant="h6" sx={{ mr: 2 }}>
                  total de unidades: {itemCount}
                </Typography>
                <Typography variant="h6" sx={{ mr: 2 }}>
                  Total: €{cartItems.reduce(
                    //@ts-ignore
                    (total, item) => total + item.cost * item.quantity,
                    0
                  )}
                </Typography>
                <Button variant="contained" onClick={handleCheckout}>
                  Checkout
                </Button>
              </Box>
            </CardContent>
          </Card>
          <Button
            variant="contained"
            onClick={clearCart}
            sx={{ mt: 2 }}
          >
            Clear Cart
          </Button>
        </Box>
      </Modal>
    );
  };
  