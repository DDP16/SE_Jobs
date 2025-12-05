import { useEffect, useState } from 'react';
import { Filter, MoreVertical, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import {
    Button,
    Badge,
    Checkbox,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui';
import JobTable from './partials/JobTable';
import { useDispatch, useSelector } from 'react-redux';
import { getJobs, getJobsByCompanyId } from '../../../modules';

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
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const dispatch = useDispatch();
    const id = useSelector((state) => state.auth.userId);
    const jobs = useSelector((state) => state.jobs.jobs);

    useEffect(() => {
        // dispatch(getJobsByCompanyId({companyId: id, page: currentPage, limit: pageSize}));
        dispatch(getJobs());
    }, [currentPage, pageSize]);

    // const [selectedIds, setSelectedIds] = useState([]);
    const [dateRange] = useState('July 19 - July 25');

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentData = mockJobListings.slice(startIndex, endIndex);

    // const toggleSelectAll = () => {
    //     if (selectedIds.length === currentData.length) {
    //         setSelectedIds([]);
    //     } else {
    //         setSelectedIds(currentData.map((job) => job.id));
    //     }
    // };

    // const toggleSelect = (id) => {
    //     setSelectedIds((prev) =>
    //         prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id]
    //     );
    // };

    return (
        <div className="space-y-6 p-4 lg:p-6 2xl:p-8 flex flex-col">
            <div className="flex items-center justify-between">
                <div>
                    <h4 className="font-semibold mb-1">Job Listing</h4>
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
                <JobTable 
                    currentData={currentData}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    total={mockJobListings.length}
                    onChangePage={(newPage, newPageSize) => {
                        setCurrentPage(newPage);
                        setPageSize(newPageSize);
                    }}
                />
            </div>
        </div>
    );
}
