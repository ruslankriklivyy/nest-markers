export interface UserModel {
  email: string;
  full_name: string;
  password: string;
  avatar_id?: number | null;
  is_activated: boolean;
}
