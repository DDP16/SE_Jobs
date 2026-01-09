import { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { getStudents } from '../../../modules';
import { Avatar } from '@mui/material';
import { Pagination } from 'antd';

export default function StudentsPage() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [majorFilter, setMajorFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const students = useSelector((state) => state.students.students);
  const pagination = useSelector((state) => state.students.pagination);

  useEffect(() => {
    dispatch(getStudents({ page: currentPage, limit: pageSize }));
  }, [currentPage, pageSize]);

  useEffect(() => {
    console.log("Students from store:", students);
  }, [students]);

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
                <TableHead className="text-center">Phone</TableHead>
                <TableHead className="text-center">Gender</TableHead>
                <TableHead className="text-center">Location</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar
                        alt={`${student.users.first_name} ${student.users.last_name}`}
                        sx={{ width: 32, height: 32, fontSize: '0.875rem' }}
                        src={student.users.avatar}
                        className='bg-linear-to-br from-blue-500 to-purple-500'
                      >
                        {student.users.first_name[0]}{student.users.last_name[0]}
                      </Avatar>
                      <span>{student.users.first_name} {student.users.last_name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">{student.users.email}</TableCell>
                  <TableCell className="text-gray-600 text-center">{student.phone_number || 'N/A'}</TableCell>
                  <TableCell className="text-gray-600 text-center">{student.gender || 'N/A'}</TableCell>
                  <TableCell className="text-gray-600 text-center">{student.location || 'N/A'}</TableCell>
                  <TableCell className="text-center">
                    <Badge className={`${student.users.is_active ? 'bg-green-400 text-white border-2 border-accent-green/50' : 'bg-gray-100'} px-4 py-1`}>
                      {student.users.is_active ? 'Active' : 'Inactive'}
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

      <Pagination align="end" 
        current={currentPage}
        total={pagination?.total ?? 0}
        pageSize={pageSize}
        onChange={
          (newPage, newPageSize) => {
            setCurrentPage(newPage)
            setPageSize(newPageSize)
          }
        }
      />
    </div>
  );
}
