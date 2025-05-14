export interface User {
  id: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  createdAt: Date;
}

export interface Workspace {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
  members: WorkspaceMember[];
}

export interface WorkspaceMember {
  userId: string;
  role: 'owner' | 'admin' | 'member';
  displayName: string | null;
  photoURL: string | null;
  email: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  color: string;
  workspaceId: string;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate: Date | null;
  projectId: string;
  workspaceId: string;
  createdById: string;
  assignedTo: string[];
  createdAt: Date;
  updatedAt: Date;
  completedAt: Date | null;
}

export interface Comment {
  id: string;
  content: string;
  taskId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  id: string;
  type: 'task-assigned' | 'task-updated' | 'comment' | 'mention';
  content: string;
  userId: string;
  taskId: string | null;
  read: boolean;
  createdAt: Date;
}