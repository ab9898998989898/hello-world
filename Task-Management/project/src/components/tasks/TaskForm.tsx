import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useTask } from '../../contexts/TaskContext';
import { useWorkspace } from '../../contexts/WorkspaceContext';
import { Task, Project } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

interface TaskFormProps {
  task?: Task;
  onSuccess?: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ task, onSuccess }) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [status, setStatus] = useState(task?.status || 'todo');
  const [priority, setPriority] = useState(task?.priority || 'medium');
  const [dueDate, setDueDate] = useState(
    task?.dueDate ? format(new Date(task.dueDate), 'yyyy-MM-dd') : ''
  );
  const [projectId, setProjectId] = useState(task?.projectId || '');
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  
  const { createTask, updateTask } = useTask();
  const { currentWorkspace } = useWorkspace();
  const navigate = useNavigate();
  
  useEffect(() => {
    // TODO: Fetch projects for the current workspace
    // This would normally come from a ProjectContext or a service
    setProjects([]);
  }, [currentWorkspace]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      return;
    }
    
    try {
      setLoading(true);
      
      const taskData = {
        title,
        description,
        status: status as Task['status'],
        priority: priority as Task['priority'],
        dueDate: dueDate ? new Date(dueDate) : null,
        projectId: projectId || 'default',
        workspaceId: currentWorkspace?.id || '',
        assignedTo: task?.assignedTo || [],
      };
      
      if (task) {
        await updateTask(task.id, taskData);
      } else {
        await createTask(taskData);
      }
      
      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/tasks');
      }
    } catch (error) {
      console.error('Error saving task:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title"
        fullWidth
        required
      />
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter task description"
        ></textarea>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Status"
          value={status}
          onChange={setStatus}
          options={[
            { value: 'todo', label: 'To Do' },
            { value: 'in-progress', label: 'In Progress' },
            { value: 'review', label: 'Review' },
            { value: 'done', label: 'Done' }
          ]}
          fullWidth
        />
        
        <Select
          label="Priority"
          value={priority}
          onChange={setPriority}
          options={[
            { value: 'low', label: 'Low' },
            { value: 'medium', label: 'Medium' },
            { value: 'high', label: 'High' },
            { value: 'urgent', label: 'Urgent' }
          ]}
          fullWidth
        />
        
        <Input
          type="date"
          label="Due Date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          fullWidth
        />
        
        <Select
          label="Project"
          value={projectId}
          onChange={setProjectId}
          options={[
            { value: 'default', label: 'General' },
            ...projects.map(project => ({
              value: project.id,
              label: project.name
            }))
          ]}
          fullWidth
        />
      </div>
      
      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate('/tasks')}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          loading={loading}
        >
          {task ? 'Update Task' : 'Create Task'}
        </Button>
      </div>
    </form>
  );
};