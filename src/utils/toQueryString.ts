const toQueryString = (params: Record<string, unknown>) => {
  return new URLSearchParams(
    Object.entries(params)
      .filter(([, value]) => value != null)
      .map(([key, value]) => [key, String(value)]),
  ).toString();
};

export default toQueryString;
