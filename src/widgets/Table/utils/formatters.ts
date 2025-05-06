/**
 * Format a number as currency
 * @param value - The number to format
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number | null | undefined): string => {
  if (value == null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

/**
 * Format a number or return a placeholder if null/undefined
 * @param value - The number to format
 * @returns Formatted number string or placeholder
 */
export const formatNumber = (value: number | null | undefined): string => {
  return String(value ?? "—");
};

/**
 * Format an array of numbers or nulls as a comma-separated string
 * @param values - Array of numbers or nulls
 * @returns Comma-separated string of non-null values
 */
export const formatArray = (
  values: Array<number | null> | null | undefined,
): string => {
  if (!values) return "—";
  return values.filter((n) => n != null).join(", ");
};
