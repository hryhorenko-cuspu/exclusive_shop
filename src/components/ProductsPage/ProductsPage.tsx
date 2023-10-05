import { useState, useEffect } from 'react';
import {
  getAllCategories,
  getAllProducts,
  getAllProductsPagination,
  getProductsByCategoryPagination,
} from '../../services/Api';
import ICategory from '../../interfaces/category.interface';
import Header from '../Header/Header';
import IProduct from '../../interfaces/product.interface';
import cn from 'classnames';
import { Link, useParams } from 'react-router-dom';

import style from './styles.module.css';
import ProductCard from '../ProductCard/ProductCard';
import Button from '../Button/Button';

function ProductsPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const { categoryId } = useParams();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(16);
  const [maxOffset, setMaxOffset] = useState(0);
  const [categoryIdTo, setCategorId] = useState<number>(
    (categoryId && +categoryId) || 0
  );

  const nextPage = () => {
    if (offset < maxOffset) {
      setOffset(offset + limit);
    }
  };

  const prevPage = () => {
    if (offset >= limit) {
      setOffset(offset - limit);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllCategories();
        const dataForOffset = await getAllProducts();
        if (!(dataForOffset instanceof Error)) {
          const max = Math.max(0, dataForOffset - limit);
          setMaxOffset(max);
        }

        if (!(data instanceof Error)) {
          setCategories(data);
        }
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (categoryId) {
      setCategorId(+categoryId);
    } else {
      setCategorId(0);
    }
  }, [categoryId]);

  useEffect(() => {
    (async () => {
      try {
        let data;
        if (categoryIdTo !== 0) {
          data = await getProductsByCategoryPagination(
            offset,
            limit,
            categoryIdTo
          );
        } else {
          data = await getAllProductsPagination(offset, limit);
        }

        if (!(data instanceof Error)) {
          setProducts(data);
        }
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    })();
  }, [offset, limit, categoryIdTo]);

  // useEffect(() =>{
  // 	const fetchData = async () => {
  // 		try {
  // 			const dataForOffset = await getProductsByCategory(categoryIdTo);
  // 			if(!(dataForOffset instanceof Error)) setMaxOffset(Math.max(0, dataForOffset - limit));

  // 			const data = await getProductsByCategoryPagination(offset, limit, categoryIdTo);
  // 			if(!(data instanceof Error)) {
  // 				setProducts(data);
  // 			}
  // 			setLoading(false)
  // 		} catch (error) {
  // 			setError(true);
  // 			setLoading(false);
  // 		}
  // 	}
  // 	fetchData();
  // }, [categoryIdTo])

  if (loading) {
    return (
      <div
        style={{
          color: 'black',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className={style.error}>
        Error loading categories. Please try again later.
      </div>
    );
  }
  return (
    <>
      <Header />
      <div className={style.wrapper}>
        <div className={style.categories}>
          <ul className={style.list}>
            <Link
              to="/products"
              className={cn(
                style.listItem,
                categoryIdTo === 0 ? style.selectedCategory : ''
              )}
              onClick={() => {
                setCategorId(0);
                setOffset(0);
              }}
            >
              <div>
                All categories<span className={style.arrowIcon}></span>
              </div>
            </Link>
            {categories.map((category) => (
              <Link
                to={`/products/${category.id}`}
                className={cn(
                  style.listItem,
                  +category.id === categoryIdTo ? style.selectedCategory : ''
                )}
                key={category.id}
                onClick={() => {
                  setCategorId(+category.id);
                  setOffset(0);
                }}
              >
                <div>
                  {category.name}
                  <span className={style.arrowIcon}></span>
                </div>
              </Link>
            ))}
          </ul>
        </div>
        <div className={style.productsWrapper}>
          <div className={style.products}>
            {products.length !== 0 ? (
              products.map((product: IProduct) => (
                <Link
                  to={`/products/${product.category.id}/${product.id}`}
                  key={product.id}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <ProductCard product={product} />
                </Link>
              ))
            ) : (
              <div
                style={{
                  textAlign: 'center',
                  color: 'black',
                  fontSize: '40px',
                  fontWeight: 'bolder',
                }}
              >
                Here is no products
              </div>
            )}
          </div>
          <div className={style.buttonsPagination}>
            {products.length && maxOffset !== 0 && (
              <>
                <Button
                  appearance={offset === 0 ? 'outlined' : 'filled'}
                  onClick={() => prevPage()}
                  disabled={offset === 0}
                  style={{ marginRight: '50px' }}
                >
                  Previous
                </Button>
                <Button
                  appearance={
                    offset > maxOffset || maxOffset === 0
                      ? 'outlined'
                      : 'filled'
                  }
                  disabled={maxOffset === 0}
                  onClick={() => nextPage()}
                >
                  Next
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductsPage;
