export const slugSizeToNumber = (
  size: string | string[] | undefined | number
) => {
  if (size) {
    return parseInt(size as string);
  } else {
    return 0;
  }
};

export const slugStyleToNumber = (
  style: string | string[] | undefined | number
) => {
  if (style) {
    return parseInt(style as string);
  } else {
    return 0;
  }
};
