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
  id: number,
  firstName: string,
  middleName: string,
  lastName: string,
  email: string,
  areaCode: string,
  phoneNumber: string,
  dateJoined: Date,
  branch: {
    id: Branch["id"],
    name: Branch["name"]
  },
}