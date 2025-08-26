
/*
example of an olympic country:
{
    id: 1,
    country: "Italy",
    participations: []
}
*/

import { IParticipation } from "./Participation";


/**
 * Interface representing an Olympic country.
 */
export interface IOlympicCountry{
    id: number;
    country: string;
    participations: IParticipation[];
}