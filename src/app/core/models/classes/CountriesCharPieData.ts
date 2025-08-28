/**
 * Represents the data structure for a pie chart displaying countries and their medal counts.
 */
export default class CountriesCharPieData {
  constructor(
    public labels: string[],
     public datasets: { data: number[] }[]
    ) {}
}