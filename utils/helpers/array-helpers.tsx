export const compareArrays = (array1: any[], array2: any[]) => {
  if (array1.length !== array2.length) return false;
  const neww = (object: any) =>
    JSON.stringify(
      Object.keys(object)
        .sort()
        .map((key) => [key, object[key]])
    );
  const arraySet = new Set(array1.map(neww));
  return array2.every((object) => arraySet.has(neww(object)));
};

export const filterArray = (array: any[], property: any) => {
  return array
    .filter((item) => item.name == property)
    .map((s) => {
      return s.value;
    });
};

export const removeDuplicates = (array: any[]) => {
  // @ts-ignore
  return [...new Set(array)];
};

export const randomize = (array: any[]) => {
  return [...array].sort(() => 0.5 - Math.random());
};
