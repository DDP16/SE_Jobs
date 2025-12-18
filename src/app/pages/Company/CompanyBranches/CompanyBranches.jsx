import { use, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Search, Edit, Trash2, MapPin } from 'lucide-react';
import { Table, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {
  Button,
  Input,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Label,
} from "@/components/ui";
import {
  getCompanyBranches,
  createCompanyBranch,
  updateCompanyBranch,
  deleteCompanyBranch
} from '../../../modules/services/companyBranchesService';

export default function CompanyBranches() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    country_id: '',
    province_id: '',
    ward_id: '',
  });

  const companyId = useSelector((state) => state.auth.user?.company?.id);
  const branches = useSelector((state) => state.companyBranches?.branches || []);
  const pagination = useSelector((state) => state.companyBranches?.pagination);
  const loading = useSelector((state) => state.companyBranches?.loading);

  useEffect(() => {
    if (companyId) {
      dispatch(getCompanyBranches({ page: currentPage, limit: pageSize, companyId: companyId }));
    }
  }, [currentPage, pageSize, companyId, dispatch]);

  const columns = [
    {
      title: 'Branch Name',
      dataIndex: 'name',
      key: 'name',
      render: (name) => (
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span className="font-medium">{name}</span>
        </div>
      ),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Country ID',
      dataIndex: 'country_id',
      key: 'country_id',
      render: (country_id) => country_id || 'N/A',
    },
    {
      title: 'Province ID',
      dataIndex: 'province_id',
      key: 'province_id',
      render: (province_id) => province_id || 'N/A',
    },
    {
      title: 'Ward ID',
      dataIndex: 'ward_id',
      key: 'ward_id',
      render: (ward_id) => ward_id || 'N/A',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (created_at) => created_at ? new Date(created_at).toLocaleDateString('en-GB') : 'N/A',
    },
    {
      title: 'Actions',
      key: 'action',
      align: 'center',
      fixed: 'right',
      render: (_, branch) => (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => openEditDialog(branch)}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDeleteBranch(branch.id)}
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </Button>
        </div>
      ),
    },
  ];

  const handleCreateBranch = async () => {
    await dispatch(createCompanyBranch(
      {
        ...formData,
        country_id: parseInt(formData.country_id),
        province_id: parseInt(formData.province_id),
        ward_id: parseInt(formData.ward_id),
        company_id: companyId
      }
    ));
    setIsCreateDialogOpen(false);
    setFormData({ name: '', address: '', country_id: '', province_id: '', ward_id: '' });
    dispatch(getCompanyBranches({ page: currentPage, limit: pageSize, companyId: companyId }));
  };

  const handleUpdateBranch = async () => {
    await dispatch(updateCompanyBranch({
      id: selectedBranch.id,
      branchData: formData
    }));
    setIsEditDialogOpen(false);
    setSelectedBranch(null);
    setFormData({ name: '', address: '', country_id: '', province_id: '', ward_id: '' });
    dispatch(getCompanyBranches({ page: currentPage, limit: pageSize, companyId: companyId }));
  };

  const handleDeleteBranch = async (id) => {
    if (window.confirm('Are you sure you want to delete this branch?')) {
      await dispatch(deleteCompanyBranch(id));
      dispatch(getCompanyBranches({ page: currentPage, limit: pageSize, companyId: companyId }));
    }
  };

  const openEditDialog = (branch) => {
    setSelectedBranch(branch);
    setFormData({
      name: branch.name,
      address: branch.address,
      country_id: branch.country_id || '',
      province_id: branch.province_id || '',
      ward_id: branch.ward_id || '',
    });
    setIsEditDialogOpen(true);
  };

  const filteredBranches = branches.filter((branch) =>
    branch.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    branch.address?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 p-4 lg:p-6 2xl:p-8 flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-gray-900 mb-1 font-semibold">Company Branches</h4>
          <p className="text-gray-600">Manage your company branch locations</p>
        </div>
        <div className='flex gap-4'>
          <div className="flex items-center gap-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search branches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`pl-10 focus:w-[25vw] transition-all ${searchQuery ? 'w-[25vw]' : ''}`}
            />
          </div>
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-primary/90 hover:bg-primary text-white hover:scale-105 rounded-lg transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Branch
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">

        {loading ? (
          <div className="flex items-center justify-center h-[60vh]">
            <Spin indicator={<LoadingOutlined spin />} size="large" />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={filteredBranches}
            rowKey="id"
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: pagination?.total ?? 0,
              onChange: (newPage, newPageSize) => {
                setCurrentPage(newPage);
                setPageSize(newPageSize);
              },
            }}
            scroll={{ y: '60vh', x: 'max-content' }}
            className="custom-ant-table flex-1"
          />
        )}
      </div>

      {/* Create Branch Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <h4 className='font-semibold text-primary'>Add New Branch</h4>
            <DialogDescription>
              Create a new branch location for your company
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Branch Name *</Label>
              <Input
                id="name"
                placeholder="e.g. Main Office, Branch 1"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Input
                id="address"
                placeholder="Street address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="country_id">Country ID</Label>
                <Input
                  id="country_id"
                  placeholder="Country ID"
                  value={formData.country_id}
                  onChange={(e) => setFormData({ ...formData, country_id: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="province_id">Province ID</Label>
                <Input
                  id="province_id"
                  placeholder="Province ID"
                  value={formData.province_id}
                  onChange={(e) => setFormData({ ...formData, province_id: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ward_id">Ward ID</Label>
                <Input
                  id="ward_id"
                  placeholder="Ward ID"
                  value={formData.ward_id}
                  onChange={(e) => setFormData({ ...formData, ward_id: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button className="rounded-lg cursor-pointer" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-primary/90 hover:bg-primary text-white rounded-lg cursor-pointer"
              onClick={handleCreateBranch}
              disabled={!formData.name || !formData.address}
            >
              Create Branch
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Branch Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Branch</DialogTitle>
            <DialogDescription>
              Update branch information
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Branch Name *</Label>
              <Input
                id="edit-name"
                placeholder="e.g. Main Office, Branch 1"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-address">Address *</Label>
              <Input
                id="edit-address"
                placeholder="Street address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-country_id">Country ID</Label>
                <Input
                  id="edit-country_id"
                  placeholder="Country ID"
                  value={formData.country_id}
                  onChange={(e) => setFormData({ ...formData, country_id: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-province_id">Province ID</Label>
                <Input
                  id="edit-province_id"
                  placeholder="Province ID"
                  value={formData.province_id}
                  onChange={(e) => setFormData({ ...formData, province_id: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-ward_id">Ward ID</Label>
                <Input
                  id="edit-ward_id"
                  placeholder="Ward ID"
                  value={formData.ward_id}
                  onChange={(e) => setFormData({ ...formData, ward_id: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button className="rounded-lg cursor-pointer" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-primary/90 hover:bg-primary text-white rounded-lg cursor-pointer"
              onClick={handleUpdateBranch}
              disabled={!formData.name || !formData.address}
            >
              Update Branch
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
