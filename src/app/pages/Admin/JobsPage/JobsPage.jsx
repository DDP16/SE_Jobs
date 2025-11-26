import { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Eye, Edit, Trash2, Briefcase, DollarSign, MapPin, Building2, Zap, Flame, Diamond } from 'lucide-react';
import {
  Button,
  Input,
  Badge,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Label,
  Textarea,
  Checkbox,
  Separator,
} from "@/components/ui";

const mockJobs = [
  { 
    id: 1,
    title: 'Senior Software Engineer',
    company: 'Google',
    companyId: 1,
    category: 'Information Technology',
    level: 'Senior',
    employmentType: 'Full-time',
    location: 'Mountain View, CA',
    salaryFrom: 120000,
    salaryTo: 180000,
    salaryCurrency: 'USD',
    applications: 45,
    isDiamond: true,
    isHot: true,
    isJobFlashActive: false,
    postedDate: '2024-03-01',
    status: 'Active'
  },
  { 
    id: 2,
    title: 'Product Manager',
    company: 'Microsoft',
    companyId: 2,
    category: 'Marketing',
    level: 'Mid-level',
    employmentType: 'Full-time',
    location: 'New York, NY',
    salaryFrom: 90000,
    salaryTo: 140000,
    salaryCurrency: 'USD',
    applications: 32,
    isDiamond: false,
    isHot: true,
    isJobFlashActive: true,
    postedDate: '2024-03-05',
    status: 'Active'
  },
  { 
    id: 3,
    title: 'UX Designer',
    company: 'Apple',
    companyId: 4,
    category: 'Design',
    level: 'Junior',
    employmentType: 'Full-time',
    location: 'Cupertino, CA',
    salaryFrom: 70000,
    salaryTo: 100000,
    salaryCurrency: 'USD',
    applications: 28,
    isDiamond: false,
    isHot: false,
    isJobFlashActive: true,
    postedDate: '2024-03-10',
    status: 'Active'
  },
  { 
    id: 4,
    title: 'Data Scientist Intern',
    company: 'Amazon',
    companyId: 3,
    category: 'Information Technology',
    level: 'Intern',
    employmentType: 'Internship',
    location: 'Seattle, WA',
    salaryFrom: 30000,
    salaryTo: 50000,
    salaryCurrency: 'USD',
    applications: 67,
    isDiamond: false,
    isHot: true,
    isJobFlashActive: false,
    postedDate: '2024-03-12',
    status: 'Active'
  },
  { 
    id: 5,
    title: 'DevOps Engineer',
    company: 'Meta',
    companyId: 5,
    category: 'Information Technology',
    level: 'Mid-level',
    employmentType: 'Full-time',
    location: 'Remote',
    salaryFrom: 100000,
    salaryTo: 150000,
    salaryCurrency: 'USD',
    applications: 41,
    isDiamond: true,
    isHot: false,
    isJobFlashActive: false,
    postedDate: '2024-03-08',
    status: 'Active'
  },
  { 
    id: 6,
    title: 'Sales Manager',
    company: 'Tesla',
    companyId: 6,
    category: 'Sales',
    level: 'Manager',
    employmentType: 'Full-time',
    location: 'Austin, TX',
    salaryFrom: 80000,
    salaryTo: 120000,
    salaryCurrency: 'USD',
    applications: 23,
    isDiamond: false,
    isHot: false,
    isJobFlashActive: false,
    postedDate: '2024-02-28',
    status: 'Closed'
  },
];

