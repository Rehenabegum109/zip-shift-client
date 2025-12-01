import { createBrowserRouter } from "react-router";

import Coverage from "../pages/Coverage/Coverage";
import RootLayout from "../Layout/RootLayout/RootLayout"
import Home from "../pages/Home/Home/Home"
import AuthLayout from "../Layout/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import PrivetRoute from "./PrivetRoute";
import BeARider from "../pages/Home/BeARider/BeARider";
import SendPercel from "../pages/Home/SendPercel/SendPercel";
import DeshboardLayout from "../Layout/DeshboardLayout";
import MyPercel from "../pages/Deshboard/MyPercel/MyPercel";
import Payment from "../pages/Deshboard/Payment/Payment";
import PaymentSuccess from "../pages/Deshboard/Payment/PaymentSuccess";
import PaymentCancle from "../pages/Deshboard/Payment/PaymentCancle";
import PaymentHistory from "../pages/Deshboard/Payment/PaymentHistory";



export const router =createBrowserRouter([
    {
        path :"/",
        element:<RootLayout/>,
        children:
        [
            {
                index:true,
                element:<Home></Home>
            },
            {
                    path:'/send-percel',
                    loader:() =>fetch('/warehouses.json').then(res =>res.json()),
                    element:<PrivetRoute><SendPercel/> </PrivetRoute>

            },
            {
                 path:'/be-a-rider',
                 loader:() =>fetch('/warehouses.json').then(res =>res.json()),
                 element:<PrivetRoute><BeARider></BeARider></PrivetRoute>           
            },
            {
                path:"coverage",
                loader:() =>fetch('/warehouses.json').then(res =>res.json()),
                element:<Coverage/>
            }
        ]
    },
    {
        path:"/",
        element:<AuthLayout/>,
        children:[
            {
                path:'login',
                element:<Login/>
            },
            {
                path:'register',
                element:<Register/>
            }
        ]
    },
    {
        path:'deshboard',
        element:<PrivetRoute><DeshboardLayout></DeshboardLayout></PrivetRoute>,
        children:[
            {
                path:'my-percel',
                element:<MyPercel/>
            },
            {
                path:"payment/:parcelId",
                element:<Payment></Payment>
            },
            {
                path:'payment-success',
                element:<PaymentSuccess/>
            },
            {
                path:'payment-cancel',
                element:<PaymentCancle></PaymentCancle>
            },{
                
            path:'payment-history',
            element:<PaymentHistory/>
            }
        ]
    }
])