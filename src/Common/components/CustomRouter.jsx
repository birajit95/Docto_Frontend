import {Route, Switch} from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Logout from '../../Auth/components/LogOut';
import { useHistory } from 'react-router';


function CustomRouter() {
    const history = useHistory()
    return (
        <>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/login">
                    {localStorage.getItem('accessToken')? history.push('/dashboard'): history.push('/login')}
                </Route>
                <Route exact path='/logout' component={Logout} />
            </Switch>
        </>
    )
}

export default CustomRouter
