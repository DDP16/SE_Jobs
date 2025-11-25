import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  FileText, 
  Link2, 
  Briefcase, 
  FolderOpen,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const mockStudent = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@university.edu',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  major: 'Computer Science',
  year: 'Senior',
  gpa: 3.8,
  bio: 'Passionate software developer with a strong foundation in full-stack development and a keen interest in artificial intelligence and machine learning.',
  cvs: [
    { id: 1, title: 'Software Engineer Resume', filePath: '/files/resume-swe.pdf', createdAt: '2024-03-01' },
    { id: 2, title: 'Full Stack Developer CV', filePath: '/files/cv-fullstack.pdf', createdAt: '2024-02-15' },
    { id: 3, title: 'Internship Resume', filePath: '/files/resume-intern.pdf', createdAt: '2024-01-20' },
  ],
  socialLinks: [
    { id: 1, platform: 'LinkedIn', url: 'https://linkedin.com/in/johndoe' },
    { id: 2, platform: 'GitHub', url: 'https://github.com/johndoe' },
    { id: 3, platform: 'Portfolio', url: 'https://johndoe.dev' },
  ],
  experiences: [
    {
      id: 1,
      company: 'TechCorp Inc.',
      position: 'Software Engineering Intern',
      location: 'San Francisco, CA',
      startDate: '2023-06-01',
      endDate: '2023-08-31',
      isCurrent: false,
      description: 'Developed and maintained web applications using React and Node.js. Collaborated with cross-functional teams to deliver high-quality software solutions.'
    },
    {
      id: 2,
      company: 'University Research Lab',
      position: 'Research Assistant',
      location: 'Campus',
      startDate: '2023-01-15',
      endDate: null,
      isCurrent: true,
      description: 'Conducting research on machine learning algorithms for natural language processing. Published 2 papers in peer-reviewed conferences.'
    },
  ],
  portfolios: [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce application with payment integration',
      imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=400',
      link: 'https://github.com/johndoe/ecommerce'
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Real-time collaborative task management tool',
      imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400',
      link: 'https://github.com/johndoe/taskmanager'
    },
  ],
  educations: [
    {
      id: 1,
      school: 'State University',
      degree: 'Bachelor of Science',
      major: 'Computer Science',
      startDate: '2021-09-01',
      endDate: '2025-05-31',
      description: 'GPA: 3.8/4.0. Dean\'s List all semesters. Member of Computer Science Club and ACM.'
    },
  ],
};

export default function StudentDetailPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      <div>
        <Link to="/students" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Students
        </Link>
        
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl">
              {mockStudent.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h1 className="text-gray-900 mb-1">{mockStudent.name}</h1>
              <p className="text-gray-600 mb-3">{mockStudent.major} • {mockStudent.year}</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {mockStudent.email}
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  {mockStudent.phone}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {mockStudent.location}
                </div>
              </div>
            </div>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">GPA</p>
                <p className="text-gray-900 text-xl">{mockStudent.gpa}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">CVs Uploaded</p>
                <p className="text-gray-900 text-xl">{mockStudent.cvs.length}</p>
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
                <p className="text-gray-600 text-sm">Experiences</p>
                <p className="text-gray-900 text-xl">{mockStudent.experiences.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-white border border-gray-200">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="cvs">CVs</TabsTrigger>
          <TabsTrigger value="experiences">Experiences</TabsTrigger>
          <TabsTrigger value="portfolios">Portfolios</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{mockStudent.bio}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Social Links</CardTitle>
              <Button size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Link
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockStudent.socialLinks.map((link) => (
                  <div key={link.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Link2 className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-gray-900">{link.platform}</p>
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                          {link.url}
                        </a>
                      </div>
                    </div>
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

        <TabsContent value="cvs">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>CVs & Resumes</CardTitle>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Upload CV
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>File Path</TableHead>
                    <TableHead>Created Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockStudent.cvs.map((cv) => (
                    <TableRow key={cv.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-gray-400" />
                          {cv.title}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600">{cv.filePath}</TableCell>
                      <TableCell className="text-gray-600">{cv.createdAt}</TableCell>
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

        <TabsContent value="experiences">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Work Experience</CardTitle>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Experience
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockStudent.experiences.map((exp) => (
                  <div key={exp.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-gray-900">{exp.position}</p>
                        <p className="text-gray-600">{exp.company} • {exp.location}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                          {exp.isCurrent && <Badge className="ml-2 bg-green-100 text-green-700">Current</Badge>}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mt-3">{exp.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="portfolios">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Portfolio Projects</CardTitle>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockStudent.portfolios.map((project) => (
                  <div key={project.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <p className="text-gray-900 mb-1">{project.title}</p>
                      <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                      <div className="flex items-center justify-between">
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                          <Link2 className="w-3 h-3" />
                          View Project
                        </a>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Education History</CardTitle>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Education
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockStudent.educations.map((edu) => (
                  <div key={edu.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-gray-900">{edu.degree} in {edu.major}</p>
                        <p className="text-gray-600">{edu.school}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {edu.startDate} - {edu.endDate}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mt-3">{edu.description}</p>
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