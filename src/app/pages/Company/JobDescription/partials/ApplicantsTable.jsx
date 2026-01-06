import { Edit, Eye, MoreVertical, Trash2 } from "lucide-react";
import { LoadingOutlined } from '@ant-design/icons';
import { Badge, Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../../components/ui";
import { Spin, Table } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const STATUS_CONFIG = {
    applied: {
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-700',
        borderColor: 'border-blue-200',
    },
    viewed: {
        bgColor: 'bg-yellow-50',
        textColor: 'text-yellow-700',
        borderColor: 'border-yellow-200',
    },
    shortlisted: {
        bgColor: 'bg-indigo-50',
        textColor: 'text-indigo-700',
        borderColor: 'border-indigo-200',
    },
    interviewScheduled: {
        bgColor: 'bg-cyan-50',
        textColor: 'text-cyan-700',
        borderColor: 'border-cyan-200',
    },
    offered: {
        bgColor: 'bg-yellow-50',
        textColor: 'text-yellow-700',
        borderColor: 'border-yellow-200',
    },
    hired: {
        bgColor: 'bg-emerald-50',
        textColor: 'text-emerald-700',
        borderColor: 'border-emerald-200',
    },
    rejected: {
        bgColor: 'bg-red-50',
        textColor: 'text-red-700',
        borderColor: 'border-red-200',
    },
    cancelled: {
        bgColor: 'bg-gray-50',
        textColor: 'text-gray-700',
        borderColor: 'border-gray-200',
    },
};

const mockApplicants = [
    {
        id: 1,
        fullName: "Nguyễn Văn A",
        score: 85,
        status: "hired",
        createdAt: "2025-12-15T10:30:00",
    },
    {
        id: 2,
        fullName: "Trần Thị B",
        score: 78,
        status: "interviewScheduled",
        createdAt: "2025-12-20T14:20:00",
    },
    {
        id: 3,
        fullName: "Lê Văn C",
        score: 92,
        status: "offered",
        createdAt: "2026-01-02T09:15:00",
    },
    {
        id: 4,
        fullName: "Phạm Thị D",
        score: 65,
        status: "rejected",
        createdAt: "2026-01-03T16:45:00",
    },
    {
        id: 5,
        fullName: "Hoàng Văn E",
        score: 88,
        status: "shortlisted",
        createdAt: "2026-01-05T11:00:00",
    },
];

export default function ApplicantsTable() {
    const { t } = useTranslation();
    const nav = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const status = "succeeded";

    const getColumns = () => [
        {
            title: t('applicantList.table.fullName'),
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: t('applicantList.table.score'),
            dataIndex: 'score',
            key: 'score',
            render: (score) => score,
        },
        {
            title: t('applicantList.table.hiringStage'),
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            render: (status) => {
                const config = STATUS_CONFIG[status] || STATUS_CONFIG.applied;
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
            dataIndex: 'createdAt',
            key: 'createdAt',
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
                        <DropdownMenuItem onClick={() => {}}>
                            <Eye className="w-4 h-4 mr-2" />
                            {t('applicantList.table.seeApplication')}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {}}>
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
                        dataSource={mockApplicants}
                        rowKey="id"
                        // pagination={{
                        //     current: currentPage,
                        //     pageSize: pageSize,
                        //     total: pagination?.total ?? 0,
                        //     onChange: (newPage, newPageSize) => {
                        //         setCurrentPage(newPage);
                        //         setPageSize(newPageSize);
                        //     },
                        // }}
                        scroll={{ y: '60vh', x: 'max-content' }}
                        className="flex-1"
                    />
                </div>
            )}
        </>
    );
}