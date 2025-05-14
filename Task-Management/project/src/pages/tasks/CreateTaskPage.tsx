import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { TaskForm } from '../../components/tasks/TaskForm';
import { Button } from '../../components/ui/Button';

export const CreateTaskPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="sm"
          className="mr-4"
          onClick={() => navigate('/tasks')}
          leftIcon={<ArrowLeft className="w-4 h-4" />}
        >
          Back to Tasks
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Create Task</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <TaskForm onSuccess={() => navigate('/tasks')} />
      </div>
    </div>
  );
};