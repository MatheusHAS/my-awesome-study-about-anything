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
