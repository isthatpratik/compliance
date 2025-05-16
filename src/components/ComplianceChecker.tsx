import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FileSearch,
  Calendar,
  FileText,
  Upload,
  File,
  X,
  Loader2,
} from "lucide-react";
import ComplianceResult from "./ComplianceResult";
import { GoogleGenerativeAI } from "@google/generative-ai";

type Regulation = "gdpr" | "ccpa" | "hipaa" | "iso27001";

type ComplianceReport = {
  score: number;
  issues: Array<{
    severity: "high" | "medium" | "low";
    description: string;
    recommendation: string;
  }>;
  summary: string;
  timestamp: string;
  aiSuggestions?: {
    suggestedRegulations?: Regulation[];
    missingClauses?: { regulation: string; clause: string }[];
    assessmentQuestions?: string[];
  };
};

const ComplianceChecker = () => {
  const [documentText, setDocumentText] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [fileContent, setFileContent] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [regulations, setRegulations] = useState<Regulation[]>([]);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [report, setReport] = useState<ComplianceReport | null>(null);
  const [activeTab, setActiveTab] = useState<"upload" | "paste">("paste");
  const { toast } = useToast();

  // Handle file read
  const handleFileRead = (file: File) => {
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target?.result as string;
      setFileContent(content);
      setDocumentText(content);
      setFileName(file.name);
      setIsUploading(false);
    };

    reader.onerror = () => {
      toast({
        title: "Error",
        description: "Error reading the file. Please try again.",
        variant: "destructive",
      });
      setIsUploading(false);
    };

    if (file.type === "application/pdf") {
      reader.readAsDataURL(file);
    } else {
      reader.readAsText(file);
    }
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileRead(file);
    }
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // Handle drag leave
  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // Handle file drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      // Check file type
      const validTypes = [
        "text/plain",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a .txt, .pdf, .doc, or .docx file",
          variant: "destructive",
        });
        return;
      }
      // Check file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 10MB",
          variant: "destructive",
        });
        return;
      }
      handleFileRead(file);
    }
  };

  // Remove uploaded file
  const removeFile = () => {
    setFileName("");
    setFileContent("");
    setDocumentText("");
  };

  const handleRegulationToggle = (regulation: Regulation) => {
    setRegulations((prev) =>
      prev.includes(regulation)
        ? prev.filter((r) => r !== regulation)
        : [...prev, regulation]
    );
  };

  const extractJsonFromMarkdown = (text: string): string => {
    // Handle both ```json and ``` code blocks
    const jsonMatch = text.match(/```(?:json)?\n([\s\S]*?)\n```/);
    if (jsonMatch) {
      return jsonMatch[1].trim();
    }
    // If no code blocks found, try to parse the entire text as JSON
    return text.trim();
  };

  const analyzeDocumentWithAI = async (prompt: string, isJson = true) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("Gemini API key is not configured");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: 0.2, // Lower temperature for more focused and deterministic responses
        topP: 0.8,
        topK: 40,
      },
    });

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text().trim();

      if (!isJson) return text;

      // Common JSON parsing issues to handle
      const cleanJsonString = (str: string) => {
        // Remove markdown code blocks if present
        str = str.replace(/```(json)?/g, '').trim();
        // Remove any non-printable characters
        return str.replace(/[\x00-\x1F\x7F-\x9F]/g, '');
      };

      try {
        // First try to parse as is
        return JSON.parse(text);
      } catch (e) {
        // If that fails, try to clean and parse
        const cleanedText = cleanJsonString(text);
        try {
          return JSON.parse(cleanedText);
        } catch (innerError) {
          // Try to extract JSON from markdown if cleaning didn't work
          const jsonText = extractJsonFromMarkdown(cleanedText);
          if (jsonText) {
            return JSON.parse(jsonText);
          }
          console.error('Failed to parse JSON after multiple attempts:', {
            originalText: text,
            cleanedText,
            error: innerError
          });
          throw new Error('Failed to parse AI response as valid JSON');
        }
      }
    } catch (error) {
      console.error("Error in analyzeDocumentWithAI:", error);
      throw new Error(`AI analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const suggestRegulations = async (text: string): Promise<Regulation[]> => {
    const prompt = `Analyze the following document and suggest which compliance frameworks might be relevant based on its content. 
Only return a JSON array of framework IDs from this list: ["gdpr", "ccpa", "hipaa", "iso27001", "pci-dss"].

Document content:
${text}

Example response: ["gdpr", "ccpa"]`;

    try {
      const suggested = await analyzeDocumentWithAI(prompt);
      const validRegulations = Array.isArray(suggested)
        ? suggested.filter(
            (r: any) =>
              typeof r === "string" &&
              ["gdpr", "ccpa", "hipaa", "iso27001", "pci-dss"].includes(
                r.toLowerCase()
              )
          )
        : [];

      return validRegulations.filter(
        (r: string) => !regulations.includes(r as Regulation)
      ) as Regulation[];
    } catch (error) {
      console.error("Error suggesting regulations:", error);
      return [];
    }
  };

  const identifyMissingClauses = async (
    text: string,
    selectedRegulations: Regulation[]
  ): Promise<Array<{ regulation: string; clause: string }>> => {
    if (selectedRegulations.length === 0) return [];

    const prompt = `Analyze the following document and identify any missing clauses for these compliance frameworks: ${selectedRegulations.join(
      ", "
    )}.
For each missing clause, provide the regulation and clause name.

Document content:
${text}

Return a JSON array of objects with this structure:
[{"regulation": "gdpr", "clause": "Right to be Forgotten"}, ...]`;

    try {
      const missing = await analyzeDocumentWithAI(prompt);
      return Array.isArray(missing)
        ? missing.filter(
            (item: any) =>
              item &&
              typeof item === "object" &&
              "regulation" in item &&
              "clause" in item
          )
        : [];
    } catch (error) {
      console.error("Error identifying missing clauses:", error);
      return [];
    }
  };

  const generateAssessmentQuestions = async (
    text: string,
    selectedRegulations: Regulation[]
  ): Promise<string[]> => {
    if (selectedRegulations.length === 0) return [];

    const prompt = `Generate 3-5 specific assessment questions to further evaluate compliance for these frameworks: ${selectedRegulations.join(
      ", "
    )}.
Base questions on this document content:
${text}

Return a JSON array of strings.`;

    try {
      const questions = await analyzeDocumentWithAI(prompt);
      return Array.isArray(questions)
        ? questions.filter((q: any) => typeof q === "string")
        : [];
    } catch (error) {
      console.error("Error generating assessment questions:", error);
      return [];
    }
  };

  const checkCompliance = async () => {
    if (!documentText.trim() && !fileContent) {
      toast({
        title: "Error",
        description:
          "Please enter document text or upload a file to check for compliance",
        variant: "destructive",
      });
      return;
    }

    setIsChecking(true);

    try {
      const textToAnalyze = documentText.trim() || fileContent;

      // 1. Get initial compliance analysis
      const compliancePrompt = `You are a senior compliance officer with expertise in ${regulations.join(", ") || 'global data protection and privacy regulations'}. 

Carefully analyze the following document for compliance with the ${regulations.length > 0 ? regulations.join(", ") : 'applicable regulations'}. Consider these key aspects:
- Data collection and processing practices
- User rights and consent mechanisms
- Data security measures
- Data retention and deletion policies
- Third-party data sharing
- Breach notification procedures

Document to analyze:
${textToAnalyze}

Provide a detailed compliance assessment with these requirements:
1. Calculate an overall compliance score (0-100) based on:
   - Presence of required policies and procedures (30%)
   - Clarity and completeness of information (25%)
   - Implementation of security measures (25%)
   - User rights and consent mechanisms (20%)

2. For each compliance issue found, include:
   - Severity (high/medium/low)
   - Specific description of the issue
   - Actionable recommendation for remediation
   - Relevant regulation or standard reference

3. Provide a comprehensive summary that:
   - Highlights critical compliance gaps
   - Notes areas of strength
   - Suggests priority actions for improvement

Return a JSON object with this exact structure (no markdown code blocks, just the raw JSON):
{
  "score": [calculate a score 0-100 based on actual compliance],
  "issues": [
    {
      "severity": "high|medium|low",
      "description": "Specific description of the issue",
      "recommendation": "Actionable recommendation for remediation"
    }
  ],
  "summary": "Comprehensive summary of compliance status and key findings"
}

Important scoring guidelines:
- 90-100: Fully compliant with all requirements
- 80-89: Minor issues that need attention
- 70-79: Several moderate issues requiring attention
- 60-69: Significant compliance gaps
- Below 60: Major compliance failures`;

      const parsedAnalysis = await analyzeDocumentWithAI(compliancePrompt);

      // Validate the parsed analysis
      if (typeof parsedAnalysis !== "object" || parsedAnalysis === null) {
        throw new Error("Invalid response format from AI: Expected an object");
      }

      // Validate score is a number between 0 and 100
      const score = typeof parsedAnalysis.score === 'number' 
        ? Math.min(100, Math.max(0, Math.round(parsedAnalysis.score))) 
        : 0;

      // Validate issues array
      const issues = Array.isArray(parsedAnalysis.issues)
        ? parsedAnalysis.issues
            .filter((issue: any) => 
              issue && 
              typeof issue === 'object' &&
              ['high', 'medium', 'low'].includes(issue.severity?.toLowerCase()) &&
              typeof issue.description === 'string' &&
              typeof issue.recommendation === 'string'
            )
            .map((issue: any) => ({
              severity: issue.severity.toLowerCase(),
              description: issue.description.trim(),
              recommendation: issue.recommendation.trim()
            }))
        : [];

      // Validate summary
      const summary = typeof parsedAnalysis.summary === 'string' && parsedAnalysis.summary.trim() !== ''
        ? parsedAnalysis.summary.trim()
        : 'No summary provided';

      // 2. Run all AI analysis in parallel only if we have a valid response
      let suggestedRegs: Regulation[] = [];
      let missingClausesResult: { regulation: string; clause: string }[] = [];
      let questionsResult: string[] = [];

      try {
        [suggestedRegs, missingClausesResult, questionsResult] = await Promise.all([
          regulations.length === 0 ? suggestRegulations(textToAnalyze) : Promise.resolve([] as Regulation[]),
          identifyMissingClauses(textToAnalyze, regulations),
          generateAssessmentQuestions(textToAnalyze, regulations),
        ]);
      } catch (error) {
        console.error('Error in parallel AI analysis:', error);
        // Continue with empty arrays if these fail
      }

      // 3. Create and set the report with AI suggestions
      const report: ComplianceReport = {
        score,
        issues,
        summary,
        timestamp: new Date().toISOString(),
        aiSuggestions: {
          suggestedRegulations: suggestedRegs,
          missingClauses: missingClausesResult,
          assessmentQuestions: questionsResult,
        },
      };

      // 4. Update state with the final results
      setReport(report);

      toast({
        title: "Analysis Complete",
        description: "Document has been analyzed for compliance",
      });
    } catch (error) {
      console.error("Error during compliance check:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to check compliance. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsChecking(false);
    }
  };

  const downloadReport = () => {
    if (!report) return;

    const reportText = `
CompliAI Compliance Report
Generated: ${new Date(report.timestamp).toLocaleString()}
Compliance Score: ${report.score}%

Summary:
${report.summary}

Issues Found:
${report.issues
  .map(
    (issue) => `
Severity: ${issue.severity.toUpperCase()}
Description: ${issue.description}
Recommendation: ${issue.recommendation}
`
  )
  .join("\n")}

Regulations Checked:
${regulations.map((r) => r.toUpperCase()).join(", ")}
    `;

    const blob = new Blob([reportText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `compliance-report-${
      new Date().toISOString().split("T")[0]
    }.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Report Downloaded",
      description: "Your compliance report has been downloaded successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm bg-[#09090B] border-white/10 text-white">
          <CardContent className="pt-6 h-full flex flex-col">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <FileSearch className="mr-2 h-5 w-5" />
              Document Analysis
            </h3>

            <div className="flex-1 flex flex-col min-h-[500px] bg-[#111010] rounded-lg border border-white/10 overflow-hidden">
              <div className="border-b border-white/10">
                <div className="flex w-full justify-center">
                  <button
                    onClick={() => setActiveTab("paste")}
                    className={`px-4 py-3 text-sm font-medium ${
                      activeTab === "paste"
                        ? "text-white border-b-2 border-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Paste Text
                  </button>
                  <button
                    onClick={() => setActiveTab("upload")}
                    className={`px-4 py-3 text-sm font-medium ${
                      activeTab === "upload"
                        ? "text-white border-b-2 border-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Upload File
                  </button>
                </div>
              </div>

              <div className="flex-1 flex flex-col">
                {activeTab === "upload" ? (
                  <div
                    className={`flex-1 flex flex-col ${
                      isDragging
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-transparent"
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <div className="p-6 flex flex-col items-center justify-center h-full">
                      {isUploading ? (
                        <div className="flex flex-col items-center justify-center h-full">
                          <Loader2 className="h-12 w-12 animate-spin text-blue-400 mb-4" />
                          <p className="text-gray-400">
                            Uploading your file...
                          </p>
                        </div>
                      ) : fileName ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                          <File className="h-12 w-12 text-blue-400 mb-4" />
                          <p className="text-gray-200 mb-2">{fileName}</p>
                          <div className="flex space-x-4 mt-4">
                            <button
                              onClick={removeFile}
                              className="px-4 py-2 text-sm text-red-400 hover:text-red-300"
                            >
                              Remove File
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center h-full w-full">
                          <div className="border-2 border-dashed w-full h-full flex flex-col items-center justify-center border-white/20 rounded-lg p-8 max-w-md mx-auto">
                            <Upload className="h-12 w-12 text-white/70 mx-auto mb-4" />
                            <p className="text-gray-300 mb-2">
                              Drag and drop your file here
                            </p>
                            <p className="text-sm text-gray-500 mb-4">or</p>
                            <label className="inline-flex items-center px-4 py-2 rounded-md bg-white text-black text-sm font-medium cursor-pointer hover:bg-blue-700 transition-colors">
                              <Upload className="h-4 w-4 mr-2" />
                              Select File
                              <input
                                type="file"
                                className="hidden"
                                onChange={handleFileChange}
                                accept=".txt,.pdf,.doc,.docx"
                                disabled={isUploading}
                              />
                            </label>
                            <p className="text-xs text-gray-500 mt-4">
                              Supported formats: .txt, .pdf, .doc, .docx (max
                              10MB)
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col">
                    <div className="relative flex-1 flex items-center justify-center">
                      <div className="w-full h-full relative">
                        <Textarea
                          placeholder=" "
                          className="h-full w-full focus:outline-none focus:ring-0 focus:border-none bg-transparent border-0 rounded-none focus-visible:ring-0 focus-visible:border-none border-none resize-none p-6 placeholder:text-center absolute inset-0"
                          value={documentText}
                          onChange={(e) => setDocumentText(e.target.value)}
                          disabled={isUploading}
                        />
                        {!documentText && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-gray-400">
                            {isUploading
                              ? "Processing your file..."
                              : "Paste your document text here..."}
                          </div>
                        )}
                        {isUploading && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8">
              <label className="block text-sm font-medium mb-2">
                Select regulations to check against:
              </label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {[
                  { id: "gdpr", label: "GDPR" },
                  { id: "ccpa", label: "CCPA" },
                  { id: "hipaa", label: "HIPAA" },
                  { id: "iso27001", label: "ISO 27001" },
                ].map((regulation) => (
                  <div
                    key={regulation.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={regulation.id}
                      className="border-white/30"
                      checked={regulations.includes(
                        regulation.id as Regulation
                      )}
                      onCheckedChange={() =>
                        handleRegulationToggle(regulation.id as Regulation)
                      }
                    />
                    <label
                      htmlFor={regulation.id}
                      className="text-sm font-medium text-white"
                    >
                      {regulation.label}
                    </label>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <Button
                  onClick={checkCompliance}
                  className="w-full mt-6 bg-white text-black hover:bg-white/90"
                  disabled={isChecking || !documentText.trim()}
                >
                  {isChecking ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing Document...
                    </>
                  ) : (
                    "Start Analysis"
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {report ? (
          <Card className="bg-[#09090B] border-white/10 text-white h-full shadow-sm">
            <CardContent className="pt-6 h-full">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Analysis Results
              </h3>
              <ComplianceResult report={report} onDownload={downloadReport} />
            </CardContent>
          </Card>
        ) : (
          <Card className="border-white/10 bg-[#09090B] text-white shadow-sm">
            <CardContent className="pt-6 h-full">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Analysis Results
              </h3>
              {isChecking ? (
                <div className="flex items-center justify-center h-[300px]">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100"></div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Analyzing document...
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[90%] text-center">
                  <FileSearch className="h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 mb-2">
                    No analysis results yet
                  </p>
                  <p className="text-sm text-gray-400 dark:text-gray-500">
                    Enter your document text and select regulations to start the
                    analysis
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ComplianceChecker;
