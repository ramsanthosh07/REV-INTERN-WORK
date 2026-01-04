"use client";

import { useState, useEffect } from 'react';
import InterviewConfigForm from '@/components/InterviewConfigForm';
import InterviewSession from '@/components/InterviewSession';
import InterviewResults from '@/components/InterviewResults';
import { InterviewConfig, QuestionAnswer } from '@/types';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [interviewState, setInterviewState] = useState<{
    stage: 'config' | 'interview' | 'results';
    config: InterviewConfig | null;
    answers: QuestionAnswer[];
  }>({
    stage: 'config',
    config: null,
    answers: [],
  });

  // Load dark mode preference from localStorage or system preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isDark = localStorage.getItem('darkMode') === 'true' || 
                    (!('darkMode' in localStorage) && 
                     window.matchMedia('(prefers-color-scheme: dark)').matches);
      setDarkMode(isDark);
      document.documentElement.classList.toggle('dark', isDark);
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
    document.documentElement.classList.toggle('dark', newMode);
  };

  const handleConfigSubmit = (config: Omit<InterviewConfig, 'questions'>) => {
    const sampleQuestions = [
      `Can you tell me about your experience with ${config.role} roles?`,
      `What specific ${config.role} skills have you developed in your ${config.experienceLevel} experience?`,
      `How do you approach problem-solving in your work as a ${config.role}?`,
      `Can you describe a challenging project you've worked on and how you handled it?`,
      `Where do you see yourself in your ${config.role} career in 5 years?`,
    ];

    setInterviewState({
      stage: 'interview',
      config: {
        ...config,
        questions: sampleQuestions,
      },
      answers: [],
    });
  };

  const handleInterviewComplete = (answers: QuestionAnswer[]) => {
    setInterviewState(prev => ({
      ...prev,
      stage: 'results',
      answers,
    }));
  };

  const handleRestart = () => {
    setInterviewState({
      stage: 'config',
      config: null,
      answers: [],
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      {/* Dark Mode Toggle Button */}
      <button 
        onClick={toggleDarkMode} 
        className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white z-50"
        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            <span className="block">AI Interview</span>
            <span className="block text-indigo-600 dark:text-indigo-400">Trainer</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Practice your interview skills with AI-powered mock interviews
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {interviewState.stage === 'config' && (
            <InterviewConfigForm onSubmit={handleConfigSubmit} />
          )}

          {interviewState.stage === 'interview' && interviewState.config && (
            <InterviewSession
              config={interviewState.config}
              onComplete={handleInterviewComplete}
              onBack={() => setInterviewState(prev => ({ ...prev, stage: 'config' }))}
            />
          )}

          {interviewState.stage === 'results' && interviewState.config && (
            <InterviewResults
              answers={interviewState.answers}
              onRestart={handleRestart}
              role={interviewState.config.role}
              experienceLevel={interviewState.config.experienceLevel}
            />
          )}
        </div>
      </div>
    </div>
  );
}