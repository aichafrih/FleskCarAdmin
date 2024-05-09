// notification.model.ts
export interface Notification {
  idn: number;
  content: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  adminId: number;
  expertId: number;
}
