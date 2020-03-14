import React, { RefObject, Component } from 'react'
import { RouteComponentProps } from 'react-router'
import { Row, Button, Col } from 'antd'
import * as GlobalActions from '../redux/actions/GlobalActions'
import { connect } from 'react-redux'
import InputDataForm from './InputDataForm'
import DataChart from './DataChart'
import { InputParams, PersonState, SimulationPoint } from '../calculator/Models'
import Utils from '../utils/Utils'
import Calculator from '../calculator/Calculator'
import ModelDescription from './ModelDescription'

const ENTIRE_SIZE = 5000
const TOTAL_DAYS = 150
const TOTAL_SIMULATIONS = 10

interface RootPageInterface extends RouteComponentProps<any> {
    rootElementKey: string
    emitSizeChanged: () => void
    isMobile: boolean
}

class PageRoot extends Component<
    RootPageInterface,
    {
        collapsed: boolean
        formInputData: InputParams
        sickCountAtDay: SimulationPoint[]
    }
> {
    private mainContainer: RefObject<HTMLDivElement>

    constructor(props: any) {
        super(props)
        this.mainContainer = React.createRef()
        this.state = {
            sickCountAtDay: [],
            collapsed: false,
            formInputData: {
                closeCircleSize: 2,
                randomPeopleMetDaily: 2,
                chanceOfDangerousContactWithCloseCirclePreSymptoms: 25,
                chanceOfDangerousContactWithCloseCirclePostSymptoms: 5,
                chanceOfDangerousContactWithRandomPeoplePreSymptoms: 2,
                chanceOfDangerousContactWithRandomPeoplePostSymptoms: 1,
                dayWithoutSymptoms: 4,
                dayWithSymptoms: 10,
                entirePopulationSize: ENTIRE_SIZE,
                initialSickPopulation: 5
            }
        }

        setTimeout(() => {
            this.runSimulation()
        }, 700)
    }

    updateDimensions = () => this.props.emitSizeChanged()

    componentWillUnmount() {
        if (super.componentWillUnmount) {
            super.componentWillUnmount()
        }
        this.updateDimensions()
        window.removeEventListener('resize', this.updateDimensions)
    }

    componentDidUpdate(prevProps: any) {
        // Typical usage (don't forget to compare props):
        if (this.props.location.pathname !== prevProps.location.pathname && this.props.isMobile) {
            this.setState({ collapsed: true })
        }
    }

    componentDidMount() {
        this.updateDimensions()
        window.addEventListener('resize', this.updateDimensions)
    }

    runSimulation() {
        const self = this

        const simulationRuns: any = []

        for (let i = 0; i < TOTAL_SIMULATIONS; i++) {
            const calculator = new Calculator(Utils.copyObject(self.state.formInputData))
            for (let index = 0; index < TOTAL_DAYS; index++) {
                calculator.runOneDay()
                const sickPeopleCount =
                    ENTIRE_SIZE -
                    calculator.people.filter(it => {
                        return it.state === PersonState.NORMAL
                    }).length
                simulationRuns.push({ day: calculator.dayNow, sickPeopleCount })
            }
        }

        const sumSickAtDay: number[] = []

        for (let index = 0; index < TOTAL_DAYS; index++) {
            simulationRuns.forEach((element: any) => {
                if (element.day === index + 1) {
                    sumSickAtDay[index] = (sumSickAtDay[index] ? sumSickAtDay[index] : 0) + element.sickPeopleCount
                }
            })
        }

        const avgAtDay: number[] = sumSickAtDay.map(it => {
            return (it / TOTAL_SIMULATIONS) * (100 / ENTIRE_SIZE)
        })

        const newAtDay: number[] = []
        for (let index = 0; index < avgAtDay.length; index++) {
            const element = avgAtDay[index]

            if (index === 0) {
                newAtDay.push(element)
                continue
            }

            newAtDay.push(Math.max(0, element - avgAtDay[index - 1]))
        }

        while (avgAtDay.length) {
            avgAtDay.pop()
        }

        for (let index = 0; index < newAtDay.length; index++) {
            const before = index > 0 ? avgAtDay[index - 1] : 0
            avgAtDay.push(newAtDay[index] + before)
        }

        const simulationResult: SimulationPoint[] = []

        const totalSickDays = self.state.formInputData.dayWithSymptoms + self.state.formInputData.dayWithoutSymptoms

        for (let index = 0; index < newAtDay.length; index++) {
            const element = avgAtDay[index]
            simulationResult.push({
                totalCases: element,
                activeCaseCount: element - (index >= totalSickDays ? avgAtDay[index - totalSickDays] : 0)
            })
        }

        self.setState({ sickCountAtDay: simulationResult })
    }

    render() {
        const self = this
        const formInputData = self.state.formInputData
        return (
            <div
                key={self.props.rootElementKey}
                ref={self.mainContainer}
                style={{
                    padding: self.props.isMobile ? 10 : 35
                }}
            >
                <Row type="flex" justify="center">
                    <h2>Coronavirus Spread Simulator</h2>
                </Row>
                <Row type="flex" justify="center">
                    <p>
                        <small>
                            <i>
                                The model is{' '}
                                <a
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    href="https://github.com/githubsaturn/covid19-spread-simulator"
                                    aria-label="Star on GitHub"
                                >
                                    open-sourced
                                </a>
                                . See model description and disclaimer below.
                            </i>
                        </small>
                    </p>
                </Row>
                <Row type="flex" justify="center">
                    <Col lg={{ span: 10 }}>
                        <p>
                            The goal of this model is to show how easy it is to completely overwhelm the healthcare system and cause tens of
                            thousands of lives being compromised. Simply change random people met daily from 2 to 3 and observe the load on
                            healthcare system!
                        </p>
                        <p>
                            <b>REMEMBER:</b> The goal is to flatten the curve! If you aren't unsure why, this{' '}
                            <a
                                rel="noopener noreferrer"
                                target="_blank"
                                href="https://www.npr.org/sections/health-shots/2020/03/13/815502262/flattening-a-pandemics-curve-why-staying-home-now-can-save-lives"
                            >
                                article
                            </a>{' '}
                            explains why this is extremely crucial now.
                        </p>
                    </Col>
                </Row>

                <div style={{ height: 30 }} />

                <InputDataForm
                    updateModel={data => {
                        self.setState({ formInputData: Utils.copyObject(data) })
                    }}
                    formInputData={formInputData}
                />
                <div style={{ height: 10 }} />
                <Row type="flex" align="middle" justify="center">
                    <Button
                        onClick={() => {
                            self.runSimulation()
                        }}
                        type="primary"
                        shape="round"
                        icon="bar-chart"
                        size="large"
                    >
                        Recalculate
                    </Button>
                </Row>
                <div style={{ height: 30 }} />
                <DataChart sickCountAtDay={self.state.sickCountAtDay} />
                <div style={{ height: 80 }} />

                <ModelDescription />
            </div>
        )
    }
}

function mapStateToProps(state: any) {
    return {
        rootElementKey: state.globalReducer.rootElementKey,
        isMobile: state.globalReducer.isMobile
    }
}

export default connect(mapStateToProps, {
    emitSizeChanged: GlobalActions.emitSizeChanged
})(PageRoot)
