import { QuestionAnswer } from '@/types';
import { FaStar, FaRegStar, FaArrowLeft } from 'react-icons/fa';

interface InterviewResultsProps {
  answers: QuestionAnswer[];
  onRestart: () => void;
  role: string;
  experienceLevel: string;
}

export default function InterviewResults({ answers, onRestart, role, experienceLevel }: InterviewResultsProps) {
  const totalScore = answers.reduce((sum, answer) => sum + answer.evaluation.score, 0);
  const averageScore = Math.round((totalScore / answers.length) * 10) / 10;
  const maxPossibleScore = 10;

  const renderStars = (score: number) => {
    const stars = [];
    for (let i = 1; i <= maxPossibleScore; i++) {
      stars.push(
        i <= score ? (
          <FaStar key={i} className="text-yellow-400 inline-block" />
        ) : (
          <FaRegStar key={i} className="text-gray-300 inline-block" />
        )
      );
    }
    return stars;
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-indigo-600 mb-2">Interview Complete!</h2>
        <p className="text-gray-600 mb-6">
          Here's how you did in your {role} ({experienceLevel}) mock interview
        </p>
        
        <div className="inline-flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full px-6 py-3 mb-6">
          <span className="text-4xl font-bold mr-2">{averageScore}</span>
          <span className="text-lg">/ {maxPossibleScore}</span>
        </div>
        
        <div className="mb-6">
          {renderStars(averageScore)}
        </div>
        
        <p className="text-gray-700 mb-8">
          {averageScore >= 8
            ? 'Excellent work! Your responses demonstrated strong knowledge and experience.'
            : averageScore >= 6
            ? 'Good job! You have a solid foundation but there are areas to improve.'
            : 'Keep practicing! Review the feedback below to improve your interview skills.'}
        </p>
      </div>

      <div className="space-y-8">
        {answers.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Question {index + 1}: {item.question}
              </h3>
              <div className="flex items-center bg-indigo-100 text-indigo-800 text-sm font-medium px-2.5 py-0.5 rounded">
                {item.evaluation.score}/{maxPossibleScore}
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-1">Your Answer:</h4>
              <p className="text-gray-600 bg-gray-50 p-3 rounded">{item.userAnswer}</p>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-1">Feedback:</h4>
              <p className="text-gray-700">{item.evaluation.feedback}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Sample Answer:</h4>
              <p className="text-gray-600 bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                {item.evaluation.sampleAnswer}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <button
          onClick={onRestart}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          <FaArrowLeft className="mr-2" /> Start a New Interview
        </button>
      </div>
    </div>
  );
}
