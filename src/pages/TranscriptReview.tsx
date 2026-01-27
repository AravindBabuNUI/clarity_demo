import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { PDFPreview } from '@/components/review/PDFPreview';
import { IframePDFPreview } from '@/components/review/IFramePdf';
import { ExtractedDataEditor } from '@/components/review/ExtractedDataEditor';
import { mockTranscript } from '@/data/mockData';
import { TranscriptData } from '@/types/transcript';
import { useToast } from '@/hooks/use-toast';

const TranscriptReview = () => {
  const navigate = useNavigate();

  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);

  const handleSave = (data: TranscriptData) => {
    toast({
      title: "Changes Saved",
      description: "Transcript data has been validated and saved successfully.",
    });
    navigate('/equivalency');
  };

  return (
    <MainLayout>
      <div className="space-y-4 h-[calc(100vh-8rem)]">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Transcript Review</h1>
          <p className="text-muted-foreground">
            Review extracted data and make corrections as needed
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100%-4rem)]">
          {/* Left: PDF Preview */}
          {/* <IframePDFPreview
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            onTotalPagesChange={setTotalPages}
          /> */}
          <PDFPreview
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            onTotalPagesChange={setTotalPages}
          />

          {/* Right: Extracted Data Editor */}
          <ExtractedDataEditor
            transcript={mockTranscript}
            onSave={handleSave}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default TranscriptReview;
