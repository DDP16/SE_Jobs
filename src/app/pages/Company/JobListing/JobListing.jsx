import { useState } from 'react';
import { Filter, MoreVertical, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import {
    Button,
    Badge,
    Checkbox,
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
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui';

const mockJobListings = [
    {
        id: 1,
        role: 'Social Media Assistant',
        status: 'Live',
        datePosted: '20 May 2020',
        dueDate: '24 May 2020',
        jobType: 'Fulltime',
        applicants: 19,
        needs: 4,
        totalNeeds: 11,
    },
    {
        id: 2,
        role: 'Senior Designer',
        status: 'Live',
        datePosted: '16 May 2020',
        dueDate: '24 May 2020',
        jobType: 'Fulltime',
        applicants: 1234,
        needs: 0,
        totalNeeds: 20,
    },
    {
        id: 3,
        role: 'Visual Designer',
        status: 'Live',
        datePosted: '15 May 2020',
        dueDate: '24 May 2020',
        jobType: 'Freelance',
        applicants: 2435,
        needs: 1,
        totalNeeds: 5,
    },
    {
        id: 4,
        role: 'Data Sience',
        status: 'Closed',
        datePosted: '13 May 2020',
        dueDate: '24 May 2020',
        jobType: 'Freelance',
        applicants: 6234,
        needs: 10,
        totalNeeds: 10,
    },
    {
        id: 5,
        role: 'Kotlin Developer',
        status: 'Closed',
        datePosted: '12 May 2020',
        dueDate: '24 May 2020',
        jobType: 'Fulltime',
        applicants: 12,
        needs: 20,
        totalNeeds: 20,
    },
    {
        id: 6,
        role: 'React Developer',
        status: 'Closed',
        datePosted: '11 May 2020',
        dueDate: '24 May 2020',
        jobType: 'Fulltime',
        applicants: 14,
        needs: 10,
        totalNeeds: 10,
    },
    {
        id: 7,
        role: 'Kotlin Developer',
        status: 'Closed',
        datePosted: '12 May 2020',
        dueDate: '24 May 2020',
        jobType: 'Fulltime',
        applicants: 12,
        needs: 20,
        totalNeeds: 20,
    },
    {
        id: 8,
        role: 'Social Media Assistant',
        status: 'Live',
        datePosted: '20 May 2020',
        dueDate: '24 May 2020',
        jobType: 'Fulltime',
        applicants: 19,
        needs: 4,
        totalNeeds: 11,
    },
    {
        id: 9,
        role: 'Senior Designer',
        status: 'Live',
        datePosted: '16 May 2020',
        dueDate: '24 May 2020',
        jobType: 'Fulltime',
        applicants: 1234,
        needs: 0,
        totalNeeds: 20,
    },
    {
        id: 10,
        role: 'Visual Designer',
        status: 'Live',
        datePosted: '15 May 2020',
        dueDate: '24 May 2020',
        jobType: 'Freelance',
        applicants: 2435,
        needs: 1,
        totalNeeds: 5,
    },
    {
        id: 12,
        role: 'Data Sience',
        status: 'Closed',
        datePosted: '13 May 2020',
        dueDate: '24 May 2020',
        jobType: 'Freelance',
        applicants: 6234,
        needs: 10,
        totalNeeds: 10,
    },
    {
        id: 13,
        role: 'Kotlin Developer',
        status: 'Closed',
        datePosted: '12 May 2020',
        dueDate: '24 May 2020',
        jobType: 'Fulltime',
        applicants: 12,
        needs: 20,
        totalNeeds: 20,
    },
    {
        id: 14,
        role: 'React Developer',
        status: 'Closed',
        datePosted: '11 May 2020',
        dueDate: '24 May 2020',
        jobType: 'Fulltime',
        applicants: 14,
        needs: 10,
        totalNeeds: 10,
    },
    {
        id: 15,
        role: 'Kotlin Developer',
        status: 'Closed',
        datePosted: '12 May 2020',
        dueDate: '24 May 2020',
        jobType: 'Fulltime',
        applicants: 12,
        needs: 20,
        totalNeeds: 20,
    },
];

export default function JobListing() {
    const [selectedIds, setSelectedIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [dateRange] = useState('July 19 - July 25');

    const totalPages = Math.ceil(mockJobListings.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentData = mockJobListings.slice(startIndex, endIndex);

    const toggleSelectAll = () => {
        if (selectedIds.length === currentData.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(currentData.map((job) => job.id));
        }
    };

    const toggleSelect = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id]
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-gray-900 mb-1">Job Listing</h1>
                    <p className="text-gray-600">
                        Here is your jobs listing status from {dateRange}.
                    </p>
                </div>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="gap-2">
                            <Calendar className="w-4 h-4" />
                            {dateRange}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-4">
                        <p className="text-sm text-gray-600">Date range selector</p>
                        <p className="text-xs text-gray-500 mt-2">Custom date range functionality can be added here</p>
                    </PopoverContent>
                </Popover>
            </div>

            <div className="bg-white rounded-lg border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                    <h2 className="text-gray-900">Job List</h2>
                    <Button variant="outline" className="gap-2">
                        <Filter className="w-4 h-4" />
                        Filters
                    </Button>
                </div>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-b border-gray-200">
                                <TableHead className="w-12">
                                    <Checkbox
                                        checked={selectedIds.length === currentData.length && currentData.length > 0}
                                        onCheckedChange={toggleSelectAll}
                                    />
                                </TableHead>
                                <TableHead className="text-gray-500">Roles</TableHead>
                                <TableHead className="text-gray-500">Status</TableHead>
                                <TableHead className="text-gray-500">Date Posted</TableHead>
                                <TableHead className="text-gray-500">Due Date</TableHead>
                                <TableHead className="text-gray-500">Job Type</TableHead>
                                <TableHead className="text-gray-500">Applicants</TableHead>
                                <TableHead className="text-gray-500">Needs</TableHead>
                                <TableHead className="w-12"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentData.map((job) => (
                                <TableRow key={job.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedIds.includes(job.id)}
                                            onCheckedChange={() => toggleSelect(job.id)}
                                        />
                                    </TableCell>
                                    <TableCell className="text-gray-900">{job.role}</TableCell>
                                    <TableCell>
                                        <Badge
                                            className={
                                                job.status === 'Live'
                                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-50'
                                                    : 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-50'
                                            }
                                        >
                                            {job.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-gray-600">{job.datePosted}</TableCell>
                                    <TableCell className="text-gray-600">{job.dueDate}</TableCell>
                                    <TableCell>
                                        <Badge
                                            className={
                                                job.jobType === 'Fulltime'
                                                    ? 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-50'
                                                    : 'bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-50'
                                            }
                                        >
                                            {job.jobType}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-gray-900">
                                        {job.applicants.toLocaleString()}
                                    </TableCell>
                                    <TableCell className="text-gray-900">
                                        {job.needs} <span className="text-gray-400">/ {job.totalNeeds}</span>
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreVertical className="w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <span className="text-gray-600 text-sm">View</span>
                        <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(Number(value))}>
                            <SelectTrigger className="w-20">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="20">20</SelectItem>
                                <SelectItem value="50">50</SelectItem>
                            </SelectContent>
                        </Select>
                        <span className="text-gray-600 text-sm">Applicants per page</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className="w-10 h-10"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </Button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <Button
                                key={page}
                                variant={currentPage === page ? 'default' : 'outline'}
                                size="icon"
                                onClick={() => setCurrentPage(page)}
                                className={`w-10 h-10 ${currentPage === page
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                        : 'hover:bg-gray-50'
                                    }`}
                            >
                                {page}
                            </Button>
                        ))}

                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                            className="w-10 h-10"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
