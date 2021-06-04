import {Box, Input, InputGroup, InputLeftElement} from "@chakra-ui/react";
import {Search2Icon} from "@chakra-ui/icons";
import React from "react";

function SearchInputField(props) {
    // const {searchTerm, handleChange, ...rest} = props;

    return (
        <Box>
            <InputGroup>
                <InputLeftElement
                    pointerEvents="none"
                    children={<Search2Icon color="gray.300" />}
                />
                <Input
                    type="text"
                    placeholder="Meklēt..."
                    value={props.searchTerm}
                    onChange={props.handleChange}
                />
            </InputGroup>
        </Box>
    )
}

export default SearchInputField;