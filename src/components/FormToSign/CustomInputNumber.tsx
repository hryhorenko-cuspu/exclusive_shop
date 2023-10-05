import { useMemo } from 'react';
import PhoneInput from 'react-phone-input-2';
import {IFormData, setFormDataType} from '../../interfaces/formData.interface';

function CustomInputNumber({ field, form, formData, setFormData, startDecorator, width,...props }: { formData: IFormData; setFormData: setFormDataType, startDecorator: React.ReactElement, width?: string }) {
	return useMemo(() => (
		<PhoneInput
			{...field}
			{...props}
		country={'ua'}
		inputStyle={{
			fontFamily: 'Poppins',
			fontSize: 'inherit',
			fontWeight: 'inherit',
			width
		}}
			onChange={(value) => {
				setFormData({
					...formData,
					tel: value
				});
				form.setFieldValue(field.name, value);
			}}
		/>
	), [field.name, formData, form, setFormData, startDecorator]);
}

export default CustomInputNumber;