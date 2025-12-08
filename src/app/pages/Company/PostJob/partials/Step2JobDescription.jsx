import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Bold, Italic, List, Link as LinkIcon } from "lucide-react";

function RichTextToolbar() {
  return (
    <div className="flex items-center gap-1 p-2 border-t border-border bg-muted/30">
      <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-muted">
        <Bold className="h-4 w-4 text-muted-foreground" />
      </Button>
      <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-muted">
        <Italic className="h-4 w-4 text-muted-foreground" />
      </Button>
      <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-muted">
        <List className="h-4 w-4 text-muted-foreground" />
      </Button>
      <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-muted">
        <LinkIcon className="h-4 w-4 text-muted-foreground" />
      </Button>
    </div>
  );
}

export default function Step2JobDescription({
  jobDescription,
  setJobDescription,
  responsibilities,
  setResponsibilities,
  whoYouAre,
  setWhoYouAre,
  niceToHaves,
  setNiceToHaves,
}) {
  return (
    <div className="space-y-8">
      {/* Details Section */}
      <div className="border-b border-border border-gray-300">
        <p className="text-lg font-semibold mb-2 text-foreground">Details</p>
        <p className="text-normal font-regular text-muted-foreground mb-6">
          Add the description of the job, responsibilities, who you are, and nice-to-haves.
        </p>
      </div>

      {/* Job Descriptions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start border-b border-border border-gray-300 pb-6">
        <div>
          <Label htmlFor="jobDescriptions" className="text-foreground font-semibold text-lg">
            Job Descriptions
          </Label>
          <p className="text-normal font-regular text-muted-foreground mt-1">Job titles must describe one position</p>
        </div>
        <div className="md:col-span-2">
          <div className="border border-border rounded-lg overflow-hidden bg-white">
            <Textarea
              id="jobDescriptions"
              placeholder="Enter job description"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value.slice(0, 500))}
              className="min-h-[120px] border-0 resize-none focus-visible:ring-0 rounded-none"
            />
            <RichTextToolbar />
            <div className="px-3 py-2 text-xs text-muted-foreground text-right bg-muted/30">
              Maximum 500 characters
              <span className="ml-4 font-medium">{jobDescription.length} / 500</span>
            </div>
          </div>
        </div>
      </div>

      {/* Responsibilities */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start border-b border-border pb-6 border-gray-300">
        <div>
          <Label htmlFor="responsibilities" className="text-foreground font-semibold text-lg">
            Responsibilities
          </Label>
          <p className="text-normal font-regular text-muted-foreground mt-1">
            Outline the core responsibilities of the position
          </p>
        </div>
        <div className="md:col-span-2">
          <div className="border border-border rounded-lg overflow-hidden bg-white">
            <Textarea
              id="responsibilities"
              placeholder="Enter job responsibilities"
              value={responsibilities}
              onChange={(e) => setResponsibilities(e.target.value.slice(0, 500))}
              className="min-h-[120px] border-0 resize-none focus-visible:ring-0 rounded-none"
            />
            <RichTextToolbar />
            <div className="px-3 py-2 text-xs text-muted-foreground text-right bg-muted/30">
              Maximum 500 characters
              <span className="ml-4 font-medium">{responsibilities.length} / 500</span>
            </div>
          </div>
        </div>
      </div>

      {/* Who You Are */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start border-b border-border pb-6 border-gray-300">
        <div>
          <Label htmlFor="whoYouAre" className="text-foreground font-semibold text-lg">
            Who You Are
          </Label>
          <p className="text-normal font-regular text-muted-foreground mt-1">
            Add your preferred candidates qualifications
          </p>
        </div>
        <div className="md:col-span-2">
          <div className="border border-border rounded-lg overflow-hidden bg-white">
            <Textarea
              id="whoYouAre"
              placeholder="Enter qualifications"
              value={whoYouAre}
              onChange={(e) => setWhoYouAre(e.target.value.slice(0, 500))}
              className="min-h-[120px] border-0 resize-none focus-visible:ring-0 rounded-none"
            />
            <RichTextToolbar />
            <div className="px-3 py-2 text-xs text-muted-foreground text-right bg-muted/30">
              Maximum 500 characters
              <span className="ml-4 font-medium">{whoYouAre.length} / 500</span>
            </div>
          </div>
        </div>
      </div>

      {/* Nice-To-Haves */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        <div>
          <Label htmlFor="niceToHaves" className="text-foreground font-semibold text-lg">
            Nice-To-Haves
          </Label>
          <p className="text-normal font-regular text-muted-foreground mt-1">
            Add nice-to-have skills and qualifications for the role to encourage a more diverse set of candidates to
            apply
          </p>
        </div>
        <div className="md:col-span-2">
          <div className="border border-border rounded-lg overflow-hidden bg-white">
            <Textarea
              id="niceToHaves"
              placeholder="Enter nice-to-haves"
              value={niceToHaves}
              onChange={(e) => setNiceToHaves(e.target.value.slice(0, 500))}
              className="min-h-[120px] border-0 resize-none focus-visible:ring-0 rounded-none"
            />
            <RichTextToolbar />
            <div className="px-3 py-2 text-xs text-muted-foreground text-right bg-muted/30">
              Maximum 500 characters
              <span className="ml-4 font-medium">{niceToHaves.length} / 500</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
