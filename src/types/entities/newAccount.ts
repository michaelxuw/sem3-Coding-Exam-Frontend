interface NewAccount {
  isAdmin: boolean;
  email: string;
  password: string;
  phone: string;
  name: string;
  comfirmPassword: string;
}

const initialNewAccount: NewAccount = {
  isAdmin: false,
  email: '',
  password: '',
  phone: '',
  name: '',
  comfirmPassword: ''
};


export { initialNewAccount };
export default NewAccount;