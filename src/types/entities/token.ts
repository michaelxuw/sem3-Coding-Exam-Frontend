import Permission from "./permission";

interface Token {
  ID: string;
  email: string;
  name: string;
  phone: string;
  pms?: Permission;
}

export default Token;