import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Label,
  Separator,
  Switch,
} from "@/components/ui";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-gray-900 mb-1 font-semibold">Settings</h3>
        <p className="text-gray-600">Manage system settings and preferences</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
            <CardDescription>
              General information about the recruitment system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="systemName">System Name</Label>
                <Input id="systemName" defaultValue="UniRecruit" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="adminEmail">Admin Email</Label>
                <Input
                  id="adminEmail"
                  type="email"
                  defaultValue="admin@university.edu"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="systemDesc">System Description</Label>
              <Input
                id="systemDesc"
                defaultValue="University Job Recruitment Management System"
              />
            </div>
            <Button className="bg-primary/90 hover:bg-primary text-white hover:scale-105 rounded-lg transition-all">
              Save Changes
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>
              Configure email and system notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>New User Registrations</Label>
                <p className="text-sm text-gray-600">
                  Send email when a new user registers
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>New Job Postings</Label>
                <p className="text-sm text-gray-600">
                  Send email when a company posts a new job
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Job Applications</Label>
                <p className="text-sm text-gray-600">
                  Send email when a student applies to a job
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>System Updates</Label>
                <p className="text-sm text-gray-600">
                  Send email for important system updates
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Job Posting Settings</CardTitle>
            <CardDescription>
              Configure default settings for job postings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-approve Job Postings</Label>
                <p className="text-sm text-gray-600">
                  Automatically approve jobs from verified companies
                </p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Require Salary Information</Label>
                <p className="text-sm text-gray-600">
                  Make salary range mandatory for all job postings
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="jobExpiry">Default Job Expiry (days)</Label>
              <Input
                id="jobExpiry"
                type="number"
                defaultValue="30"
                className="max-w-xs"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Student Profile Settings</CardTitle>
            <CardDescription>
              Configure requirements for student profiles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Require CV Upload</Label>
                <p className="text-sm text-gray-600">
                  Make CV upload mandatory for student profiles
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Require Portfolio</Label>
                <p className="text-sm text-gray-600">
                  Make portfolio mandatory for certain majors
                </p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="maxCV">Maximum CV per Student</Label>
              <Input
                id="maxCV"
                type="number"
                defaultValue="5"
                className="max-w-xs"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>
              Manage security and access control
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-gray-600">
                  Require 2FA for admin accounts
                </p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Session Timeout</Label>
                <p className="text-sm text-gray-600">
                  Auto logout users after inactivity
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="sessionTime">Session Timeout (minutes)</Label>
              <Input
                id="sessionTime"
                type="number"
                defaultValue="30"
                className="max-w-xs"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
