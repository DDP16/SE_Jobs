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
import UpdateCompanyStatusModal from './partials/UpdateCompanyStatusModal';

export default function CompaniesPage() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const companies = useSelector((state) => state.company.companies);
  const pagination = useSelector((state) => state.company.pagination);

  useEffect(() => {
    dispatch(getCompanies({ page: currentPage, limit: pageSize }));
  }, [currentPage, pageSize]);

  const onUpdate = async () => {
    await dispatch(getCompanies({ page: currentPage, limit: pageSize }));
  };

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
                <TableHead className="text-center">Verified</TableHead>
                <TableHead className="text-center sticky right-0 bg-white z-10 shadow-2xl">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companies.map((company) => (
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
                      {company.company_types?.slice(0, 2).map((type, index) => (
                        <Badge key={index} variant="secondary" className="bg-purple-50 text-purple-700 text-xs">
                          {type.name}
                        </Badge>
                      )) || '-'}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge className={`${company.users?.is_active ? 'bg-green-500 text-white border-2 border-accent-green/50 hover:bg-green-400' : 'bg-gray-100 hover:bg-gray-200'} px-4 py-1`}>
                      {company.users?.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge className={`${company?.is_verified ? 'bg-blue-500 text-white border-2 border-accent-blue/50 hover:bg-blue-400' : 'bg-gray-100 hover:bg-gray-200'} px-4 py-1`}>
                      {company?.is_verified ? 'Verified' : 'Unverified'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center sticky right-0 bg-gray-100 z-10 shadow-2xl">
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
                        <DropdownMenuItem onClick={() => {
                          setSelectedCompany(company);
                          setIsStatusModalOpen(true);
                        }}>
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

      {selectedCompany && (
        <UpdateCompanyStatusModal
          company={selectedCompany}
          onUpdate={onUpdate}
          open={isStatusModalOpen}
          onOpenChange={setIsStatusModalOpen}
        />
      )}
    </div>
  );
}
