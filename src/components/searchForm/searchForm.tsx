import { Typography } from "@mui/material/";
import { ReactNode } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";

import { useAppDispatch } from "@/hooks";
import { setSearchInput } from "@/store/slices/resultsSlice";

type Inputs = {
  search: string;
};

interface SearchFormProps {
  children?: ReactNode;
}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    // marginLeft: theme.spacing(1),
    width: "auto",
    margin: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "689px",
    height: "34px",
    [theme.breakpoints.up("sm")]: {
      width: "36ch",
      "&:focus": {
        width: "48ch",
      },
    },
    borderRadius: "8px",
    color: "#2B2C34",
    "&::placeholder": {
      color: "#C0C0C0",
    },
  },
}));

export const SearchForm = ({ children }: SearchFormProps) => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = ({ search: searchInput }) => {
    dispatch(setSearchInput(searchInput));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Search sx={{ background: "#FFFFFE" }}>
        <SearchIconWrapper>
          <SearchIcon sx={{ color: "#C0C0C0" }} />
        </SearchIconWrapper>
        <StyledInputBase
          id="outlined-required"
          defaultValue=""
          {...register("search", { required: true })}
          placeholder="Search album…"
          inputProps={{ "aria-label": "search input" }}
        />
      </Search>

      {errors.search ? (
        <Typography sx={{ color: "error.main", mt: 2 }} variant="body1">
          Please enter artists name, to search for albums
        </Typography>
      ) : null}
    </form>
  );
};
