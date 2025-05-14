import React, { createContext, useContext, useState } from 'react';
import { Workspace, WorkspaceMember } from '../types';

interface WorkspaceContextType {
  workspaces: Workspace[];
  currentWorkspace: Workspace | null;
  loading: boolean;
  error: string | null;
  createWorkspace: (name: string, description: string) => Promise<string>;
  updateWorkspace: (id: string, data: Partial<Workspace>) => Promise<void>;
  setCurrentWorkspace: (workspace: Workspace | null) => void;
  addMemberToWorkspace: (workspaceId: string, email: string, role: 'admin' | 'member') => Promise<void>;
  removeMemberFromWorkspace: (workspaceId: string, userId: string) => Promise<void>;
  updateMemberRole: (workspaceId: string, userId: string, role: 'admin' | 'member') => Promise<void>;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (context === undefined) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
};

// Demo data
const demoWorkspace: Workspace = {
  id: '1',
  name: 'Demo Workspace',
  description: 'A demo workspace for testing',
  ownerId: '1',
  createdAt: new Date(),
  updatedAt: new Date(),
  members: [
    {
      userId: '1',
      role: 'owner',
      displayName: 'Demo User',
      photoURL: null,
      email: 'demo@example.com'
    }
  ]
};

export const WorkspaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([demoWorkspace]);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(demoWorkspace);
  const [loading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createWorkspace = async (name: string, description: string): Promise<string> => {
    const newWorkspace: Workspace = {
      id: String(workspaces.length + 1),
      name,
      description,
      ownerId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
      members: [
        {
          userId: '1',
          role: 'owner',
          displayName: 'Demo User',
          photoURL: null,
          email: 'demo@example.com'
        }
      ]
    };
    
    setWorkspaces(prev => [...prev, newWorkspace]);
    setCurrentWorkspace(newWorkspace);
    return newWorkspace.id;
  };

  const updateWorkspace = async (id: string, data: Partial<Workspace>) => {
    setWorkspaces(prev => 
      prev.map(workspace => 
        workspace.id === id ? { ...workspace, ...data, updatedAt: new Date() } : workspace
      )
    );
    
    if (currentWorkspace?.id === id) {
      setCurrentWorkspace(prev => prev ? { ...prev, ...data, updatedAt: new Date() } : null);
    }
  };

  const addMemberToWorkspace = async (workspaceId: string, email: string, role: 'admin' | 'member') => {
    const newMember: WorkspaceMember = {
      userId: String(Math.random()),
      role,
      displayName: email.split('@')[0],
      photoURL: null,
      email
    };
    
    setWorkspaces(prev => 
      prev.map(workspace => {
        if (workspace.id === workspaceId) {
          return {
            ...workspace,
            members: [...workspace.members, newMember],
            updatedAt: new Date()
          };
        }
        return workspace;
      })
    );
  };

  const removeMemberFromWorkspace = async (workspaceId: string, userId: string) => {
    setWorkspaces(prev => 
      prev.map(workspace => {
        if (workspace.id === workspaceId) {
          return {
            ...workspace,
            members: workspace.members.filter(member => member.userId !== userId),
            updatedAt: new Date()
          };
        }
        return workspace;
      })
    );
  };

  const updateMemberRole = async (workspaceId: string, userId: string, role: 'admin' | 'member') => {
    setWorkspaces(prev => 
      prev.map(workspace => {
        if (workspace.id === workspaceId) {
          return {
            ...workspace,
            members: workspace.members.map(member => 
              member.userId === userId ? { ...member, role } : member
            ),
            updatedAt: new Date()
          };
        }
        return workspace;
      })
    );
  };

  const value = {
    workspaces,
    currentWorkspace,
    loading,
    error,
    createWorkspace,
    updateWorkspace,
    setCurrentWorkspace,
    addMemberToWorkspace,
    removeMemberFromWorkspace,
    updateMemberRole
  };

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
};