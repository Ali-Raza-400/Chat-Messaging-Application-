// import InputField from "@/components/core/Input";
// import MuiTypography from "@/components/core/Typography";
// import useScreenWidth from "@/hooks/useScreenWidth";
// import { Search } from "@mui/icons-material";
import { Avatar, InputAdornment,Box, TextField, Typography } from "@mui/material";
import moment from "moment";
import styled from "styled-components";
import useScreenWidth from "../../../hooks/useScreen";
import SearchIcon from '@mui/icons-material/Search';

const StyledUserContainer = styled(Box)`
  display: ${(props) =>
    props.screenWidth < 992
      ? props.showMessanger === true
        ? "none"
        : "block"
      : "block"};
`;

export default function ChatList({
  showMessanger,
  setShowMessanger,
  getAllInboxes,
  setSelectedInbox,
  selectedInbox,
}) {
  console.log("selectedInbox::::", selectedInbox);
  const screenWidth = useScreenWidth();
  const INPUT_FIELD_PROPS_SEARCH = {
    label: "",
    fullWidth: true,
    variant: "standard",
  };

  const INPUT_FIELD_STYLES_SEARCH = {
    sx: {
      width: "100%",
      height: "40px",
      padding: 0,

      "& fieldset": { border: "1px solid #CCCCCC" },
    },
  };

  const USER_LIST = [
    { userId: 1 },
    { userId: 2 },
    { userId: 3 },
    { userId: 4 },
    { userId: 5 },
    { userId: 6 },
    { userId: 7 },
    { userId: 1 },
    { userId: 2 },
    { userId: 3 },
    { userId: 4 },
    { userId: 5 },
    { userId: 6 },
    { userId: 7 },
  ];

  return (
    <StyledUserContainer
      screenWidth={screenWidth}
      showMessanger={showMessanger}
      sx={{
        borderRight: `${
          screenWidth < 992 && !showMessanger ? "none" : "1px solid #C3C3C3"
        }`,
      }}
      maxWidth={`${screenWidth < 992 && !showMessanger ? "100%" : "400px"}`}
    >
      <Box p={2}>
        <TextField
          id="email"
          placeholder="Search"
          {...INPUT_FIELD_PROPS_SEARCH}
          sx={INPUT_FIELD_STYLES_SEARCH.sx}
          variant="standard"
          endAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </Box>
      {selectedInbox ? (
        <Box style={{ overflow: "auto", height: `calc(100vh - 188px)` }}>
          {USER_LIST.map((item, index) => {
            return (
              <MessangerUserListItem
                key={index}
                item={item}
                setShowMessanger={setShowMessanger}
                setSelectedInbox={setSelectedInbox}
                selectedInbox={selectedInbox}
              />
            );
          })}
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "90%",
            textAlign: "center",
            padding: 2,
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box mb={2}>
            <img
              src="/images/nochat.png"
              alt="No chat"
              width={"80px"}
              height={"80px"}
            />
          </Box>
          <Box>
            <p style={{ fontSize: "18px", fontWeight: "500", color: "#555" }}>
              No Chat to show
            </p>
          </Box>
        </Box>
      )}
    </StyledUserContainer>
  );
}

const StyledBox = styled(Box)`
  cursor: pointer;
  :hover {
    background: rgba(224, 40, 40, 0.274);
  }
  background: ${(props) => (props.selectedInbox ? "rgba(224, 40, 40, 0.274)" : "transparent")};
`;

const MessangerUserListItem = ({
  setShowMessanger,
  item,
  setSelectedInbox,
  selectedInbox
}) => {
  return (
    <StyledBox
      display="flex"
      alignItems="center"
      selectedInbox={selectedInbox}
      my={2}
      px={2}
      py={0.5}
      onClick={() => {
        setShowMessanger(true);
        setSelectedInbox(item);
      }}
    >
      <Avatar
        sx={{ height: "50px", width: "50px", mr: 1 }}
        alt="Remy Sharp"
        src={item?.profilePicture}
      />
      <Box display="flex" ml="5px">
        <div style={{ flex: 1 }}>
          <Typography variant="body1" component="h6" fontWeight="500">
            {item?.name}
          </Typography>
          <Typography variant="subtitle1" component="p" fontWeight="400">
            {item?.lastMsg}
          </Typography>
        </div>
        <div>
          <Typography
            variant="body2"
            component="label"
            fontWeight="400"
            color="#9C9C9C"
            sx={{ fontSize: "12px" }}
          >
            {moment.utc(item?.time).local().format("LT")}
          </Typography>
        </div>
      </Box>
    </StyledBox>
  );
};
