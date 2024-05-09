export interface CreateSubscription {
        ids?: number; // Ajoutez le champ ids pour permettre la mise à jour de l'identifiant
        createdAt?: Date;
        updatedAt?: Date;
        name: string;
        price: number;
        duration: number;
        description: string;
      }