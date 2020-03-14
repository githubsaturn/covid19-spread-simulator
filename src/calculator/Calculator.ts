import { InputParams, Person, PersonState } from './Models'

export default class Calculator {
    people: Person[] = []
    dayNow: number = 0

    constructor(private inputParams: InputParams) {
        inputParams.chanceOfDangerousContactWithCloseCirclePostSymptoms /= 100.0
        inputParams.chanceOfDangerousContactWithCloseCirclePreSymptoms /= 100.0
        inputParams.chanceOfDangerousContactWithRandomPeoplePostSymptoms /= 100.0
        inputParams.chanceOfDangerousContactWithRandomPeoplePreSymptoms /= 100.0

        for (let index = 0; index < inputParams.entirePopulationSize; index++) {
            this.people.push({
                state: PersonState.NORMAL
            })
        }

        for (let index = 0; index < inputParams.initialSickPopulation; index++) {
            const randomPerson = this.people[this.getRandomBound(0, inputParams.entirePopulationSize)]
            randomPerson.state = PersonState.SICK
            randomPerson.dayGotSick = 0
        }
    }

    getRandomBound(startInclusive: number, endExclusive: number) {
        return Math.floor(Math.random() * (endExclusive - startInclusive) + startInclusive)
    }

    runOneDay() {
        this.dayNow = this.dayNow + 1
        for (let index = 0; index < this.inputParams.entirePopulationSize; index++) {
            if (this.people[index].state === PersonState.SICK) {
                this.runOneDayForPatient(index)
            }
        }
    }

    private makePersonSick(closeIndex: number) {
        this.people[closeIndex].state = PersonState.SICK
        this.people[closeIndex].dayGotSick = this.dayNow
    }

    private runOneDayForPatient(patientIndex: number) {
        const closeCircleSizePlusOne = this.inputParams.closeCircleSize + 1
        const daysGotSick = this.people[patientIndex].dayGotSick
        if (daysGotSick !== 0 && !daysGotSick) {
            throw new Error('Patient should be sick!')
        }

        for (let index = 0; index < closeCircleSizePlusOne; index++) {
            let closeIndex = patientIndex - Math.floor(closeCircleSizePlusOne / 2) + index

            if (closeIndex === patientIndex) {
                continue
            }

            if (closeIndex < 0) {
                closeIndex = closeIndex + this.inputParams.entirePopulationSize
            }

            if (closeIndex >= this.inputParams.entirePopulationSize) {
                closeIndex = closeIndex - this.inputParams.entirePopulationSize
            }

            if (this.people[closeIndex].state === PersonState.NORMAL) {
                // yikes!

                if (daysGotSick + this.inputParams.dayWithoutSymptoms > this.dayNow) {
                    // before symptoms
                    if (Math.random() < this.inputParams.chanceOfDangerousContactWithCloseCirclePreSymptoms) {
                        this.makePersonSick(closeIndex)
                    }
                } else {
                    // after symptoms
                    if (Math.random() < this.inputParams.chanceOfDangerousContactWithCloseCirclePostSymptoms) {
                        this.makePersonSick(closeIndex)
                    }
                }
            }
        }

        for (let index = 0; index < this.inputParams.randomPeopleMetDaily; index++) {
            const indexInDanger = this.getRandomBound(0, this.inputParams.entirePopulationSize)

            if (this.people[indexInDanger].state === PersonState.NORMAL) {
                // yikes!

                if (daysGotSick + this.inputParams.dayWithoutSymptoms > this.dayNow) {
                    // before symptoms
                    if (Math.random() < this.inputParams.chanceOfDangerousContactWithRandomPeoplePreSymptoms) {
                        this.makePersonSick(indexInDanger)
                    }
                } else {
                    // after symptoms
                    if (Math.random() < this.inputParams.chanceOfDangerousContactWithRandomPeoplePostSymptoms) {
                        this.makePersonSick(indexInDanger)
                    }
                }
            }
        }

        if (this.dayNow === this.inputParams.dayWithSymptoms + this.inputParams.dayWithoutSymptoms + daysGotSick) {
            this.people[patientIndex].state = PersonState.POST_SICK
        }
    }
}
