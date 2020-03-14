import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { Route, Switch, HashRouter } from 'react-router-dom'
import thunk from 'redux-thunk'

import './App.css'

import reducers from './redux/reducers'
import PageRoot from './containers/PageRoot'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

class App extends Component {
    render() {
        return (
            <div>
                <Provider store={createStoreWithMiddleware(reducers)}>
                    <HashRouter>
                        <Switch>
                            <Route path="/" component={PageRoot} />
                        </Switch>
                    </HashRouter>
                </Provider>
            </div>
        )
    }
}

export default App
