/**
 * Represents the data structure for a pie chart displaying countries and their medal counts.
 */
export default class CountryLineChartData {
  constructor(
    public labels: number[],
    public data: number[]
  ) {}
}