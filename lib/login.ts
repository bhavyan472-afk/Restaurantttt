import { EMAIL_PATTERN } from "@/lib/utils";

/**
 * Login form rules: the values it collects and how they are validated.
 *
 * Pure functions, so the same checks can run on the server once a real auth
 * provider is connected (see lib/loginService.ts). The client-side checks are
 * for the guest, not for security.
 */

export type LoginValues = {
  email: string;
  password: string;
};

export type LoginErrors = Partial<Record<keyof LoginValues, string>>;

export const PASSWORD_MIN_LENGTH = 8;

export const emptyLogin: LoginValues = { email: "", password: "" };

export function validateLogin(values: LoginValues): LoginErrors {
  const errors: LoginErrors = {};

  const email = values.email.trim();
  if (!email || !EMAIL_PATTERN.test(email)) errors.email = "Please enter a valid email address.";

  if (!values.password) errors.password = "Please enter your password.";
  else if (values.password.length < PASSWORD_MIN_LENGTH) {
    errors.password = `Your password has at least ${PASSWORD_MIN_LENGTH} characters.`;
  }

  return errors;
}
