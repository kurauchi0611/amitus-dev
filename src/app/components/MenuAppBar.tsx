import React from "react";
import {
  fade,
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core/styles";
import {
  AppBar,
  FormControl,
  NativeSelect,
  Button,
  Link
} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import PostAddIcon from "@material-ui/icons/PostAdd";
import LinkWrap from "next/link";
import { RegistForm } from "./account/registForm";
import { LoginForm } from "./account/loginForm";
import { UserInfo } from "./account/userInfo";
import { accountDB } from "../firebase/account";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    searchButton: {
      margin: theme.spacing(2),
      fontSize: "1rem",
      background: "linear-gradient(45deg, #16A196 30%, #32A2D3 90%)",
      borderRadius: 3,
      border: 0,
      color: "white",
      height: 35,
      padding: "0 20px",
      boxShadow: "0 3px 5px 2px rgba(105, 255, 135, .3)",
      // width:"130px"
      display: "inline-block"
    },
    title: {
      cursor: "pointer",
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block"
      }
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto"
      }
    },
    searchIcon: {
      width: theme.spacing(7),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    inputRoot: {
      color: "inherit"
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: 200
      }
    },
    sectionDesktop: {
      width: "150px",
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
        justifyContent: "flex-end"
      }
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none"
      }
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      color: "#16A196"
    },
    selectEmpty: {
      // marginTop: theme.spacing(2),
      background: "#f2f2f2",
      borderRadius: "2px",
      "&::before": {
        borderBottom: "2px solid",
        borderBottomColor: theme.palette.primary.main
      },
      "&::after": {
        borderBottom: "2px solid",
        borderBottomColor: "#32A2D3"
      },
      "&:hover": {
        "&:not(.Mui-disabled):before": {
          borderBottomColor: "#32A2D3"
        }
      },
      "& select": {
        paddingLeft: "8px"
      }
    },
    anker: {
      width: "100%",
      display: "flex",
      padding: "8px 16px"
    },
    paddingNone: {
      padding: "0px"
    },
    flex: {
      display: "flex",
      flexFlow: "row nowrap"
    },
    center: {
      justifyContent: "space-between",
      flexFlow: "row nowrap",
      background: "#333"
    },
    searchArea: {
      display: "flex",
      flexFlow: "row",
      alignItems: "center"
    },
    userButton: {
      width: "120px"
    },
    ajustTop: {
      "& .MuiMenu-paper": {
        top: "69px !important"
      }
    }
  })
);

export const MenuAppBar = ({ user, dm }) => {

  const [state, setState] = React.useState<{
    searchType: string;
    searchValue: string;
    email: string;
    password: string;
    userData: any;
  }>({
    searchType: "question",
    searchValue: "",
    email: "",
    password: "",
    userData: null
  });

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl
  ] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleChange = (name: keyof typeof state) => (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setState({
      ...state,
      [name]: event.target.value
    });
  };

  const startSearch = () => {
    console.log(state.searchValue);
    console.log(state.searchType);
  };

  const logoutUser = () => {
    accountDB.logoutUser();
    handleMenuClose();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      className={classes.ajustTop}
    >
      <MenuItem>
        <UserInfo userInfo={user} />
      </MenuItem>
      <MenuItem onClick={handleMenuClose} className={classes.paddingNone}>
        <LinkWrap href="/mypage" passHref>
          <Link underline="none" className={classes.anker}>
            <AccountBoxIcon />
            マイページ
          </Link>
        </LinkWrap>
      </MenuItem>
      <MenuItem onClick={handleMenuClose} className={classes.paddingNone}>
        <LinkWrap href="/questions" passHref>
          <Link underline="none" className={classes.anker}>
            <PostAddIcon />
            質問投稿
          </Link>
        </LinkWrap>
      </MenuItem>
      <MenuItem onClick={handleMenuClose} className={classes.paddingNone}>
        <LinkWrap href="/timeTickets" passHref>
          <Link underline="none" className={classes.anker}>
            <ConfirmationNumberIcon />
            チケット登録
          </Link>
        </LinkWrap>
      </MenuItem>
      <MenuItem onClick={handleMenuClose} className={classes.paddingNone}>
        <LinkWrap href="/mypage" passHref>
          <Link underline="none" className={classes.anker}>
            <ListAltIcon />
            ストック一覧
          </Link>
        </LinkWrap>
      </MenuItem>
      <MenuItem onClick={logoutUser} className={classes.paddingNone}>
        <LinkWrap href="" passHref>
          <Link underline="none" className={classes.anker}>
            <ExitToAppIcon />
            ログアウト
          </Link>
        </LinkWrap>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>メッセージ</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>お知らせ</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>プロフィール</p>
      </MenuItem>
    </Menu>
  );

  const toggleDM = () => {
    if (!dm.dMopen) return dm.handleDMOpen;
    else return dm.handleDMClose;
  };

  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Toolbar className={classes.center}>
          {/* アイコン */}
          <Typography
            className={classes.title}
            component="h1"
            variant="h6"
            noWrap
          >
            <LinkWrap href="/">
              <Link>
                <img src="/images/amitus_jp.svg" />
              </Link>
            </LinkWrap>
          </Typography>
          {/* アイコンここまで */}
          <div className={classes.grow} />
          {/* 検索関係 */}
          <div className={classes.searchArea}>
            {/* 検索窓 */}
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="キーワードを入力"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                value={state.searchValue}
                onChange={handleChange("searchValue")}
                inputProps={{ "aria-label": "search" }}
              />
              {/* 検索窓ここまで */}
            </div>
            {/* 検索内容選択 */}
            <FormControl className={classes.formControl}>
              <NativeSelect
                className={classes.selectEmpty}
                value={state.searchType}
                onChange={handleChange("searchType")}
                inputProps={{ "aria-label": "searchType" }}
                // error
              >
                <option value={"question"}>質問</option>
                <option value={"ticket"}>チケット</option>
                <option value={"user"}>ユーザ</option>
              </NativeSelect>
            </FormControl>
            {/* 検索内容選択ここまで */}
            {/* 検索ボタン */}
            <Button
              size="small"
              variant="contained"
              className={classes.searchButton}
              onClick={startSearch}
            >
              検索
            </Button>
            {/* 検索ボタンここまで */}
          </div>
          {/* 検索関連ここまで */}
          <div className={classes.grow} />
          {/* デスクトップ用通知とか */}
          <div className={classes.sectionDesktop}>
            {typeof user !== "undefined" && user !== null && (
              <div>
                <IconButton
                  aria-label="show 4 new mails"
                  color="inherit"
                  onClick={toggleDM()}
                >
                  <Badge badgeContent={100} color="primary">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={17} color="primary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </div>
            )}
            {typeof user !== "undefined" && user === null && (
              <div className={classes.flex}>
                <RegistForm label={"新規登録"}></RegistForm>
                <LoginForm label={"ログイン"}></LoginForm>
              </div>
            )}
          </div>
          {/* モバイルの */}
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
          {/* ここまでモバイルの */}
        </Toolbar>
      </AppBar>
      {user !== null && renderMobileMenu}
      {user !== null && renderMenu}
    </div>
  );
};
