import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import Layout from './Pages/Layout';
import EmployeeLayout from './Pages/EmployeeLayout/EmployeeLayout';
import EquipmentLayout from './Pages/EquipmentLayout/EquipmentLayout';
import MissingLayout from './Pages/MissingLayout/MissingLayout';
import BrandLayout from './Pages/BrandLayout/BrandLayout';
import ErrorPage from './Pages/ErrorPage';
import EmployeeList from './Pages/EmployeePages/EmployeeList';
import BrandList from './Pages/BrandPages/BrandList';
import EmployeeCreator from './Pages/EmployeePages/EmployeeCreator';
import EquipmentCreator from './Pages/EquipmentPages/EquipmentCreator';
import BrandCreator from './Pages/BrandPages/BrandCreator';
import EmployeeUpdater from './Pages/EmployeePages/EmployeeUpdater';
import EquipmentUpdater from './Pages/EquipmentPages/EquipmentUpdater';
import BrandUpdater from './Pages/BrandPages/BrandUpdater';
import SuperheroList from './Pages/EmployeePages/SuperherosPage';
import Welcome from './Pages/WelcomePage';
import StatisticsList from './Pages/Statistics';
import SingleEmployeeList from './Pages/EmployeePages/SingleEmployee';
import EquipmentList from './Pages/EquipmentPages/EquipmentList';
import MissingList from './Pages/EquipmentPages/MissingEmployees';

import './index.css';
import TableTest from './Pages/TableTest';
import FormTest from './Pages/FormTest';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '', element: <Welcome /> },
      { path: 'statistics', element: <StatisticsList /> },
      {
        path: 'create',
        element: <EmployeeCreator />,
      },
      {
        path: 'create-equipment',
        element: <EquipmentCreator />,
      },
      {
        path: 'create-brand',
        element: <BrandCreator />,
      },
      {
        path: 'superheros',
        element: <SuperheroList></SuperheroList>,
      },
      {
        path: 'search/:query',
        element: <SingleEmployeeList></SingleEmployeeList>,
      },
      {
        path: '/equipment',
        element: <EquipmentLayout />,
        children: [
          { path: '', element: <EquipmentList /> },
          {
            path: 'create-equipment',
            element: <EquipmentCreator />,
          },

          {
            path: 'update/:id',
            element: <EquipmentUpdater />,
          },
        ],
      },
      {
        path: '/missing',
        element: <MissingLayout />,
        children: [
          {
            path: '',
            element: <MissingList />,
          },
          {
            path: 'update/:id',
            element: <EmployeeUpdater />,
          },
        ],
      },
      {
        path: '/employees',
        element: <EmployeeLayout />,
        children: [
          {
            path: '',
            element: <EmployeeList />,
          },
          {
            path: 'create',
            element: <EmployeeCreator />,
          },
          {
            path: 'update/:id',
            element: <EmployeeUpdater />,
          },
          {
            path: 'search',
            element: <SingleEmployeeList></SingleEmployeeList>,
          },
        ],
      },
      {
        path: '/brands',
        element: <BrandLayout />,
        children: [
          {
            path: '',
            element: <BrandList />,
          },
          {
            path: 'update/:id',
            element: <BrandUpdater />,
          },
        ],
      },

      {
        path: 'table-test',
        element: <TableTest />,
      },
      {
        path: 'form-test',
        element: <FormTest />,
      },
      {
        path: 'hello',
        element: <h1>HELLO</h1>,
      },
      {
        path: 'superheros',
        element: <SuperheroList></SuperheroList>,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
