import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Calendar, Clock, MoreVertical, Edit, Trash2, CheckCircle, User } from 'lucide-react';
import { format, isPast, isToday } from 'date-fns';
import { Task } from '../../types';
import { useTask } from '../../contexts/TaskContext';
import { useNavigate } from 'react-router-dom';

const priorityColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-orange-100 text-orange-800',
  urgent: 'bg-red-100 text-red-800'
};

const statusColors = {
  'todo': 'bg-gray-100 text-gray-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  'review': 'bg-purple-100 text-purple-800',
  'done': 'bg-green-100 text-green-800'
};

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { deleteTask, completeTask } = useTask();
  const navigate = useNavigate();
  
  const handleEdit = () => {
    navigate(`/tasks/${task.id}/edit`);
    setMenuOpen(false);
  };
  
  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
    setMenuOpen(false);
  };
  
  const handleComplete = async () => {
    try {
      await completeTask(task.id);
    } catch (error) {
      console.error('Failed to complete task:', error);
    }
    setMenuOpen(false);
  };
  
  const formatDueDate = () => {
    if (!task.dueDate) return null;
    
    const dueDate = new Date(task.dueDate);
    
    if (isToday(dueDate)) {
      return 'Today';
    }
    
    return format(dueDate, 'MMM d');
  };
  
  const isDueDatePast = () => {
    if (!task.dueDate) return false;
    return isPast(new Date(task.dueDate)) && task.status !== 'done';
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="font-semibold text-gray-900 flex-1">{task.title}</div>
        <div className="relative">
          <button
            className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <MoreVertical className="h-5 w-5" />
          </button>
          
          {menuOpen && (
            <div className="absolute right-0 mt-1 bg-white shadow-lg rounded-md py-1 w-40 z-10 border border-gray-200">
              <button
                className="w-full px-4 py-2 text-left text-sm flex items-center text-gray-700 hover:bg-gray-100"
                onClick={handleEdit}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </button>
              {task.status !== 'done' && (
                <button
                  className="w-full px-4 py-2 text-left text-sm flex items-center text-gray-700 hover:bg-gray-100"
                  onClick={handleComplete}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Complete
                </button>
              )}
              <button
                className="w-full px-4 py-2 text-left text-sm flex items-center text-red-600 hover:bg-gray-100"
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      
      {task.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
      )}
      
      <div className="flex flex-wrap gap-2 mb-3">
        <span className={twMerge(
          'px-2 py-1 rounded-full text-xs font-medium',
          statusColors[task.status]
        )}>
          {task.status.replace('-', ' ')}
        </span>
        
        <span className={twMerge(
          'px-2 py-1 rounded-full text-xs font-medium',
          priorityColors[task.priority]
        )}>
          {task.priority}
        </span>
      </div>
      
      <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
        {task.dueDate ? (
          <div className={twMerge(
            'flex items-center',
            isDueDatePast() ? 'text-red-500' : ''
          )}>
            <Calendar className="h-3.5 w-3.5 mr-1" />
            {formatDueDate()}
          </div>
        ) : (
          <div></div>
        )}
        
        <div className="flex items-center">
          <Clock className="h-3.5 w-3.5 mr-1" />
          {format(new Date(task.createdAt), 'MMM d')}
        </div>
        
        {task.assignedTo && task.assignedTo.length > 0 && (
          <div className="flex items-center">
            <User className="h-3.5 w-3.5 mr-1" />
            {task.assignedTo.length} assigned
          </div>
        )}
      </div>
    </div>
  );
};