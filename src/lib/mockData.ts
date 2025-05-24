import type { Task, Quest, Sphere, UserProfile, Achievement } from '@/types';

const mockAchievements: Achievement[] = [
  { id: 'ach1', name: 'Quest Conqueror', iconName: 'Award' },
  { id: 'ach2', name: 'Sphere Founder', iconName: 'Users' },
  { id: 'ach3', name: 'Task Titan', iconName: 'Star' },
  { id: 'ach4', name: 'Community Pillar', iconName: 'ShieldCheck' },
];

export const mockUserProfile: UserProfile = {
  id: 'user123',
  name: 'Alex Nova',
  avatarUrl: 'https://placehold.co/100x100.png',
  bio: 'Web3 enthusiast & AI developer exploring the decentralized future. Active in SwarmSphere, contributing to DeSci and RWA projects.',
  skills: ['React Native', 'Solidity', 'AI/ML', 'Data Analysis'],
  location: 'Lagos, Nigeria',
  deviceCapabilities: 'Mid-range Smartphone (Android)',
  swarmPoints: 1250,
  joinedSpheres: ['sphere1', 'sphere2'],
  socialLinks: {
    twitter: 'alexnova_web3',
    lens: 'alexnova.lens',
  },
  level: 5,
  levelProgressPercent: 60, // 60% progress into level 5
  achievements: mockAchievements.slice(0, 3), // User has earned the first 3 achievements
};

export const mockTasks: Task[] = [
  { id: 'task1', title: 'Annotate Urban Images', description: 'Tag objects in 100 urban landscape images for AI training.', reward: 15, type: 'Data Annotation', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'city street' },
  { id: 'task2', title: 'Test New Mobile Game', description: 'Play and report bugs for a new mobile game (Android).', reward: 25, type: 'App Testing', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'mobile game' },
  { id: 'task3', title: 'Verify ZK Proofs', description: 'Contribute CPU cycles to verify Zero-Knowledge proofs.', reward: 5, type: 'AI Computation', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'abstract network' },
  { id: 'task4', title: 'Community Feedback Survey', description: 'Provide feedback on new platform features.', reward: 10, type: 'Survey', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'community people' },
  { id: 'task5', title: 'Validate Carbon Credit Data', description: 'Cross-reference data for tokenized carbon credits.', reward: 30, type: 'RWA Verification', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'forest nature' },
];

export const mockQuests: Quest[] = [
  {
    id: 'quest1',
    title: 'Federated Learning Model Update',
    description: 'Participate in verifying updates for a decentralized AI model. Requires 500 users.',
    totalReward: 7500,
    rewardPerUser: 15,
    requiredUsers: 500,
    currentUsers: 350,
    status: 'In Progress',
    tasks: [mockTasks[2]],
    quorumPercentage: 80,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'ai brain',
    leader: { ...mockUserProfile, name: 'Sarah Leader', swarmPoints: 2500 }
  },
  {
    id: 'quest2',
    title: 'Air Quality Data Collection (DeSci)',
    description: 'Collect and submit local air quality readings using a compatible sensor.',
    totalReward: 10000,
    rewardPerUser: 10,
    requiredUsers: 1000,
    currentUsers: 150,
    status: 'Open',
    tasks: [{ id: 'task_air', title: 'Submit Air Quality Data', description: 'Use sensor to submit data.', reward: 10, type: 'DeSci Data Collection' }],
    quorumPercentage: 80,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'city pollution'
  },
  {
    id: 'quest3',
    title: 'Tokenized Solar Farm Audit',
    description: 'Validate operational data for a tokenized solar farm asset.',
    totalReward: 6000,
    rewardPerUser: 30,
    requiredUsers: 200,
    currentUsers: 190,
    status: 'In Progress',
    tasks: [mockTasks[4]],
    quorumPercentage: 80,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'solar panel'
  },
];

export const mockSpheres: Sphere[] = [
  {
    id: 'sphere1',
    name: 'GreenSphere Climate Action',
    description: 'A community focused on tasks related to climate change and environmental data.',
    imageUrl: 'https://placehold.co/300x200.png',
    dataAiHint: 'green planet',
    memberCount: 230,
    customTasks: [mockTasks[4]],
    rules: ['Proposals require 100 SPHERE to submit.', 'Voting period is 7 days.', 'Majority vote wins.'],
    totalStaked: 50000,
  },
  {
    id: 'sphere2',
    name: 'AI Builders Collective',
    description: 'Sphere for AI developers and enthusiasts to collaborate on AI models and datasets.',
    imageUrl: 'https://placehold.co/300x200.png',
    dataAiHint: 'ai code',
    memberCount: 150,
    customTasks: [mockTasks[0], mockTasks[2]],
    rules: ['Only verified AI devs can propose computation tasks.', 'Data tasks follow strict privacy guidelines.'],
    totalStaked: 75000,
  },
  {
    id: 'sphere3',
    name: 'Local Guides Lagos',
    description: 'A sphere for users in Lagos to complete location-specific tasks and surveys.',
    imageUrl: 'https://placehold.co/300x200.png',
    dataAiHint: 'lagos map',
    memberCount: 85,
    customTasks: [mockTasks[3]],
    rules: ['Tasks must be relevant to Lagos.', 'New members require approval from 2 existing members.'],
  },
];

export const availableTasksForAI: string[] = mockTasks.map(task => `${task.title}: ${task.description} (Type: ${task.type}, Reward: ${task.reward} SPHERE)`);
