import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, MoreVertical, Eye, Edit, Trash2, FileText } from 'lucide-react';
import {
  Button,
  Input,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";

const mockStudents = [
  { id: 1, name: 'John Doe', email: 'john.doe@university.edu', major: 'Computer Science', year: 'Senior', gpa: 3.8, cvCount: 3, status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@university.edu', major: 'Business Administration', year: 'Junior', gpa: 3.6, cvCount: 2, status: 'Active' },
  { id: 3, name: 'David Martinez', email: 'david.martinez@university.edu', major: 'Engineering', year: 'Senior', gpa: 3.9, cvCount: 4, status: 'Active' },
  { id: 4, name: 'Sarah Johnson', email: 'sarah.johnson@university.edu', major: 'Marketing', year: 'Sophomore', gpa: 3.5, cvCount: 1, status: 'Active' },
  { id: 5, name: 'Michael Chen', email: 'michael.chen@university.edu', major: 'Computer Science', year: 'Senior', gpa: 3.7, cvCount: 2, status: 'Active' },
  { id: 6, name: 'Emily Brown', email: 'emily.brown@university.edu', major: 'Design', year: 'Junior', gpa: 3.8, cvCount: 3, status: 'Active' },
  { id: 7, name: 'Alex Wilson', email: 'alex.wilson@university.edu', major: 'Finance', year: 'Senior', gpa: 3.6, cvCount: 2, status: 'Inactive' },
  { id: 8, name: 'Lisa Anderson', email: 'lisa.anderson@university.edu', major: 'Computer Science', year: 'Junior', gpa: 3.9, cvCount: 5, status: 'Active' },
];

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [majorFilter, setMajorFilter] = useState('all');

  const filteredStudents = mockStudents.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMajor = majorFilter === 'all' || student.major === majorFilter;
    return matchesSearch && matchesMajor;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-gray-900 mb-1 font-semibold">Student Management</h3>
          <p className="text-gray-600">Manage student profiles, CVs, and portfolios</p>
        </div>
        <Button className="bg-primary/90 hover:bg-primary text-white hover:scale-105 rounded-lg transition-all">
          <Plus className="w-4 h-4" />
          Add Student
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={majorFilter} onValueChange={setMajorFilter}>
              <SelectTrigger className="w-50">
                <Filter className="w-4 h-4" />
                <SelectValue placeholder="Filter by major" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Majors</SelectItem>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Business Administration">Business Administration</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="px-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Major</TableHead>
                <TableHead>Year</TableHead>
                <TableHead className="text-center">GPA</TableHead>
                <TableHead className="text-center">CVs</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span>{student.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">{student.email}</TableCell>
                  <TableCell>{student.major}</TableCell>
                  <TableCell>{student.year}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                      {student.gpa}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center gap-1">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{student.cvCount}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge className={`${student.status === 'Active' ? 'bg-green-400 text-white border-2 border-accent-green/50' : 'bg-gray-100'} px-4 py-1`}>
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white" align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/students/${student.id}`}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
