import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { TRANSCRIPT_MOCK_DATA } from "@/data/transcriptMockData";


type StudentInfo = {
  name: string;
  studentId: string;
  institutionName: string;
  cumulativeGpa: number;
  totalCredits: number;
};

type CourseData = {
  id: string;
  course_code: string;
  course_title: string;
  college_name: string;
  credits_earned: number;
  grade: string;
  term: string;
  status: 'approved' | 'pending' | 'rejected' | 'review';
};

type TranscriptDataType = {
  fileName: string;
  studentInfo: StudentInfo;
  courseData: CourseData[];
};

type UploadedFileMetadata = {
  fileName: string | null;
  fileType: string | null;
  fileContent: File | null; // Store the actual File object
  fileUrl: string | null; // Store blob URL for preview
};

type UploadContextValue = UploadedFileMetadata & {
  setFileMetadata: (metadata: UploadedFileMetadata) => void;
  clearFileMetadata: () => void;
  transcript: TranscriptDataType | null;
};

const UploadContext = createContext<UploadContextValue | undefined>(undefined);

export const UploadProvider = ({ children }: { children: ReactNode }) => {
  const [metadata, setMetadata] = useState<UploadedFileMetadata>({
    fileName: null,
    fileType: null,
    fileContent: null,
    fileUrl: null,
  });

  const [transcript, setTranscript] = useState<TranscriptDataType | null>(null);

  const setFileMetadata = (next: UploadedFileMetadata) => {
    // Revoke previous blob URL if it exists
    if (metadata.fileUrl) {
      URL.revokeObjectURL(metadata.fileUrl);
    }
    
    // Create blob URL for the new file if it exists
    let fileUrl: string | null = null;
    if (next.fileContent) {
      fileUrl = URL.createObjectURL(next.fileContent);
    }
    
    setMetadata({
      ...next,
      fileUrl,
    });
  };

  const clearFileMetadata = () => {
    // Revoke blob URL before clearing
    if (metadata.fileUrl) {
      URL.revokeObjectURL(metadata.fileUrl);
    }
    
    setMetadata({
      fileName: null,
      fileType: null,
      fileContent: null,
      fileUrl: null,
    });
  };
  
  // Cleanup blob URL on unmount
  useEffect(() => {
    return () => {
      if (metadata.fileUrl) {
        URL.revokeObjectURL(metadata.fileUrl);
      }
    };
  }, [metadata.fileUrl]);
  
  useEffect(() => {
    if (metadata.fileName) {
      console.log('fileName', metadata.fileName);
      const transcript = TRANSCRIPT_MOCK_DATA.find(t => t.fileName === metadata.fileName);
      console.log('TRANSCRIPT_MOCK_DATA', transcript);
      setTranscript(transcript);
    }
  }, [metadata.fileName]);


  return (
    <UploadContext.Provider
      value={{
        ...metadata,
        setFileMetadata,
        clearFileMetadata,
        transcript,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};

export const useUploadContext = () => {
  const context = useContext(UploadContext);

  if (!context) {
    throw new Error("useUploadContext must be used within an UploadProvider");
  }

  return context;
};

