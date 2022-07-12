import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  image_wrapper: {
    position: "relative",
    minWidth: "33%",
    height: 400,
  },

  hover_wrapper: {
    position: "absolute",
    display: "hidden",
    opacity: 0,
    zIndex: 10,
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    padding: "16px",

    "&:hover": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",

      opacity: 1,
    },

    '@media (max-width: 500px)': {
      display: 'none'
    }
  },

  favorite_action_wrapper: {
    display: "flex", justifyContent: "flex-end"
  },

  favorite_action_button: {
    backgroundColor: "white",
    "&:hover": { backgroundColor: theme.colors.gray[0] },
  },

  users_and_download_wrapper: {
    justifyContent: 'space-between',

    padding: "8px",
    borderRadius: "6px",
    backgroundColor: theme.colors.gray[0],
  }
}));

export default useStyles