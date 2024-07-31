import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider } from 'react-router-dom'
import DashBoardComponent from './component/pages/dashboard/DashBoardComponent.tsx'
import { createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import RootComponent from './component/RootComponent.tsx'
import ManageComponent from './component/manage/ManageComponent.tsx'
import AuthComponent from './component/auth/AuthComponent.tsx'
import AuthProvider from './store/AppContext.tsx'
import ProtectRouter from './component/security/ProtectRouter.tsx'
import UrlSearchComponent from './component/auth/UrlSearchComponent.tsx'
import LogoutComponet from './component/auth/LogoutComponent.tsx'
import 'react-loading-skeleton/dist/skeleton.css'
import './language/I18Next.tsx'
import SettingComponent from './component/setting/SettingComponent.tsx'
import NotFoundComponent from './component/common/NotFoundComponent.tsx'
import ProfileComponent from './component/pages/profile/ProfileComponent.tsx'
import DetailComponent from './component/pages/dashboard/DetailComponent.tsx'
import UserComponent from './component/manage/table/UserComponent.tsx'
import ProductComponent from './component/manage/table/ProductComponent.tsx'
import CategoryComponent from './component/manage/table/CategoryComponent.tsx'
import ColorComponent from './component/manage/table/ColorComponent.tsx'
import ProductDetailComponent from './component/manage/table/ProductDetailComponent.tsx'
import VoucherComponent from './component/manage/table/VoucherComponent.tsx'
import OrderComponent from './component/manage/table/OrderComponent.tsx'
import OrderDetailComponent from './component/manage/table/OrderDetailComponent.tsx'
import CheckOutComponent from './component/pages/checkout/CheckOutComponent.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='' element={<ProtectRouter/>} >
      <Route path='' element={<RootComponent />}>
        <Route path='' element={<DashBoardComponent />} />
        <Route path='manage'>
          <Route path='' element={<ManageComponent />} />
          <Route path='users' element={<UserComponent />} />
          <Route path='products' element={<ProductComponent />} />
          <Route path='categories' element={<CategoryComponent />} />
          <Route path='colors' element={<ColorComponent />} />
          <Route path='vouchers' element={<VoucherComponent />} />
          <Route path='orders' element={<OrderComponent />} />
          <Route path='order-details' element={<OrderDetailComponent />} />
          <Route path='product-details' element={<ProductDetailComponent />} />
        </Route>
        <Route path='product/:id' element={<DetailComponent />} />
        <Route path='setting' element={<SettingComponent />} />
        <Route path='profile' element={<ProfileComponent />} />
      </Route>
      <Route path='checkout' element={<CheckOutComponent />} />
      <Route path='auth' element={<AuthComponent />} />
      <Route path='oauth' element={<UrlSearchComponent />} />
      <Route path='logout' element={<LogoutComponet />} />
      <Route path='*' element={<NotFoundComponent />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  // {/* </React.StrictMode>, */}
)
