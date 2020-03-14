export interface InputParams {
    closeCircleSize: number
    randomPeopleMetDaily: number
    chanceOfDangerousContactWithCloseCirclePreSymptoms: number
    chanceOfDangerousContactWithCloseCirclePostSymptoms: number
    chanceOfDangerousContactWithRandomPeoplePreSymptoms: number
    chanceOfDangerousContactWithRandomPeoplePostSymptoms: number
    dayWithoutSymptoms: number
    dayWithSymptoms: number
    entirePopulationSize: number
    initialSickPopulation: number
}

export enum PersonState {
    NORMAL,
    SICK,
    POST_SICK
}

export interface Person {
    state: number
    dayGotSick?: number
}

export interface SimulationPoint {
    activeCaseCount: number
    totalCases: number
}
