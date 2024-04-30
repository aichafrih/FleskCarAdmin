import { User } from './user.model';
//import { Media } from './media.model';
export interface Image {
path: string;
  pubid: number;
  imageSrc: string;
  imageAlt: string;
}
export interface equippements {
  equipid: number;
  name: string;
}


export interface Publication {
pubid: number;
  marque: string;
  model: string;
  anneeFabrication: number;
  nombrePlace: number;
  couleur: string;
  kilometrage: number;
  prix: number;
  descrption?: string;
  typeCarburant: TypeCarburant;
 createdAt: Date;
  updatedAt: Date;
  boiteVitesse: boiteVitesse;
  sellerie: sellerie;
  city: city;
  transmission:String;
  carrassorie:String;
  equippements: equippements[];
    userId: number; // Foreign key referencing User
 user: User| null; // Define the relation to User
 images: Image[];
}

export enum TypeCarburant {
  Essence = 'Essence',
  Diesel = 'Diesel',
  GPL = 'GPL',
  Electrique = 'Electrique',
  GNL='GNL',
  Ethanol='Ethanol'
}

export enum boiteVitesse {
  Manuelle='Manuelle',
  Automatique=' Automatique'
}

export enum sellerie {
  Alcantara='Alcantara',
  Cuir='Cuir',
  Similcuir='Similcuir',
  Tisuu='Tisuu',
  Plastique='Plastique',
  Velours='Velours'
}

export enum city {
  
  TUNIS='TUNIS',
  ARIANA='Ariana',
  BEN_AROUS='ARIANA',
  BIZERTE='BIZERTE',
  GABES='GABES',
  GAFSA='GAFSA',
  JENDOUBA='JENDOUBA',
  KAIROUAN='KAIROUAN',
  KASERINE='KASERINE',
  KEBILI='KEBILI',
  MAHDIA='MAHDIA',
  MANOUBA='MANOUBA',
  MEDENINE='MEDENINE',
  MONASTIR='MONASTIR',
  NABEUL='NABEUL',
  SFAX='SFAX',
  SIDI_BOUZID='SIDI_BOUZID',
  SILIANA='SILIANA',
  SOUSSE='SOUSSE',
  TATAOUINE='TATAOUINE',
  TOZEUR='TOZEUR',
  ZAGHOUAN='ZAGHOUAN',
  BEJA='BEJA',
  KEF='KEF'
}