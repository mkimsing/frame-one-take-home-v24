export interface User {
  _id: string;
  email: string;
  profilePicture?: string;
  totalExperience?: number;
  experiencePoints?: { points: number; timestamp: string }[];
}

export interface Community {
  _id: string;
  name: string;
  logo?: string;
}

export interface LeaderboardEntry {
  _id: string; //CommunityId
  totalExperience: number;
  community: Community[];
  totalUsers: number;
}
