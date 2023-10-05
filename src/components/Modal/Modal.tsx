import { Modal, ModalClose, Sheet, Typography } from '@mui/joy';
import { IFormData, setFormDataType } from '../../interfaces/formData.interface';
import FormToSign from '../FormToSign/FormToSign';

function MyModal({
	open, handleClose, formData, setFormData, type
  }: {open: boolean, formData: IFormData, setFormData: setFormDataType, handleClose: () => void, type: string}) {

	return(
		<Modal
			aria-labelledby="modal-title"
			aria-describedby="modal-desc"
			open={open}
			onClose={handleClose}
			sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
		>
		<Sheet
			variant="outlined"
			sx={{
				maxWidth: 900,
				borderRadius: 'md',
				padding: '2% 5%',
				boxShadow: 'lg',
			}}
		>
			<ModalClose variant="plain" sx={{ m: 1 }} />
				<Typography
					component="h2"
					id="modal-title"
					level="h2"
					textColor="inherit"
					fontWeight="lg"
					mb={1}
					textAlign='center'
				>
					{type}
				</Typography>
				<FormToSign type={type} formData={formData} setFormData={setFormData} handleClose={handleClose}/>
			</Sheet>
		</Modal>
	)
}

export default MyModal;