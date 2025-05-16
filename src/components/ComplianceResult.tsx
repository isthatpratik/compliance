import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Check, Download, FileText, ArrowLeft, Eye, Copy } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ComplianceResultProps {
  report: {
    score: number;
    issues: Array<{
      severity: "high" | "medium" | "low";
      description: string;
      recommendation: string;
    }>;
    summary: string;
    timestamp: string;
  };
  onDownload: () => void;
}

const ComplianceResult = ({ report, onDownload }: ComplianceResultProps) => {
  const [view, setView] = useState<"analysis" | "suggestions">("analysis");
  const { toast } = useToast();
  const isPassing = report.score >= 70;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return {
          variant: "destructive",
          className: "bg-red-900/30 text-red-300 border-red-800"
        };
      case "medium":
        return {
          variant: "secondary",
          className: "bg-yellow-900/30 text-yellow-300 border-yellow-800"
        };
      default:
        return {
          variant: "outline",
          className: "bg-green-900/30 text-green-300 border-green-800"
        };
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) {
      return "text-green-400";
    } else if (score >= 50) {
      return "text-yellow-400";
    } else {
      return "text-red-400";
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      description: "Suggestion copied to clipboard",
    });
  };

  return (
    <div className="space-y-6 bg-[#111010] h-[94%] rounded-lg">
      <div className="min-h-[600px] rounded-lg h-[94%] flex flex-col gap-4 bg-[#111010]">
        {view === "analysis" ? (
          <>
            <Alert variant={isPassing ? "default" : "destructive"} className="bg-[#111010] border-white/10">
              <div className="flex items-center gap-3">
                {isPassing ? (
                  <Check className="h-6 w-6 text-green-400" />
                ) : (
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                )}
                <div>
                  <AlertTitle className="text-lg font-semibold text-white">
                    {isPassing ? "Compliance Check Passed" : "Compliance Issues Detected"}
                  </AlertTitle>
                  <AlertDescription className="text-base text-gray-300">
                    Overall compliance score:{" "}
                    <span className={`font-bold text-lg ${getScoreColor(report.score)}`}>
                      {report.score}%
                    </span>
                  </AlertDescription>
                </div>
              </div>
            </Alert>

            <Card className="border-white/10 bg-[#111010] shadow-sm h-[calc(670px-4rem)]">
              <CardContent className="px-0 pb-0 h-full flex flex-col">
                <div className="rounded-md flex-1 flex flex-col overflow-hidden">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader className="sticky top-0 bg-[#1a1a1a]">
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="w-[120px] font-semibold text-gray-300">Severity</TableHead>
                          <TableHead className="font-semibold text-gray-300">Issue</TableHead>
                          <TableHead className="font-semibold w-[40%] text-gray-300">Required Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="overflow-y-auto">
                        {report.issues.map((issue, index) => {
                          const severityStyle = getSeverityColor(issue.severity);
                          return (
                            <TableRow key={index} className="hover:bg-[#1e1e1e] border-white/10">
                              <TableCell className="w-[120px]">
                                <Badge 
                                  variant={severityStyle.variant as any} 
                                  className={`text-xs font-semibold ${severityStyle.className} border-0`}
                                >
                                  {issue.severity.toUpperCase()}
                                </Badge>
                              </TableCell>
                              <TableCell className="font-medium text-gray-100">
                                {issue.description}
                              </TableCell>
                              <TableCell className="w-[40%] text-gray-400">
                                {issue.recommendation}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                        {report.issues.length === 0 && (
                          <TableRow className="hover:bg-[#1e1e1e]">
                            <TableCell colSpan={3} className="text-center py-6 text-gray-500">
                              No compliance issues detected
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div className="mt-6 border-t border-white/10 py-4 px-4 space-y-4">
                  <p className="text-sm text-gray-400">
                    Analysis timestamp: {new Date(report.timestamp).toLocaleString()}
                  </p>
                  <div className="flex space-x-4">
                    <Button
                      onClick={() => setView("suggestions")}
                      variant="default"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Show Suggestions
                    </Button>
                    <Button 
                      onClick={onDownload} 
                      variant="outline" 
                      className="flex-1 bg:bg-white hover:bg-white/80 text-black"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Full Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          // Suggestions Section
          <Card className="p-0 shadow-none border-0 h-[670px] bg-[#111010] text-white border-white/10 relative">
            <CardContent className="pt-6 px-0 pb-0 h-full flex flex-col">
              <div className="flex items-center mb-6 px-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setView("analysis")}
                  className="text-white hover:bg-white/10 mr-2"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Analysis
                </Button>
                <h4 className="text-lg font-semibold text-white">Compliance Suggestions</h4>
              </div>
              <div className="relative">
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none"></div>
                <div className="space-y-4 overflow-y-auto flex-1 px-4 pb-6 max-h-[600px]">
                {report.issues.map((issue, index) => {
                  const severityStyle = getSeverityColor(issue.severity);
                  return (
                    <div
                      key={index}
                      className="border border-white/10 rounded-lg p-4 space-y-3 bg-[#1a1a1a]"
                    >
                      <div className="flex items-center justify-between">
                        <Badge 
                          variant={severityStyle.variant as any}
                          className={`${severityStyle.className}`}
                        >
                          {issue.severity.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <p className="font-medium">Non-Compliant Area:</p>
                        <p className="text-sm text-gray-400">
                          {issue.description}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">Suggested Change:</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopy(issue.recommendation)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-sm rounded-md">
                          {issue.recommendation}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ComplianceResult;
