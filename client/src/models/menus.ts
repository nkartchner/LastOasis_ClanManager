import Group from "@material-ui/icons/Group";
import HotTub from "@material-ui/icons/HotTub";
import GroupAdd from "@material-ui/icons/GroupAdd";
import Dashboard from "@material-ui/icons/Dashboard";
import PeopleSharp from "@material-ui/icons/PeopleSharp";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

export interface Menu {
  label: string;
  icon: React.FC;
  path: string;
  nestedIndicator?: React.FC;
}

export const GenerateMenuList = (clanId?: number | null): Menu[] => {
  const menu = [
    {
      icon: HotTub,
      label: "Home",
      path: "/dashboard",
    },
    {
      icon: Group,
      label: "Users",
      path: "/users",
    },
    {
      icon: PeopleSharp,
      label: "Clans",
      path: "/clans",
    },
  ];
  if (clanId) {
    return [
      ...menu,
      {
        icon: Dashboard,
        label: "Your Clan",
        path: `/clans/${clanId}/posts`,
        nestedIndicator: ArrowForwardIosIcon,
      },
    ];
  } else {
    return [
      ...menu,
      {
        icon: GroupAdd,
        label: "New Clan",
        path: "/clans/new",
      },
    ];
  }

  return menu;
};
