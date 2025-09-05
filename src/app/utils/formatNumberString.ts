export default function formatNumber(num: number | string): string {
  return new Intl.NumberFormat("en-US").format(Number(num));
}
