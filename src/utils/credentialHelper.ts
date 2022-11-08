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

function validateRoles(allowedRoles: Role[]) {
  const jwtData = decodeJwt();
  if (!jwtData || !jwtData.roles) return false;

  const roles = jwtData.roles.split(",") as Role[];
  for (const role of roles) {
    if (allowedRoles.includes(role)) return true;
  }

  return false;
}

function getUsername() {
  const jwtData = decodeJwt();
  return jwtData && jwtData.username;
}

export {
  decodeJwt,
  validateRoles,
  getUsername
};
