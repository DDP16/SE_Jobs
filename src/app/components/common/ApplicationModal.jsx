import { useState } from "react";
import {
  uiInput as Input,
  uiTextarea as Textarea,
  uiButton as Button,
  uiLabel as Label,
} from "@/components";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import {
  X,
  Smile,
  Bold,
  Italic,
  List,
  ListOrdered,
  Link2,
  Paperclip,
} from "lucide-react";

export default function ApplicationModal({ open, onOpenChange }) {
  const [charCount, setCharCount] = useState(0);
  const maxChars = 500;

  const handleTextChange = (e) => {
    setCharCount(e.target.value.length);
  };

  return (
    <Dialog 
      open={open} 
      onClose={() => onOpenChange(false)}
      scroll="body"
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogContent sx={{ padding: 0 }}>
        <div className="sticky top-0 bg-background z-10 p-6 pb-0">
          <div className="border-b-2 pb-4 border-neutrals-20">
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-6 top-6 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </button>
          <div className="flex items-center gap-4 pr-8">
            <div className="bg-primary rounded-xl w-14 h-14 flex items-center justify-center shrink-0">
              <span className="text-white text-xl font-bold">N</span>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-1">
                Social Media Assistant
              </h4>
              <p className="text-sm text-muted-foreground">
                Nomad • Paris, France • Full-Time
              </p>
            </div>
          </div>
          </div>
        </div>

        <div className="p-6 space-y-5">
          <div className="space-y-2">
            <h4 className="text-2xl font-bold text-foreground">
              Submit your application
            </h4>
            <p className="text-sm text-muted-foreground">
              The following is required and will only be shared with Nomad
            </p>
          </div>

          <form className="space-y-5">
            {/* Full name */}
            <div className="space-y-2">
              <Label htmlFor="fullname" className="text-sm font-medium text-foreground">
                Full name
              </Label>
              <Input
                id="fullname"
                placeholder="Enter your fullname"
                className="h-12"
              />
            </div>

            {/* Email address */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                className="h-12"
              />
            </div>

            {/* Phone number */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                Phone number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                className="h-12"
              />
            </div>

            {/* Current or previous job title */}
            <div className="space-y-2">
              <Label htmlFor="jobtitle" className="text-sm font-medium text-foreground">
                Current of previous job title
              </Label>
              <Input
                id="jobtitle"
                placeholder="What's your current or previous job title?"
                className="h-12"
              />
            </div>

            {/* Links Section */}
            <h4 className="text-base font-bold text-foreground uppercase tracking-wide">
              LINKS
            </h4>

            <div className="space-y-2">
              <Label htmlFor="linkedin" className="text-sm font-medium text-foreground">
                LinkedIn URL
              </Label>
              <Input
                id="linkedin"
                placeholder="Link to your LinkedIn URL"
                className="h-12"
              />
            </div>
            {/* Portfolio URL */}
            <div className="space-y-2">
              <Label htmlFor="portfolio" className="text-sm font-medium text-foreground">
                Portfolio URL
              </Label>
              <Input
                id="portfolio"
                placeholder="Link to your portfolio URL"
                className="h-12"
              />
            </div>

            {/* Additional information */}
            <div className="space-y-2">
              <Label htmlFor="additional" className="text-sm font-medium text-foreground">
                Additional information
              </Label>
              <Textarea
                id="additional"
                placeholder="Add a cover letter or anything else you want to share"
                className="min-h-[140px] resize-none"
                maxLength={maxChars}
                onChange={handleTextChange}
              />
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  Maximum 500 characters
                </p>
                <span className="text-xs text-muted-foreground">
                    {charCount} / {maxChars}
                </span>
              </div>
            </div>

            {/* Attach resume */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Attach your resume
              </Label>
              <button
                type="button"
                className="w-full h-12 border-2 border-dashed border-primary rounded-lg flex items-center
                justify-center gap-2 text-primary font-medium hover:bg-primary/5 transition-colors"
              >
                <Paperclip className="w-5 h-5" />
                Attach Resume/CV
              </button>
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-medium text-base"
            >
              Submit Application
            </Button>

            {/* Terms */}
            <p className="text-xs text-muted-foreground text-center pt-2">
              By sending the request you can confirm that you accept
              <br />
              our{" "}
              <a href="#" className="text-primary hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary hover:underline">
                Privacy Policy
              </a>
            </p>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
