import { Card } from "@/components";

export default function OverviewTab() {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600">{mockStudent.bio}</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Social Links</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {mockStudent.socialLinks.map((link) => (
                            <div key={link.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Link2 className="w-4 h-4 text-gray-400" />
                                    <div>
                                        <p className="text-gray-900">{link.platform}</p>
                                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                                            {link.url}
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon">
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                        <Trash2 className="w-4 h-4 text-red-600" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </>
    );
}