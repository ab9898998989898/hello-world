import { getDoc, doc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { User, WorkspaceMember } from '../types';

export async function getUserById(userId: string): Promise<User | null> {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const userData = userSnap.data();
      return {
        id: userSnap.id,
        ...userData,
        createdAt: userData.createdAt?.toDate()
      } as User;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const usersQuery = query(collection(db, 'users'), where('email', '==', email));
    const usersSnap = await getDocs(usersQuery);
    
    if (!usersSnap.empty) {
      const userDoc = usersSnap.docs[0];
      const userData = userDoc.data();
      
      return {
        id: userDoc.id,
        ...userData,
        createdAt: userData.createdAt?.toDate()
      } as User;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching user by email:', error);
    return null;
  }
}

export async function getWorkspaceMembers(memberIds: WorkspaceMember[]): Promise<User[]> {
  try {
    const userPromises = memberIds.map(member => getUserById(member.userId));
    const users = await Promise.all(userPromises);
    
    return users.filter((user): user is User => user !== null);
  } catch (error) {
    console.error('Error fetching workspace members:', error);
    return [];
  }
}