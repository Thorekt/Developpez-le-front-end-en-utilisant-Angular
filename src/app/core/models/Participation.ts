/*
example of participation:
{
    id: 1,
    year: 2012,
    city: "Londres",
    medalsCount: 28,
    athleteCount: 372
}
*/

/**
 * Interface representing a participation in the Olympic Games.
 */
export interface IParticipation{
    id: number;
    year: number;
    city: string;
    medalsCount: number;
    athleteCount: number;
}
