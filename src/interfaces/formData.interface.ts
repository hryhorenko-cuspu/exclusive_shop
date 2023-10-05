import React from 'react';

export interface IFormData {
	email: string,
	password: string,
	confirmPassword: string,
	tel: string,
	gender: string,
	agreeToPolicy: boolean
}

export type setFormDataType = React.Dispatch<React.SetStateAction<IFormData>>