export interface ListOfUsers {
  count: number;
  next: null;
  previous: null
  result: UserModel[]
}

export interface UserModel {
  id: string;
  title: string;
  completed: boolean;
  created_at?: Date;
  updated_at?: Date;
  user?: number;
}
