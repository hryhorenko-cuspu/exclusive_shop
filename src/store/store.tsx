import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const store = configureStore(
  { reducer: rootReducer },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// store.subscribe(() => {
//   const state = store.getState();
//   if (state.wishlist && state.wishlist.results) {
//     const data = state.wishlist.results;
//     Object.values(data).forEach((item) => {
//       localStorage.setItem(item.id, JSON.stringify(item));
//     });
//   }
// });

export default store;