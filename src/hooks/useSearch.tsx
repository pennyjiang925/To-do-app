import React, { useCallback, useEffect, useMemo, useState } from "react"
import { Todo } from "../types"
import SearchIcon from "@mui/icons-material/Search"
import InputBase from "@mui/material/InputBase"
import { styled, alpha } from "@mui/material/styles"

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",

    height: "40px",
    marginTop: "auto",
    marginBottom: "auto",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
    },
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    color: "#808080",
    justifyContent: "center",
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",

        [theme.breakpoints.up("md")]: {
            width: "30ch",
        },

        [theme.breakpoints.down("sm")]: {
            width: "10ch",
        },
    },
}))

export const useSearch = (todos: Todo[]) => {
    const [searchKeyword, setSearchKeyword] = useState("")
    const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos)

    useEffect(() => {
        const result = todos.filter((todo) => {
            return todo.content.includes(searchKeyword)
        })
        setFilteredTodos(result)
    }, [todos, searchKeyword])

    const onSearchChange = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            setSearchKeyword(e.target.value)
        },
        [setSearchKeyword]
    )

    const searchInput = useMemo(() => {
        return (
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    sx={{ alignItems: "center" }}
                    placeholder="Search by task name"
                    inputProps={{ "aria-label": "search" }}
                    onChange={onSearchChange}
                />
            </Search>
        )
    }, [onSearchChange])

    return {
        filteredTodos,
        searchInput,
    }
}
