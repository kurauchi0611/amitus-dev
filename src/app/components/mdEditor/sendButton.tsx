import React from "react";
import {
  Button,
  ButtonGroup,
  Grid,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  makeStyles,
  Theme,
  createStyles,
  ClickAwayListener
} from "@material-ui/core";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import PublishIcon from "@material-ui/icons/Publish";
import SaveIcon from "@material-ui/icons/Save";

const options = ["質問を投稿する", "下書き保存する"];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      fontSize: "18px",
      display: "flex",
      marginTop: "2px",
      background: theme.palette.buttonMain.main,
      borderRadius: 3,
      border: 0,
      color: "white",
      boxShadow: `0 3px 5px 2px ${theme.palette.buttonMain.dark}`
    }
  })
);

export const SendButton = ({ handleChange, selectedIndex,onClick }) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);

  const classes = useStyles();

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    handleChange(index);
    setOpen(false);
    if (false) {
      console.log(event);
    }
  };

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<Document, MouseEvent>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <Grid container direction="column" alignItems="flex-end">
      <Grid item xs={12}>
        <ButtonGroup
          variant="contained"
          // className={classes.button}
          ref={anchorRef}
          aria-label="split button"
        >
          <Button onClick={onClick} className={classes.button}>
            {selectedIndex === 0 && <PublishIcon />}
            {selectedIndex === 1 && <SaveIcon />}
            {options[selectedIndex]}
          </Button>
          <Button
            className={classes.button}
            color="primary"
            size="small"
            aria-controls={open ? "split-button-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
          >
            <ArrowDropUpIcon />
          </Button>
        </ButtonGroup>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu">
                    {options.map((option, index) => (
                      <MenuItem
                        key={option}
                        selected={index === selectedIndex}
                        onClick={event => handleMenuItemClick(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Grid>
    </Grid>
  );
};
