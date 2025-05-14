import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Task } from '../../types';
import { TaskForm } from '../../components/tasks/TaskForm';
import { Button } from '../../components/ui/Button';

export const EditTaskPage: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchTask = async () => {
      if (!taskId) {
        navigate('/tasks');
        return;
      }
      
      try {
        setLoading(true);
        const taskRef = doc(db, 'tasks', taskId);
        const taskSnap = await getDoc(taskRef);
        
        if (taskSnap.exists()) {
          setTask({
            id: taskSnap.id,
            ...taskSnap.data(),
            createdAt: taskSnap.data().createdAt?.toDate(),
            updatedAt: taskSnap.data().updatedAt?.toDate(),
            dueDate: taskSnap.data().dueDate?.toDate(),
            completedAt: taskSnap.data().completedAt?.toDate()
          } as Task);
        } else {
          setError('Task not found');
          navigate('/tasks');
        }
      } catch (err) {
        console.error('Error fetching task:', err);
        setError('Failed to load task');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTask();
  }, [taskId, navigate]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
      </div>
    );
  }
  
  if (error || !task) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
        {error || 'Task not found'}
      </div>
    );
  }
  
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
        <h1 className="text-2xl font-bold text-gray-900">Edit Task</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <TaskForm task={task} onSuccess={() => navigate('/tasks')} />
      </div>
    </div>
  );
};