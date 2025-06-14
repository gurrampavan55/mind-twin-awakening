
import React, { useState } from 'react';
import AuthForm from '@/components/AuthForm';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Sparkles, MessageCircle, Heart, Zap, FileText, Download, Edit } from 'lucide-react';

const Index = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setShowAuth(false);
  };

  const goToBuilder = () => {
    navigate('/builder');
  };

  if (showAuth) {
    return <AuthForm onAuthSuccess={handleAuthSuccess} />;
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center text-white max-w-2xl">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center animate-pulse">
              <FileText className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">✨ Welcome to ResumeCraft!</h1>
            <p className="text-xl text-purple-200">
              Create professional resumes that get you noticed. Your career journey starts here.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 rounded-lg bg-white/10 backdrop-blur-sm">
              <Edit className="w-8 h-8 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Easy Builder</h3>
              <p className="text-sm text-gray-300">Intuitive drag-and-drop interface for creating resumes</p>
            </div>
            <div className="p-6 rounded-lg bg-white/10 backdrop-blur-sm">
              <FileText className="w-8 h-8 text-pink-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Professional Templates</h3>
              <p className="text-sm text-gray-300">Choose from beautiful, ATS-friendly templates</p>
            </div>
            <div className="p-6 rounded-lg bg-white/10 backdrop-blur-sm">
              <Download className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Export Options</h3>
              <p className="text-sm text-gray-300">Download as PDF or share online instantly</p>
            </div>
          </div>
          <Button 
            onClick={goToBuilder}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-3"
          >
            Start Building Your Resume
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Floating orbs background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="text-center text-white max-w-4xl relative z-10">
        <div className="mb-12">
          <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 flex items-center justify-center animate-pulse shadow-2xl">
            <FileText className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            ResumeCraft
          </h1>
          <p className="text-2xl text-purple-200 mb-4 font-light">
            Build professional resumes that <em>stand out</em>, <em>get noticed</em>, and <em>land jobs</em>.
          </p>
          <p className="text-lg text-gray-300 mb-8">
            Ready to craft your perfect resume? 🚀
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
            <Edit className="w-12 h-12 text-blue-400 mx-auto mb-6" />
            <h3 className="text-xl font-bold mb-4">Smart Builder</h3>
            <p className="text-gray-300">
              Intelligent form fields and real-time preview help you create the perfect resume in minutes.
            </p>
          </div>
          
          <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
            <FileText className="w-12 h-12 text-pink-400 mx-auto mb-6" />
            <h3 className="text-xl font-bold mb-4">ATS-Friendly</h3>
            <p className="text-gray-300">
              Our templates are optimized for Applicant Tracking Systems to ensure your resume gets seen.
            </p>
          </div>
          
          <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
            <Download className="w-12 h-12 text-yellow-400 mx-auto mb-6" />
            <h3 className="text-xl font-bold mb-4">Export & Share</h3>
            <p className="text-gray-300">
              Download as PDF, share online, or print directly. Your resume, your way.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Button 
            onClick={() => setShowAuth(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-xl px-12 py-4 rounded-full transform transition-all duration-200 hover:scale-105 shadow-2xl"
          >
            ✨ Start Building Your Resume
          </Button>
          <p className="text-sm text-gray-400">
            Join thousands who've already crafted their perfect resumes
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
