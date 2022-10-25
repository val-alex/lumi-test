import { Container } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { SearchForm } from "../searchForm/searchForm";

export const Navbar = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        marginBottom: "67px",
      }}
    >
      <AppBar position="static">
        <Toolbar
          sx={{
            height: "86px",
            background: "#EFF0F3",
            boxShadow: "4px 6px 13px rgba(215, 215, 215, 0.25)",
          }}
        >
          <Typography
            noWrap
            component="div"
            sx={{
              display: { xs: "none", sm: "flex" },
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "36px",
              fontWeight: "600",
              lineHeight: "45px",
              color: "#000000",
              paddingLeft: "92px",
            }}
          >
            ROLI
            <Typography
              sx={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "18px",
                fontWeight: "700",
                lineHeight: "0",
                color: "#2E84E8",
                marginTop: "29px",
              }}
            >
              .Music
            </Typography>
          </Typography>
          <Container>
            <SearchForm />
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
