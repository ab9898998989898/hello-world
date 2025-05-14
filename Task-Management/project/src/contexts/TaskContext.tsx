import React, { createContext, useContext, useState } from 'react';
import { Task } from '../types';

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  createTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'completedAt'>) => Promise<string>;
  updateTask: (id: string, data: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  completeTask: (id: string) => Promise<void>;
  assignTask: (id: string, userIds: string[]) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};

// Demo tasks
const demoTasks: Task[] = [
  {
    id: '1',
    title: 'Complete project proposal',
    description: 'Write and submit the project proposal for client review',
    status: 'in-progress',
    priority: 'high',
    dueDate: new Date(Date.now() + 86400000 * 2), // 2 days from now
    projectId: 'default',
    workspaceId: '1',
    createdById: '1',
    assignedTo: ['1'],
    createdAt: new Date(),
    updatedAt: new Date(),
    completedAt: null
  },
  {
    id: '2',
    title: 'Design system review',
    description: 'Review and update the design system components',
    status: 'todo',
    priority: 'medium',
    dueDate: new Date(Date.now() + 86400000 * 5), // 5 days from now
    projectId: 'default',
    workspaceId: '1',
    createdById: '1',
    assignedTo: ['1'],
    createdAt: new Date(),
    updatedAt: new Date(),
    completedAt: null
  }
];

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(demoTasks);
  const [loading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTask = async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'completedAt'>): Promise<string> => {
    const newTask: Task = {
      id: String(tasks.length + 1),
      ...task,
      createdAt: new Date(),
      updatedAt: new Date(),
      completedAt: null
    };
    
    setTasks(prev => [...prev, newTask]);
    return newTask.id;
  };

  const updateTask = async (id: string, data: Partial<Task>) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id ? { ...task, ...data, updatedAt: new Date() } : task
      )
    );
  };

  const deleteTask = async (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const completeTask = async (id: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id ? {
          ...task,
          status: 'done',
          completedAt: new Date(),
          updatedAt: new Date()
        } : task
      )
    );
  };

  const assignTask = async (id: string, userIds: string[]) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id ? {
          ...task,
          assignedTo: userIds,
          updatedAt: new Date()
        } : task
      )
    );
  };

  const value = {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    completeTask,
    assignTask
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};