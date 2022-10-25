import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";

import { useAppSelector } from "@/hooks";
import {
  selectAccessToken,
  selectArtistAlbums,
  selectArtistAvatar,
  selectArtistId,
  selectSearchInput,
} from "@/store/slices/resultsSlice";
import { Masonry } from "@mui/lab";
import {
  useGetAccessTokenQuery,
  useGetArtistAlbumsQuery,
  useGetArtistIdQuery,
} from "../../pages/api/findSpotifyApi";

interface ArtistData {
  external_urls: any;
  followers: any;
  genres: Array<string>;
  href: string;
  id: string;
  images: any;
  name: string;
  popularity: number;
  type: string;
  uri: string;
  artists: any;
  release_date: any;
}

export const ResultsComponent = () => {
  const search = useAppSelector(selectSearchInput);
  const accessToken = useAppSelector(selectAccessToken);
  const artistId = useAppSelector(selectArtistId);
  const artistAlbums = useAppSelector(selectArtistAlbums);
  const artistAvatar = useAppSelector(selectArtistAvatar);

  useGetAccessTokenQuery(search);
  useGetArtistIdQuery({
    search: search,
    accessToken: accessToken,
  });
  const { error, isLoading, isError } = useGetArtistAlbumsQuery({
    artistId: artistId,
    accessToken: accessToken,
  });

  const errorMessage = () => {
    if (error) {
      if ("status" in error) {
        const errMsg =
          "error" in error ? error.error : JSON.stringify(error.data);

        return (
          <Typography sx={{ color: "error.main" }} variant="body1">
            {errMsg}
          </Typography>
        );
      } else {
        return (
          <Typography sx={{ color: "error.light" }} variant="body1">
            {error.message}
          </Typography>
        );
      }
    } else {
      return (
        <Typography sx={{ color: "error.main" }} variant="body1">
          Something went wrong
        </Typography>
      );
    }
  };

  if (isLoading)
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography sx={{ mt: 5 }} variant="body1">
          Loading...
        </Typography>
      </Box>
    );

  if (isError)
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography sx={{ color: "error.main", mt: 5 }} variant="subtitle1">
          Failed to load:
        </Typography>
        {errorMessage()}
      </Box>
    );

  return (
    <Masonry columns={4} spacing={2}>
      {artistAlbums?.items.map((item: ArtistData) => (
        <Card
          key={item.id}
          sx={{
            width: 300,
            height: 425,
            margin: "8px",
            background: "#EFF0F3",
            borderRadius: "12px",
          }}
        >
          <CardMedia
            component="img"
            height={"260px"}
            image={item.images[1].url}
            alt={item.name}
            sx={{
              padding: "20px",
              paddingBottom: "0",
              borderRadius: "12%",
            }}
          />
          <CardContent
            sx={{
              padding: "20px",
              paddingTop: "25px",
              ":last-child": {
                paddingBottom: "20px",
              },
            }}
          >
            <Typography
              gutterBottom
              variant="h2"
              component="div"
              sx={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: "700",
                fontSize: "20px",
                lineHeight: "25.2px",
                color: "#2B2C34",
                margin: "0",
              }}
            >
              {item.name}
            </Typography>
            <CardHeader
              sx={{
                padding: "0",
                paddingTop: "18px",
                ".MuiCardHeader-title": {
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: "600",
                  fontSize: "16px",
                  lineHeight: "20.16px",
                  color: "#2B2C34",
                },
                ".MuiCardHeader-subheader": {
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: "400",
                  fontSize: "14px",
                  lineHeight: "17.64px",
                  color: "#2B2C34",
                },
              }}
              avatar={
                <Avatar
                  alt={item?.artists[0]?.name}
                  src={artistAvatar}
                  sx={{ height: "57px", width: "57px" }}
                />
              }
              title={item?.artists[0]?.name}
              subheader={item?.release_date.slice(0, 4)}
            />
          </CardContent>
        </Card>
      ))}
    </Masonry>
  );
};

export default ResultsComponent;
