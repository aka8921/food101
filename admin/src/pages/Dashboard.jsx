import { BoltIcon, ChartBarIcon, CurrencyRupeeIcon, UsersIcon } from '@heroicons/react/24/outline'
import { Route, Routes } from 'react-router-dom';
import {Users} from './Users'
import {Menu} from './Menu'
import {Orders} from './Orders'
import {Transactions} from './Transactions'
import Logo from '../assets/logo.png'

const navigation = [
  { name: 'Users', icon: UsersIcon, href: '#', current: true },
  { name: 'Menu', icon: BoltIcon, href: '#', current: false },
  { name: 'Orders', icon: ChartBarIcon, href: '#', current: false },
  { name: 'Transactions', icon: CurrencyRupeeIcon, href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const Dashboard = () => {
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
        <nav className="mt-5 flex-1 space-y-1 bg-white px-2" aria-label="Sidebar">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={classNames(
                item.current
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
              {item.count ? (
                <span
                  className={classNames(
                    item.current ? 'bg-white' : 'bg-gray-100 group-hover:bg-gray-200',
                    'ml-3 inline-block rounded-full py-0.5 px-3 text-xs font-medium'
                  )}
                >
                  {item.count}
                </span>
              ) : null}
            </a>
          ))}
        </nav>
      </div>
      <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
        <a href="#" className="group block w-full flex-shrink-0">
          <div className="flex items-center">
            <div>
              <img
                className="inline-block h-9 w-9 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Tom Cook</p>
              <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">View profile</p>
            </div>
          </div>
        </a>
      </div>
    </div>

    <div className="flex-1">
      <Routes>
          <Route exact path="/" element={<Users />} />
          <Route exact path="/menu" element={<Menu />} />
          <Route exact path="/orders" element={<Orders />} />
          <Route exact path="/transactions" element={<Transactions />} />
        </Routes>
    </div>
    </div>

  )
}