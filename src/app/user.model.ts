export interface User {
    id: number;
    Nom: string;
    Prenom: string;
    NumTel: string;
    Adresse: string;
    email: string;
    MotDePasse: string;
    Ville: string;
    CodePostal?: string;
    PhotoProfil?: string;
    createdAt: Date;
  updatedAt: Date;
  isBlocked: Boolean;

  }