import Group from "@material-ui/icons/Group";
import HotTub from "@material-ui/icons/HotTub";
import GroupAdd from "@material-ui/icons/GroupAdd";
import Dashboard from "@material-ui/icons/Dashboard";
import PeopleSharp from "@material-ui/icons/PeopleSharp";
export interface Menu {
    label: string;
    icon: React.FC;
    path: string;
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
        menu.push({
            icon: Dashboard,
            label: "Your Clan",
            path: "/clans/" + clanId,
        });
    } else {
        menu.push({
            icon: GroupAdd,
            label: "New Clan",
            path: "/clans/new",
        });
    }

    return menu;
};
