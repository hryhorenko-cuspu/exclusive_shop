import style from './styles.module.css';

function Subheader ({type}: {type: string}) {
	return (
		<>
			<div className={style.subheader}>
				<div className={style.redBox}></div>
				<h3>{type}</h3>
			</div>
			<hr style={{backgroundColor: '#DB4444', height: '2px', border: '0', marginBottom: '5%'}} />
		</>
	)
}

export default Subheader;