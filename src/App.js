import { HashRouter, Switch, Route } from 'react-router-dom'
import React, {Component} from "react";
import Home from './Components/Home';
import Search from './Components/Search';
import GeomanPage from './Components/GeomanPage';
import 'leaflet/dist/leaflet.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange (e) {
        this.setState(prevState => {
                return {searchTerm: e.target.value}
            }
        );
    }

    render() {
        // adjust img url
        const baseUrl = window.location.origin;
        const preFolderName = 'kartes/media/';
        const pathToImg = baseUrl + '/' + preFolderName;

        // map constants
        const bounds = [[0,0], [1000, 1000]]
        const center = [500,500]
        const layers = {
            0: {
                name: "0. stāvs",
                imageName: ""
            },
            1: {
                name: "1. stāvs",
                imageName: "zm1.svg"
            },
            2: {
                name: "2. stāvs",
                imageName: "zm2.svg"
            },
            3: {
                name: "3. stāvs",
                imageName: "zm3.svg"
            },
            4: {
                name: "4. stāvs",
                imageName: "zm4.svg"
            },
            5: {
                name: "5. stāvs",
                imageName: "zm5.svg"
            },
            6: {
                name: "6. stāvs",
                imageName: "zm6.svg"
            },
            7: {
                name: "7. stāvs",
                imageName: "zm7.svg"
            },
            8: {
                name: "8. stāvs",
                imageName: "zm8.svg"
            },

        }

        return (
            <>
                <HashRouter>
                    <Switch>
                        <Route exact path='/geoman' render={(props) => (<GeomanPage {...props} pathToImg={pathToImg} bounds={bounds} center={center} theLayers={layers} />)}/>
                        <Route exact path='/search' render={(props) => (<Search {...props} pathToImg={pathToImg} bounds={bounds} center={center} theLayers={layers} />)}/>
                        {/*<Route exact path='/header' render={(props) => (<Header {...props} pathToImg={pathToImg}/>)}/>*/}
                        <Route exact path='/:floor?/:id?' render={(props) => (<Home {...props} pathToImg={pathToImg} bounds={bounds} center={center} theLayers={layers} />)}/>
                        <Route status={404}>
                            <div>Page not found.</div>
                        </Route>
                    </Switch>


                    {/*<Link to="/">*/}
                    {/*    <Button size="xs" m={1} colorScheme="blue">Home</Button>*/}
                    {/*</Link>*/}
                    {/*<Link to="/geoman">*/}
                    {/*    <Button size="xs" m={1} colorScheme="blue">Geoman</Button>*/}
                    {/*</Link>*/}
                    {/*<Link to="/search">*/}
                    {/*    <Button size="xs" m={1} colorScheme="blue">Search</Button>*/}
                    {/*</Link>*/}
                    {/*<Link to="/512">*/}
                    {/*    <Button size="xs" m={1} colorScheme="blue">Search for #512</Button>*/}
                    {/*</Link>*/}
                </HashRouter>
            </>
        )
    }
}

export default App;
