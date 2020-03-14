import { Component } from 'react'
import { Row, Col } from 'antd'
import React from 'react'

export default class ModelDescription extends Component<any, any> {
    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <h3>A Simple Monte Carlo Take on Coronavirus Community Spread</h3>
                        <p>
                            The model is open source and the source code is available on{' '}
                            <a
                                rel="noopener noreferrer"
                                target="_blank"
                                href="https://github.com/githubsaturn/covid19-spread-simulator"
                                aria-label="Star on GitHub"
                            >
                                GitHub
                            </a>
                        </p>

                        <iframe
                            title="GitHub button"
                            src="https://ghbtns.com/github-btn.html?user=githubsaturn&repo=covid19-spread-simulator&type=star&count=false&size=large"
                            scrolling="0"
                            frameBorder={0}
                            width="160px"
                            height="30px"
                        ></iframe>
                        <div style={{ height: 30 }} />
                        <p>
                            This model uses a simple Monte Carlo approach to simulate what happens in a community and how the virus gets
                            people infected. This model runs random numbers for each day and based on randomized numbers it decides whether
                            or not an individual is infected. Since the basis of this model is based on Monte Carlo method, we need to run
                            the simulation many times and calculate the average. For the purpose of this browser based simulator, a total
                            population of 5000 is being simulated for 150 days. The simulation gets repeated 10 times and the average
                            numbers will be plotted on the graph.
                        </p>
                        <p>The input to this model are as follows:</p>
                        <ul>
                            {this.createInputDescription(
                                'Close Circle Size',
                                'Simply the average number of close contacts that a person has'
                            )}
                            {this.createInputDescription(
                                'Random People Met Daily',
                                'Simply the average number of random people that a person meets per day'
                            )}
                            {this.createInputDescription(
                                'Infected days without symptoms',
                                'The number of days that an infected person is infectious before displaying any symptoms'
                            )}
                            {this.createInputDescription(
                                'Infected days after showing symptoms',
                                'The number of days that the patient remains infectious after displaying symptoms'
                            )}
                            {this.createInputDescription(
                                'Chance of infecting close contact before becoming symptomatic PER DAY',
                                'This indicates the chance of infecting a close contact person per day before displaying symptoms. For example, if the chance is 20% per day, the chance of infecting this person eventually over a span of 14 days, for example, is 1 - 0.8^14, or 95%.'
                            )}
                            {this.createInputDescription(
                                'Chance of infecting close contact after becoming symptomatic PER DAY',
                                'Similar to above, except, this is an indicator for the chance "after being symptomatic". This essentially a lower number due to the natural extra care taken by people when they are sick such as being more careful to not spread the germs'
                            )}
                            {this.createInputDescription(
                                'Chance of infecting random contact before becoming symptomatic PER DAY',
                                'Similar to the close circle one, except this is for random people, like a person sitting next to you on subway. This is essentially a lower number as there is a lower chance of you making a risky contact with a random person. Usually the non close contact risk comes from touching the same objects, such as hand rails and etc.'
                            )}
                            {this.createInputDescription(
                                'Chance of infecting random person after symptoms PER DAY',
                                'Similar to the previous one, except this is for after being symptomatic. This is the lowest number as, usually, when people get sick they avoid going to public'
                            )}
                        </ul>
                        <p>DISCLAIMER: This model is only for demonstration only and it has not been clinically verified.</p>
                    </Col>
                </Row>
            </div>
        )
    }

    createInputDescription(title: string, description: string) {
        return (
            <li>
                <h3>{title}:</h3>
                <p>{description}</p>
            </li>
        )
    }
}
