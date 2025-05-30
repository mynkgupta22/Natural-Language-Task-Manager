import { useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

export default function TaskInput({ onTaskCreate }) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    try {
      setIsLoading(true);
      await onTaskCreate(input);
      setInput('');
    } catch (error) {
      alert('Failed to create task. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <form onSubmit={handleSubmit}>
        <label htmlFor="task" className="block text-sm font-medium text-gray-700 mb-2">
          Create a new task using natural language
        </label>
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              id="task"
              name="task"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Try "Call Rajeev tomorrow 5pm" or "Finish landing page Aman by 11pm 20th June"'
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm pl-4 pr-4 py-3"
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`inline-flex items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              <PaperAirplaneIcon className="h-4 w-4" />
            )}
            <span className="ml-2">{isLoading ? 'Creating...' : 'Create Task'}</span>
          </button>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Add priority by appending P1-P4 to your task (e.g., "Call John tomorrow 3pm P1")
        </p>
      </form>
    </div>
  );
} 