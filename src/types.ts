export interface Post {
  identifier: string;
  title: string;
  body?: string;
  slug: string;
  subName: string;
  sub: Sub;
  comments?: CommentType[];
  createdAt: string;
  updatedAt: string;
  username: string;
  voteScore?: number;
  userVote?: number;
}

export interface User {
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export interface Sub {
  title: string;
  name: string;
  description: string;
  bannerURN?: string;
  imageURN?: string;
  posts: Post[];
  createdAt: string;
  updatedAt: string;
  username: string;
  imageUrl?: string;
}

export interface ReduxState {
  data: User | null;
  isLoading: boolean;
  error: any;
}

export interface CommentType {
  identifier: string;
  username: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  post: Post;
  // virtuals
  userVote: number;
  voteScore: number;
}

export interface UserSubmissions {
  user: User;
  submissions: [posts: Post[], comments: CommentType[]];
}
