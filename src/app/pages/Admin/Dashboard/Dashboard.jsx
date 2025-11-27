import { Users, GraduationCap, Building2, Briefcase, TrendingUp, UserCheck, FileText, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

const stats = [
  {
    title: 'Total Students',
    value: '1,284',
    change: '+12.5%',
    icon: GraduationCap,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    title: 'Total Companies',
    value: '156',
    change: '+8.2%',
    icon: Building2,
    color: 'bg-purple-50 text-purple-600',
  },
  {
    title: 'Active Jobs',
    value: '342',
    change: '+23.1%',
    icon: Briefcase,
    color: 'bg-green-50 text-green-600',
  },
  {
    title: 'Total Applications',
    value: '2,847',
    change: '+15.3%',
    icon: FileText,
    color: 'bg-orange-50 text-orange-600',
  },
  {
    title: 'Active Users',
    value: '1,089',
    change: '+5.7%',
    icon: UserCheck,
    color: 'bg-cyan-50 text-cyan-600',
  },
  {
    title: 'Pending Reviews',
    value: '89',
    change: '-3.2%',
    icon: Clock,
    color: 'bg-pink-50 text-pink-600',
  },
];

const recentActivities = [
  { user: 'John Doe', action: 'applied to Software Engineer position', company: 'TechCorp', time: '5 minutes ago' },
  { user: 'Jane Smith', action: 'updated profile and CV', company: null, time: '12 minutes ago' },
  { user: 'Microsoft', action: 'posted new job listing', company: 'Microsoft', time: '1 hour ago' },
  { user: 'Sarah Johnson', action: 'completed interview', company: 'Google', time: '2 hours ago' },
  { user: 'Amazon', action: 'updated company information', company: 'Amazon', time: '3 hours ago' },
];

const topCompanies = [
  { name: 'Google', jobs: 24, applications: 342 },
  { name: 'Microsoft', jobs: 18, applications: 256 },
  { name: 'Amazon', jobs: 16, applications: 198 },
  { name: 'Apple', jobs: 12, applications: 187 },
  { name: 'Meta', jobs: 10, applications: 165 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-gray-900 mb-1 font-semibold">Dashboard</h3>
        <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card className="border border-gray-200" key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
                  <p className="text-gray-900 text-2xl mb-1">{stat.value}</p>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-green-600" />
                    <span className="text-sm text-green-600">{stat.change}</span>
                    <span className="text-xs text-gray-500 ml-1">from last month</span>
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 text-sm">
                      <span>{activity.user}</span> {activity.action}
                      {activity.company && (
                        <span> at <span>{activity.company}</span></span>
                      )}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Companies */}
        <Card>
          <CardHeader>
            <CardTitle>Top Companies by Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCompanies.map((company, index) => (
                <div key={index} className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs">{index + 1}</span>
                    </div>
                    <div>
                      <p className="text-gray-900">{company.name}</p>
                      <p className="text-xs text-gray-500">{company.jobs} active jobs</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-900">{company.applications}</p>
                    <p className="text-xs text-gray-500">applications</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}