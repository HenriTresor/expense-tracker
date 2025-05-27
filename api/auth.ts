import apiClient from "./client";

export interface User {
  id: string;
  username: string;
  password: string;
  createdAt: string;
}

export const loginUser = async (
  username: string,
  password: string
): Promise<User | null> => {
  try {
    const response = await apiClient.get(`/users`, {
      params: { username },
    });

    const users = response.data as User[];

    if (users.length === 0) {
      return null;
    }

    const user = users[0];

    if (user.password === password) {
      return user;
    }

    return null;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
