import MainMenu from "../pages/MainMeu/MainMenu.jsx";
import Profiles from "../components/profile/Profiles";
import History from "../components/profile/History";
import Transaction from "../components/profile/Transaction";
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
];
