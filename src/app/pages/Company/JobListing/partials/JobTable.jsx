import { Modal, Spin, Table } from "antd";
import { ExclamationCircleFilled, LoadingOutlined } from '@ant-design/icons';
import { Badge } from "@/components/ui";
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../../components/ui";
import { Edit, Eye, MoreVertical, Trash2, Diamond, Flame, Zap } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getJobs, getJobsByCompanyId } from "../../../../modules";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateJob } from "../../../../modules/services/jobsService";

export default function JobTable() {
    const { t } = useTranslation();
    const nav = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [selectedJob, setSelectedJob] = useState(null);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

    const dispatch = useDispatch();
    const companyId = useSelector((state) => state.auth.user?.company?.id);
    const status = useSelector((state) => state.jobs.status);
    const jobs = useSelector((state) => state.jobs.jobs);
    const pagination = useSelector((state) => state.jobs.pagination);

    const { confirm } = Modal;

    const showCloseConfirm = ({ id }) => {
        confirm({
            centered: true,
            title: t('jobListing.closedConfirm.title'),
            icon: <ExclamationCircleFilled />,
            closable: true,
            content: t('jobListing.closedConfirm.content'),
            okText: t('jobListing.closedConfirm.confirm'),
            okType: 'danger',
            cancelText: t('jobListing.closedConfirm.cancel'),
            onOk() {
                dispatch(updateJob({
                    jobId: id,
                    jobData: { status: 'Closed' }
                }));
                console.log('Closed Job ' + id);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const getColumns = () => [
        {
            title: t('jobListing.table.jobTitle'),
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: t('jobListing.table.company'),
            dataIndex: 'company',
            key: 'company',
            render: (company) => company.name,
        },
        {
            title: t('jobListing.table.category'),
            dataIndex: 'categories',
            key: 'category',
            render: (categories) => categories && Array.isArray(categories) && categories.length > 0 ? categories[0]?.name ?? 'N/A' : 'N/A',
        },
        {
            title: t('jobListing.table.level'),
            dataIndex: 'levels',
            key: 'level',
            render: (levels) => levels && Array.isArray(levels) && levels.length > 0 ? levels[0]?.name ?? 'N/A' : 'N/A',
        },
        {
            title: t('jobListing.table.salary'),
            dataIndex: 'salary',
            key: 'salary',
            render: (salary) => {
                if (!salary || salary.from === null || salary.to === null || !salary.currency) {
                    return 'N/A';
                }
                return `${salary.from.toLocaleString()} - ${salary.to.toLocaleString()} ${salary.currency}`;
            },
        },
        {
            title: t('jobListing.table.tags'),
            dataIndex: 'tags',
            key: 'tags',
            align: 'center',
            render: (_, job) => (
                <div className="flex gap-2 items-center justify-center">
                    {job.isDiamond && (
                        <Diamond className="w-4 h-4 text-cyan-600" fill="currentColor" />
                    )}
                    {job.isHot && (
                        <Flame className="w-4 h-4 text-orange-600" fill="currentColor" />
                    )}
                    {job.isJobFlashActive && (
                        <Zap className="w-4 h-4 text-yellow-600" fill="currentColor" />
                    )}
                </div>
            ),
        },
        {
            title: t('jobListing.table.status'),
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            width: 100,
            render: (status) => (
                <Badge
                    className={
                        status === 'Approved'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-50'
                            : status === 'Pending'
                                ? 'bg-yellow-50 text-yellow-700 border border-yellow-200 hover:bg-yellow-50'
                                : 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-50'
                    }
                >
                    {status === 'Approved' ? t('jobListing.table.approved') : status === 'Pending' ? t('jobListing.table.pending') : t('jobListing.table.rejected')}
                </Badge>
            ),
        },
        {
            title: t('jobListing.table.datePosted'),
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createdAt) => {
                const date = new Date(createdAt);
                return date.toLocaleDateString('en-GB');
            },
        },
        {
            title: t('jobListing.table.dueDate'),
            dataIndex: 'deadline',
            key: 'deadline',
            render: (deadline) => {
                const date = new Date(deadline);
                return date.toLocaleDateString('en-GB');
            },
        },
        {
            title: t('jobListing.table.needs'),
            dataIndex: 'quantity',
            key: 'quantity',
            render: (quantity) => (
                <span>
                    {quantity}
                </span>
            ),
        },
        {
            title: t('jobListing.table.actions'),
            key: 'action',
            align: 'center',
            fixed: 'end',
            render: (_, job) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white" align="center" side="left">
                        <DropdownMenuItem onClick={() => {
                            // setSelectedJob(job);
                            // setIsViewDialogOpen(true);
                            nav(`/job?id=${job.id}`);
                        }}>
                            <Eye className="w-4 h-4 mr-2" />
                            {t('jobListing.table.viewDetails')}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            {t('jobListing.table.edit')}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" disabled={job.status === 'Closed'} onClick={() => showCloseConfirm({id: job.id})}>
                            <Trash2 className="w-4 h-4 mr-2" />
                            {t('jobListing.table.closeJob')}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];

    useEffect(() => {
        if (companyId) {
            dispatch(getJobsByCompanyId({ companyId: companyId, page: currentPage, limit: pageSize }));
        }
    }, [companyId, currentPage, pageSize]);

    const currentData = jobs;

    return (
        <>
            {status === 'loading' ? (
                <div className="flex items-center justify-center h-[60vh]">
                    <Spin indicator={<LoadingOutlined spin />} size="large" />
                </div>
            ) : (
                <div className="relative flex flex-col h-[60vh]">
                    <Table
                        columns={getColumns()}
                        dataSource={currentData}
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
                </div>
            )}
        </>
    );
}
