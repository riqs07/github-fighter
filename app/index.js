import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Nav from './components/Nav'
import { ThemeProvider } from './context/theme'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { battle } from './utils/api';
import Loading from './components/Loading';


const Popular = React.lazy(() => import('./components/Popular'))
const Battle = React.lazy(() => import('./components/Battle'))
const Results = React.lazy(() => import('./components/Results'))



// Component 
// State
// UI
// LifeCycle
class App extends React.Component {
    state = {
        theme: 'light',
        toggleTheme: () => {
            this.setState(({ theme }) => ({
                theme: theme === 'light' ? 'dark' : 'light'
            }))
        }
    }

    render() {
        return (

            <Router>
                <ThemeProvider value={this.state}>
                    <div className={this.state.theme}>
                        <div className="container">
                            <Nav />

                            <React.Suspense fallback={<Loading />}>
                                <Switch>
                                    <Route exact path='/' component={Popular} />
                                    <Route exact path='/battle' component={Battle} />
                                    <Route path='/battle/Results' component={Results} />
                                    <Route render={() => <h1> 404 page not found 😢😢😢</h1>} />
                                </Switch>
                            </React.Suspense>
                        </div>
                    </div>
                </ThemeProvider>
            </Router>

        )
    }

}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)