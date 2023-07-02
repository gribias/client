import React, { useEffect, useState } from 'react';
import {
  Box,
  Stack,
  Typography,
  FormControl,
  FormHelperText,
  TextField,
  TextareaAutosize,
  Select,
  MenuItem,
  Button,
  SelectChangeEvent
} from '@mui/material';

import { FormProps } from 'interfaces/common';
import { CustomButton } from './customButton';
import { fontWeight } from '@mui/system';
import { Controller } from 'react-hook-form';

const Form = ({
  type,
  register,
  handleSubmit,
  handleImageChange,
  formLoading,
  onFinishHandler,
  productImage,
  control
}: FormProps) => {
  const [userProduct, setUserProduct] = useState([]);

// ...

const [selectedUserProduct, setSelectedUserProduct] = useState<string[]>([]);

// ...


  useEffect(() => {
    // Fetch user IDs
    fetch('http://localhost:8080/api/v1/users')
      .then((response) => response.json())
      .then((data) => {
        // Extract user emails from the response data
        const emails = data.map((user: { email: any }) => user.email);
        console.log('emails', emails);
        setUserProduct(emails);
      })
      .catch((error) => {
        console.error('Error fetching user IDs:', error);
      });
  }, []);

  const handleUserProductChange = (event: SelectChangeEvent<unknown>) => {
    const { value } = event.target;
    setSelectedUserProduct(value as string[]);
  };

  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142d">
        {type} a product
      </Typography>

      <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#fcfcfc">
        <form
          style={{
            marginTop: '20px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
          onSubmit={handleSubmit(onFinishHandler)}
        >
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: '10px',
                fontSize: 16,
                color: '#11142d'
              }}
            >
              Enter product reference
            </FormHelperText>
            <TextField
              fullWidth
              required
              id="outlined-basic"
              color="info"
              variant="outlined"
              {...register('reference', {
                required: true
              })}
            />
          </FormControl>
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: '10px',
                fontSize: 16,
                color: '#11142d'
              }}
            >
              Description
            </FormHelperText>
            <TextareaAutosize
              minRows={5}
              placeholder="Write description"
              color="info"
              style={{
                width: '100%',
                background: 'transparent',
                fontSize: '16px',
                borderColor: 'rgba(0,0,0,0.23)',
                borderRadius: 6,
                padding: 10,
                color: '#919191'
              }}
              {...register('description', {
                required: false
              })}
            />
          </FormControl>
          <Stack direction="row" gap={4}>
            <FormControl sx={{ flex: 1 }}>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: '10px 0',
                  fontSize: 16,
                  color: '#11142d'
                }}
              >
                Select Material type
              </FormHelperText>
              <Select
                variant="outlined"
                color="info"
                required
                inputProps={{
                  'aria-label': 'Without label'
                }}
                defaultValue="Ag-prata"
                {...register('material', { required: true })}
              >
                <MenuItem value="Ag-prata"> Prata</MenuItem>
                <MenuItem value="Au-Ouro "> Ouro</MenuItem>
                <MenuItem value="Au-Ag"> Ouro/Prata</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: '10px',
                  fontSize: 16,
                  color: '#11142d'
                }}
              >
                {' '}
                gr
              </FormHelperText>
              <TextField
                fullWidth
                required
                id="outlined-basic"
                color="info"
                type="number"
                variant="outlined"
                {...register('grams', {
                  required: true
                })}
              />
            </FormControl>
            {/* Add the dropdown for user IDs */}
            <FormControl>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: '10px',
                  fontSize: 16,
                  color: '#11142d'
                }}
              >
                Select User Email
              </FormHelperText>
              <Controller
    name="userProduct"
    control={control}
    defaultValue={[]}
    render={({ field }) => (
      <Select
        variant="outlined"
        color="info"
        required
        inputProps={{
          'aria-label': 'Without label'
        }}
        multiple
        {...field}
      >
        {userProduct.map((id) => (
          <MenuItem key={id} value={id}>
            {id}
          </MenuItem>
        ))}
      </Select>
    )}
  />
            </FormControl>
          </Stack>
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: '10px',
                fontSize: 16,
                color: '#11142d'
              }}
            >
              Enter cost price
            </FormHelperText>
            <TextField
              fullWidth
              required
              id="outlined-basic"
              color="info"
              type="number"
              variant="outlined"
              {...register('cost', {
                required: true
              })}
            />
          </FormControl>
          <Stack direction="column" gap={1} justifyContent="center" mb={2}>
            <Stack direction="row" gap={2}>
              <Typography color="#11142d" fontSize={16} fontWeight={500} my="10px">
                Product Photo
              </Typography>
              <Button
                component="label"
                sx={{
                  width: 'fit-content',
                  color: '#2ed480',
                  textTransform: 'capitalize',
                  fontSize: 16
                }}
              >
                Upload *
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={(e) => {
                    //@ts-ignore
                    handleImageChange(e.target.files[0]);
                  }}
                />
              </Button>
            </Stack>
            <Typography fontSize={14} color="#808191" sx={{ wordBreak: 'break-all' }}>
              {productImage?.name}
            </Typography>
          </Stack>
          <CustomButton
            type="submit"
            title={formLoading ? 'Submitting...' : 'Submit'}
            backgroundColor="#475be8"
            color="#fcfcfc"
          />
        </form>
      </Box>
    </Box>
  );
};

export default Form;