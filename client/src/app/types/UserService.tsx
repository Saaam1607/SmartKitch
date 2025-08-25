import { User } from "@my-org/shared";

export default interface UserService {
  register: (email: string, password: string, name: string, surname: string) => Promise<User>;
  login: (email: string, password: string) => Promise<string>;
}