/**
 * Represents the data structure for a pie chart displaying countries and their medal counts.
 */
export default class CountriesCharPieData {
  constructor(
    public data: {
      id: number,
      label: string,
      value: number
    }[]
  ) {}
}