export interface Achievement {
  id: string;
  name: string;
  iconName: string; // Corresponds to a key in iconMap for lucide-react icons
}

export interface UserProfile {
  id: string;
  name: string;
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
}

export interface Task {
  id: string;
  title: string;
  description: string;
  reward: number; // SPHERE tokens
  type: 'Data Annotation' | 'Survey' | 'App Testing' | 'AI Computation' | 'RWA Verification' | 'DeSci Data Collection';
  requiredSkills?: string[];
  imageUrl?: string;
  dataAiHint?: string;
}

export interface Quest {
  id:string;
  title: string;
  description: string;
  totalReward: number; // Total SPHERE for the quest
  rewardPerUser: number;
  requiredUsers: number;
  currentUsers: number;
  leader?: UserProfile; // Simplified, could be just leaderId
  status: 'Open' | 'In Progress' | 'Completed' | 'Failed';
  tasks: Task[]; // Tasks within the quest
  quorumPercentage: number; // e.g. 80 for 80%
  imageUrl?: string;
  dataAiHint?: string;
}

export interface Sphere {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  dataAiHint?: string;
  memberCount: number;
  customTasks: Task[];
  rules: string[]; // DAO governance rules
  totalStaked?: number; // Swarm Bonds
}
