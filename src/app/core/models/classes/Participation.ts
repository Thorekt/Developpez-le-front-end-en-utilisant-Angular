import IParticipation from "../interfaces/IParticipation";

/**
 * class representing a participation in the Olympic Games.
 */
export default class Participation{

    constructor(
        public id: number,
        public year: number,
        public city: string,
        public medalsCount: number,
        public athleteCount: number
    ) {}

    static fromServiceData(data: IParticipation) {
        return new Participation(
            data.id,
            data.year,
            data.city,
            data.medalsCount,
            data.athleteCount
        );
    }
}
