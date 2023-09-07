export interface ListOfUsers {
  count: number;
  next: null;
  previous: null
  results: UserModel[]
}

export interface UserModel {
  id: string;
  title: string;
  completed: boolean;
  created_at?: string;
  updated_at?: string;
  user?: number;
}
