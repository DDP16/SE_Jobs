import React, { useState } from "react";
import { Calendar, ChevronRight, TrendingUp, TrendingDown, Eye, FileCheck } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const [timePeriod, setTimePeriod] = useState("Week");
  const [activeTab, setActiveTab] = useState("Overview");

  const chartDataByPeriod = {
    Week: [
      { day: "Mon", jobView: 150, jobApplied: 120 },
      { day: "Tue", jobView: 122, jobApplied: 90 },
      { day: "Wed", jobView: 130, jobApplied: 110 },
      { day: "Thu", jobView: 165, jobApplied: 145 },
      { day: "Fri", jobView: 180, jobApplied: 85 },
      { day: "Sat", jobView: 95, jobApplied: 75 },
      { day: "Sun", jobView: 140, jobApplied: 105 },
    ],
    Month: [
      { day: "Week 1", jobView: 890, jobApplied: 650 },
      { day: "Week 2", jobView: 920, jobApplied: 720 },
      { day: "Week 3", jobView: 1050, jobApplied: 810 },
      { day: "Week 4", jobView: 1120, jobApplied: 890 },
    ],
    Year: [
      { day: "Jan", jobView: 3200, jobApplied: 2400 },
      { day: "Feb", jobView: 2800, jobApplied: 2100 },
      { day: "Mar", jobView: 3500, jobApplied: 2800 },
      { day: "Apr", jobView: 3100, jobApplied: 2500 },
      { day: "May", jobView: 3800, jobApplied: 3000 },
      { day: "Jun", jobView: 3400, jobApplied: 2700 },
      { day: "Jul", jobView: 3900, jobApplied: 3200 },
      { day: "Aug", jobView: 3600, jobApplied: 2900 },
      { day: "Sep", jobView: 4100, jobApplied: 3400 },
      { day: "Oct", jobView: 3800, jobApplied: 3100 },
      { day: "Nov", jobView: 4200, jobApplied: 3500 },
      { day: "Dec", jobView: 4500, jobApplied: 3800 },
    ],
  };

  const chartData = chartDataByPeriod[timePeriod];

  const jobs = [
    {
      id: 1,
      title: "Social Media Assistant",
      company: "Nomad",
      location: "Paris, France",
      type: "Full-Time",
      tags: ["Marketing", "Design"],
      applied: 5,
      capacity: 10,
      color: "bg-emerald-500",
      icon: "🏢",
    },
    {
      id: 2,
      title: "Brand Designer",
      company: "Nomad",
      location: "Paris, France",
      type: "Full-Time",
      tags: ["Business", "Design"],
      applied: 5,
      capacity: 10,
      color: "bg-blue-500",
      icon: "📦",
    },
    {
      id: 3,
      title: "Interactive Developer",
      company: "Terraform",
      location: "Berlin, Germany",
      type: "Full-Time",
      tags: ["Marketing", "Design"],
      applied: 5,
      capacity: 10,
      color: "bg-cyan-500",
      icon: "🔷",
    },
    {
      id: 4,
      title: "Product Designer",
      company: "ClassPass",
      location: "Berlin, Germ...",
      type: "Full-Time",
      tags: ["Business", "Design"],
      applied: 5,
      capacity: 10,
      color: "bg-purple-600",
      icon: "⭕",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Good morning, Maria</h1>
            <p className="text-gray-500 text-sm">Here is your job listings statistic report from July 19 - July 25.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50">
            <span className="text-sm">Jul 19 - Jul 25</span>
            <Calendar className="w-4 h-4" />
          </button>
        </div>

        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-purple-600 text-white p-6 rounded-xl flex justify-between items-center cursor-pointer hover:bg-purple-700 transition">
            <div>
              <div className="text-4xl font-bold mb-1">76</div>
              <div className="text-sm opacity-90">New candidates to review</div>
            </div>
            <ChevronRight className="w-6 h-6" />
          </div>
          <div className="bg-cyan-400 text-white p-6 rounded-xl flex justify-between items-center cursor-pointer hover:bg-cyan-500 transition">
            <div>
              <div className="text-4xl font-bold mb-1">3</div>
              <div className="text-sm opacity-90">Schedule for today</div>
            </div>
            <ChevronRight className="w-6 h-6" />
          </div>
          <div className="bg-blue-500 text-white p-6 rounded-xl flex justify-between items-center cursor-pointer hover:bg-blue-600 transition">
            <div>
              <div className="text-4xl font-bold mb-1">24</div>
              <div className="text-sm opacity-90">Messages received</div>
            </div>
            <ChevronRight className="w-6 h-6" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Job statistics</h2>
                <p className="text-sm text-gray-500">Showing Job statistic Jul 19-25</p>
              </div>
              <div className="flex gap-2">
                {["Week", "Month", "Year"].map((period) => (
                  <button
                    key={period}
                    onClick={() => setTimePeriod(period)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                      timePeriod === period
                        ? "text-purple-600 bg-purple-50"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4 mb-4 border-b">
              {["Overview", "Jobs View", "Jobs Applied"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 text-sm font-medium transition ${
                    activeTab === tab
                      ? "text-purple-600 border-b-2 border-purple-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" tick={{ fill: "#6b7280", fontSize: 12 }} />
                <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
                <Tooltip />
                {(activeTab === "Overview" || activeTab === "Jobs View") && (
                  <Bar dataKey="jobView" fill="#60a5fa" radius={[4, 4, 0, 0]} />
                )}
                {(activeTab === "Overview" || activeTab === "Jobs Applied") && (
                  <Bar dataKey="jobApplied" fill="#10b981" radius={[4, 4, 0, 0]} />
                )}
              </BarChart>
            </ResponsiveContainer>

            <div className="flex gap-6 mt-4 justify-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-400 rounded"></div>
                <span className="text-sm text-gray-600">Job View</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-500 rounded"></div>
                <span className="text-sm text-gray-600">Job Applied</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Eye className="w-5 h-5 text-blue-500" />
                  </div>
                  <span className="text-sm text-gray-600">Job Views</span>
                </div>
                <div className="text-3xl font-bold text-gray-900">2,342</div>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-sm text-gray-600">This Week</span>
                  <span className="text-sm text-emerald-500 font-medium">6.4%</span>
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                </div>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 bg-emerald-50 rounded-lg">
                    <FileCheck className="w-5 h-5 text-emerald-500" />
                  </div>
                  <span className="text-sm text-gray-600">Job Applied</span>
                </div>
                <div className="text-3xl font-bold text-gray-900">654</div>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-sm text-gray-600">This Week</span>
                  <span className="text-sm text-red-500 font-medium">0.5%</span>
                  <TrendingDown className="w-4 h-4 text-red-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Open</h3>
              <div className="text-5xl font-bold text-gray-900 mb-2">12</div>
              <div className="text-sm text-gray-500">Jobs Opened</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Applicants Summary</h3>
              <div className="text-5xl font-bold text-gray-900 mb-4">67</div>
              <div className="text-sm text-gray-500 mb-4">Applicants</div>
              
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
                <div className="h-full flex">
                  <div className="bg-purple-600" style={{ width: "45%" }}></div>
                  <div className="bg-emerald-400" style={{ width: "24%" }}></div>
                  <div className="bg-cyan-400" style={{ width: "22%" }}></div>
                  <div className="bg-blue-400" style={{ width: "9%" }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-600 rounded"></div>
                    <span className="text-gray-600">Full Time</span>
                  </div>
                  <span className="font-medium">45</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-cyan-400 rounded"></div>
                    <span className="text-gray-600">Internship</span>
                  </div>
                  <span className="font-medium">32</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-emerald-400 rounded"></div>
                    <span className="text-gray-600">Part-Time</span>
                  </div>
                  <span className="font-medium">24</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    <span className="text-gray-600">Contract</span>
                  </div>
                  <span className="font-medium">30</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-400 rounded"></div>
                    <span className="text-gray-600">Remote</span>
                  </div>
                  <span className="font-medium">22</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Job Updates Section */}
        <div className="mt-6 bg-white rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Job Updates</h2>
            <button className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium text-sm">
              View All
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {jobs.map((job) => (
              <div key={job.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 ${job.color} rounded-lg flex items-center justify-center text-2xl`}>
                    {job.icon}
                  </div>
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-medium rounded-full">
                    {job.type}
                  </span>
                </div>

                <h3 className="font-semibold text-gray-900 mb-1">{job.title}</h3>
                <p className="text-sm text-gray-500 mb-4">
                  {job.company} • {job.location}
                </p>

                <div className="flex gap-2 mb-4">
                  {job.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        tag === "Marketing" || tag === "Business"
                          ? "bg-orange-50 text-orange-600 border border-orange-200"
                          : "bg-purple-50 text-purple-600 border border-purple-200"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mb-2">
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${(job.applied / job.capacity) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <p className="text-xs text-gray-500">
                  <span className="font-medium text-gray-900">{job.applied} applied</span> of {job.capacity} capacity
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;