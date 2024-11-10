type Nullable<T> = T | null;

// api
type DefaultError = { errors: string[], message: string };
type ITypeOrError<T> = T | { error: DefaultError };

// auth api
type AuthData = { email: string, password: string };
type AuthResponse = { token: string, refreshToken: string, userId: string };
