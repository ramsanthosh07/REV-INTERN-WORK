import { useState } from 'react';
import { Task } from '@/types/task';

type TaskFormProps = {
  onAddTask: (task: Omit<Task, 'id' | 'completed' | 'createdAt'>) => void;
  subjects: string[];
};

export default function TaskForm({ onAddTask, subjects }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [showNewSubjectInput, setShowNewSubjectInput] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !subject || !dueDate) return;

    onAddTask({
      title: title.trim(),
      subject,
      dueDate,
    });

    // Reset form
    setTitle('');
    setDueDate('');
  };

  const handleAddSubject = (e: React.MouseEvent) => {
    e.preventDefault();
    if (newSubject.trim() && !subjects.includes(newSubject.trim())) {
      const updatedSubjects = [...subjects, newSubject.trim()];
      localStorage.setItem('subjects', JSON.stringify(updatedSubjects));
      setSubject(newSubject.trim());
      setNewSubject('');
      setShowNewSubjectInput(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Task</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Task Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black placeholder:text-black"
            placeholder="Enter task title"
            required
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
            Subject
          </label>
          <div className="flex space-x-2 mt-1">
            <select
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black placeholder:text-black"
              required
            >
              <option value="">Select a subject</option>
              {subjects.map((subj) => (
                <option key={subj} value={subj}>
                  {subj}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setShowNewSubjectInput(!showNewSubjectInput)}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200"
            >
              {showNewSubjectInput ? 'Cancel' : 'New'}
            </button>
          </div>
          {showNewSubjectInput && (
            <div className="flex mt-2 space-x-2">
              <input
                type="text"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black placeholder:text-black"
                placeholder="Enter new subject"
              />
              <button
                type="button"
                onClick={handleAddSubject}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm hover:bg-blue-200"
              >
                Add
              </button>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black placeholder:text-black"
            required
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Add Task
          </button>
        </div>
      </div>
    </form>
  );
}
