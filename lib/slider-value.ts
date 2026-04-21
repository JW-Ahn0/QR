/** Base UI Slider `onValueChange` 단일 썸 값 정규화 */
export function sliderFirst(
  value: number | readonly number[] | undefined,
  fallback: number,
): number {
  if (value === undefined) return fallback;
  if (typeof value === "number") return value;
  return value[0] ?? fallback;
}
