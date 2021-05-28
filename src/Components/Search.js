import React, {useEffect, useState} from "react";

// inspired by https://codesandbox.io/s/practical-nightingale-m2b5n?file=/src/index.js

function Search() {
    const [error, setError] = useState(null);
    const [isSearchLoaded, setSearchIsLoaded] = useState(false);
    const [searchItems, setSearchItems] = useState([]);

    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);
    const handleChange = e => {
        setSearchTerm(e.target.value);
    };


    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        fetch("/kartes/data.json")
            .then(res => res.json())
            .then(
                (result) => {
                    setSearchIsLoaded(true);
                    setSearchItems(result);
                },
                (error) => {
                    setSearchIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

        React.useEffect(() => {
            if (isSearchLoaded) {
                const results = searchItems["features"].filter(feature => {
                        return feature["properties"]["roomID"].toLowerCase().includes(searchTerm.toLowerCase()) ||
                            feature["properties"]["roomType"].toLowerCase().includes(searchTerm.toLowerCase());
                    }
                )

                setSearchResults(results);
                console.log(searchResults);
            }
        }, [searchTerm]);

        return (
            <div className="App">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleChange}
                />
                <ul>
                    {searchResults.map((item, key) => (
                        <li key={"item-" +key} >{item["properties"]["floor"]}. stāvs &nbsp; {item["properties"]["roomID"]}.{item["properties"]["roomType"]}</li>
                    ))}
                </ul>
            </div>
        )
}

export default Search;
