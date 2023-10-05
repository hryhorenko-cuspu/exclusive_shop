import React, { useMemo } from 'react';
import { Input } from '@mui/joy';
import {IFormData, setFormDataType} from '../../interfaces/formData.interface';

function CustomInput({ field, form, formData, setFormData, startDecorator, ...rest }: { formData: IFormData; setFormData: setFormDataType, startDecorator: React.ReactElement }) {
  return useMemo(() => (
    <Input
      {...field}
      {...rest}
      onChange={(e) => {
        setFormData({
          ...formData,
          [field.name]: e.target.value
        });
        form.setFieldValue(field.name, e.target.value);
      }}
      startDecorator={startDecorator}
    />
  ), [field.name, formData, form, setFormData, startDecorator]);
}

export default CustomInput;