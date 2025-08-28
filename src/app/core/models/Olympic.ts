
/*
example of an olympic country:
{
    id: 1,
    country: "Italy",
    participations: []
}
*/

import Participation from "./Participation";


/**
 * class representing an Olympic country.
 */
export default class OlympicCountry{
    constructor(
        public id: number,
        public country: string,
        public participations: Participation[]
    ) {}
}