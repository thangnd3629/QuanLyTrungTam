import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import About from "./components/About/About"
import Users from './containers/User/Users'
import Layout from './hoc/Layout/Layout'
import Classes from './containers/Classes/Classes'
import NewUser from './containers/User/NewUser'
import Class_info from './containers/Classes/Class_info'

class App extends Component {
    render() {
      return (
        <div>
          <Layout>
            
            <Switch>
              <Route path="/about" exact component={About} />
              <Route path="/students" exact component={Users} />
              <Route path="/classes" exact component={Classes} />
              <Route path="/classes/:id" exact component={Class_info} />
              <Route path="/newstudent" exact component={NewUser} />
            </Switch>
          </Layout>
        </div>
      );
    }
}

export default App;
