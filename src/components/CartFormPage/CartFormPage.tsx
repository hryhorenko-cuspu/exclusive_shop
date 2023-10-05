import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Header from '../Header/Header';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IFormDataDelivery } from '../../interfaces/formDataDelivery.interface';
import { setLocalStorage, getLocalStorage } from '../../utils/localStorage';
import Button from '../Button/Button';
import CustomInput from '../FormToSign/CustomInput';
import CustomInputNumber from '../FormToSign/CustomInputNumber';
import StepContext from '../StepsProvider/StepsProvider';


import style from './styles.module.css';

function CartFormPage () {

	const initialFormDataDelivery = getLocalStorage('delivery') || {
		firstName: '',
		lastName: '',
		city: '',
		streetAddress: '',
		apartments: '',
		tel: '',
		email: '',
		additionalInfo: '',
	}
	const [formDataDelivery, setFormDataDelivery] = useState<IFormDataDelivery>(initialFormDataDelivery);
	const stepContext = useContext(StepContext);

	if (!stepContext) {
		throw new Error(
			"stepContext has to be used within <Provider>"
		);
	}

	const { nextStep } = stepContext;

	const navigator = useNavigate();

	const goBack = () => {
		navigator(-1);
	};

	useEffect(() => {
		const data = getLocalStorage('delivery');
		if (data) {
			setFormDataDelivery(data);
		}
	}, []);

	useEffect(() => {
		setLocalStorage('delivery', formDataDelivery);
	}, [formDataDelivery]);

	const validationSchema = Yup.object().shape({
		firstName: Yup.string()
			.min(2, 'First name is too short!')
			.max (20, 'First name is too long!')
			.required ('First name is required!'),
		lastName: Yup.string()
			.min(2, 'Last name is too short!')
			.max (20, 'Last name is too long!')
			.required ('Last name is required!'),
		city: Yup.string()
			.min(5, 'City is too short!')
			.max(20, 'City is too long!')
			.required('City is required!'),
		streetAddress: Yup.string()
			.min(10, 'Street address it too short')
			.max(20, 'Street address is too long!')
			.required('Street address is required'),
		apartments: Yup.number()
			.max(10, 'Apartmants is too long'),
		tel: Yup.string()
			.min(10, 'Phone number is too short')
			.required('Phone number is required'),
		email: Yup.string()
			.email('Invalid email address')
			.required('Email is required'),
		additionalInfo: Yup.string()
			.max(100, 'additional info is too long')
	})

	return (
		<>
			<Header/>
			<Formik
				initialValues={formDataDelivery}
				validationSchema={validationSchema}
				onSubmit={(values, {setSubmitting}) => {
					console.log('Form values:', values);
					nextStep();
					navigator('/cart/form/confirm')
					setSubmitting(false);
				}}>
				<Form className={style.formWrapper}>
					<label className={style.formLabel}>First name</label>
					<div className={style.field}>
						<Field
							type="name"
							name="firstName"
							value={formDataDelivery.firstName}
							component={CustomInput}
							formData={formDataDelivery}
							setFormData={setFormDataDelivery}
						/>
						<ErrorMessage name="firstName" render={(errorMsg) => (
								<div className={style.error}>{errorMsg}</div>
						)} />
					</div>
					<label className={style.formLabel}>Last name</label>
					<div className={style.field}>
						<Field
							type="text"
							name="lastName"
							value={formDataDelivery.lastName}
							component={CustomInput}
							formData={formDataDelivery}
							setFormData={setFormDataDelivery}
						/>
						<ErrorMessage name="lastName" render={(errorMsg) => (
								<div className={style.error}>{errorMsg}</div>
						)} />
					</div>
					<label className={style.formLabel}>City</label>
					<div className={style.field}>
						<Field
							type="text"
							name="city"
							value={formDataDelivery.city}
							component={CustomInput}
							formData={formDataDelivery}
							setFormData={setFormDataDelivery}
						/>
						<ErrorMessage name="city" render={(errorMsg) => (
								<div className={style.error}>{errorMsg}</div>
						)} />
					</div>
					<label className={style.formLabel}>Street address</label>
					<div className={style.field}>
						<Field
							type="text"
							name="streetAddress"
							value={formDataDelivery.streetAddress}
							component={CustomInput}
							formData={formDataDelivery}
							setFormData={setFormDataDelivery}
						/>
						<ErrorMessage name="streetAddress" render={(errorMsg) => (
								<div className={style.error}>{errorMsg}</div>
						)} />
					</div>
					<label className={style.formLabel}>Apartment, floor, etc. (optional)</label>
					<div className={style.field}>
						<Field
							type="text"
							name="apartments"
							value={formDataDelivery.apartments}
							component={CustomInput}
							formData={formDataDelivery}
							setFormData={setFormDataDelivery}
						/>
						<ErrorMessage name="apartments" render={(errorMsg) => (
								<div className={style.error}>{errorMsg}</div>
						)} />
					</div>
					<label className={style.formLabel}>Phone number</label>
						<div className={style.field}>
							<Field
								type="text"
								name="tel"
								value={formDataDelivery.tel}
								component={CustomInputNumber}
								formData={formDataDelivery}
								setFormData={setFormDataDelivery}
								width={'400px'}
							/>
							<ErrorMessage name="tel" render={(errorMsg) => (
								<div className={style.error}>{errorMsg}</div>
							)} />
						</div>
					<label className={style.formLabel}>Email</label>
					<div className={style.field}>
						<Field
							type="email"
							name="email"
							value={formDataDelivery.email}
							component={CustomInput}
							formData={formDataDelivery}
							setFormData={setFormDataDelivery}
						/>
						<ErrorMessage name="email" render={(errorMsg) => (
								<div className={style.error}>{errorMsg}</div>
						)} />
					</div>
					<label className={style.formLabel}>Additional info</label>
					<div className={style.field}>
						<Field
							type="text"
							name="additionalInfo"
							as="textarea"
							value={formDataDelivery.additionalInfo}
							component={CustomInput}
							formData={formDataDelivery}
							setFormData={setFormDataDelivery}
						/>
						<ErrorMessage name="additionalInfo" render={(errorMsg) => (
								<div className={style.error}>{errorMsg}</div>
						)} />
					</div>
					<div style={{display: 'flex', justifyContent: 'space-between'}}>
						<Button appearance='filled' style={{marginRight: '30px'}} onClick={goBack}>Go Back</Button>
						<Button type='submit' appearance='filled'>Confirm order</Button>
					</div>
				</Form>
			</Formik>

		</>
	)
}

export default CartFormPage;