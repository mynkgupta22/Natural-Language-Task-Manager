import { useState } from 'react';
import PropTypes from 'prop-types';

function TaskForm({ onSubmit }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    onSubmit(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="task-input" className="block text-sm font-medium text-foreground">
          Enter your task
        </label>
        <div className="relative">
          <input
            id="task-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., Finish landing page Aman by 11pm 20th June"
            className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Use natural language to describe your task with deadline
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <button
          type="submit"
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
        >
          Create Task
        </button>
        <button
          type="button"
          onClick={() => setInput('')}
          className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition-colors"
        >
          Clear
        </button>
      </div>
    </form>
  );
}

TaskForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default TaskForm; 