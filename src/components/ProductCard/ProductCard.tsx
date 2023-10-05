import IProduct from '../../interfaces/product.interface';
import notFound from '../../assets/product_not.png';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '../Button/Button';
import { useDispatch } from 'react-redux';
import {
  addItemToCart,
  removeItemFromWishlist,
} from '../../store/actions/actions';

import style from './styles.module.css';

function ProductCard({
  product,
  type = 'listOfProducts',
}: {
  product: IProduct;
  type?: string;
}) {
  const { id, images, title, price, description } = product;
  const wishlistDispatch = useDispatch();
  const cartQuantity = 1;

  function handleClick(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    wishlistDispatch(removeItemFromWishlist(id));
  }

  function handleAddToCart(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    wishlistDispatch(addItemToCart({ ...product, cartQuantity }));
  }
  return (
    <Card
      sx={{
        minWidth: 250,
        // maxWidth: type === 'listOfProducts' ? 400 : 500,
        // height: type === 'listOfProducts' ? 400 : 540,
        position: 'relative',
      }}
      className={style.card}
    >
      {type === 'listOfWishlist' && (
        <div onClick={handleClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            style={{
              position: 'absolute',
              width: '40px',
              height: '40px',
              right: '10%',
              top: '10%',
            }}
          >
            <path
              d="M20 5.57143H5.33333L6.66667 21H17.3333L18.6667 5.57143H4M12 9.42857V17.1429M15.3333 9.42857L14.6667 17.1429M8.66667 9.42857L9.33333 17.1429M9.33333 5.57143L10 3H14L14.6667 5.57143"
              stroke="black"
              stroke-width="1.56"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      )}
      <CardMedia
        component="img"
        height={type === 'listOfProducts' ? '200px' : '350px'}
        image={images[0]}
        sx={{
          borderRadius: '10px',
          border: '1px solid #eee',
          objectFit: 'contain',
        }}
        alt={style.title}
        onError={(e) => {
          const imgElement = e.target as HTMLImageElement;
          imgElement.src = notFound;
        }}
      />
      <CardContent className={style.descr}>
        <Typography gutterBottom variant="h5" component="div">
          {title.slice(0, 15)}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          $ {price}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          className={style.description}
        >
          {description}
        </Typography>
        <Button
          appearance="filled"
          style={{ width: '100%', marginTop: '20px' }}
          onClick={handleAddToCart}
        >
          Add to card
        </Button>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
