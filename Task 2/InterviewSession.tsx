"use client";

import { FaMicrophone, FaStop, FaCheck, FaArrowRight, FaKeyboard } from 'react-icons/fa';
import { InterviewConfig, QuestionAnswer } from '@/types';
import { useState, useEffect, useRef } from 'react';

interface InterviewSessionProps {
  config: InterviewConfig;
  onComplete: (answers: QuestionAnswer[]) => void;
  onBack: () => void;
}

export default function InterviewSession({ config, onComplete, onBack }: InterviewSessionProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuestionAnswer[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inputMode, setInputMode] = useState<'voice' | 'text'>('text');
  const recognitionRef = useRef<any>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;

        recognitionRef.current.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0])
            .map((result) => result.transcript)
            .join('');
          setTranscript(transcript);
        };

        recognitionRef.current.onend = () => {
          if (isRecording) {
            recognitionRef.current.start();
          }
        };
      } else if (inputMode === 'voice') {
        alert('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
        setInputMode('text');
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isRecording, inputMode]);

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      setTranscript('');
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTranscript(e.target.value);
  };

  const handleNext = async () => {
    if (!transcript.trim()) return;

    setIsSubmitting(true);
    
    const evaluation = {
      score: Math.floor(Math.random() * 5) + 6,
      feedback: 'This is a simulated response. In a real implementation, this would analyze your answer and provide specific feedback based on the content and relevance to the question.',
      sampleAnswer: 'A strong answer would demonstrate specific examples of your experience, the technologies you\'ve used, and the impact of your work.'
    };

    const newAnswers = [
      ...answers,
      {
        question: config.questions[currentQuestionIndex],
        userAnswer: transcript,
        evaluation
      }
    ];

    setAnswers(newAnswers);
    setTranscript('');
    setIsSubmitting(false);

    if (currentQuestionIndex < config.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden p-8 transition-all duration-300 hover:shadow-2xl">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Question {currentQuestionIndex + 1} of {config.questions.length}
            </span>
            <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
              {config.role} • {config.experienceLevel}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
            <div 
              className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
              style={{ width: `${(currentQuestionIndex / config.questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            {config.questions[currentQuestionIndex]}
          </h3>
          
          <div className="mt-4">
            <label htmlFor="answer" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Answer
            </label>
            
            {/* Toggle between voice and text input */}
            <div className="flex space-x-2 mb-2">
              <button
                type="button"
                onClick={() => setInputMode('text')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  inputMode === 'text' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
                }`}
              >
                <FaKeyboard className="inline mr-1" /> Type
              </button>
              <button
                type="button"
                onClick={() => setInputMode('voice')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  inputMode === 'voice' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
                }`}
              >
                <FaMicrophone className="inline mr-1" /> Voice
              </button>
            </div>

            {inputMode === 'voice' ? (
              <div className="relative">
                <div className="min-h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                  {transcript || 'Click the microphone to start recording your answer...'}
                </div>
                <div className="absolute right-2 bottom-2 flex space-x-2">
                  <button
                    type="button"
                    onClick={toggleRecording}
                    className={`p-2 rounded-full ${
                      isRecording 
                        ? 'bg-red-500 text-white' 
                        : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200'
                    } hover:opacity-90 transition-colors`}
                    title={isRecording ? 'Stop Recording' : 'Start Recording'}
                  >
                    {isRecording ? <FaStop /> : <FaMicrophone />}
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!transcript.trim() || isSubmitting}
                    className={`p-2 rounded-full ${
                      !transcript.trim() 
                        ? 'bg-gray-200 dark:bg-gray-600 text-gray-400' 
                        : 'bg-green-500 text-white'
                    } hover:opacity-90 transition-colors disabled:opacity-50`}
                    title="Submit Answer"
                  >
                    {currentQuestionIndex === config.questions.length - 1 ? <FaCheck /> : <FaArrowRight />}
                  </button>
                </div>
                {isRecording && (
                  <p className="mt-2 text-sm text-red-500 flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse"></span>
                    Recording...
                  </p>
                )}
              </div>
            ) : (
              <div className="relative">
                <textarea
                  ref={textAreaRef}
                  value={transcript}
                  onChange={handleTextChange}
                  className="w-full min-h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                  placeholder="Type your answer here..."
                />
                <div className="absolute right-2 bottom-2">
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!transcript.trim() || isSubmitting}
                    className={`p-2 rounded-full ${
                      !transcript.trim() 
                        ? 'bg-gray-200 dark:bg-gray-600 text-gray-400' 
                        : 'bg-green-500 text-white'
                    } hover:opacity-90 transition-colors disabled:opacity-50`}
                    title="Submit Answer"
                  >
                    {currentQuestionIndex === config.questions.length - 1 ? <FaCheck /> : <FaArrowRight />}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            Back to Setup
          </button>
          <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
            <span className="hidden sm:inline">Tip: {inputMode === 'voice' ? 'Speak clearly' : 'Take your time to formulate your answers'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}