import React, {useEffect, useState} from "react";
import {
    ChakraProvider, HStack, Input, InputGroup, InputLeftElement, Tag
} from "@chakra-ui/react";
import { Search2Icon } from '@chakra-ui/icons'


// inspired by https://codesandbox.io/s/practical-nightingale-m2b5n?file=/src/index.js

function Search() {
    const [error, setError] = useState(null);
    const [isSearchLoaded, setSearchIsLoaded] = useState(false);
    const [searchItems, setSearchItems] = useState([]);
    const [searchTags, setSearchTags] = useState([]);

    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);


    const handleChange = e => {
        setSearchTerm(e.target.value);
    };

    // toggle clicked filter
    const handleTagChange = e => {
        // clicked filter value
        const newFilterVal = e.currentTarget.getAttribute("data-index");

        // add filter
        if (!searchTags.includes(newFilterVal)) {
            setSearchTags(currentSearchTags =>
                currentSearchTags.concat([newFilterVal])
            )
            console.log(e);
            // e.props.colorScheme("teal");
        }
        // remove filter
        else {
            setSearchTags(currentSearchTags =>
                currentSearchTags.filter(item => !newFilterVal.includes(item))
            )
        }
    }

    // it outputs in frontend in the same order as the list is here
    const allFilters = {
        "roomTypes" : [
            "kabineti",
            "laboratorijas",
            "citi",
        ],
        "floors" : [
            "1. stāvs",
            "2. stāvs",
            "3. stāvs",
            "4. stāvs",
            "5. stāvs",
        ]
    }


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
        }
    }, [searchTerm, searchTags]);

    return (
        <div className="App">
            <ChakraProvider>
                <InputGroup w={300}>
                    <InputLeftElement
                        pointerEvents="none"
                        children={<Search2Icon color="gray.300" />}
                    />
                    <Input
                        type="text"
                        placeholder="Meklēt..."
                        value={searchTerm}
                        onChange={handleChange}
                    />
                </InputGroup>
                <HStack spacing={1} m={1}>
                    {
                        Object.keys(allFilters).map((key) => {
                            return allFilters[key].map(filterItem => {
                                let color = "";
                                searchTags.includes(filterItem) ? color = "blue" : color = "gray"
                                return (
                                    <Tag size="sm" colorScheme={color} key={filterItem} data-index={filterItem}
                                         onClick={(e) => handleTagChange(e)}>
                                        {filterItem}
                                    </Tag> )
                            })
                        })
                    }
                </HStack>

                <div>
                    <ul>
                        {searchTags.map((item, key) => (
                            <li key={"itesm-" +key} >{item}</li>
                        ))}
                    </ul>
                    <ul>
                        {searchResults.map((item, key) => (
                            <li key={"item-" +key} >{item["properties"]["floor"]}. stāvs &nbsp; {item["properties"]["roomID"]}.{item["properties"]["roomType"]}</li>
                        ))}
                    </ul>
                </div>
            </ChakraProvider>
        </div>
    )
}

export default Search;
