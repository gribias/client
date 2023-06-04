import { IResourceComponentsProps } from "@refinedev/core";
import { MuiShowInferencer } from "@refinedev/inferencer/mui";
import { Typography, Box, Stack } from "@mui/material";
import{useDelete, useGetIdentity, useShow} from "@refinedev/core";
import { useParsed , useNavigation } from "@refinedev/core";
import{Delete, Edit} from "@mui/icons-material";
import {CustomButton} from "../../components/common/customButton";

import {PropertyCardProps} from '../../interfaces/property';
export const ProductShow: React.FC<IResourceComponentsProps> = () => {
//  return <MuiShowInferencer />;
const navigate = useNavigation();
const { data: user } = useGetIdentity() as { data: { email: string } };
const {id} = useParsed();
const { mutate } = useDelete();
const { queryResult } = useShow();

const {data, isLoading, isError} = queryResult;

const productDetails = data?.data ?? [];

if(isLoading) return <div>Loading...</div>
if(isError) return <div>Error</div>

const isCurrentUser = user.email === productDetails.creator.email || user.email === "gabrielcorreia94@gmail.com";

  function handleDeleteProperty() {
    throw new Error("Function not implemented.");
  }

return (
  
    <Box
      borderRadius="15px"
      padding="20px"
      bgcolor="#fcfcfc"
      width="fit-content"
    >
      <Typography fontSize={25} fontWeight={700} color="#11142d">
        {" "}
        Propriedades{" "}
      </Typography>
      <Box
        mt="20px"
        display="flex"
        flexDirection={{
          xs: "column",
          lg: "row",
        }}
        gap={4}
      >
        <Box flex={1} maxWidth={764}>
          <img
            src={productDetails.photo}
            alt={productDetails.reference}
            height={546}
            style={{ objectFit: "cover", borderRadius: "10px" }}
            className="property_details-img"
          />

          <Box mt="15px">
            <Stack>
              <Typography
                fontSize={18}
                fontWeight={500}
                color="#11142d"
                textTransform="capitalize"
              >
                {productDetails.material}
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between"
            flexWrap="wrap" alignItems="center" mt="10px"
            >
              <Box >
                <Typography
                  fontSize={22}
                  fontWeight={600}
                  color="#11142d"
                  textTransform="capitalize"
                >
                  {productDetails.reference}
                </Typography>
                </Box>
                <Box>
                <Typography fontSize={16} fontWeight={600} mt="10px" color="#11142D">Preço</Typography>
                <Stack direction="row" alignItems="flex-end" gap={1}>
                  <Typography fontSize={25} fontWeight={700} color="#475BE8">€{productDetails.cost}</Typography>
                  {/* <Typography fontSize={14} color="#808191" mb={0.5}>for one day</Typography> */}
                </Stack>
              </Box>
              </Stack>
              <Stack>

              
              <Box>
              <Typography
                fontSize={18}
                fontWeight={500}
                color="#11142d"
                textTransform="capitalize"
              >
                Descrição: {productDetails.description}
              </Typography>
              </Box>
              </Stack>
          </Box>
          
        </Box>
        
      
      </Box>
     
    </Box>
);
};
