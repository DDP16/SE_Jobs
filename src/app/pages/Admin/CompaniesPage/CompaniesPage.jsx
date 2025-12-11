import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, MoreVertical, Eye, Edit, Trash2, Building2 } from 'lucide-react';
import { 
  Badge,
  Button,
  Input,
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
} from '@/components/ui';
import { Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getCompanies } from '../../../modules';

const mockCompanies = [
  { 
    id: 1, 
    name: 'Google', 
    email: 'hr@google.com', 
    phone: '+1 (650) 253-0000',
    employeeCount: '50,000+', 
    branches: 15,
    activeJobs: 24,
    types: ['Technology', 'Software'],
    status: 'Active' 
  },
  { 
    id: 2, 
    name: 'Microsoft', 
    email: 'careers@microsoft.com', 
    phone: '+1 (425) 882-8080',
    employeeCount: '10,000+', 
    branches: 12,
    activeJobs: 18,
    types: ['Technology', 'Enterprise Software'],
    status: 'Active' 
  },
  { 
    id: 3, 
    name: 'Amazon', 
    email: 'jobs@amazon.com', 
    phone: '+1 (206) 266-1000',
    employeeCount: '100,000+', 
    branches: 20,
    activeJobs: 16,
    types: ['E-commerce', 'Cloud Computing'],
    status: 'Active' 
  },
  { 
    id: 4, 
    name: 'Apple', 
    email: 'recruitment@apple.com', 
    phone: '+1 (408) 996-1010',
    employeeCount: '50,000+', 
    branches: 8,
    activeJobs: 12,
    types: ['Technology', 'Consumer Electronics'],
    status: 'Active' 
  },
  { 
    id: 5, 
    name: 'Meta', 
    email: 'careers@meta.com', 
    phone: '+1 (650) 543-4800',
    employeeCount: '10,000+', 
    branches: 6,
    activeJobs: 10,
    types: ['Technology', 'Social Media'],
    status: 'Active' 
  },
  { 
    id: 6, 
    name: 'Tesla', 
    email: 'hr@tesla.com', 
    phone: '+1 (888) 518-3752',
    employeeCount: '10,000+', 
    branches: 10,
    activeJobs: 8,
    types: ['Automotive', 'Clean Energy'],
    status: 'Active' 
  },
  { 
    id: 7, 
    name: 'Netflix', 
    email: 'jobs@netflix.com', 
    phone: '+1 (408) 540-3700',
    employeeCount: '5,000+', 
    branches: 4,
    activeJobs: 6,
    types: ['Entertainment', 'Streaming'],
    status: 'Inactive' 
  },
  { 
    id: 8, 
    name: 'Adobe', 
    email: 'careers@adobe.com', 
    phone: '+1 (408) 536-6000',
    employeeCount: '10,000+', 
    branches: 7,
    activeJobs: 14,
    types: ['Technology', 'Creative Software'],
    status: 'Active' 
  },
];

export default function CompaniesPage() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const companies = useSelector((state) => state.company.companies);
  const pagination = useSelector((state) => state.company.pagination);

  useEffect(() => {
    dispatch(getCompanies({ page: currentPage, limit: pageSize }));
  }, [currentPage, pageSize]);

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || company.types.some(type => type === typeFilter);
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-gray-900 mb-1 font-semibold">Company Management</h3>
          <p className="text-gray-600">Manage companies, branches, and job postings</p>
        </div>
        <Button className="bg-primary/90 hover:bg-primary text-white hover:scale-105 rounded-lg transition-all">
          <Plus className="w-4 h-4" />
          Add Company
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-45">
                <Filter className="w-4 h-4" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Software">Software</SelectItem>
                <SelectItem value="E-commerce">E-commerce</SelectItem>
                <SelectItem value="Entertainment">Entertainment</SelectItem>
                <SelectItem value="Automotive">Automotive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='px-4'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead className="text-center">Employee Count</TableHead>
                <TableHead className="text-center">Branches</TableHead>
                <TableHead className="text-center">Active Jobs</TableHead>
                <TableHead className="text-center">Types</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCompanies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                        <Building2 className="w-4 h-4 text-white" />
                      </div>
                      <span>{company.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="text-gray-900">{company.email}</div>
                      <div className="text-gray-500">{company.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600 text-center">{company.employee_count}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                      {Array.isArray(company.company_branches) ? company.company_branches.length : 0}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary" className="bg-green-50 text-green-700">
                      {Array.isArray(company.jobs) ? company.jobs.length : 0}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex flex-wrap gap-1">
                      {company.company_types.slice(0, 2).map((type, index) => (
                        <Badge key={index} variant="secondary" className="bg-purple-50 text-purple-700 text-xs">
                          {type.name}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge className={`${company.users.is_active ? 'bg-green-500 text-white border-2 border-accent-green/50' : 'bg-gray-100'} px-4 py-1`}>
                      {company.users.is_active ? 'Active' : 'Inactive'}
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
                          <Link to={`/companies/${company.id}`}>
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
