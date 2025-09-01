/**
 * Class representing data for display in a data displayer component.
 */
export default class DataDisplayerData {
  constructor(
    public title: string,
    public data: {name: string, value: string}[]
  ) {}
}
