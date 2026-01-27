import { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, Loader2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUploadContext } from '@/context/UploadContext';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import pdfWorkerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Import PDF files from the pdfs directory
import rivkaPdf from '@/data/pdfs/Rivka Brenda Eshaghian Los Angeles Community College District official transcript.pdf';
import adanPdf from '@/data/pdfs/Adan Camilo Rodriguez Villa Cypress College OT.pdf';
import dianePdf from "@/data/pdfs/Diane Gaile Paoner Mount Saint Mary's University official transcript source.pdf";

// Set up PDF.js worker (Vite-friendly)
pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerSrc;

// Map of filenames to PDF imports
const PDF_MAP: Record<string, string> = {
  "Rivka Brenda Eshaghian Los Angeles Community College District official transcript.pdf": rivkaPdf,
  "Adan Camilo Rodriguez Villa Cypress College OT.pdf": adanPdf,
  "Diane Gaile Paoner Mount Saint Mary's University official transcript (1).pdf": dianePdf,
  "Diane Gaile Paoner Mount Saint Mary's University official transcript source.pdf": dianePdf,
};

interface PDFPreviewProps {
  currentPage: number;
  totalPages?: number;
  onPageChange: (page: number) => void;
  onTotalPagesChange?: (pages: number) => void;
}

export function PDFPreview({ currentPage, totalPages, onPageChange, onTotalPagesChange }: PDFPreviewProps) {
  const { fileName, fileType } = useUploadContext();
  const [numPages, setNumPages] = useState<number>(totalPages || 0);
  const [scale, setScale] = useState<number>(1.0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Get PDF URL from pdfs directory based on fileName
  const pdfUrl = useMemo(() => {
    if (!fileName) return null;
    
    // Try exact match first
    if (PDF_MAP[fileName]) {
      return PDF_MAP[fileName];
    }
    
    // Try partial match (in case filename has slight variations)
    // Extract base name without extension for comparison
    const fileNameBase = fileName.replace(/\.[^/.]+$/, '').toLowerCase();
    const matchedKey = Object.keys(PDF_MAP).find(key => {
      const keyBase = key.replace(/\.[^/.]+$/, '').toLowerCase();
      // Check if either filename contains the other's base name
      return fileNameBase.includes(keyBase) || keyBase.includes(fileNameBase);
    });
    
    return matchedKey ? PDF_MAP[matchedKey] : null;
  }, [fileName]);

  // Reset page when file changes
  useEffect(() => {
    if (pdfUrl && fileType === 'application/pdf') {
      setNumPages(0);
      setError(null);
    }
  }, [pdfUrl, fileType]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
    setError(null);
    // Notify parent of total pages
    if (onTotalPagesChange) {
      onTotalPagesChange(numPages);
    }
    // Ensure currentPage doesn't exceed numPages
    if (currentPage > numPages) {
      onPageChange(numPages);
    }
  };

  const onDocumentLoadError = (error: Error) => {
    setError(`Failed to load PDF: ${error.message}`);
    setLoading(false);
  };

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, 3.0));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleDownload = () => {
    if (pdfUrl && fileName) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Show placeholder if no file is uploaded or PDF not found
  if (!fileName) {
    return (
      <Card className="bg-card h-full flex flex-col">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg">Transcript Preview</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col items-center justify-center">
          <div className="text-center space-y-4">
            <FileText className="h-16 w-16 mx-auto text-muted-foreground" />
            <div>
              <p className="text-lg font-medium text-foreground">No file uploaded</p>
              <p className="text-sm text-muted-foreground">
                Upload a PDF or image file to preview it here
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show error if PDF file not found in pdfs directory
  if (fileType === 'application/pdf' && !pdfUrl) {
    return (
      <Card className="bg-card h-full flex flex-col">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg">Transcript Preview</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col items-center justify-center">
          <div className="text-center space-y-4">
            <FileText className="h-16 w-16 mx-auto text-muted-foreground" />
            <div>
              <p className="text-lg font-medium text-foreground">PDF not found</p>
              <p className="text-sm text-muted-foreground">
                Could not find matching PDF file for: {fileName}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Available PDFs: {Object.keys(PDF_MAP).join(', ')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Note: For images, we still use the uploaded file URL since images aren't stored in pdfs directory
  // If you want to handle images differently, you can add image mapping similar to PDF_MAP

  // Handle PDF files
  return (
    <Card className="bg-card h-full flex flex-col">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg">Transcript Preview</CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleZoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleZoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleDownload}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1 bg-accent rounded-lg p-6 overflow-auto flex items-center justify-center">
          {loading && (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Loading PDF...</p>
            </div>
          )}
          
          {error && (
            <div className="text-center space-y-2">
              <p className="text-sm text-destructive">{error}</p>
              <p className="text-xs text-muted-foreground">
                Please ensure the file is a valid PDF document
              </p>
            </div>
          )}

          {!loading && !error && pdfUrl && (
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-sm text-muted-foreground">Loading PDF...</p>
                </div>
              }
              error={
                <div className="text-center space-y-2">
                  <p className="text-sm text-destructive">Failed to load PDF</p>
                  <p className="text-xs text-muted-foreground">
                    Please ensure the file is a valid PDF document
                  </p>
                </div>
              }
            >
              <Page
                pageNumber={currentPage}
                scale={scale}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                className="shadow-lg"
              />
            </Document>
          )}
        </div>

        {/* Page Navigation */}
        {numPages > 0 && (
          <div className="flex items-center justify-center gap-4 pt-4">
            <Button
              variant="outline"
              size="icon"
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {numPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              disabled={currentPage >= numPages}
              onClick={() => onPageChange(currentPage + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
