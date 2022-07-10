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

export const Logger = (context: any, message: any) => {
  let contextFormatted = context;
  if (typeof context === 'function') {
    contextFormatted = getClassName(context);
  }
  console.log(`[${contextFormatted}]: ${message}`);
};

export const getClassName = (classElement: any) => {
  return classElement.toString().match(/ (\w+)/)[1];
};
