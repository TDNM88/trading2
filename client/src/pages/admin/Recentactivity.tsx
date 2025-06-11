import {FiUsers} from "react-icons/fi";

const Recentactivity = () => {
  return (
    <div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Recent Activities
              </h2>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                      <FiUsers className="text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        New user registered
                      </p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div></div>
  )
}

export default Recentactivity