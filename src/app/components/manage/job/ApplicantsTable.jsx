import { Edit, Eye, MoreVertical, Trash2 } from "lucide-react";
import { LoadingOutlined } from '@ant-design/icons';
import { Badge, Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../components/ui";
import { Spin, Table } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Avatar } from "@mui/material";

const mockApplicants = [
    {
        id: 1,
        full_name: "Nguyễn Văn A",
        email: "nguyenvana@example.com",
        status: "Hired",
        created_at: "2025-12-15T10:30:00",
    },
    {
        id: 2,
        full_name: "Trần Thị B",
        email: "tranthib@example.com",
        status: "Interview_Scheduled",
        created_at: "2025-12-20T14:20:00",
    },
    {
        id: 3,
        full_name: "Lê Văn C",
        email: "levanc@example.com",
        status: "Offered",
        created_at: "2026-01-02T09:15:00",
    },
    {
        id: 4,
        full_name: "Phạm Thị D",
        email: "phamthid@example.com",
        status: "Rejected",
        created_at: "2026-01-03T16:45:00",
    },
    {
        id: 5,
        full_name: "Hoàng Văn E",
        email: "hoangvane@example.com",
        status: "Shortlisted",
        created_at: "2026-01-05T11:00:00",
    },
];

const STATUS_CONFIG = {
    Applied: {
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-700',
        borderColor: 'border-blue-200',
    },
    Viewed: {
        bgColor: 'bg-yellow-50',
        textColor: 'text-yellow-700',
        borderColor: 'border-yellow-200',
    },
    Shortlisted: {
        bgColor: 'bg-indigo-50',
        textColor: 'text-indigo-700',
        borderColor: 'border-indigo-200',
    },
    Interview_Scheduled: {
        bgColor: 'bg-cyan-50',
        textColor: 'text-cyan-700',
        borderColor: 'border-cyan-200',
    },
    Offered: {
        bgColor: 'bg-yellow-50',
        textColor: 'text-yellow-700',
        borderColor: 'border-yellow-200',
    },
    Hired: {
        bgColor: 'bg-emerald-50',
        textColor: 'text-emerald-700',
        borderColor: 'border-emerald-200',
    },
    Rejected: {
        bgColor: 'bg-red-50',
        textColor: 'text-red-700',
        borderColor: 'border-red-200',
    },
    Cancelled: {
        bgColor: 'bg-gray-50',
        textColor: 'text-gray-700',
        borderColor: 'border-gray-200',
    },
};

export default function ApplicantsTable({ applicants, pagination }) {
    const { t } = useTranslation();
    const nav = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const status = "succeeded";

    const getColumns = () => [
        {
            title: t('applicantList.table.fullName'),
            dataIndex: 'full_name',
            key: 'full_name',
            onHeaderCell: () => ({
                style: { textAlign: 'center' },
            }),
            render: (_, applicant) => {
                const altName = applicant.full_name.split(' ').map(n => n[0]).join('');
                return (
                    <div className="flex items-center gap-2">
                        <Avatar
                            src={applicant.avatar}
                            sx={{ width: 40, height: 40, bgcolor: 'primary.main', fontSize: '1rem' }}
                        >
                            {altName}
                        </Avatar>
                        <span className="font-medium text-gray-900">{applicant.full_name}</span>
                    </div>
                );
            }
        },
        {
            title: t('applicantList.table.email'),
            dataIndex: 'email',
            key: 'email',
            onHeaderCell: () => ({
                style: { textAlign: 'center' },
            }),
        },
        {
            title: t('applicantList.table.hiringStage'),
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            render: (status) => {
                const config = STATUS_CONFIG[status] || STATUS_CONFIG.Applied;
                return (
                    <Badge
                        className={
                            `${config.bgColor} ${config.textColor} border ${config.borderColor} hover:${config.bgColor}
                            w-25 items-center justify-center py-1 font-medium text-sm`
                        }
                    >
                        {t(`applicantList.table.stages.${status}`)}
                    </Badge>
                );
            },
        },
        {
            title: t('applicantList.table.appliedDate'),
            dataIndex: 'created_at',
            key: 'created_at',
            align: 'center',
            render: (createdAt) => {
                const date = new Date(createdAt);
                return date.toLocaleDateString('en-GB');
            },
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
                        <DropdownMenuItem onClick={() => { }}>
                            <Eye className="w-4 h-4 mr-2" />
                            {t('applicantList.table.seeApplication')}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { }}>
                            <Edit className="w-4 h-4 mr-2" />
                            {t('applicantList.table.editStage')}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];

    return (
        <>
            {status === 'loading' ? (
                <div className="flex items-center justify-center">
                    <Spin indicator={<LoadingOutlined spin />} size="large" />
                </div>
            ) : (
                <div className="relative flex flex-col">
                    <Table
                        columns={getColumns()}
                        dataSource={applicants || mockApplicants}
                        rowKey="id"
                        bordered
                        size="small"
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
                        className="flex-1"
                    />
                </div>
            )}
        </>
    );
}