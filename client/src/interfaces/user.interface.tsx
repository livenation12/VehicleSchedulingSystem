export interface User {
          _id: string;
          firstName: string;
          lastName: string;
          email: string;
          password: string;
          confirmPassword: string;
}

export type UserForm = Omit<User, "_id">