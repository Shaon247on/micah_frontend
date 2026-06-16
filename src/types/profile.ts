export interface Profile {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string | null;
}

export interface ProfileResponse {
  status: string;
  data: Profile;
}

export interface ProfileUpdateResponse {
  status: string;
  message: string;
  data?: Profile;
}

export interface AvatarUploadResponse {
  status: string;
  message: string;
  avatarUrl?: string;
}

export interface PasswordUpdateResponse {
  status: string;
  message: string;
}