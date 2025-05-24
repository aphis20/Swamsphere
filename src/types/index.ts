
import type { Timestamp } from 'firebase/firestore';

export interface Achievement {
  id: string;
  name: string;
  iconName: string; // Corresponds to a key in iconMap for lucide-react icons
  earnedAt?: Timestamp; // Optional: when the achievement was earned
}

export interface UserProfile {
  id: string; // Firebase UID
  name: string;
  email?: string; // Added for convenience
  avatarUrl?: string;
  bio: string;
  skills: string[];
  location: string;
  deviceCapabilities: string;
  swarmPoints: number;
  joinedSpheres: string[]; // Array of sphere IDs
  socialLinks?: {
    twitter?: string;
    lens?: string;
  };
  level?: number;
  levelProgressPercent?: number; // Percentage (0-100) towards next level
  achievements?: Achievement[];
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface Task {
  id: string;
  title: string;
  description:string;
  reward: number; // SPHERE tokens
  type: 'Data Annotation' | 'Survey' | 'App Testing' | 'AI Computation' | 'RWA Verification' | 'DeSci Data Collection';
  requiredSkills?: string[];
  imageUrl?: string;
  dataAiHint?: string;
  status?: 'available' | 'in_progress' | 'completed' | 'pending_review';
  creatorId?: string; // UID or 'system'
  assigneeId?: string; // UID
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface Quest {
  id:string;
  title: string;
  description: string;
  totalReward: number; // Total SPHERE for the quest
  rewardPerUser: number;
  requiredUsers: number;
  currentUsers: number;
  leaderId?: string; // UID of quest leader
  status: 'Open' | 'In Progress' | 'Awaiting Quorum' | 'Completed' | 'Failed';
  taskIds?: string[]; // Array of task IDs part of this quest
  quorumPercentage: number; // e.g. 80 for 80%
  imageUrl?: string;
  dataAiHint?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

// For Quest subcollection
export interface QuestParticipant {
  userId: string; // UID
  joinedAt: Timestamp;
  contribution?: string; // or a more complex object
  status?: 'active' | 'completed_tasks';
}


export interface Sphere {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  dataAiHint?: string;
  memberCount: number;
  // customTasks: Task[]; // Consider storing task IDs and fetching details, or embedding simplified task info
  taskIds?: string[];
  rules: string[]; // DAO governance rules
  totalStaked?: number; // Swarm Bonds
  creatorId?: string; // UID
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

// For Sphere subcollections
export interface SphereMember {
  userId: string; // UID
  role: 'member' | 'admin' | 'moderator';
  joinedAt: Timestamp;
}

export interface SphereProposal {
  id: string;
  title: string;
  description: string;
  proposerId: string; // UID
  status: 'voting' | 'passed' | 'failed' | 'executed';
  votesFor: number;
  votesAgainst: number;
  createdAt: Timestamp;
  votingEndsAt: Timestamp;
}
