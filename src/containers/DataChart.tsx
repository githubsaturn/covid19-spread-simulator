import React, { PureComponent } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts'
import { Col, Row } from 'antd'
import { SimulationPoint } from '../calculator/Models'

export default class DataChart extends PureComponent<
    {
        sickCountAtDay: SimulationPoint[]
    },
    any
> {
    state = {
        opacity: {
            uv: 1,
            pv: 1
        }
    }

    handleMouseEnter = (o: any) => {
        const { dataKey } = o
        const { opacity } = this.state

        this.setState({
            opacity: { ...opacity, [dataKey]: 0.5 }
        })
    }

    handleMouseLeave = (o: any) => {
        const { dataKey } = o
        const { opacity } = this.state

        this.setState({
            opacity: { ...opacity, [dataKey]: 1 }
        })
    }

    render() {
        const { opacity } = this.state

        if (!this.props.sickCountAtDay.length) {
            return <div style={{ height: 350 }} />
        }

        const data: Array<{
            x: number
            hypotheticalHealthCareCapacity: number
            totalInfectedPercent: number
            activeCases: number
        }> = []
        for (let index = 0; index < this.props.sickCountAtDay.length; index++) {
            const element = this.props.sickCountAtDay[index]
            data.push({
                x: index,
                hypotheticalHealthCareCapacity: 25,
                totalInfectedPercent: element.totalCases,
                activeCases: element.activeCaseCount
            })
        }
        console.log(data)

        return (
            <div>
                <Row>
                    <Col lg={{ span: 24 }}>
                        <ResponsiveContainer height={350} width="100%">
                            <LineChart
                                data={data}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis label="Day" angle={45} dy={10} height={80} dataKey="x" />
                                <YAxis hide={true} domain={[0, 100]} />
                                <Legend onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} />
                                <Line
                                    name="Total Infected"
                                    type="monotone"
                                    dataKey="totalInfectedPercent"
                                    strokeOpacity={opacity.pv}
                                    stroke="#8884d8"
                                    activeDot={{ r: 8 }}
                                />
                                <Line
                                    name="Ongoing Cases"
                                    type="monotone"
                                    dataKey="activeCases"
                                    strokeOpacity={opacity.uv}
                                    stroke="#0084d8"
                                    activeDot={{ r: 8 }}
                                />
                                <Line
                                    name="Healthcare System Capacity"
                                    type="monotone"
                                    dataKey="hypotheticalHealthCareCapacity"
                                    strokeOpacity={opacity.uv}
                                    stroke="#ff84ff"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </Col>
                </Row>
            </div>
        )
    }
}
