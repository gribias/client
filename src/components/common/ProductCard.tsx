import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import {NumberInput} from 'components/common/numberInput'
import { Link } from "react-router-dom";
import {
    Typography,
    Box,
    Card,
    CardMedia,
    CardContent,
    Stack,
} from "@mui/material";

import { PropertyCardProps } from "interfaces/property";

import React, { useState } from "react";



const ProductCard = ({
    id,
    reference,
    material,
    cost,
    photo,
}: PropertyCardProps) => {
    const [amount, setAmount] = useState(1);
  


    return (
        <Card
            sx={{
                maxWidth: "330px",
                padding: "10px",
                "&:hover": {
                    boxShadow: "0 22px 45px 2px rgba(176, 176, 176, 0.1)",
                },
                cursor: "pointer",
                textDecoration: 'none'
            }}
            elevation={0}
        >
            <CardMedia
                component="img"
                width="100%"
                height={210}
                image={photo}
                alt="card image"
                sx={{ borderRadius: "10px" }}
            />
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: "10px",
                    paddingX: "5px",
                }}
            >
                <Stack
                    direction="column"
                    gap={1}
                    component={Link}
                    to={`/products/show/${id}`} // send after dev to top
                >
                    <Typography fontSize={16} fontWeight={500} color="#11142d">
                        {reference}
                    </Typography>
                    <Stack direction="row" gap={0.5} alignItems="flex-start">
                        <WidgetsRoundedIcon
                            sx={{
                                fontSize: 18,
                                color: "#11142d",
                                marginTop: 0.5,
                            }}
                        />
                        <Typography fontSize={14} color="#808191">
                            {material}
                        </Typography>
                    </Stack>
                </Stack>
                <Box
                    px={1.5}
                    py={0.5}
                    borderRadius={1}
                    bgcolor="#dadefa"
                    height="fit-content"
                >
                    <Typography fontSize={12} fontWeight={600} color="#475be8">
                        €{cost}
                    </Typography>
                </Box>
                
            </CardContent>
            <Stack direction="row" gap={1} alignItems="flex-end" sx={{ml: "auto"}}>
                    <NumberInput value={amount} setValue={setAmount}  />
            
                </Stack>
        </Card>
    );
};

export default ProductCard;
