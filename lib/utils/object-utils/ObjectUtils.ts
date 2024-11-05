const mergeObjectsOverwriteNullUndefined = (obj1: any, obj2: any) => {
  return Object.fromEntries(
    Object.entries({ ...obj1, ...obj2 }).map(([key]) => {
      const finalValue = obj2[key] !== null && obj2[key] !== undefined ? obj2[key] : obj1[key];
      return [key, finalValue];
    })
  );
};

export { mergeObjectsOverwriteNullUndefined };
