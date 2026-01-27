import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, CheckCircle, Loader2, X } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { useUploadContext } from '@/context/UploadContext';

interface UploadedFile {
  name: string;
  size: number;
  status: 'uploading' | 'processing' | 'complete' | 'error';
  progress: number;
}

const UploadTranscript = () => {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const { setFileMetadata } = useUploadContext();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const simulateUpload = useCallback((file: File) => {
    const newFile: UploadedFile = {
      name: file.name,
      size: file.size,
      status: 'uploading',
      progress: 0
    };

    setUploadedFiles(prev => [...prev, newFile]);

    // Store latest file metadata and content in shared context
    setFileMetadata({
      fileName: file.name,
      fileType: file.type || 'unknown',
      fileContent: file, // Store the actual File object
      fileUrl: null, // Will be created in context
    });

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadedFiles(prev =>
        prev.map(f =>
          f.name === file.name
            ? { ...f, progress, status: progress < 100 ? 'uploading' : 'processing' }
            : f
        )
      );

      if (progress >= 100) {
        clearInterval(interval);
        // Simulate AI processing
        setTimeout(() => {
          setUploadedFiles(prev =>
            prev.map(f =>
              f.name === file.name ? { ...f, status: 'complete' } : f
            )
          );
        }, 2000);
      }
    }, 200);
  }, [setFileMetadata, setUploadedFiles]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    files.forEach(file => {
      if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
        simulateUpload(file);
      }
    });
  }, [simulateUpload]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => simulateUpload(file));
  };

  const removeFile = (fileName: string) => {
    setUploadedFiles(prev => prev.filter(f => f.name !== fileName));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const hasCompletedFiles = uploadedFiles.some(f => f.status === 'complete');

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Upload Transcript</h1>
          <p className="text-muted-foreground">
            Upload scanned PDFs, digital PDFs, or images for AI-powered extraction
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle>Upload Documents</CardTitle>
              <CardDescription>
                Supported formats: PDF, PNG, JPG, JPEG
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={cn(
                  "border-2 border-dashed rounded-lg p-12 text-center transition-colors cursor-pointer",
                  isDragging
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 hover:bg-accent"
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-input')?.click()}
              >
                <input
                  id="file-input"
                  type="file"
                  className="hidden"
                  accept=".pdf,.png,.jpg,.jpeg"
                  multiple
                  onChange={handleFileSelect}
                />
                <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg font-medium text-foreground mb-2">
                  Drag and drop files here
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  or click to browse
                </p>
                <Button variant="outline">Select Files</Button>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="mt-6 space-y-3">
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 rounded-lg bg-accent"
                    >
                      <FileText className="h-8 w-8 text-primary" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)}
                        </p>
                        {file.status === 'uploading' && (
                          <Progress value={file.progress} className="mt-2 h-1" />
                        )}
                        {file.status === 'processing' && (
                          <p className="text-xs text-primary mt-1 flex items-center gap-1">
                            <Loader2 className="h-3 w-3 animate-spin" />
                            AI processing...
                          </p>
                        )}
                        {file.status === 'complete' && (
                          <p className="text-xs text-[hsl(var(--success))] mt-1 flex items-center gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Extraction complete
                          </p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFile(file.name)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {hasCompletedFiles && (
                <div className="mt-6">
                  <Button
                    className="w-full"
                    onClick={() => navigate('/review')}
                  >
                    Review Extracted Data
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader>
              <CardTitle>AI Extraction Features</CardTitle>
              <CardDescription>
                What our AI will automatically extract
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: 'Student Information', desc: 'Name, ID, Institution details' },
                  { title: 'Course Details', desc: 'Titles, codes, credits, grades' },
                  { title: 'Academic Terms', desc: 'Semesters, quarters, trimesters' },
                  { title: 'GPA Calculation', desc: 'Cumulative and term GPAs' },
                  { title: 'Grade Normalization', desc: 'Convert to standard scale' },
                  { title: 'Credit Analysis', desc: 'Total credits and distribution' }
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-accent"
                  >
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">{feature.title}</p>
                      <p className="text-sm text-muted-foreground">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default UploadTranscript;
