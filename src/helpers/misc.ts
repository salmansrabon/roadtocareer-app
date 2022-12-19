export const removeEmptyValues = <T = {}>(
  obj: T,
  { includeEmptyString = true, includeNull = true } = {}
) => {
  const newObj = { ...obj };

  Object.keys(newObj).forEach((key) => {
    if (
      newObj[key] === undefined ||
      (includeNull && newObj[key] === null) ||
      (includeEmptyString && newObj[key] === "")
    ) {
      delete newObj[key];
    }
  });

  return newObj;
};

export const removeEmptyValuesDeepNested = <T = {}>(obj: T) => {
  const newObj = { ...obj };

  Object.keys(newObj).forEach((key) => {
    if (newObj[key] === undefined || newObj[key] === null) {
      delete newObj[key];
    } else if (typeof newObj[key] === "object") {
      newObj[key] = removeEmptyValuesDeepNested(newObj[key]);
    }
  });

  return newObj;
};
