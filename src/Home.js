import './App.css';
import Script from "react-inline-script"
import React from 'react'

function setupTheMap() {
}


export default class Home extends React.Component {
    constructor(props) {
        super(props)
    }

    render () {
        return (
            <div>
                <div>
                    <div id="map"></div>
                </div>
                <Script>
                    alert(123);
                </Script>
            </div>
        )
    };
}

// export default Home;
