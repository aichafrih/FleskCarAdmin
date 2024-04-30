export interface PubFilterDto {
    pubId: number;
    marque?: string;
    model?: string;
    anneeMin?: number;
    anneeMax?: number;
    nombrePlace?: number;
    kilometrageMin?: number;
    kilometrageMax?: number;
    prixMin?: number;
    prixMax?: number;
    typeCarburant?: string;
    couleur?: string;
  }
  