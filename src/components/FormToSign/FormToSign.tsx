import Key from '@mui/icons-material/Key';
import MailIcon from '@mui/icons-material/Mail';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { ChangeEvent, useState } from 'react';
import * as Yup from 'yup';
import { IFormData, setFormDataType } from '../../interfaces/formData.interface';
import Button from '../Button/Button';
import CustomInput from './CustomInput';
import CustomInputNumber from './CustomInputNumber';
import RadioGroup from './RadioGroup';

import 'react-phone-input-2/lib/style.css';
import style from './styles.module.css';

function FormToSign ({type, formData, setFormData, handleClose}: { type: string, formData: IFormData,  setFormData: setFormDataType, handleClose: () => void }) {
	const [showForgotPassword, setShowForgotPassword] = useState(false);

	function handleForgotPassword (e: React.MouseEvent<HTMLAnchorElement>) {
		e.preventDefault();
		setShowForgotPassword(true);
	}

	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.email('Invalid email address')
			.required('Email is required'),
		password: Yup.string()
			.when('showForgotPassword', ([showForgotPassword]) => {
				return showForgotPassword ? Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required') : Yup.string().notRequired();
			}),
		showFields: Yup.bool(),
		confirmPassword: Yup.string()
				.when('showFields', ([showFields]) => {
					return showFields ? Yup.string().oneOf([Yup.ref('password'), undefined], 'Passwords must match').required('Password is required') : Yup.string().notRequired();
				}),
		tel: Yup.string()
			.when('showFields', ([showFields]) => {
				return showFields ? Yup.string().min(10, 'Telephone number must be at least 10 characters').required('Telephone number is required') : Yup.number().notRequired();
			}),
		gender: Yup.string()
				.when('showFields', ([showFields]) => {
					return showFields ? Yup.string().required('Gender Password is required') : Yup.string().notRequired();
				}),
		agreeToPolicy: Yup.bool()
				.when('showFields', ([showFields]) => {
					return showFields ? Yup.bool().oneOf([true], 'You must agree'): Yup.bool().notRequired();
				}),
		});
	return (
		<Formik 
			initialValues={{
				...formData,
				showFields: type === 'Sign up'
			}}
			onSubmit={(values, { setSubmitting }) => {
				console.log(values);
				setFormData({
					email: '',
					password: '',
					confirmPassword: '',
					tel: '',
					gender: '',
					agreeToPolicy: false,
				})
				handleClose();
				alert('Check the console!')
				setSubmitting(false);
			}}
			validationSchema={validationSchema}>
			{({ setFieldValue }) => (
				<Form>
					{!showForgotPassword && (
						<>
							<label className={style.formLabel}>Login</label>
							<div className={style.field}>
								<Field
									type="email"
									name="email"
									value={formData.email}
									component={CustomInput}
									formData={formData}
									setFormData={setFormData}
									startDecorator={<MailIcon />}
								/>
								<ErrorMessage name="email" render={(errorMsg) => (
										<div className={style.error}>{errorMsg}</div>
								)} />
							</div>
						<label className={style.formLabel}>Password</label>
						<div className={style.field}>
							<Field
								type="password"
								name="password"
								value={formData.password}
								component={CustomInput}
								formData={formData}
								setFormData={setFormData}
								startDecorator={<Key />}
							/>
							<ErrorMessage name="password" render={(errorMsg) => (
										<div className={style.error}>{errorMsg}</div>
							)} />
						</div>
						</>
					)}

				{type === 'Sign up'? (
					<>
						<label className={style.formLabel}>Password confirmation</label>
						<div className={style.field}>
							<Field
								value={formData.confirmPassword}
								type="password"
								name="confirmPassword"
								component={CustomInput}
								formData={formData}
								setFormData={setFormData}
								startDecorator={<Key />}
							/>
							<ErrorMessage name="confirmPassword" render={(errorMsg) => (
								<div className={style.error}>{errorMsg}</div>
							)} />
						</div>
						<label className={style.formLabel}>Phone number</label>
						<div className={style.field}>
							<Field
								type="tel"
								name="tel"
								value={formData.tel}
								component={CustomInputNumber}
								formData={formData}
								setFormData={setFormData}
							/>
							<ErrorMessage name="tel" render={(errorMsg) => (
								<div className={style.error}>{errorMsg}</div>
							)} />
						</div>
						<label className={style.formLabel} style={{textAlign: 'center'}}>Gender</label>
						<div className={style.field} style={{marginBottom: '20px'}}>
							<Field
								name="gender"
								value={formData.gender}
								component={RadioGroup}
								formData={formData}
								setFormData={setFormData}
							/>
							<ErrorMessage name="gender" render={(errorMsg) => (
								<div className={style.error}>{errorMsg}</div>
							)} />
						</div>
						<hr style={{marginBottom: '30px'}}/>
						<div className={style.field}>
							<label>
								<Field
									checked={formData.agreeToPolicy}
									type="checkbox"
									name="agreeToPolicy"
									onChange={(e: ChangeEvent<HTMLInputElement>) => {
										setFormData({
											...formData, 
											[e.target.name]: e.target.checked
										})
										setFieldValue('agreeToPolicy', e.target.checked);
									}}
								/>
								I agree with the Private policy
							</label>
							<ErrorMessage name="agreeToPolicy" render={(errorMsg) => (
								<div className={style.error}>{errorMsg}</div>
							)} />
						</div>
					</>
				): undefined}
				{showForgotPassword && type === 'Sign in'? (
						<>
							<label className={style.formLabel}>Email</label>
							<div className={style.field}>
								<Field
									type="email"
									name="email"
									value={formData.email}
									component={CustomInput}
									formData={formData}
									setFormData={setFormData}
									startDecorator={<MailIcon />}
								/>
								<ErrorMessage name="email" render={(errorMsg) => (
										<div className={style.error}>{errorMsg}</div>
								)} />
							</div>
						</>
				): undefined}
				{type === 'Sign in' && !showForgotPassword? <a href="#" className={style.forgot} onClick={handleForgotPassword}>Forgot password?</a>: undefined}
				<Button appearance='filled' type='submit' className={style.buttonSubmit}>Submit</Button>
				</Form>
			)}
		</Formik>
	)
}

export default FormToSign;