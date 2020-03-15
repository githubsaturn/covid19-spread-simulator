import { Col, Input, Row } from 'antd'
import React, { Component } from 'react'
import Utils from '../utils/Utils'
import { InputParams } from '../calculator/Models'

export default class InputDataForm extends Component<{
    formInputData: InputParams
    updateModel: (formInputData: InputParams) => void
}> {
    render() {
        const self = this
        const formInputData = this.props.formInputData
        return (
            <div>
                <Row type="flex" gutter={20} align="bottom" justify="center">
                    <Col xs={{ span: 12 }} lg={{ span: 4 }}>
                        Close Circle Size
                        <Row>
                            <Input
                                style={{ maxWidth: 100 }}
                                type="number"
                                min={0}
                                max={100}
                                value={formInputData.closeCircleSize || ''}
                                onChange={e => {
                                    const innerData = Utils.copyObject(this.props.formInputData)
                                    innerData.closeCircleSize = Number(e.target.value)
                                    self.props.updateModel(innerData)
                                }}
                            />
                        </Row>
                    </Col>

                    <Col xs={{ span: 12 }} lg={{ span: 4 }}>
                        Random People Met Daily
                        <Row>
                            <Input
                                style={{ maxWidth: 100 }}
                                type="number"
                                min={0}
                                max={100}
                                value={formInputData.randomPeopleMetDaily || ''}
                                onChange={e => {
                                    const innerData = Utils.copyObject(this.props.formInputData)
                                    innerData.randomPeopleMetDaily = Number(e.target.value)
                                    self.props.updateModel(innerData)
                                }}
                            />
                        </Row>
                    </Col>

                    <Col xs={{ span: 12 }} lg={{ span: 4 }}>
                        Infected days without symptoms
                        <Row>
                            <Input
                                style={{ maxWidth: 100 }}
                                type="number"
                                min={0}
                                max={100}
                                value={formInputData.dayWithoutSymptoms || ''}
                                onChange={e => {
                                    const innerData = Utils.copyObject(this.props.formInputData)
                                    innerData.dayWithoutSymptoms = Number(e.target.value)
                                    self.props.updateModel(innerData)
                                }}
                            />
                        </Row>
                    </Col>

                    <Col xs={{ span: 12 }} lg={{ span: 4 }}>
                        Infected days after showing symptoms
                        <Row>
                            <Input
                                style={{ maxWidth: 100 }}
                                type="number"
                                min={0}
                                max={100}
                                value={formInputData.dayWithSymptoms || ''}
                                onChange={e => {
                                    const innerData = Utils.copyObject(this.props.formInputData)
                                    innerData.dayWithSymptoms = Number(e.target.value)
                                    self.props.updateModel(innerData)
                                }}
                            />
                        </Row>
                    </Col>
                </Row>
                <br />
                <Row type="flex" gutter={20} align="bottom" justify="center">
                    <p>
                        <i>All chance percentages below are per person per day</i>
                    </p>
                </Row>
                <Row type="flex" gutter={20} align="bottom" justify="center">
                    <Col xs={{ span: 12 }} lg={{ span: 4 }}>
                        {`%`} Chance of infecting close contact before becoming symptomatic
                        <Row>
                            <Input
                                style={{ maxWidth: 100 }}
                                type="number"
                                suffix="%"
                                min={0}
                                max={100}
                                value={formInputData.chanceOfDangerousContactWithCloseCirclePreSymptoms || ''}
                                onChange={e => {
                                    const innerData = Utils.copyObject(this.props.formInputData)
                                    let newVal = Number(e.target.value)
                                    if (newVal > 100) {
                                        newVal = 100
                                    }
                                    innerData.chanceOfDangerousContactWithCloseCirclePreSymptoms = newVal
                                    self.props.updateModel(innerData)
                                }}
                            />
                        </Row>
                    </Col>

                    <Col xs={{ span: 12 }} lg={{ span: 4 }}>
                        {`%`} Chance of infecting close contact after becoming symptomatic
                        <Row>
                            <Input
                                style={{ maxWidth: 100 }}
                                type="number"
                                suffix="%"
                                min={0}
                                max={100}
                                value={formInputData.chanceOfDangerousContactWithCloseCirclePostSymptoms || ''}
                                onChange={e => {
                                    const innerData = Utils.copyObject(this.props.formInputData)
                                    let newVal = Number(e.target.value)
                                    if (newVal > 100) {
                                        newVal = 100
                                    }
                                    innerData.chanceOfDangerousContactWithCloseCirclePostSymptoms = newVal
                                    self.props.updateModel(innerData)
                                }}
                            />
                        </Row>
                    </Col>

                    <Col xs={{ span: 12 }} lg={{ span: 4 }}>
                        {`%`} Chance of infecting random contact before becoming symptomatic
                        <Row>
                            <Input
                                style={{ maxWidth: 100 }}
                                type="number"
                                suffix="%"
                                min={0}
                                max={100}
                                value={formInputData.chanceOfDangerousContactWithRandomPeoplePreSymptoms || ''}
                                onChange={e => {
                                    const innerData = Utils.copyObject(this.props.formInputData)
                                    let newVal = Number(e.target.value)
                                    if (newVal > 100) {
                                        newVal = 100
                                    }
                                    innerData.chanceOfDangerousContactWithRandomPeoplePreSymptoms = newVal
                                    self.props.updateModel(innerData)
                                }}
                            />
                        </Row>
                    </Col>

                    <Col xs={{ span: 12 }} lg={{ span: 4 }}>
                        {`%`} Chance of infecting random person after becoming symptomatic
                        <Row>
                            <Input
                                style={{ maxWidth: 100 }}
                                type="number"
                                suffix="%"
                                min={0}
                                max={100}
                                value={formInputData.chanceOfDangerousContactWithRandomPeoplePostSymptoms || ''}
                                onChange={e => {
                                    const innerData = Utils.copyObject(this.props.formInputData)
                                    let newVal = Number(e.target.value)
                                    if (newVal > 100) {
                                        newVal = 100
                                    }
                                    innerData.chanceOfDangerousContactWithRandomPeoplePostSymptoms = newVal
                                    self.props.updateModel(innerData)
                                }}
                            />
                        </Row>
                    </Col>
                </Row>
                <br />
            </div>
        )
    }
}
