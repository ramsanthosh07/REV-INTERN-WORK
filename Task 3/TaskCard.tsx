import { Task } from '@/types/task';

type TaskCardProps = {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TaskCard({ task, onToggleComplete, onDelete }: TaskCardProps) {
  const dueDate = new Date(task.dueDate);
  const formattedDate = dueDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 mb-4 border-l-4 ${
      task.completed ? 'border-green-500' : 'border-blue-500'
    }`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className={`text-lg font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
            {task.title}
          </h3>
          <p className="text-sm text-gray-600">Subject: {task.subject}</p>
          <p className="text-sm text-gray-500">Due: {formattedDate}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onToggleComplete(task.id)}
            className={`px-3 py-1 rounded text-sm ${
              task.completed
                ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                : 'bg-green-100 text-green-800 hover:bg-green-200'
            }`}
          >
            {task.completed ? 'Undo' : 'Complete'}
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="px-3 py-1 bg-red-100 text-red-800 rounded text-sm hover:bg-red-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
