import { format } from 'date-fns';
import { TrashIcon, PencilIcon, UserCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

const priorityColors = {
  P1: 'bg-red-100 text-red-800 ring-red-600/20',
  P2: 'bg-orange-100 text-orange-800 ring-orange-600/20',
  P3: 'bg-blue-100 text-blue-800 ring-blue-600/20',
  P4: 'bg-green-100 text-green-800 ring-green-600/20'
};

const priorityLabels = {
  P1: 'Urgent',
  P2: 'High',
  P3: 'Medium',
  P4: 'Low'
};

export default function TaskCard({ task, onDelete, onEdit }) {
  const dueDate = new Date(task.dueDateTime);
  const isOverdue = dueDate < new Date();

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow transition-shadow duration-200">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="text-base font-semibold text-gray-900 line-clamp-2">
            {task.title}
          </h3>
          <div className="ml-4 flex-shrink-0">
            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${priorityColors[task.priority]}`}>
              {priorityLabels[task.priority]}
            </span>
          </div>
        </div>
        
        <div className="mt-3 flex items-center text-sm text-gray-500">
          <UserCircleIcon className="mr-1.5 h-4 w-4 flex-shrink-0" />
          <span className="truncate">{task.assignee}</span>
        </div>

        <div className={`mt-2 flex items-center text-sm ${isOverdue ? 'text-red-600' : 'text-gray-500'}`}>
          <ClockIcon className="mr-1.5 h-4 w-4 flex-shrink-0" />
          <time dateTime={task.dueDateTime}>
            {format(dueDate, 'PPp')}
          </time>
        </div>

        <div className="mt-4 flex items-center justify-end space-x-2">
          <button
            onClick={() => onEdit(task)}
            className="inline-flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PencilIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="inline-flex items-center rounded-full p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
} 