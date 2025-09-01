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

    /**
     * Creates an Olympic instance from the service data.
     * @param data The service data to transform.
     * @returns An Olympic instance.
     */
    static fromServiceData(data: IOlympic) {
        return new Olympic(
            data.id,
            data.country,
            data.participations.map(p => Participation.fromServiceData(p))
        );
    }

    /**
     * Gets the total number of medals won by the country.
     * @returns The total number of medals.
     */
    getTotalMedals(): number {
        return this.participations.reduce((total: number, p: Participation) => total + p.medalsCount, 0);
    }

    /**
     * Gets all unique participation years.
     * @returns An array of unique participation years.
     */
    getAllParticipationYears(): number[] {
        let years: number[] = [];
        this.participations.forEach((p: Participation) => {
            if (!years.includes(p.year)) {
                years.push(p.year);
            }
        });
        return years;
    }

    /**
     * Gets the total number of participations.
     * @returns The total number of participations.
     */
    getTotalParticipations(): number {
        return this.participations.length;
    }

    /**
     * Gets the total number of athletes.
     * @returns The total number of athletes.
     */
    getTotalAthletes(): number {
        return this.participations.reduce((total: number, p: Participation) => total + p.athleteCount, 0);
    }
}

