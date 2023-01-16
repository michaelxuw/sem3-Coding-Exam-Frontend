import Token from "@/types/entities/token";
import API from "@/api/";
import Permission from "../types/entities/permission";
import Role from "../types/entities/permission";


function decodeJwt() {
  const token = API.helpers.getToken();
  if (!token) return undefined;
  const jwtData = token.split(".")[1];
  const decodedJwtJsonData = window.atob(jwtData);
  const decodedJwtData = JSON.parse(decodedJwtJsonData);
  return decodedJwtData;
}

function getID(jwt: { ID: string; }) {
  return jwt && jwt.ID;
}
function getEmail(jwt: { email: string; }) {
  return jwt && jwt.email;
}
function getPermission(jwt: { pms: string; }) {
  if (!jwt || !jwt.pms) return false;
  return jwt.pms as Permission;
}
function getName(jwt: { name: string; }) {
  return jwt && jwt.name;
}
function getPhone(jwt: { phone: string; }) {
  return jwt && jwt.phone;
}


function getUserInfo(): Token {
  const jwtData = decodeJwt();
  return {
    ID: getID(jwtData),
    email: getEmail(jwtData),
    name: getName(jwtData),
    phone: getPhone(jwtData),
    pms: getPermission(jwtData) || undefined
  };
}

export {
  getUserInfo
};
