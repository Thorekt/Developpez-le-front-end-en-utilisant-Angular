import IParticipation from "./IParticipation";

/**
 * Interface representing an Olympic country.
 */
export default interface IOlympic{
    id: number;
    country: string;
    participations: IParticipation[];
}