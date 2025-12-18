import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar } from 'lucide-react';
import {
    Button,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui';
import JobTable from './partials/JobTable';

export default function JobListing() {
    const { t } = useTranslation();
    const [dateRange] = useState(t('jobListing.dateRange'));

    // const startIndex = (currentPage - 1) * pageSize;
    // const endIndex = startIndex + pageSize;

    // const currentData = mockJobListings.slice(startIndex, endIndex);

    return (
        <div className="space-y-6 p-4 lg:p-6 2xl:p-8 flex flex-col">
            <div className="flex items-center justify-between">
                <div>
                    <h4 className="font-semibold mb-1">{t('jobListing.title')}</h4>
                    <p className="text-gray-600">
                        {t('jobListing.description', { dateRange })}
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
                        <p className="text-sm text-gray-600">{t('jobListing.dateRangeSelector')}</p>
                        <p className="text-xs text-gray-500 mt-2">{t('jobListing.dateRangeHint')}</p>
                    </PopoverContent>
                </Popover>
            </div>

            <div className="bg-white rounded-lg border border-gray-200">
                <JobTable />
            </div>
        </div>
    );
}
