import {Switch, Redirect, Route} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import JobDetailsView from './components/JobDetailsView'
import NotFound from './components/NotFound'
import Jobs from './components/Jobs'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/jobs" component={Jobs} />
    <Route exact path="/jobs/:id" component={JobDetailsView} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
