import Participation from "./Participation";
import IOlympic from "../interfaces/IOlympic";


/**
 * class representing an Olympic country.
 */
export default class Olympic{
    constructor(
        public id: number,
        public country: string,
        public participations: Participation[]
    ) {}

    static fromServiceData(data: IOlympic) {
        return new Olympic(
            data.id,
            data.country,
            data.participations.map(p => Participation.fromServiceData(p))
        );
    }

    getTotalMedals(): number {
        return this.participations.reduce((total, p) => total + p.medalsCount, 0);
    }

    getAllParticipationYears(): number[] {
        let years: number[] = [];
        this.participations.forEach(p => {
            if (!years.includes(p.year)) {
                years.push(p.year);
            }
        });
        return years;
    }

    getTotalParticipations(): number {
        return this.participations.length;
    }

    getTotalAthletes(): number {
        return this.participations.reduce((total, p) => total + p.athleteCount, 0);
    }
}

