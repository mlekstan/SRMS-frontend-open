export function toValidString(value: string | number | null | boolean) {
  return (value === null || value === undefined) ? "" : String(value); 
}