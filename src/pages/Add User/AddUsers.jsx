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
import userService, { useCreateUserMutation, useUploadBulkUsersMutation } from '../../store/services/userService';
import { ArrowLeftCircle } from 'lucide-react';

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
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadBulkUsers] = useUploadBulkUsersMutation();
  const [createUser] = useCreateUserMutation();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Create a new user object
      const newUser = {
        merchantId:"66b2858654354cd7467e5e7c",
        username: data.userName,
        phoneNumber: data.phoneNumber,
        mail: data.email
      };

      // Call the API to create the user
      const response = await createUser(newUser).unwrap();


      // Navigate back to TargetCustomers and pass the updated users data
      // navigate('/editcamp/:id', { state: { users: updatedUsers } });
      if(response){

        setSnackbar({ open: true, message: 'User added successfully!', severity: 'success' });
      }
      reset();
    } catch (error) {
      console.error('Error adding user:', error);
      setSnackbar({ open: true, message: 'Error adding user. Please try again.', severity: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (event) => {
    console.warn("ok ok ok ",event.target.files[0])
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      handleUploadBulkUsers(event.target.files[0])
    }
  };

  const handleUploadBulkUsers = async (selectedFile) => {
    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    if (selectedFile.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      alert('Please upload an Excel file.');
      return;
    }

    if (!window.confirm('Are you sure you want to upload bulk user data?')) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', selectedFile, selectedFile.name);
      formData.append('merchantId', '66b2858654354cd7467e5e7c');
      const response = await uploadBulkUsers(
        formData
      ).unwrap();

      alert(`${response.message}`);
    } catch (error) {
      console.error('Error uploading bulk user data:', error);
      alert('Error uploading bulk user data. Please try again.');
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
       <button 
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 flex items-center text-[#070C4E] hover:text-[#070C4E]/80"
      >
        <ArrowLeftCircle size={24} className="mr-2" />
        Back
      </button>
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
                <input
  type="file"
  accept=".xlsx"
  onChange={(e) => {console.log("hey eree");handleFileChange(e)}}
  style={{ display: 'none' }}
  id="upload-bulk-users-file"
/>
<label htmlFor="upload-bulk-users-file">
  <Button
    variant="contained"
    color="primary"
    component="span"
    sx={{ mt: 2 }}
  >
    Upload Bulk Users
  </Button>
</label>

                <a
                  href="http://64.227.154.213:5500/samples/UsersampleSheet.xlsx"
                  download
                  style={{ textDecoration: 'none', marginTop: '10px', display: 'inline-block' }}
                >
                  <Button variant="text" color="primary">
                    Download Sample Excel Data
                  </Button>
                </a>
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
