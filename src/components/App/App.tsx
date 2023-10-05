import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import StepContext from '../StepsProvider/StepsProvider';
import routesConfig from '../../routes/routesConfig';
import { useEffect } from 'react';
import 'swiper/css';
import './App.css'

function App() {
  const stepContext = useContext(StepContext);

  if (!stepContext) {
    throw new Error(
      "stepContext has to be used within <Provider>"
    );
  }

  const { currentStep, resetStep } = stepContext;

  const location = useLocation();

  useEffect(() => {
		if (location.pathname !== '/cart/form' && location.pathname !== '/cart/form/confirm') {
			resetStep();
		}
	}, [location, resetStep]);

  const dynamicRoutes = routesConfig.map((route, index) => {

    if (route.path === '/cart/form' && currentStep !== 1 || route.path === '/cart/form/confirm' && currentStep !== 2) {

      return (
        <Route
          key={index}
          path={route.path}
          element={<Navigate to="/cart" />}
        />
      );
    } else {
      return (
        <Route
          key={index}
          path={route.path}
          element={route.element}
        />
      );
    }
  });

  return (
   <>
      <Routes>
        {dynamicRoutes}
      </Routes>
   </>
  )
}

export default App
