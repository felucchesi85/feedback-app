export interface User {
  id: string;
  nationalId: string;
  firstName: string;
  lastName: string;
  email: string;
  feedbacks: Feedback[];
}

export interface Feedback {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
} 