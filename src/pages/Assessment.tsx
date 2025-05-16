import { Button } from "@/components/ui/button";
import { Key } from "lucide-react";
import { Link } from "react-router-dom";
import AssessmentForm from "@/components/AssessmentForm";
import ComplianceChecker from "@/components/ComplianceChecker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Footer from "@/components/Footer";

const Assessment = () => {
  return (
    <div className="bg-[#09090B] pt-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full relative min-h-[calc(100vh-198px)]">
        <div className="absolute inset-0 bg-grid-gray-900/[0.04] dark:bg-grid-gray-100/[0.02] bg-[size:32px] -z-10" />
        <div className="absolute inset-0 flex items-center justify-center -z-10 bg-gradient-to-tr from-gray-50/50 via-gray-100/25 to-gray-50/50 dark:from-gray-950/50 dark:via-gray-900/25 dark:to-gray-950/50 blur-[100px]" />
        {/* <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Compliance Assessment
          </h1>
        </div>
        
        <div className="bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-lg p-6 mb-8">
          <p className="text-base text-gray-600 dark:text-gray-300 mb-6">
            Our AI-powered assessment will help identify potential compliance gaps in your organization's policies and procedures. The assessment typically takes 10-15 minutes to complete.
          </p>
          
          <div className="space-y-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-md border border-gray-100 dark:border-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                What to expect:
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                <li>Questions about your current compliance practices</li>
                <li>Review of your data handling procedures</li>
                <li>Analysis of your security measures</li>
                <li>Evaluation of vendor management processes</li>
              </ul>
            </div>
          </div>
        </div> */}
        
        <Tabs defaultValue="assessment" className="w-full pb-10">
          <TabsList className="grid w-full grid-cols-2 mb-8 h-fit bg-[#111010] border border-white/10">
            <TabsTrigger 
              value="assessment" 
              className="data-[state=active]:bg-[#302F2F] text-white data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-white/10">
              Assessment Questionnaire
            </TabsTrigger>
            <TabsTrigger 
              value="compliance-check" 
              className="data-[state=active]:bg-[#302F2F] text-white data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-white/10">
              Document Compliance Check
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="assessment" className="bg-transparent">
            <AssessmentForm />
          </TabsContent>
          
          <TabsContent value="compliance-check" className="bg-transparent">
            <ComplianceChecker />
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default Assessment;
