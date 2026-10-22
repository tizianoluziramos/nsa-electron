import users from "../data/users.json";

export async function postLogin(username: string, password: string): Promise<void> {
  const match = (users as { username: string; password: string }[]).find(
    (user) => user.username === username && user.password === password,
  );

  if (!match) {
    throw new Error("Invalid credentials");
  }

  const timestamp = Date.now();
  const data = new TextEncoder().encode(`${username}${timestamp}`);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const token = hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");

  localStorage.setItem("token", token);
}