import { useState, useEffect } from 'react';
import TaskInput from './components/TaskInput';
import TaskCard from './components/TaskCard';
import EditTaskModal from './components/EditTaskModal';
import { createTask, getAllTasks, updateTask, deleteTask } from './services/api';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const tasks = await getAllTasks();
      setTasks(tasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
      setError('Failed to load tasks. Please refresh the page.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = async (rawText) => {
    try {
      const newTask = await createTask(rawText);
      setTasks([...tasks, newTask]);
      return true;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      const result = await updateTask(updatedTask.id, updatedTask);
      setTasks(tasks.map(task => task.id === result.id ? result : task));
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await deleteTask(taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  // Group tasks by priority
  const tasksByPriority = tasks.reduce((acc, task) => {
    if (!acc[task.priority]) {
      acc[task.priority] = [];
    }
    acc[task.priority].push(task);
    return acc;
  }, {});

  const priorityOrder = ['P1', 'P2', 'P3', 'P4'];
  const priorityLabels = {
    P1: 'Urgent',
    P2: 'High',
    P3: 'Medium',
    P4: 'Low'
  };

  return (
    <div className="min-h-full">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Natural Language Task Manager
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TaskInput onTaskCreate={handleCreateTask} />

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
            <p className="mt-4 text-gray-500">Loading tasks...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {priorityOrder.map(priority => (
              <div key={priority} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {priorityLabels[priority]}
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                    {tasksByPriority[priority]?.length || 0}
                  </span>
                </div>
                <div className="space-y-4 min-h-[200px] p-4 bg-gray-50 rounded-lg">
                  {tasksByPriority[priority]?.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onDelete={handleDeleteTask}
                      onEdit={handleEditClick}
                    />
                  ))}
                  {(!tasksByPriority[priority] || tasksByPriority[priority].length === 0) && (
                    <div className="text-center py-8 text-gray-500">
                      No tasks
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <EditTaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          task={editingTask}
          onSave={handleUpdateTask}
        />
      </div>
    </div>
  );
}
