export const accessRules: Record<string, string[]> = {
  "/admin": ["ADMIN"],
  "/author": ["ADMIN", "AUTHOR"],
  "/student": ["STUDENT"],
};
