const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export interface AnalysisResponse {
  match_score: number;
  match_summary: string;
  skill_analysis: {
    matched_skills: string[];
    missing_skills: string[];
    recommendations: string[];
  };
  structure_feedback: {
    overall_score: number;
    sections: {
      name: string;
      score: number;
      feedback: string;
      suggestions: string[];
    }[];
  };
  improvement_suggestions: {
    priority: string;
    section: string;
    suggestion: string;
  }[];
  ats_tips: string[];
}

export interface ErrorResponse {
  error: string;
  message: string;
}

export async function analyzeCV(
  file: File,
  jobTitle: string,
  jobDescription: string
): Promise<AnalysisResponse> {
  const formData = new FormData();
  formData.append('cv_file', file);
  formData.append('job_title', jobTitle);
  formData.append('job_description', jobDescription);

  const response = await fetch(`${API_URL}/api/analyze`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData: ErrorResponse = await response.json();
    throw new Error(errorData.message || 'Failed to analyze CV');
  }

  return response.json();
}

export async function healthCheck(): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/api/health`);
    return response.ok;
  } catch {
    return false;
  }
}