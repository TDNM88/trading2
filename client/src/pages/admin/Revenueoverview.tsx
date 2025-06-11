import Recentactivity from "./Recentactivity"


const Revenueoverview = () => {
  return (
    <div>
          {/* Charts and recent orders */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Revenue Overview
                </h2>
                <select className="text-sm border border-gray-300 rounded px-3 py-1">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>
              <div className="h-80">
                {/* Chart placeholder - replace with your chart library */}
                <div className="flex items-center justify-center h-full bg-gray-100 rounded">
                  <p className="text-gray-500">
                    Revenue chart will appear here
                  </p>
                </div>
              </div>
            </div>
            <div>
              <Recentactivity />
            </div>
          </div></div>
  )
}

export default Revenueoverview