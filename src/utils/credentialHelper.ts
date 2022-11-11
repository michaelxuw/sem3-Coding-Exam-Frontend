import facade from "../api/apiFacade";
import Role from "../types/entities/role";


function decodeJwt() {
  const token = facade.getToken();
  if (!token) return undefined;
  const jwtData = token.split(".")[1];
  const decodedJwtJsonData = window.atob(jwtData);
  const decodedJwtData = JSON.parse(decodedJwtJsonData);
  return decodedJwtData;
}

function getUsername(jwt: {username: string}) {
  return jwt && jwt.username;
}

function getUserRoles(jwt: {roles: string}) {
  if (!jwt || !jwt.roles) return false;
  return jwt.roles.split(",") as Role[];
}

function getUserInfo() {
  const jwtData = decodeJwt();
  return {
    username: getUsername(jwtData),
    roles: getUserRoles(jwtData) || []
  };
}

export {
  getUserInfo
};
