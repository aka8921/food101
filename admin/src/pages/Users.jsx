import {Link} from 'react-router-dom'

const people = [
    { name: 'Archana TK', username: '@archanatk', balance: '$5,000', role: 'Day Scholar' },
  { name: 'John Smith', username: '@jsmith', balance: '$2,500', role: 'Residential Student' },
  { name: 'Jane Doe', username: '@jdoe', balance: '$4,000', role: 'Day Scholar' },
  { name: 'Mike Johnson', username: '@mjohnson', balance: '$3,200', role: 'Residential Student' },
  { name: 'Lisa Brown', username: '@lbrown', balance: '$6,500', role: 'Day Scholar' },
  { name: 'David Lee', username: '@dlee', balance: '$1,800', role: 'Residential Student' },
  { name: 'Emily Chen', username: '@echen', balance: '$2,300', role: 'Day Scholar' },
  { name: 'Daniel Kim', username: '@dkim', balance: '$7,800', role: 'Residential Student' },
  { name: 'Samantha Wong', username: '@swong', balance: '$4,500', role: 'Day Scholar' },
  { name: 'Kevin Patel', username: '@kpatel', balance: '$6,200', role: 'Residential Student' },
  ]
  
 export const Users = () => {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Users</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the users in your account including their name, title, email and role.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <Link to={"/users/add"}>
            <button
              type="button"
              className="block rounded-md bg-indigo-600 py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add user
            </button>
            </Link>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Name
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Username
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Balance
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Role
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {people.map((person) => (
                      <tr key={person.email}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {person.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.username}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.balance}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.role}</td>
                        <td className="relative flex gap-8 items-center justify-end whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <a href="#" className="text-indigo-600 hover:text-indigo-900">
                            Edit
                          </a>
                          <a href="#" className="text-green-600 hover:text-green-900">
                            Recharge
                          </a>
                          <a href="#" className="text-red-600 hover:text-red-900">
                            Delete
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  