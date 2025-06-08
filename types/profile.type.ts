export interface Profile {
  armLength: number;
  avatar: string;
  bodyImageUrl: string;
  chest: number;
  createdAt: string;
  email: string;
  gender: 'male' | 'female';
  height: number;
  hip: number;
  legLength: number;
  outfitFavourite: string[];
  shoulderWidth: number;
  torsoLength: number;
  uid: string;
  updatedAt: string;
  username: string;
  waist: number;
  weight: number;
}

export interface ProfileResponse {
  data: Profile;
  httpStatusCode: number;
} 