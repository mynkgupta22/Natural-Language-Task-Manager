import { useState } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { PencilIcon, TrashIcon, CheckIcon, XMarkIcon, CalendarIcon, UserIcon } from '@heroicons/react/24/outline';

function TaskList({ tasks, onUpdateTask, onDeleteTask }) {
  const [editingTask, setEditingTask] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleEdit = (task) => {
    setEditingTask(task.id);
    setEditForm({
      taskName: task.taskName,
      assignee: task.assignee,
      dueDateTime: task.dueDateTime,
      priority: task.priority,
    });
  };

  const handleSave = async () => {
    await onUpdateTask(editingTask, editForm);
    setEditingTask(null);
  };

  const handleCancel = () => {
    setEditingTask(null);
    setEditForm({});
  };

  const getPriorityStyles = (priority) => {
    switch (priority) {
      case 'P1':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'P2':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'P3':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'P4':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-muted text-muted-foreground border-muted';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Tasks</h2>
        <span className="text-sm text-muted-foreground">
          {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} total
        </span>
      </div>
      
      {tasks.length === 0 ? (
        <div className="text-center py-12 bg-card/50 rounded-lg border border-border">
          <div className="space-y-3">
            <svg className="w-12 h-12 text-muted-foreground mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-muted-foreground">No tasks yet. Create one above!</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-card rounded-lg border border-border p-4 hover:border-primary/50 transition-colors"
            >
              {editingTask === task.id ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editForm.taskName}
                    onChange={(e) => setEditForm({ ...editForm, taskName: e.target.value })}
                    className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="Task name"
                  />
                  <div className="flex space-x-4">
                    <input
                      type="text"
                      value={editForm.assignee}
                      onChange={(e) => setEditForm({ ...editForm, assignee: e.target.value })}
                      className="flex-1 px-3 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                      placeholder="Assignee"
                    />
                    <select
                      value={editForm.priority}
                      onChange={(e) => setEditForm({ ...editForm, priority: e.target.value })}
                      className="px-3 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    >
                      <option value="P1">P1</option>
                      <option value="P2">P2</option>
                      <option value="P3">P3</option>
                      <option value="P4">P4</option>
                    </select>
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition-colors"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
                    >
                      <CheckIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="text-lg font-medium text-foreground">{task.taskName}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <UserIcon className="h-4 w-4" />
                          <span>{task.assignee}</span>
                        </div>
                        {task.dueDateTime && (
                          <div className="flex items-center space-x-1">
                            <CalendarIcon className="h-4 w-4" />
                            <span>{format(new Date(task.dueDateTime), 'PPp')}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityStyles(task.priority)}`}>
                        {task.priority}
                      </span>
                      <button
  onClick={() => handleEdit(task)}
  className="p-2 rounded-md text-white hover:bg-primary/10 hover:text-primary border border-transparent hover:border-primary/20 transition-all duration-200"
  title="Edit task"
>
  <PencilIcon className="h-4 w-4" />
</button>

<button
  onClick={() => onDeleteTask(task.id)}
  className="p-2 rounded-md text-white hover:bg-destructive/10 hover:text-destructive border border-transparent hover:border-destructive/20 transition-all duration-200"
  title="Delete task"
>
  <TrashIcon className="h-4 w-4" />
</button>

                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      taskName: PropTypes.string.isRequired,
      assignee: PropTypes.string,
      dueDateTime: PropTypes.string,
      priority: PropTypes.string.isRequired,
    })
  ).isRequired,
  onUpdateTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
};

export default TaskList; 