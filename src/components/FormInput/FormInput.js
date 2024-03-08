import * as React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';
import { v4 as uuid } from 'uuid';
import { useState } from 'react';

const FormInput = ({ name, value, handleChange, handleBlur, label, helperText, error }) => {
  const [id] = useState(() => uuid());
  return (
    <FormControl sx={{ width: '100%', marginY: 2 }} variant='outlined' error={error}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        label={label}
        sx={{ width: '100%' }}
      />
      {<FormHelperText id={id}>{helperText}</FormHelperText>}
    </FormControl>
  );
};
FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
};

FormInput.defaultProps = {
  name: '',
  value: '',
  handleChange: null,
  handleBlur: null,
  label: '',
  helperText: '',
  error: false,
};

export default FormInput;
