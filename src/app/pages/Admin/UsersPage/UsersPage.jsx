import { useEffect, useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Edit, Trash2 } from 'lucide-react';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Label,
} from "@/components/ui";
import { Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../../modules/services/userService';
import { create } from 'lodash';

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john.doe@university.edu', role: 'Student', status: 'Active', createdAt: '2024-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@university.edu', role: 'Student', status: 'Active', createdAt: '2024-02-20' },
  { id: 3, name: 'Robert Johnson', email: 'robert@techcorp.com', role: 'Company', status: 'Active', createdAt: '2024-01-10' },
  { id: 4, name: 'Emily Davis', email: 'emily.davis@university.edu', role: 'Manager', status: 'Active', createdAt: '2024-03-05' },
  { id: 5, name: 'Michael Brown', email: 'michael@startup.io', role: 'Company', status: 'Inactive', createdAt: '2024-02-14' },
  { id: 6, name: 'Sarah Wilson', email: 'sarah.wilson@university.edu', role: 'Admin', status: 'Active', createdAt: '2023-12-01' },
  { id: 7, name: 'David Martinez', email: 'david.martinez@university.edu', role: 'Student', status: 'Active', createdAt: '2024-03-12' },
  { id: 8, name: 'Lisa Anderson', email: 'lisa@corporate.com', role: 'Company', status: 'Active', createdAt: '2024-01-25' },
];

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const dispatch = useDispatch();
  
  const users = useSelector((state) => state.user.userItems);
  const pagination = useSelector((state) => state.user.pagination);

  useEffect(() => {
    dispatch(getUsers({ page: currentPage, limit: pageSize }));
  }, [currentPage, pageSize]);

  const filteredUsers = users.map((user) => ({
      name: user.first_name + ' ' + user.last_name,
      createdAt: new Date(user.created_at).toLocaleDateString('en-GB'),
      ...user,
  })).filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleBadgeColor = (role) => {
    const colors = {
      Student: 'bg-blue-100 text-blue-700 hover:bg-blue-700 hover:text-white',
      Employer: 'bg-purple-100 text-purple-700 hover:bg-purple-700 hover:text-white',
      Company: 'bg-purple-100 text-purple-700 hover:bg-purple-700 hover:text-white',
      Manager: 'bg-green-100 text-green-700 hover:bg-green-700 hover:text-white',
      Admin: 'bg-orange-100 text-orange-700 hover:bg-orange-700 hover:text-white',
    };
    return colors[role] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-gray-900 mb-1 font-semibold">User Management</h3>
          <p className="text-gray-600">Manage all system users and their roles</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="bg-primary/90 hover:bg-primary text-white hover:scale-105 rounded-lg transition-all">
          <Plus className="w-4 h-4" />
          Add User
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-4 py-2 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-40">
                <Filter className="w-4 h-4" />
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="Student">Student</SelectItem>
                <SelectItem value="Company">Company</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="px-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-center">Role</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span>{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">{user.email}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary" className={getRoleBadgeColor(user.role) + " px-4 py-1"}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge className={`${user.is_active ? 'bg-green-500 text-white border-2 border-accent-green/50 hover:bg-green-500' : 'bg-gray-100'} px-4 py-1`}>
                      {user.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-600 text-center">
                    {user.createdAt}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white" align="end">
                        <DropdownMenuItem onClick={() => {
                          setSelectedUser(user);
                          setIsEditDialogOpen(true);
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

      {/* Add User Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <h3 className='font-semibold'>Add New User</h3>
            <DialogDescription>
              Create a new user account in the system.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john.doe@university.edu" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Student">Student</SelectItem>
                  <SelectItem value="Company">Company</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>
          </div>
          <DialogFooter>
            <Button className="hover:scale-105 rounded-lg transition-all" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-primary/90 hover:bg-primary text-white hover:scale-105 rounded-lg transition-all">
              Create User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <h3 className='font-semibold'>Edit User</h3>
            <DialogDescription>
              Update user information.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Full Name</Label>
                <Input id="edit-name" defaultValue={selectedUser.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input id="edit-email" type="email" defaultValue={selectedUser.email} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-role">Role</Label>
                <Select defaultValue={selectedUser.role}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Student">Student</SelectItem>
                    <SelectItem value="Company">Company</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button className="hover:scale-105 rounded-lg transition-all" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-primary/90 hover:bg-primary text-white hover:scale-105 rounded-lg transition-all">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
