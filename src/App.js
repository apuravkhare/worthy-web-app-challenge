// import logo from './logo.svg';
import '@progress/kendo-theme-default/dist/all.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, {Component} from 'react';
import {AppDiscover} from './AppDiscover';
import {Home} from './Home';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { AppShare } from './AppShare';

export default class App extends Component {
  render() {
    return (
      <div className="App h-100">
        <Router>
          <Switch>
            <Route path="/discover">
              <AppDiscover loggedInUserId={1} />
            </Route>
            <Route path="/share">
              <AppShare loggedInUserId={1} />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

// function App() {
//   return (
//     <div className="App h-100">
//       <Router>
//         <Switch>
//           <Route path="/discover">
//             <AppDiscover loggedInUserId="" />
//           </Route>
//           <Route path="/">
//             <Home />
//           </Route>
//         </Switch>
//       </Router>
//     </div>
//   );
// }

// export default App;
