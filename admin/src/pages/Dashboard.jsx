import { BoltIcon, ChartBarIcon, CurrencyRupeeIcon, UsersIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'
import { Route, Routes } from 'react-router-dom';
import {Orders} from './Orders'
import {Transactions} from './transaction/Transactions'
import { NotFound } from './NotFound';
import Logo from '../assets/logo.png'
import { Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
// USER
import {Users} from './user/Users'
import { AddUser } from './user/AddUser';
import { EditUser } from './user/EditUser';
import { RechargeUser } from './user/RechargeUser';
// Menu
import {Menu} from './menu/Menu'
import { AddMenu } from './menu/AddMenu';
import { EditMenu } from './menu/EditMenu';
import jwt_decode from "jwt-decode";


const navigation = [
  { name: 'Users', page:"/users", icon: UsersIcon, href: '#', current: true },
  { name: 'Menu', page:"/menu",icon: BoltIcon, href: '#', current: false },
  { name: 'Orders', page:"/orders",icon: ChartBarIcon, href: '#', current: false },
  { name: 'Transactions', page:"/transactions",icon: CurrencyRupeeIcon, href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const Dashboard = () => {
  const token = localStorage.getItem("token");
  const decodedToken = jwt_decode(token);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = ()=> {
    console.log("Logging you out... ")
    localStorage.clear()
    navigate("/login")
}

  return (
    <div className="flex">
      <div className="flex w-[200px] bg-red-300 h-screen flex-col border-r border-gray-200 bg-white">
      <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
        <div className="flex flex-shrink-0 items-center px-4">
          <img
            className="h-8 w-auto"
            src={Logo}
            alt="Food 101"
          />
          <div className="ml-4 font-bold">Food 101</div>
        </div>
        <nav className="mt-5 flex-1 flex flex-col bg-white px-2" aria-label="Sidebar">
          {navigation.map((item) => (

            <Link
              key={item.name}
              to={item.page}
              className={classNames(
                location.pathname.startsWith(item.page)
                  ? 'bg-gray-100 text-gray-900 hover:bg-gray-100 hover:text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                'group flex items-center rounded-md px-2 py-2 text-sm font-medium'
              )}
            >
              <item.icon
                className={classNames(
                  item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                  'mr-3 h-6 w-6 flex-shrink-0'
                )}
                aria-hidden="true"
              />
              <span className="flex-1">{item.name}</span>
            </Link>
          ))}
          <div
              onClick={handleLogout}
              className="cursor-pointer mt-auto text-red-600 hover:bg-red-50 hover:text-red-900 group flex items-center rounded-md px-2 py-2 text-sm font-medium"
            >
              <ArrowLeftOnRectangleIcon className='text-red-400 group-hover:text-red-500 mr-3 h-6 w-6 flex-shrink-0'/>
              <span className="flex-1">Log Out</span>
            </div>
        </nav>
      </div>
      <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
        <a href="#" className="group block w-full flex-shrink-0">
          <div className="flex items-center">
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">@{decodedToken.username}</p>
              <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">{decodedToken.userType}</p>
            </div>
          </div>
        </a>
      </div>
    </div>

    <div className="flex-1 h-screen overflow-y-scroll">
      <Routes>
          <Route exact path="/" element={<Navigate to="/users" replace />} />
          {/* USER */}
          <Route exact path="/users" element={<Users />} />
          <Route exact path="/users/add" element={<AddUser />} />
          <Route path="/users/:id/edit" element={<EditUser />} />
          <Route path="/users/:id/recharge" element={<RechargeUser />} />
          {/* MENU */}
          <Route exact path="/menu" element={<Menu />} />
          <Route exact path="/menu/add" element={<AddMenu />} />
          <Route path="/menu/:id/edit" element={<EditMenu />} />

          <Route exact path="/orders" element={<Orders />} />
          <Route exact path="/transactions" element={<Transactions />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </div>
    </div>

  )
}