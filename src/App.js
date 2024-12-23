import {Switch, Route, Redirect} from 'react-router-dom'

import Home from './components/Home'
import Login from './components/Login'
import NotFound from './components/NotFound'
import FeaturedPlaylistDetails from './components/FeaturedPlaylistDetails'
import CategoriesPlaylistDetails from './components/CategoriesPlaylistDetails'
import NewReleasesDetails from './components/NewReleasesDetails'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute
        exact
        path="/playlist/:id"
        component={FeaturedPlaylistDetails}
      />
      <ProtectedRoute
        exact
        path="/category/:id"
        component={CategoriesPlaylistDetails}
      />
      <ProtectedRoute exact path="/album/:id" component={NewReleasesDetails} />
      <Route exact path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </>
)

export default App
