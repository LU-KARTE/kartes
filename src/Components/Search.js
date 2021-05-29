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
    // it outputs in frontend in the same order as the list is here
    const allFilters = {
        "roomTypes" : [
            "kabinets",
            "laboratorija",
            "cits",
        ],
        "floors" : [
            "1",
            "2",
            "3",
            "4",
            "5",
        ]
    }

    const initval = allFilters;
    const [searchTags, setSearchTags] = useState(initval )

    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);


    const handleChange = e => {
        setSearchTerm(e.target.value);
    };

    // toggle clicked filter
    const handleTagChange = e => {
        // clicked filter value
        const newFilterName = e.currentTarget.getAttribute("data-filtername");
        const newFilterType = e.currentTarget.getAttribute("data-filtertype");

        // add filter
        if (!searchTags[newFilterType].includes(newFilterName)) {
            setSearchTags(current =>
                {
                    let result = JSON.parse(JSON.stringify(current));// deep copy; otherwise, does not work

                    result[newFilterType].push(newFilterName);

                    return result;
                }
            )
        }
        
        // remove filter
        else {
            setSearchTags(current => {
                    let result = JSON.parse(JSON.stringify(current)); // deep copy; otherwise, does not work

                    result[newFilterType] = searchTags[newFilterType].filter(item => !newFilterName.includes(item))

                    return result;
                }
            )
        }
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


    // search logic
    React.useEffect(() => {
        if (isSearchLoaded) {
            const results = searchItems["features"].filter(feature => {
                    let stLowered = searchTerm.toLowerCase();
                    let roomID = feature["properties"]["roomID"].toLowerCase();
                    let roomType = feature["properties"]["roomType"].toLowerCase();
                    let roomFloor = feature["properties"]["floor"].toLowerCase();

                    let floorFilter = searchTags["floors"];
                    let roomTypesFilter = searchTags["roomTypes"];

                    console.log(floorFilter);
                    console.log(roomFloor);
                    console.log(floorFilter.includes(roomFloor));

                    let filtersOK = roomTypesFilter.includes(roomType) && floorFilter.includes(roomFloor);
                    let searchParamsOK = roomID.includes(stLowered) || roomType.includes(stLowered);

                    return filtersOK && searchParamsOK;

                    // return feature["properties"]["roomID"].toLowerCase().includes(searchTerm.toLowerCase()) ||
                    //     feature["properties"]["roomType"].toLowerCase().includes(searchTerm.toLowerCase());
                }
            )

            setSearchResults(results);
        }
    }, [searchTerm, searchTags, searchItems]);

    return (
        <div className="App">
            <ChakraProvider>
                <InputGroup w={301}>
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

                {/* display filter tags */}
                <HStack spacing={1} m={1}>
                    {
                        Object.keys(allFilters).map((key) => {
                            return allFilters[key].map(filterItem => {
                                let color = "";
                                // console.log("HEREE");
                                // console.log(searchTags);
                                searchTags[key].includes(filterItem) ? color = "blue" : color = "gray"
                                return (
                                    <Tag size="sm" colorScheme={color} key={filterItem} data-filtertype={key} data-filtername={filterItem}
                                         onClick={(e) => handleTagChange(e)}>
                                        {filterItem}
                                    </Tag> )
                            })
                        })
                    }
                </HStack>

                <div>

                    {/*/!* current filter list *!/*/}
                    {/*<ul>*/}
                    {/*    {*/}
                    {/*        Object.keys(searchTags).map((key) => {*/}
                    {/*            return searchTags[key].map(filterItem => {*/}
                    {/*                return (*/}
                    {/*                    <li key={filterItem}>{filterItem}</li>*/}
                    {/*                )*/}
                    {/*            })*/}
                    {/*        })*/}
                    {/*    }*/}
                    {/*</ul>*/}
                    {/*<div>&nbsp;</div>*/}


                    {/* search results list */}
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
