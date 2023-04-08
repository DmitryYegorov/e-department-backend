export interface RegisterInputType {
  firstName: string;
  middleName: string;
  lastName?: string;
  email: string;
  password: string;
  activationCode: string;
  type: string;
}
