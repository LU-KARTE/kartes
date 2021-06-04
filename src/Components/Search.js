import React, {useEffect, useState} from "react";
import {
    Badge,
    Box, Center,
    ChakraProvider, Flex, HStack, Image, Input, InputGroup, InputLeftElement, Tag, Text
} from "@chakra-ui/react";
import {Search2Icon, StarIcon} from '@chakra-ui/icons'
import {Link} from "react-router-dom";
import SearchInputField from './SearchInput';


// inspired by https://codesandbox.io/s/practical-nightingale-m2b5n?file=/src/index.js

function Search() {
    const [error, setError] = useState(null);
    const [isSearchLoaded, setSearchIsLoaded] = useState(false);
    const [searchItems, setSearchItems] = useState([]);
    // it outputs in frontend in the same order as the list is here
    const allFilters = {
        "roomTypes" : [
            {
                "filterTerm": "kabinets",
                "frontendName": "Kabineti",
            },
            {
                "filterTerm": "laboratorija",
                "frontendName": "Laboratorijas",
            },
            {
                "filterTerm": "cits",
                "frontendName": "Citi",
            },
        ],
        "floors" : [
            {
                "filterTerm": "1",
                "frontendName": "1. stāvs",
            },
            {
                "filterTerm": "2",
                "frontendName": "2. stāvs",
            },
            {
                "filterTerm": "3",
                "frontendName": "3. stāvs",
            },
            {
                "filterTerm": "4",
                "frontendName": "4. stāvs",
            },
            {
                "filterTerm": "5",
                "frontendName": "5. stāvs",
            },
        ]
    }

    const initval = {
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



    const property = {
        imageUrl: "https://bit.ly/2Z4KKcF",
        imageAlt: "Rear view of modern home with pool",
        beds: 3,
        baths: 2,
        title: "Modern home in city center in the heart of historic Los Angeles",
        formattedPrice: "$1,900.00",
        reviewCount: 34,
        rating: 4,
    }

    return (
        <div className="App">
            <ChakraProvider>
                <SearchInputField searchTerm={searchTerm} handleChange={handleChange}/>
                {/* display filter tags */}
                <Flex css={{
                    flexFlow: "row wrap"
                }} m={1}>
                    {
                        Object.keys(allFilters).map((key) => {
                            return allFilters[key].map(filterItem => {

                                // if filter is active, set color to blue; otherwise, gray
                                let color = "";

                                searchTags[key].includes(filterItem["filterTerm"]) ? color = "blue" : color = "gray"

                                return (
                                    <Tag m={1} size={"lg"} colorScheme={color} key={filterItem["filterTerm"]} data-filtertype={key} data-filtername={filterItem["filterTerm"]}
                                         onClick={(e) => handleTagChange(e)}>
                                        {filterItem["frontendName"]}
                                    </Tag> )
                            })
                        })
                    }
                </Flex>

                <div>

                    {/* current filter list */}
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
                        {searchResults.map((item, key) => (
                            <Box shadow={"md"} key={key} m={2} maxW="sm" borderWidth="1px" borderRadius="md" overflow="hidden">

                                <Link to={"/"+item["properties"]["roomID"]}>
                                    <Box key={key + "-header"} bg="#f2f8fc">
                                        <Box p={2}>
                                            <Text>{item["properties"]["floor"]}. stāvs</Text>
                                        </Box>
                                    </Box>

                                    <Box key={key + "-body"} p={2}>
                                        <HStack>
                                            <Text fontSize={"xl"}>
                                                {item["properties"]["roomID"]}
                                            </Text>
                                            <Text>
                                                {item["properties"]["roomType"]}
                                            </Text>
                                        </HStack>
                                    </Box>
                                </Link>
                            </Box>
                        ))}
                    {/*<li key={"item-" +key} >{item["properties"]["floor"]}. stāvs &nbsp; {item["properties"]["roomID"]}.{item["properties"]["roomType"]}</li>*/}
                </div>
            </ChakraProvider>
        </div>
    )
}

export default Search;
