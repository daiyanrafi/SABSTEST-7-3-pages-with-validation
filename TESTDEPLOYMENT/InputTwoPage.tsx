// InputTwoPage.tsx
import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, FormHelperText, Grid } from '@mui/material';

interface InputTwoPageProps {
  onSubmit: (data: { school: string; college: string }) => void;
}

interface FormInputs {
  school: string;
  college: string;
}

const InputTwoPage: React.FC<InputTwoPageProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const handleFormSubmit: SubmitHandler<FormInputs> = (data) => {
    // Call the parent onSubmit function if validation passes
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <TextField
        label="School"
        fullWidth
        {...register('school', { required: 'School is required' })}
        error={!!errors.school}
      />
      {errors.school && (
        <FormHelperText error>
          {errors.school.message}
        </FormHelperText>
      )}

      <TextField
        label="College"
        fullWidth
        {...register('college', { required: 'College is required' })}
        error={!!errors.college}
      />
      {errors.college && (
        <FormHelperText error>
          {errors.college.message}
        </FormHelperText>
      )}

      {/* <Button type="submit" variant="contained" color="primary">
        Submit
      </Button> */}

      <Grid container spacing={2}>
        <Grid item>
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
            Submit
          </Button>
        </Grid>
        {/* <Grid item>
      
        </Grid> */}
      </Grid>
    </form>
  );
};

export default InputTwoPage;