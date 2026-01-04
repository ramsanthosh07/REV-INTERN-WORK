'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Task } from '@/types/task';
import StatsCard from '@/components/StatsCard';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    }
  }, []);

  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl p-8 md:p-12 shadow-lg">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to StudyPlanner</h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Organize your study schedule, track your progress, and achieve your academic goals with ease.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/tasks" 
              className="bg-white text-blue-700 hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Get Started
            </Link>
            <Link 
              href="/stats" 
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              View Stats
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Your Study Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard 
            title="Total Tasks" 
            value={tasks.length} 
            color="blue"
          />
          <StatsCard 
            title="Completed" 
            value={`${completedTasks} of ${tasks.length}`}
            percentage={tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0}
            color="green"
          />
          <StatsCard 
            title="Pending" 
            value={`${pendingTasks} of ${tasks.length}`}
            percentage={tasks.length > 0 ? Math.round((pendingTasks / tasks.length) * 100) : 0}
            color="indigo"
          />
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link 
            href="/tasks"
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100"
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Manage Tasks</h3>
            <p className="text-gray-600">Add, edit, and organize your study tasks and assignments.</p>
          </Link>
          <Link 
            href="/stats"
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100"
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-800">View Statistics</h3>
            <p className="text-gray-600">Track your progress and analyze your study patterns.</p>
          </Link>
        </div>
      </section>

      {/* Motivational Quote */}
      <div className="text-center py-8">
        <blockquote className="text-gray-600 italic">
          "The expert in anything was once a beginner." - Helen Hayes
        </blockquote>
      </div>
    </div>
  );
}
