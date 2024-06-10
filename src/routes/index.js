import MainMenu from "../pages/MainMeu/MainMenu.jsx";
import Profiles from "../components/profile/Profiles";
import History from "../components/profile/History";
import Transaction from "../components/profile/Transaction";
import SignUp from "../pages/Register/SignUpForm.jsx";
import SignIn from "../pages/Register/SignInForm.jsx";
export const routes = [
  {
    path: "/",
    page: MainMenu,
    isShowHeader: true,
    isShowFooter: true,
  },
  
  {
    path: "/profile",
    page: Profiles,
    isShowHeader: true,
    isShowFooter: true,
  },
  
  {
    path: "/transactions",
    page: Transaction,
    isShowHeader: true,
    isShowFooter: true,
  },

  {
    path: "/history",
    page: History,
    isShowHeader: true,
    isShowFooter: true,
  },

  {
    path: "/SignIn",
    page: SignIn,
    isShowHeader: false,
    isShowFooter: false,
  },

  {
    path: "/SignUp",
    page: SignUp,
    isShowHeader: false,
    isShowFooter: false,
  },
];
