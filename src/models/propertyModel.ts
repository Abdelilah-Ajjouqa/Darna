export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Location {
  address: string;
  coordinates: Coordinates;
}

export interface RoomDimension {
  roomName: string;
  length: number;
  width: number;
  surface: number;
}

export interface Equipment {
  wifi?: boolean;
  airConditioning?: boolean;
  parking?: boolean;
  heating?: boolean;
  balcony?: boolean;
  garden?: boolean;
  pool?: boolean;
  elevator?: boolean;
}

export interface InternalRules {
  animalsAllowed?: boolean;
  smokingAllowed?: boolean;
  partiesAllowed?: boolean;
}

export interface Characteristics {
  totalSurface: number;
  roomDimensions: RoomDimension[];
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  equipment: Equipment;
  internalRules: InternalRules;
  energyDiagnostics?: string;
}

export type TransactionType = 'sale' | 'daily rental' | 'monthly' | 'seasonal';

export class Property {
  title: string;
  description: string;
  transactionType: TransactionType;
  price: number;
  availability: boolean;
  location: Location;
  characteristics: Characteristics;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: {
    title: string;
    description: string;
    transactionType: TransactionType;
    price: number;
    availability?: boolean;
    location: Location;
    characteristics: Characteristics;
  }) {
    this.title = data.title;
    this.description = data.description;
    this.transactionType = data.transactionType;
    this.price = data.price;
    this.availability = data.availability ?? true;
    this.location = data.location;
    this.characteristics = data.characteristics;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  // Example method to display a short summary
  getSummary(): string {
    return `${this.title} (${this.transactionType}) - $${this.price}`;
  }

  // Example method to toggle availability
  toggleAvailability(): void {
    this.availability = !this.availability;
  }
}
