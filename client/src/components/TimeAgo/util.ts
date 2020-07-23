export const isDefined = (value: any): boolean =>
  typeof value !== undefined && value !== null;

export const coerceBooleanProperty = (value: any): boolean =>
  value != null && `${value}` !== "false";

export const dateParser = (date: any): Date => {
  const parsed = new Date(date);
  if (!Number.isNaN(parsed.valueOf())) {
    return parsed;
  }
  const parts: string[] | null = String(date).match(/\d+/g);

  if (parts === null || parts.length <= 2) {
    return parsed;
  } else {
    const [firstP, secondP, ...restPs] = parts.map((x) => parseInt(x, 10));
    return new Date(Date.UTC(firstP, secondP - 1, ...restPs));
  }
};

export const MINUTE = 60;
export const HOUR = MINUTE * 60;
export const DAY = HOUR * 24;
export const WEEK = DAY * 7;
export const MONTH = DAY * 30;
export const YEAR = DAY * 365;
