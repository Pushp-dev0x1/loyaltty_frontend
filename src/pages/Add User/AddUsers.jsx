import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  CircularProgress,
  ThemeProvider,
  createTheme,
  Grid,
  Paper,
  Snackbar,
  IconButton,
  Alert
} from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate, useLocation } from 'react-router-dom';

const validationSchema = yup.object().shape({
  userName: yup
    .string()
    .required('User name is required')
    .min(2, 'User name must be at least 2 characters')
    .max(50, 'User name must not exceed 50 characters'),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  email: yup
    .string()
    .email('Invalid email format'),
}).test('contactInfo', 'Either phone number or email is required', function(values) {
  return values.phoneNumber || values.email;
});

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(2),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
  height: '56px',
}));

const theme = createTheme({
  palette: {
    primary: {
      main: '#040869',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
        },
      },
    },
  },
});

const AddUsers = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a new user object
      const newUser = {
        _id: Date.now().toString(), // Generate a temporary ID
        username: data.userName,
        phoneNumber: data.phoneNumber,
        email: data.email
      };

      // Get the existing users from the location state or initialize an empty array
      const existingUsers = location.state?.users || [];

      // Add the new user to the existing users
      const updatedUsers = [...existingUsers, newUser];

      // Navigate back to TargetCustomers and pass the updated users data
      navigate('/editcamp/:id', { state: { users: updatedUsers } });
      
      setSnackbar({ open: true, message: 'User added successfully!', severity: 'success' });
      reset();
    } catch (error) {
      console.error('Error adding user:', error);
      setSnackbar({ open: true, message: 'Error adding user. Please try again.', severity: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
          <Grid item xs={12} sm={10} md={8}>
            <Paper elevation={3} sx={{ p: { xs: 3, sm: 4, md: 5 }, mt: { xs: 2, sm: 3, md: 4 }, mb: { xs: 2, sm: 3, md: 4 } }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <PersonAddIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography component="h1" variant="h4" gutterBottom>
                  Add New User
                </Typography>
                <StyledForm onSubmit={handleSubmit(onSubmit)} noValidate>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="userName"
                    label="User Name"
                    name="userName"
                    autoComplete="name"
                    autoFocus
                    {...register('userName')}
                    error={!!errors.userName}
                    helperText={errors.userName?.message}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    id="phoneNumber"
                    label="Phone Number"
                    name="phoneNumber"
                    autoComplete="tel"
                    {...register('phoneNumber')}
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber?.message}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    {...register('email')}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                  {errors.contactInfo && (
                    <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                      {errors.contactInfo.message}
                    </Typography>
                  )}
                  <SubmitButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    sx={{ mt: 3, mb: 2 }}
                  >
                    {isSubmitting ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      'Add User'
                    )}
                  </SubmitButton>
                </StyledForm>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default AddUsers;
