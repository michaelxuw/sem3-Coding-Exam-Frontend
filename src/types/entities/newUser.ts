import User from "./user";

interface NewUser extends User {
  userPass: string;
  confirmPass: string;
}

const initialNewUser: NewUser = {
  roleList: [],
  userName: '',
  userPass: '',
  confirmPass: ''
};


export { initialNewUser };
export default NewUser;