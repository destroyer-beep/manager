import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from 'react-router-dom';
import { Products } from "../components/pages/products/products";
import { RoutePath } from "../lib/enums/routePath";
import { AppWrapper } from "../components/features/app-wrapper/app-wrapper";
export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
        <Route element={<AppWrapper/>}>
            <Route path={RoutePath.Products} element={<Products/>}/>
        </Route>
        <Route path="*" element={<Navigate to={RoutePath.Products} replace />} />
    </>
  ),
  {basename: '/'},
);
