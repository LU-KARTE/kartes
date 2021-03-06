import React, {useEffect, useState} from "react";
import {
    Badge,
    Box, Button,
    Center,
    ChakraProvider, Fade,
    Flex,
    HStack,
    Image,
    Input,
    InputGroup,
    InputLeftElement,
    List,
    ListItem,
    Spacer,
    Tag,
    Text,
    useDisclosure,
    ScaleFade, Slide, SlideFade, Collapse, Divider
} from "@chakra-ui/react";
import {CloseIcon, Search2Icon, StarIcon} from '@chakra-ui/icons'
import {Link} from "react-router-dom";
import SearchInputField from './SearchInput';
import $ from 'jquery';


// inspired by https://codesandbox.io/s/practical-nightingale-m2b5n?file=/src/index.js
const MAXSEARCHLISTROWS = 100;

function Search(props) {
    const [error, setError] = useState(null);
    const [isSearchLoaded, setSearchIsLoaded] = useState(false);
    const [displayResultsList, setDisplayResultsList] = useState("none"); // none or block
    const [searchItems, setSearchItems] = useState([]);

    const [showAllFilters, setShowAllFilters] = React.useState(false)

    const handleToggleFilters = () => setShowAllFilters(!showAllFilters)

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
                "filterTerm": "auditorija",
                "frontendName": "Auditorija",
            },
            {
                "filterTerm": "tualete",
                "frontendName": "Tualete",
            },
            {
                "filterTerm": "telpa",
                "frontendName": "Telpa",
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
            {
                "filterTerm": "6",
                "frontendName": "6. stāvs",
            },
            {
                "filterTerm": "7",
                "frontendName": "7. stāvs",
            },
            {
                "filterTerm": "8",
                "frontendName": "8. stāvs",
            }
        ]
    }

    const initval = {
        "roomTypes" : [
            "kabinets",
            "laboratorija",
            "auditorija",
            "tualete",
            "telpa",
        ],
        "floors" : [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8"
        ]
    }
    const [searchTags, setSearchTags] = useState(initval )

    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);

    const changeResultsView = setTo =>  {
        setDisplayResultsList(setTo);
        if (props.resultsListDisplayStatusHandler)
            props.resultsListDisplayStatusHandler(setTo);
    }

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
        // get data
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

        // to hide search results on outside click
        $(document).on("click", function(event) {
            if ($(event.target).closest('#searchWrapper').length === 0)
                changeResultsView("none");
        });
    }, [])

    function resetFilters() {
        setSearchTags(initval);
    }

    // to indicate how good the result is (depends on specific feature properties and search terms splitted)
    function assignPoints(feature) {
        let stLowered = searchTerm.toLowerCase().replace(/[^a-z0-9 ]/gi,'').trim(); // search term whole
        let roomID = feature["properties"]["roomID"].toLowerCase();
        let roomType = feature["properties"]["roomType"].toLowerCase();
        let roomFloor = feature["properties"]["floor"].toLowerCase();
        let extraInfo = [];

        if (feature["properties"]["extraInfo"])
            extraInfo = feature["properties"]["extraInfo"].toLowerCase().split(" ");

        let searchWords = stLowered.split(" "); // array of words (search terms)

        let floorFilter = searchTags["floors"];
        let roomTypesFilter = searchTags["roomTypes"];

        let filtersOK = roomTypesFilter.includes(roomType) && floorFilter.includes(roomFloor);

        if (!filtersOK) {
            return 0;
        }

        // award points to the potential search result
        let includesPoints = 0.3;
        let equalPoints = 1.0;
        let points = 0;
        let searchWordsLength = searchWords.length;

        if (searchWordsLength === 0 || (searchWordsLength === 1 && (searchWords[0] === "" || searchWords[0] === " "))) {
            return 1;
        }

        for (let i = 0; i < searchWordsLength; i++) {
            if (searchWords[i] === "")
                continue;

            if (roomID === searchWords[i])
                points += equalPoints;
            else if (roomID.includes(searchWords[i]))
                points += includesPoints;

            if (roomType === searchWords[i])
                points += equalPoints;
            else if (roomType.includes(searchWords[i]))
                points += includesPoints;

            extraInfo.forEach(infoToken => {
               if (infoToken === searchWords[i])
                   points += equalPoints;
               else if (infoToken.includes(searchWords[i]))
                   points += includesPoints;
            });
        }

        return points;
    }

    // search logic
    React.useEffect(() => {
        if (isSearchLoaded) {
            const itemsToSort = JSON.parse(JSON.stringify(searchItems["features"])); // deep copy
            let results = itemsToSort
                .filter(feature => {
                    return assignPoints(feature) > 0;
                })
                .sort((feature1, feature2) => {
                        let points1 = assignPoints(feature1); // points indicate how "suitable" the result is
                        let points2 = assignPoints(feature2);

                        if (points1 > points2) return -1;
                        else if (points1 < points2) return 1;
                        else return 0;
                    }
                )

            // #999872 not good. for bug fix that 1 element does not appear (state is not changed somewhy).
            if (results.length === 1)
                results.push({});

            setSearchResults(results);
        }
    }, [searchTerm, searchTags, searchItems]);

    return (
        <Box mx={props.mx} my={props.my} px={props.px} py={props.py} id="searchWrapper" width="full" className="App" onFocus={() => changeResultsView("block")}>
                <SearchInputField searchTerm={searchTerm} handleChange={handleChange}/>
                <div>
                    {/* search results list */}
                    {/*<Text mt={3} mb={3}><b>Atrastās telpas:</b></Text>*/}
                    <List spacing={0} shadow={"md"} style={{display: displayResultsList}} maxH="90%" overflow={"scroll"}
                          css={{
                        '&::-webkit-scrollbar': {
                            width: '4px',
                        },
                        '&::-webkit-scrollbar-track': {
                            width: '6px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: "#bbb",
                            borderRadius: '24px',
                        },
                    }}>

                        {/* display filter tags */}
                        <ListItem key="filterTags" p={3} pb={0}>
                            <Flex>
                            <Button size="sm" onClick={handleToggleFilters}>{showAllFilters ? "Aizvērt" : "Atvērt"} filtrus</Button>
                            <Button ml={2} size="sm" onClick={resetFilters}>Izslēgt filtrus</Button>
                                <Spacer />
                                <Center>
                                <CloseIcon cursor={"pointer"} onClick={() => changeResultsView("none")} w={5} h={5} />
                                </Center>
                            </Flex>

                            <Collapse startingHeight={0} in={showAllFilters}>
                                <Flex css={{
                                    flexFlow: "row wrap"
                                }}>
                                    {
                                        // iterate over all tags
                                        Object.keys(allFilters).map((key) => {
                                            return allFilters[key].map(filterItem => {

                                                // if filter is active, set color to blue; otherwise, gray
                                                let color = "";

                                                searchTags[key].includes(filterItem["filterTerm"]) ? color = "blue" : color = "gray"

                                                return (
                                                    <Tag mr={2} mt={2} size={"lg"} colorScheme={color} key={filterItem["filterTerm"]} data-filtertype={key} data-filtername={filterItem["filterTerm"]}
                                                         onClick={(e) => handleTagChange(e)}>
                                                        {filterItem["frontendName"]}
                                                    </Tag> )
                                            })
                                        })
                                    }
                                </Flex>

                            </Collapse>
                            <Divider mt={1}/>
                        </ListItem>

                        {/* Display search results */}
                        {searchResults.length > 1 ?
                            // (Object.keys(searchResults[1]).length === 0 ? 1 : MAXSEARCHLISTROWS) ==> this could be just MAXSEARCHLISTROWS but due #999872 it is so that does not break if only one result found.
                            searchResults.slice(0, (Object.keys(searchResults[1]).length === 0 ? 1 : MAXSEARCHLISTROWS)).map((item, key) => (
                                <Link onClick={() => changeResultsView("none")} key={key} to={"/"+item["properties"]["floor"]+ "/" + item["properties"]["roomID"]}>
                                    <ListItem _hover={{ bg: "#f1f1f1" }} p={3}>
                                        <Flex>
                                            <Text>
                                                {item["properties"]["extraInfo"] ?
                                                    item["properties"]["extraInfo"]
                                                    :
                                                    item["properties"]["roomID"] + ". " + item["properties"]["roomType"].substr(0,1).toUpperCase() + item["properties"]["roomType"].substr(1)
                                                }
                                            </Text>
                                            <Spacer />
                                            <Text> {item["properties"]["floor"]}. stāvs</Text>
                                        </Flex>
                                    </ListItem>
                                    <Divider />
                                </Link>
                            ))
                            :
                            <ListItem>
                                <Text fontSize={"md"} p={3}>
                                    Nekas netika atrasts.
                                </Text>
                            </ListItem>
                        }
                    </List>
                    {/*<li key={"item-" +key} >{item["properties"]["floor"]}. stāvs &nbsp; {item["properties"]["roomID"]}.{item["properties"]["roomType"]}</li>*/}
                </div>
        </Box>
    )
}

export default Search;