const categories = ['Information Technology', 'Marketing', 'Finance', 'Education', 'Engineering', 'Design', 'Sales', 'Healthcare'];
const levels = ['Intern', 'Fresher', 'Junior', 'Mid-level', 'Senior', 'Manager', 'Director', 'Executive'];
const employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance', 'Remote', 'Temporary'];
const skills = ['JavaScript', 'ReactJS', 'NodeJS', 'Communication', 'Project Management', 'Teamwork', 'UI/UX Design', 'Python', 'SQL', 'AWS'];

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || job.category === categoryFilter;
    const matchesLevel = levelFilter === 'all' || job.level === levelFilter;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-1">Job Management</h1>
          <p className="text-gray-600">Manage job listings, categories, and applications</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Post New Job
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-56">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                {levels.map((level) => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job Title</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Salary Range</TableHead>
              <TableHead>Applications</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredJobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-gray-400" />
                    <span>{job.title}</span>
                  </div>
                </TableCell>
                <TableCell className="text-gray-600">{job.company}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                    {job.category}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-purple-50 text-purple-700">
                    {job.level}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {job.location}
                  </div>
                </TableCell>
                <TableCell className="text-gray-600">
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-3 h-3" />
                    {job.salaryFrom.toLocaleString()} - {job.salaryTo.toLocaleString()} {job.salaryCurrency}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-green-50 text-green-700">
                    {job.applications}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
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
                </TableCell>
                <TableCell>
                  <Badge variant={job.status === 'Active' ? 'default' : 'secondary'}>
                    {job.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Add Job Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Post New Job</DialogTitle>
            <DialogDescription>
              Create a new job listing for the recruitment system.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input id="title" placeholder="e.g. Senior Software Engineer" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Google</SelectItem>
                    <SelectItem value="2">Microsoft</SelectItem>
                    <SelectItem value="3">Amazon</SelectItem>
                    <SelectItem value="4">Apple</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="level">Job Level</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((level) => (
                      <SelectItem key={level} value={level}>{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="employment">Employment Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {employmentTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Work Location</Label>
              <Input id="location" placeholder="e.g. San Francisco, CA or Remote" />
            </div>

            <Separator />

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="salaryFrom">Salary From</Label>
                <Input id="salaryFrom" type="number" placeholder="80000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salaryTo">Salary To</Label>
                <Input id="salaryTo" type="number" placeholder="120000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="VND">VND</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Job description..." rows={3} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="responsibilities">Responsibilities</Label>
              <Textarea id="responsibilities" placeholder="Key responsibilities..." rows={3} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="requirements">Requirements</Label>
              <Textarea id="requirements" placeholder="Job requirements..." rows={3} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="benefits">Benefits</Label>
              <Textarea id="benefits" placeholder="Employee benefits..." rows={2} />
            </div>

            <Separator />

            <div className="space-y-3">
              <Label>Job Tags</Label>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Checkbox id="isDiamond" />
                  <label htmlFor="isDiamond" className="text-sm flex items-center gap-1 cursor-pointer">
                    <Diamond className="w-4 h-4 text-cyan-600" />
                    Diamond Job
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="isHot" />
                  <label htmlFor="isHot" className="text-sm flex items-center gap-1 cursor-pointer">
                    <Flame className="w-4 h-4 text-orange-600" />
                    Hot Job
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="isFlash" />
                  <label htmlFor="isFlash" className="text-sm flex items-center gap-1 cursor-pointer">
                    <Zap className="w-4 h-4 text-yellow-600" />
                    Flash Active
                  </label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Post Job
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Job Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedJob?.title}</DialogTitle>
            <DialogDescription>
              <div className="flex items-center gap-2 mt-2">
                <Building2 className="w-4 h-4" />
                {selectedJob?.company}
              </div>
            </DialogDescription>
          </DialogHeader>
          {selectedJob && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Category</p>
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700 mt-1">
                    {selectedJob.category}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Level</p>
                  <Badge variant="secondary" className="bg-purple-50 text-purple-700 mt-1">
                    {selectedJob.level}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Employment Type</p>
                  <Badge variant="secondary" className="mt-1">
                    {selectedJob.employmentType}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="text-gray-900 mt-1">{selectedJob.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Salary Range</p>
                  <p className="text-gray-900 mt-1">
                    ${selectedJob.salaryFrom.toLocaleString()} - ${selectedJob.salaryTo.toLocaleString()} {selectedJob.salaryCurrency}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Applications</p>
                  <Badge variant="secondary" className="bg-green-50 text-green-700 mt-1">
                    {selectedJob.applications} applications
                  </Badge>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Job Tags</p>
                <div className="flex gap-2">
                  {selectedJob.isDiamond && (
                    <Badge variant="secondary" className="bg-cyan-50 text-cyan-700">
                      <Diamond className="w-3 h-3 mr-1" />
                      Diamond
                    </Badge>
                  )}
                  {selectedJob.isHot && (
                    <Badge variant="secondary" className="bg-orange-50 text-orange-700">
                      <Flame className="w-3 h-3 mr-1" />
                      Hot Job
                    </Badge>
                  )}
                  {selectedJob.isJobFlashActive && (
                    <Badge variant="secondary" className="bg-yellow-50 text-yellow-700">
                      <Zap className="w-3 h-3 mr-1" />
                      Flash Active
                    </Badge>
                  )}
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-sm text-gray-600 mb-2">Status</p>
                <Badge variant={selectedJob.status === 'Active' ? 'default' : 'secondary'}>
                  {selectedJob.status}
                </Badge>
              </div>

              <div>
                <p className="text-sm text-gray-600">Posted Date</p>
                <p className="text-gray-900 mt-1">{selectedJob.postedDate}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Edit className="w-4 h-4 mr-2" />
              Edit Job
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
