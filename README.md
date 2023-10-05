# Exclusive - Online store

Online store implemented with React

### Install the dependencies

```bash
npm install
```

### Run in the development mode

```bash
npm run dev
```

### Building the Application

```bash
npm run build
```

### Linting

To lint your code:

```bash
npm run lint
```

## API

The API that was used as a fake BE - https://fakeapi.platzi.com/en/rest/products
NOTE: This API is dynamic that can sometimes couse the situations when it is no data for products.

Functionality:

1.  Header:
    - logo (with redirect to homepage by clicking)
    - Searchbar (search not implemented)
    - Wishlist and Cart have counter when add and remove item from it
    - Sign in and Sign up buttons (modal window with forms and retrieving data from local storage, when submitting form all data will be cleaned, forgot password works the same)
2.  Homepage:
    - Menu (works only Products link)
    - Slider (Slick)
3.  Products Page:
    - List of categories on the left (gets categories from Api)
    - List of items (if you click on the product cart it will be redirect to Product page, if you click "Add to cart" it will be add to cart item with quantity of 1)
4.  Single Product page:
    - Breadcrumbs (when you click on the product category it will be redirect to all products and filtered by category)
    - Quantity selector
    - Buy now redirect to delivery form and then to Confirmation page (when you click buy now it removes item from wishlist)
    - Add to cart (when you click multiple times on it, items will be stacked and quantity in cart will be increased. Removes item from wishlist)
    - Wishlist (add items to wishlist and remove item, fill change)
5.  Wishlist:
    - Go back button (previous page)
    - List of wishlist items
    - Remove item from wishlist
6.  Cart:
    - List of cart items
    - Remove item from cart
    - Total
    - Next step is delivery form (data will be add to local storage and retrieve from it) and then Confirmation page with list of products

Not implemented:

1.  Search
2.  Most selling items
3.  Block with recently buying in my region
4.  Multiple languages
5.  Reviews and ratings
6.  Controll with multiple images
