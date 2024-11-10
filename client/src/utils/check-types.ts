const isResponse = <T>(response: ITypeOrError<T>): response is T => (
  response as { error: DefaultError })?.error === undefined;

export default isResponse;
