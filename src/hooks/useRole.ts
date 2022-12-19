import { useUser } from "./useUser";

export const useRole = () => {
  const { role } = useUser();

  return role;
};
