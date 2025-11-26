import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Globe, 
  Users, 
  MapPin, 
  Building2,
  Plus,
  Edit,
  Trash2,
  Briefcase
} from 'lucide-react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";

const mockCompany = {
  id: 1,
  name: 'Google',
  logo: 'https://www.google.com/favicon.ico',
  background: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1200',
  email: 'hr@google.com',
  phone: '+1 (650) 253-0000',
  website: 'https://careers.google.com',
  employeeCount: '50,000+',
  techStack: ['JavaScript', 'Python', 'Go', 'Kubernetes', 'TensorFlow'],
  description: 'Google is a multinational technology company that specializes in Internet-related services and products. We are committed to building products that organize the world\'s information and make it universally accessible and useful.',
  socials: {
    linkedin: 'https://linkedin.com/company/google',
    twitter: 'https://twitter.com/google',
    facebook: 'https://facebook.com/google'
  },
  types: [
    { id: 1, name: 'Technology' },
    { id: 2, name: 'Software' },
    { id: 3, name: 'Cloud Computing' },
  ],
  branches: [
    { 
      id: 1, 
      name: 'Google Mountain View HQ', 
      address: '1600 Amphitheatre Parkway', 
      ward: 'Mountain View',
      province: 'California', 
      country: 'United States'
    },
    { 
      id: 2, 
      name: 'Google New York', 
      address: '111 8th Avenue', 
      ward: 'New York',
      province: 'New York', 
      country: 'United States'
    },
    { 
      id: 3, 
      name: 'Google London', 
      address: '6 Pancras Square', 
      ward: 'Kings Cross',
      province: 'London', 
      country: 'United Kingdom'
    },
  ],
  activeJobs: [
    {
      id: 1,
      title: 'Senior Software Engineer',
      location: 'Mountain View, CA',
      type: 'Full-time',
      level: 'Senior',
      applications: 45,
      postedDate: '2024-03-01'
    },
    {
      id: 2,
      title: 'Product Manager',
      location: 'New York, NY',
      type: 'Full-time',
      level: 'Mid-level',
      applications: 32,
      postedDate: '2024-03-05'
    },
    {
      id: 3,
      title: 'UX Designer',
      location: 'London, UK',
      type: 'Full-time',
      level: 'Junior',
      applications: 28,
      postedDate: '2024-03-10'
    },
  ],
};

export default function CompanyDetailPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      <div>
        <Link to="/companies" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Companies
        </Link>
        
        <div className="relative h-48 rounded-lg overflow-hidden mb-6">
          <img 
            src={mockCompany.background} 
            alt={mockCompany.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
        </div>

        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-lg bg-white border-2 border-gray-200 flex items-center justify-center p-2 -mt-16 relative z-10">
              <Building2 className="w-10 h-10 text-blue-600" />
            </div>
            <div>
              <h1 className="text-gray-900 mb-1">{mockCompany.name}</h1>
              <p className="text-gray-600 mb-3">{mockCompany.employeeCount} employees</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {mockCompany.email}
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  {mockCompany.phone}
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  <a href={mockCompany.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {mockCompany.website}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Edit className="w-4 h-4 mr-2" />
            Edit Company
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Branches</p>
                <p className="text-gray-900 text-xl">{mockCompany.branches.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Active Jobs</p>
                <p className="text-gray-900 text-xl">{mockCompany.activeJobs.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Company Types</p>
                <p className="text-gray-900 text-xl">{mockCompany.types.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-white border border-gray-200">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="branches">Branches</TabsTrigger>
          <TabsTrigger value="jobs">Active Jobs</TabsTrigger>
          <TabsTrigger value="types">Company Types</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About {mockCompany.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{mockCompany.description}</p>
              
              <div className="space-y-4 mt-6">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {mockCompany.techStack.map((tech, index) => (
                      <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 mb-2">Social Media</p>
                  <div className="flex gap-3">
                    <a href={mockCompany.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                      LinkedIn
                    </a>
                    <a href={mockCompany.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                      Twitter
                    </a>
                    <a href={mockCompany.socials.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                      Facebook
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branches">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Company Branches</CardTitle>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Branch
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Branch Name</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Ward</TableHead>
                    <TableHead>Province</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockCompany.branches.map((branch) => (
                    <TableRow key={branch.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          {branch.name}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600">{branch.address}</TableCell>
                      <TableCell className="text-gray-600">{branch.ward}</TableCell>
                      <TableCell className="text-gray-600">{branch.province}</TableCell>
                      <TableCell className="text-gray-600">{branch.country}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jobs">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Active Job Listings</CardTitle>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Post New Job
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Applications</TableHead>
                    <TableHead>Posted Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockCompany.activeJobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-gray-400" />
                          {job.title}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600">{job.location}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                          {job.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-purple-50 text-purple-700">
                          {job.level}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-green-50 text-green-700">
                          {job.applications}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-600">{job.postedDate}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="types">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Company Types</CardTitle>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Type
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {mockCompany.types.map((type) => (
                  <div key={type.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <Badge variant="secondary" className="bg-purple-50 text-purple-700">
                      {type.name}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}