import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import { IFormData } from '../../interfaces/formData.interface';
import WishlistCartCounter from '../WishlistCartCounter/WishListCartCounter';

import style from './styles.module.css';

function Header() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [hamburgerActive, sethamburgerActive] = useState<boolean>(false);
  const [type, setType] = useState<string>('');
  const [formData, setFormData] = useState<IFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    tel: '',
    gender: '',
    agreeToPolicy: false,
  });

  function handleClose() {
    localStorage.setItem('formData', JSON.stringify(formData));
    setOpen(false);
  }

  useEffect(() => {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData);
    }
  }, []);

  const handleOpen = (typeOfForm: string): void => {
    setType(typeOfForm);
    setOpen(true);
  };

  return (
    <header className={style.header}>
      <Link to="/" className={style.logo}>
        Exclusive
      </Link>
      <form action="">
        <div className={style.searchBar}>
          <input
            className={style.input}
            type="text"
            placeholder="What are you looking for?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className={style.submit} type="submit">
            <span>
              <svg
                width="19"
                height="18"
                viewBox="0 0 19 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  id="Vector"
                  d="M17.5 17L13.7223 13.2156M15.8158 8.15789C15.8158 10.0563 15.0617 11.8769 13.7193 13.2193C12.3769 14.5617 10.5563 15.3158 8.65789 15.3158C6.7595 15.3158 4.93886 14.5617 3.5965 13.2193C2.25413 11.8769 1.5 10.0563 1.5 8.15789C1.5 6.2595 2.25413 4.43886 3.5965 3.0965C4.93886 1.75413 6.7595 1 8.65789 1C10.5563 1 12.3769 1.75413 13.7193 3.0965C15.0617 4.43886 15.8158 6.2595 15.8158 8.15789V8.15789Z"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </button>
        </div>
      </form>

      <div className={style.interactive}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <WishlistCartCounter type="wishlist" />
          <WishlistCartCounter type="cart" />
        </div>
        <div className={hamburgerActive ? style.authActive : style.auth}>
          <Button
            appearance="outlined"
            onClick={() => handleOpen('Sign in')}
            style={{ marginRight: '16px' }}
          >
            Sign in
          </Button>
          <Button appearance="filled" onClick={() => handleOpen('Sign up')}>
            Sign up
          </Button>
        </div>
      </div>
      <Modal
        open={open}
        handleClose={handleClose}
        formData={formData}
        setFormData={setFormData}
        type={type}
      />
      <div
        className={hamburgerActive ? style.hamburgerActive : style.hamburger}
        onClick={() => sethamburgerActive(!hamburgerActive)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
}

export default Header;
