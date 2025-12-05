import { useState, useEffect, useRef, useCallback } from "react";
import {
    Button,
} from "@/components/ui";
import { Dialog, DialogContent } from "@mui/material";
import { X, Bold, Italic, Underline, List } from "lucide-react";
import { Lightbulb } from "lucide-react";

export default function IntroductionModal({ open, onOpenChange, initialData, onSave }) {
    const [content, setContent] = useState(initialData?.introduction || initialData?.content || "");
    const [charCount, setCharCount] = useState(0);
    const editorRef = useRef(null);
    const maxChars = 2500;

    // Only update content when initialData changes (not on every open)
    useEffect(() => {
        if (open && initialData) {
            const introContent = initialData?.introduction || initialData?.content || "";
            setContent(introContent);
            setCharCount(introContent.length);
            
            // Defer DOM update to avoid blocking UI
            requestAnimationFrame(() => {
                if (editorRef.current) {
                    editorRef.current.innerHTML = introContent;
                }
            });
        }
    }, [initialData?.introduction, initialData?.content, open]);

    const handleContentChange = useCallback(() => {
        if (editorRef.current) {
            const text = editorRef.current.innerText || "";
            // Get clean text without HTML tags for storage
            const cleanText = text.trim();

            if (cleanText.length <= maxChars) {
                // Store clean text, not HTML
                setContent(cleanText);
                setCharCount(cleanText.length);
            } else {
                // Truncate if exceeds max
                const truncated = cleanText.substring(0, maxChars);
                editorRef.current.innerText = truncated;
                setContent(truncated);
                setCharCount(maxChars);
            }
        }
    }, [maxChars]);

    const handleFormat = useCallback((command, value = null) => {
        document.execCommand(command, false, value);
        editorRef.current?.focus();
        // Use requestAnimationFrame to batch state updates
        requestAnimationFrame(() => {
            handleContentChange();
        });
    }, [handleContentChange]);

    const handleSave = useCallback(() => {
        const formData = {
            introduction: content,
            content: content,
        };
        if (onSave) {
            onSave(formData);
        }
        onOpenChange(false);
    }, [content, onSave, onOpenChange]);

    const handleCancel = useCallback(() => {
        onOpenChange(false);
    }, [onOpenChange]);

    return (
        <Dialog
            open={open}
            onClose={() => onOpenChange(false)}
            scroll="body"
            maxWidth="md"
            fullWidth={true}
        >
            <DialogContent sx={{ padding: 0 }}>
                {/* Header */}
                <div className="sticky top-0 bg-background z-10 p-6 pb-4 border-b border-neutrals-20">
                    <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-foreground">
                            Giới thiệu bản thân
                        </span>
                        <button
                            onClick={() => onOpenChange(false)}
                            className="rounded-full bg-primary/10 p-1.5 hover:bg-primary/20 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        >
                            <X className="h-5 w-5 text-primary" />
                            <span className="sr-only">Close</span>
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Tip Section */}
                    <div className="flex items-start gap-2 mb-4 p-3 bg-orange-50 rounded-lg border border-orange-100">
                        <Lightbulb className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                        <div>
                            <span className="text-sm font-bold text-orange-600">Tip: </span>
                            <span className="text-sm text-foreground">
                                Tóm tắt kinh nghiệm chuyên môn, chú ý làm nổi bật các kỹ năng và điểm mạnh.
                            </span>
                        </div>
                    </div>

                    {/* Rich Text Editor */}
                    <div className="space-y-2">
                        {/* Formatting Toolbar */}
                        <div className="flex items-center gap-1 p-2 border border-neutrals-40 rounded-t-lg bg-neutrals-5">
                            <button
                                type="button"
                                onClick={() => handleFormat("bold")}
                                className="p-2 hover:bg-neutrals-20 rounded transition-colors"
                                title="Bold"
                            >
                                <Bold className="h-4 w-4 text-foreground" />
                            </button>
                            <button
                                type="button"
                                onClick={() => handleFormat("italic")}
                                className="p-2 hover:bg-neutrals-20 rounded transition-colors"
                                title="Italic"
                            >
                                <Italic className="h-4 w-4 text-foreground" />
                            </button>
                            <button
                                type="button"
                                onClick={() => handleFormat("underline")}
                                className="p-2 hover:bg-neutrals-20 rounded transition-colors"
                                title="Underline"
                            >
                                <Underline className="h-4 w-4 text-foreground" />
                            </button>
                            <button
                                type="button"
                                onClick={() => handleFormat("insertUnorderedList")}
                                className="p-2 hover:bg-neutrals-20 rounded transition-colors"
                                title="Bullet List"
                            >
                                <List className="h-4 w-4 text-foreground" />
                            </button>
                        </div>

                        {/* Editor Area */}
                        <div
                            ref={editorRef}
                            contentEditable
                            suppressContentEditableWarning={true}
                            onInput={handleContentChange}
                            onPaste={(e) => {
                                // Paste as plain text only
                                e.preventDefault();
                                const text = e.clipboardData.getData('text/plain');
                                document.execCommand('insertText', false, text);
                            }}
                            className="min-h-[200px] p-4 border border-t-0 border-neutrals-40 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0"
                            style={{
                                whiteSpace: "pre-wrap",
                                wordBreak: "break-word",
                            }}
                        />

                        {/* Character Counter */}
                        <div className="text-sm text-muted-foreground">
                            {charCount}/{maxChars} ký tự
                        </div>
                    </div>

                    {/* Footer Buttons */}
                    <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-neutrals-20">
                        <Button
                            type="button"
                            onClick={handleCancel}
                            variant="outline"
                            className="h-12 px-6 bg-white border border-neutrals-40 text-foreground hover:bg-neutrals-10 hover:border-neutrals-40"
                        >
                            Huỷ
                        </Button>
                        <Button
                            type="button"
                            onClick={handleSave}
                            className="h-12 px-6 bg-primary hover:bg-primary/90 text-white font-medium"
                        >
                            Lưu
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
