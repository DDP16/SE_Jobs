import { Table } from "antd";
import { Badge } from "@/components/ui";

const columns = [
    // {
    //     title: '',
    //     dataIndex: 'id',
    //     key: 'checkbox',
    //     width: 50,
    //     render: (id) => (
    //         <Checkbox
    //             checked={selectedIds.includes(id)}
    //             onCheckedChange={() => toggleSelect(id)}
    //         />
    //     ),
    // },
    {
        title: 'Roles',
        dataIndex: 'role',
        key: 'role',
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
                    status === 'Live'
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
        dataIndex: 'datePosted',
        key: 'datePosted',
    },
    {
        title: 'Due Date',
        dataIndex: 'dueDate',
        key: 'dueDate',
    },
    {
        title: 'Job Type',
        dataIndex: 'jobType',
        key: 'jobType',
        width: 200,
        align: 'center',
        render: (jobType) => (
            <Badge
                className={
                    jobType === 'Fulltime'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-50'
                        : 'bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-50'
                }
            >
                {jobType}
            </Badge>
        ),
    },
    {
        title: 'Applicants',
        dataIndex: 'applicants',
        key: 'applicants',
        render: (applicants) => applicants.toLocaleString(),
    },
    {
        title: 'Needs',
        dataIndex: 'needs',
        key: 'needs',
        render: (needs, record) => (
            <span>
                {needs} <span className="text-gray-400">/ {record.totalNeeds}</span>
            </span>
        ),
    },
    // {
    //     title: '',
    //     key: 'action',
    //     render: () => (
    //         <DropdownMenu>
    //             <DropdownMenuTrigger asChild>
    //                 <Button variant="ghost" size="icon">
    //                     <MoreVertical className="w-4 h-4" />
    //                 </Button>
    //             </DropdownMenuTrigger>
    //             <DropdownMenuContent align="end">
    //                 <DropdownMenuItem>View Details</DropdownMenuItem>
    //                 <DropdownMenuItem>Edit</DropdownMenuItem>
    //                 <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
    //             </DropdownMenuContent>
    //         </DropdownMenu>
    //     ),
    // },
];

export default function JobTable({ currentData, currentPage, pageSize, total, onChangePage }) {
    return (
        <div className="relative flex flex-col h-[75vh]">
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
                scroll={{ y: '62vh' }}
                className="custom-ant-table flex-1"
            />
        </div>
    );
}