export type User = {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  areaCode: string;
  phoneNumber: string;
  password: string;
  dateJoined: string;
  branch: {
    id: number;
    name: string;
  };
};