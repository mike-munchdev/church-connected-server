const createRoleResponse = ({ ok, role = null, errors = null }) => ({
  ok,
  role: role ? role.toJSON() : role,
  errors
});

const createRolesResponse = ({ ok, roles = null, errors = null }) => ({
  ok,
  roles: roles ? roles.map(u => u.toJSON()) : [],
  errors
});

module.exports = {
  createRoleResponse,
  createRolesResponse
};
