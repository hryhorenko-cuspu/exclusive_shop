import {Radio} from '@mui/joy';
import {IFormData, setFormDataType} from '../../interfaces/formData.interface';
import style from './styles.module.css';

const RadioGroup = ({ field, formData, setFormData }: { formData: IFormData; setFormData: setFormDataType }) => (
	<div className={style.radio}>
		<Radio
			{...field}
			checked={field.value === 'Male'}
			value="Male"
			label='Male'
			onChange={() => {
				setFormData({
					...formData, 
					gender: 'Male'
				})
				field.onChange({
					target: {
						name: field.name,
						value: 'Male',
					},
				});
			}}
		/>
		<Radio
			{...field}
			checked={field.value === 'Female'}
			value="Female"
			label='Female'
			onChange={() => {
				setFormData({
					...formData, 
					gender: 'Female'
				})
				field.onChange({
					target: {
						name: field.name,
						value: 'Female',
					},
				});
			}}
		/>
	</div>
);

export default RadioGroup;
  