import { use, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Plus, Search, Edit, Trash2, MapPin, ChevronDown } from 'lucide-react';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui";
import {
  getCompanyBranches,
  createCompanyBranch,
  updateCompanyBranch,
  deleteCompanyBranch
} from '../../../modules/services/companyBranchesService';
import { getProvinces, getWards } from '../../../modules/services/addressService';

export default function CompanyBranches() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    country_id: 1, // Hardcoded: Vietnam
    province_id: '',
    ward_id: '',
  });

  const companyId = useSelector((state) => state.auth.user?.company?.id);
  const branches = useSelector((state) => state.companyBranches?.branches || []);
  const pagination = useSelector((state) => state.companyBranches?.pagination);
  const loading = useSelector((state) => state.companyBranches?.loading);
  const provinces = useSelector((state) => {
    const data = state.address?.provinces;
    return Array.isArray(data) ? data : (data?.data && Array.isArray(data.data) ? data.data : []);
  });
  const wards = useSelector((state) => {
    const data = state.address?.wards;
    return Array.isArray(data) ? data : (data?.data && Array.isArray(data.data) ? data.data : []);
  });

  
  useEffect(() => {
    if (companyId) {
      dispatch(getCompanyBranches({ page: currentPage, limit: pageSize, companyId: companyId }));
    }
  }, [currentPage, pageSize, companyId, dispatch]);

  useEffect(() => {
    if (formData.province_id) {
      dispatch(getWards(formData.province_id));
    }
  }, [formData.province_id, dispatch]);

  const columns = [
    {
      title: t('companyBranches.table.branchName'),
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
      title: t('companyBranches.table.address'),
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: t('companyBranches.table.country'),
      dataIndex: 'country',
      key: 'country',
      render: (country, record) => country?.name || record.country_name || 'N/A',
    },
    {
      title: t('companyBranches.table.province'),
      dataIndex: 'province',
      key: 'province',
      render: (province, record) => province?.name || record.province_name || 'N/A',
    },
    {
      title: t('companyBranches.table.ward'),
      dataIndex: 'ward',
      key: 'ward',
      render: (ward, record) => ward?.name || record.ward_name || 'N/A',
    },
    {
      title: t('companyBranches.table.createdAt'),
      dataIndex: 'created_at',
      key: 'created_at',
      render: (created_at) => created_at ? new Date(created_at).toLocaleDateString('en-GB') : 'N/A',
    },
    {
      title: t('companyBranches.table.actions'),
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
        country_id: 1, // Hardcoded: Vietnam
        province_id: formData.province_id || null,
        ward_id: formData.ward_id || null,
        company_id: companyId
      }
    ));
    setIsCreateDialogOpen(false);
    setFormData({ name: '', address: '', country_id: 1, province_id: '', ward_id: '' });
    dispatch(getCompanyBranches({ page: currentPage, limit: pageSize, companyId: companyId }));
  };

  const handleUpdateBranch = async () => {
    await dispatch(updateCompanyBranch({
      id: selectedBranch.id,
      branchData: { ...formData, country_id: 1 } // Hardcoded: Vietnam
    }));
    setIsEditDialogOpen(false);
    setSelectedBranch(null);
    setFormData({ name: '', address: '', country_id: 1, province_id: '', ward_id: '' });
    dispatch(getCompanyBranches({ page: currentPage, limit: pageSize, companyId: companyId }));
  };

  const handleDeleteBranch = async (id) => {
    if (window.confirm(t('companyBranches.deleteConfirm'))) {
      await dispatch(deleteCompanyBranch(id));
      dispatch(getCompanyBranches({ page: currentPage, limit: pageSize, companyId: companyId }));
    }
  };

  const openEditDialog = (branch) => {
    setSelectedBranch(branch);
    setFormData({
      name: branch.name,
      address: branch.address,
      country_id: 1, // Hardcoded: Vietnam
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
          <h4 className="text-gray-900 mb-1 font-semibold">{t('companyBranches.title')}</h4>
          <p className="text-gray-600">{t('companyBranches.description')}</p>
        </div>
        <div className='flex gap-4'>
          <div className="flex items-center gap-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder={t('companyBranches.searchPlaceholder')}
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
            {t('companyBranches.addBranch')}
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
            <h4 className='font-semibold text-primary'>{t('companyBranches.createDialog.title')}</h4>
            <DialogDescription>
              {t('companyBranches.createDialog.description')}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t('companyBranches.createDialog.branchName')} *</Label>
              <Input
                id="name"
                placeholder={t('companyBranches.createDialog.branchNamePlaceholder')}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">{t('companyBranches.createDialog.address')} *</Label>
              <Input
                id="address"
                placeholder={t('companyBranches.createDialog.addressPlaceholder')}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {/* Country is hardcoded to Vietnam (id = 1) */}
              <div className="space-y-2">
                <Label htmlFor="edit-country_id">{t('companyBranches.createDialog.country')}</Label>
                <Input
                  id="edit-country_id"
                  value="Việt Nam"
                  disabled
                  className="bg-gray-50 cursor-not-allowed"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="province_id">{t('companyBranches.createDialog.province')} *</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="justify-between bg-white border-border hover:bg-white rounded-lg w-full"
                    >
                      {(Array.isArray(provinces) && provinces.find(p => p.id === formData.province_id)?.name) || 'Select Province'}
                      <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="bottom"
                    align="center"
                    className="bg-white rounded-lg overflow-y-auto max-h-[25vh] scrollbar-hide w-full"
                  >
                    {Array.isArray(provinces) && provinces.length > 0 ? provinces.map((province) => (
                      <DropdownMenuItem
                        key={province.id}
                        onClick={() => setFormData({ ...formData, province_id: province.id, ward_id: '' })}
                      >
                        {province.name}
                      </DropdownMenuItem>
                    )) : (
                      <DropdownMenuItem disabled>No provinces available</DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ward_id">{t('companyBranches.createDialog.ward')}</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="justify-between bg-white border-border hover:bg-white rounded-lg w-full"
                      disabled={!formData.province_id}
                    >
                      {(Array.isArray(wards) && wards.find(w => w.id === formData.ward_id)?.name) || t('companyBranches.createDialog.selectWard')}
                      <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="bottom"
                    align="center"
                    className="bg-white rounded-lg overflow-y-auto max-h-[25vh] scrollbar-hide w-full"
                  >
                    {Array.isArray(wards) && wards.length > 0 ? wards.map((ward) => (
                      <DropdownMenuItem
                        key={ward.id}
                        onClick={() => setFormData({ ...formData, ward_id: ward.id })}
                      >
                        {ward.name}
                      </DropdownMenuItem>
                    )) : (
                      <DropdownMenuItem disabled>{t('companyBranches.createDialog.noWardsAvailable')}</DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button className="rounded-lg cursor-pointer" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              {t('companyBranches.createDialog.cancel')}
            </Button>
            <Button
              className="bg-primary/90 hover:bg-primary text-white rounded-lg cursor-pointer"
              onClick={handleCreateBranch}
              disabled={!formData.name || !formData.address}
            >
              {t('companyBranches.createDialog.create')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Branch Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t('companyBranches.editDialog.title')}</DialogTitle>
            <DialogDescription>
              {t('companyBranches.editDialog.description')}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">{t('companyBranches.createDialog.branchName')} *</Label>
              <Input
                id="edit-name"
                placeholder={t('companyBranches.createDialog.branchNamePlaceholder')}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-address">{t('companyBranches.createDialog.address')} *</Label>
              <Input
                id="edit-address"
                placeholder={t('companyBranches.createDialog.addressPlaceholder')}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {/* Country is hardcoded to Vietnam (id = 1) */}
              <div className="space-y-2">
                <Label htmlFor="country_id">{t('companyBranches.createDialog.country')}</Label>
                <Input
                  id="country_id"
                  value="Việt Nam"
                  disabled
                  className="bg-gray-50 cursor-not-allowed"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-province_id">{t('companyBranches.createDialog.province')} *</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="justify-between bg-white border-border hover:bg-white rounded-lg w-full"
                    >
                      {(Array.isArray(provinces) && provinces.find(p => p.id === formData.province_id)?.name) || t('companyBranches.createDialog.selectProvince')}
                      <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="bottom"
                    align="center"
                    className="bg-white rounded-lg overflow-y-auto max-h-[25vh] scrollbar-hide w-full"
                  >
                    {Array.isArray(provinces) && provinces.length > 0 ? provinces.map((province) => (
                      <DropdownMenuItem
                        key={province.id}
                        onClick={() => setFormData({ ...formData, province_id: province.id, ward_id: '' })}
                      >
                        {province.name}
                      </DropdownMenuItem>
                    )) : (
                      <DropdownMenuItem disabled>{t('companyBranches.createDialog.noProvincesAvailable')}</DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-ward_id">{t('companyBranches.createDialog.ward')}</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="justify-between bg-white border-border hover:bg-white rounded-lg w-full"
                      disabled={!formData.province_id}
                    >
                      {(Array.isArray(wards) && wards.find(w => w.id === formData.ward_id)?.name) || t('companyBranches.createDialog.selectWard')}
                      <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="bottom"
                    align="center"
                    className="bg-white rounded-lg overflow-y-auto max-h-[25vh] scrollbar-hide w-full"
                  >
                    {Array.isArray(wards) && wards.length > 0 ? wards.map((ward) => (
                      <DropdownMenuItem
                        key={ward.id}
                        onClick={() => setFormData({ ...formData, ward_id: ward.id })}
                      >
                        {ward.name}
                      </DropdownMenuItem>
                    )) : (
                      <DropdownMenuItem disabled>{t('companyBranches.createDialog.noWardsAvailable')}</DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button className="rounded-lg cursor-pointer" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              {t('companyBranches.createDialog.cancel')}
            </Button>
            <Button
              className="bg-primary/90 hover:bg-primary text-white rounded-lg cursor-pointer"
              onClick={handleUpdateBranch}
              disabled={!formData.name || !formData.address}
            >
              {t('companyBranches.editDialog.update')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
