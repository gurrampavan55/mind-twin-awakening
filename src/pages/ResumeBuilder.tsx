
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalInfoForm from '@/components/resume/PersonalInfoForm';
import ExperienceForm from '@/components/resume/ExperienceForm';
import EducationForm from '@/components/resume/EducationForm';
import SkillsForm from '@/components/resume/SkillsForm';
import ResumePreview from '@/components/resume/ResumePreview';
import { Download, Eye, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
  };
  experience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    field: string;
    graduationDate: string;
    gpa?: string;
  }>;
  skills: Array<{
    id: string;
    category: string;
    items: string[];
  }>;
}

const ResumeBuilder = () => {
  const { toast } = useToast();
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: []
  });

  const [showPreview, setShowPreview] = useState(false);

  const updatePersonalInfo = (info: ResumeData['personalInfo']) => {
    setResumeData(prev => ({ ...prev, personalInfo: info }));
  };

  const updateExperience = (experience: ResumeData['experience']) => {
    setResumeData(prev => ({ ...prev, experience }));
  };

  const updateEducation = (education: ResumeData['education']) => {
    setResumeData(prev => ({ ...prev, education }));
  };

  const updateSkills = (skills: ResumeData['skills']) => {
    setResumeData(prev => ({ ...prev, skills }));
  };

  const handleSave = () => {
    // TODO: Save to Supabase
    toast({
      title: "Resume Saved",
      description: "Your resume has been saved successfully!",
    });
  };

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your resume PDF is being generated...",
    });
  };

  if (showPreview) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto p-4">
          <div className="mb-4 flex justify-between items-center">
            <Button
              variant="outline"
              onClick={() => setShowPreview(false)}
            >
              ← Back to Editor
            </Button>
            <div className="space-x-2">
              <Button onClick={handleSave} variant="outline">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
          <ResumePreview data={resumeData} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">ResumeCraft</h1>
          <p className="text-xl text-gray-600">Build your professional resume with ease</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Build Your Resume</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="personal" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                    <TabsTrigger value="experience">Experience</TabsTrigger>
                    <TabsTrigger value="education">Education</TabsTrigger>
                    <TabsTrigger value="skills">Skills</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="personal" className="mt-6">
                    <PersonalInfoForm
                      data={resumeData.personalInfo}
                      onChange={updatePersonalInfo}
                    />
                  </TabsContent>
                  
                  <TabsContent value="experience" className="mt-6">
                    <ExperienceForm
                      data={resumeData.experience}
                      onChange={updateExperience}
                    />
                  </TabsContent>
                  
                  <TabsContent value="education" className="mt-6">
                    <EducationForm
                      data={resumeData.education}
                      onChange={updateEducation}
                    />
                  </TabsContent>
                  
                  <TabsContent value="skills" className="mt-6">
                    <SkillsForm
                      data={resumeData.skills}
                      onChange={updateSkills}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={() => setShowPreview(true)}
                  className="w-full"
                  variant="outline"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview Resume
                </Button>
                <Button onClick={handleSave} className="w-full" variant="outline">
                  <Save className="w-4 h-4 mr-2" />
                  Save Resume
                </Button>
                <Button onClick={handleDownload} className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white p-4 rounded border text-sm space-y-2">
                  <div className="font-semibold text-lg">
                    {resumeData.personalInfo.fullName || 'Your Name'}
                  </div>
                  <div className="text-gray-600">
                    {resumeData.personalInfo.email || 'your.email@example.com'}
                  </div>
                  <div className="text-gray-600">
                    {resumeData.personalInfo.phone || '+1 (555) 123-4567'}
                  </div>
                  <div className="text-gray-600">
                    {resumeData.personalInfo.location || 'City, State'}
                  </div>
                  {resumeData.personalInfo.summary && (
                    <div className="mt-3 text-xs text-gray-700">
                      {resumeData.personalInfo.summary.substring(0, 100)}
                      {resumeData.personalInfo.summary.length > 100 && '...'}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
