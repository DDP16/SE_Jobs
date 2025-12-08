import { Table } from "antd";
import { Badge } from "@/components/ui";
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../../components/ui";
import { Edit, Eye, MoreVertical, Trash2, Diamond, Flame, Zap } from "lucide-react";

const columns = [
    {
        title: 'Job Title',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Company',
        dataIndex: 'company',
        key: 'company',
        render: (company) => company.name,
    },
    {
        title: 'Category',
        dataIndex: 'categories',
        key: 'category',
        render: (categories) => categories[0]?.name ?? 'N/A',
    },
    {
        title: 'Level',
        dataIndex: 'levels',
        key: 'level',
        render: (levels) => levels[0]?.name ?? 'N/A',
    },
    {
        title: 'Salary',
        dataIndex: 'salary',
        key: 'salary',
        render: (salary) => `${salary.from.toLocaleString()} - ${salary.to.toLocaleString()} ${salary.currency}`,
    },
    {
        title: 'Tags',
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
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        width: 100,
        render: (status) => (
            <Badge
                className={
                    status === 'Approved'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-50'
                        : 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-50'
                }
            >
                {status}
            </Badge>
        ),
    },
    {
        title: 'Date Posted',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (createdAt) => {
            const date = new Date(createdAt);
            return date.toLocaleDateString('en-GB');
        },
    },
    {
        title: 'Due Date',
        dataIndex: 'deadline',
        key: 'deadline',
        render: (deadline) => {
            const date = new Date(deadline);
            return date.toLocaleDateString('en-GB');
        },
    },
    {
        title: 'Needs',
        dataIndex: 'quantity',
        key: 'quantity',
        render: (quantity) => (
            <span>
                {quantity} <span className="text-gray-400"></span>
            </span>
        ),
    },
    {
        title: 'Actions',
        key: 'action',
        align: 'center',
        fixed: 'end',
        render: () => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white" align="center" side="left">
                    <DropdownMenuItem onClick={() => {
                        setSelectedJob(job);
                        setIsViewDialogOpen(true);
                    }}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
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
        ),
    },
];

export default function JobTable({ currentData, currentPage, pageSize, total, onChangePage }) {
    return (
        <div className="relative flex flex-col h-[60vh]">
            <Table
                columns={columns}
                dataSource={currentData}
                rowKey="id"
                pagination={{
                    current: currentPage,
                    pageSize: pageSize,
                    total: total,
                    onChange: (newPage, newPageSize) => {
                        onChangePage(newPage, newPageSize);
                    },
                }}
                scroll={{ y: '60vh', x: 'max-content' }}
                className="custom-ant-table flex-1"
            />
        </div>
    );
}