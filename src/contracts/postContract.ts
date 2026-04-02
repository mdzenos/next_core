export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Post {
  id: string;
  content: string;
  author: User;
}
