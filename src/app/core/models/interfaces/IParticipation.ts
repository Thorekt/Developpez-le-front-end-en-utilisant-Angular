/**
 * Interface representing a participation in the Olympic Games.
 */
export default interface IParticipation{
    id: number;
    year: number;
    city: string;
    medalsCount: number;
    athleteCount: number;
}