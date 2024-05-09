export interface ExpertRequest {
  ider: number;
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    cv: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    city: string; // Assurez-vous que le type de city correspond à votre modèle de données
    adminId: number;
  }
  