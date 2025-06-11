
const Cards = () => {
      // Sample data - replace with real data from your API
  const stats = [
    { title: "Total Users", value: "2,543", change: "+12%", trend: "up" },
    { title: "Revenue", value: "$12,345", change: "+8%", trend: "up" },
    { title: "Orders", value: "543", change: "-3%", trend: "down" },
    { title: "Conversion", value: "3.2%", change: "+0.5%", trend: "up" },
  ];

  return (
    <div>{/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-semibold text-gray-800 mt-1">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`p-3 rounded-full ${
                      stat.trend === "up"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {stat.trend === "up" ? (
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 10l7-7m0 0l7 7m-7-7v18"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        ></path>
                      </svg>
                    )}
                  </div>
                </div>
                <p
                  className={`text-sm mt-2 ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.change} from last week
                </p>
              </div>
            ))}
          </div></div>
  )
}

export default Cards