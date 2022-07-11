const REGEX = {
  MULTIPLE_SLASH: /\/+/,
  START_WITH_SLASH: /^\/.+/,
};

export const routePathSanitize = (path: string) => {
  let cleanPath = path.replace(REGEX.MULTIPLE_SLASH, '/');
  const hasStartSlash = REGEX.START_WITH_SLASH.exec(cleanPath);
  if (hasStartSlash) {
    return cleanPath;
  }
  return `/${cleanPath}`;
};

export * from './logger';
