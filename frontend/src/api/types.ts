export type Branch = {
  id: number;
  name: string;
  country: string;
  city: string;
  street: string;
  streetNumber: number;
  flatNumber: number;
  zipCode: string;
}

export type User = {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  areaCode: string;
  phoneNumber: string;
  dateJoined: string;
  branch: {
    id: Branch["id"];
    name: Branch["name"];
  },
}

export type Card = {
  id: number;
  barcode: string;
  isTemp: boolean; 
}

export type CardClient = {
  id: number;
  card: Card;
  dateFrom: string;
  dateTo: string;
}

export type Client = {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  country: string;
  city: string;
  street: string;
  streetNumber: number;
  flatNumber: number;
  zipCode: string;
  email: string;
  areaCode: string;
  phoneNumber: string;
  identityCardNumber: string;
  dateJoined: Date;
  clientCards: CardClient[];
}

export type Subcategory = {
  id: number;
  name: string;
  category: {
    id: number;
    name: string;
  };
  vehicle: {
    id: number;
    curbWeight: number;
    maxLoad: number;
    minAge: number;
    maxAge: number;
    driveType: {
      id: number;
      name: string;
    };
    electricVehicle: {
      id: number;
      enginePower: number;
      batteryVoltage: number;
      batteryCapacity: number;
    };
  };
}

export type Item = {
  id: number;
  subcategory: {
    id: number;
    name: string;
  };
  branch: {
    id: number;
    name: string;
  };
  name: string;
  shortName: string;
  barcode: string;
  marketValue: number;
  forSale: boolean;
  sellPrice: number;
}

export type Category = {
  id: number;
  name: string;
}

export type DriveType = {
  id: number;
  name: string;
}