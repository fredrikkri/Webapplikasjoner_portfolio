export { users };

const users = [
{
    id: "1",
    role: "admin",
    username: "Fredrik",
    },
  {
    id: "2",
    role: "user",
    username: "Lars",
  },
  {
    id: "3",
    role: "user",
    username: "Simen",
  },
  {
    id: "4",
    role: "user",
    username: "True",
  },
];

export const getUserRoleById = (id: any) => {
  const user = users.find((user) => user.id === id);
  return user ? user.role : null;
};