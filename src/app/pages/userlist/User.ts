export class User {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  status?: string;
  token?: string;
  hireDate?: string;
  createdAt?: string;
  updatedAt?: string;
  oauthUser?: string;
  roles: { id: number, name: string }[] = [];
  userProfile?: {
    id: number,
    firstName?: string,
    lastName?: string,
    country?: string,
    phone?: string,
    position?: string,
    department?: string,
    salary?: string,
    status?: string,

    // facebook?: string,
    // twitter?: string,
    // youtube?: string,
    // oathUserImageLink?: string,
    // userImage?: string,
    // bio?: string,
    address?: string
  };
  passwordSet?: boolean;
  inactiveUser?: boolean;
}
