export interface Expert {
    ide: number;
    firstName: string;
    lastName: string;
    email: string;
    cv: string;
    city: string; // Assurez-vous que le type de la propriété city est correctement défini
    passe: string;
    tel: string;
    createdAt: Date;
    updatedAt: Date;
  }
  