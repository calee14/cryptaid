import { useLocation } from "react-router";

export const Donate = (props) => {
    const { state } = useLocation();
    const { org_id } = state;

    /* get data for organization with id
        here... backend people??
    */

    const imgUrl = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.kym-cdn.com%2Fentries%2Ficons%2Foriginal%2F000%2F029%2F514%2FScreen_Shot_2019-04-30_at_2.58.37_PM.png&f=1&nofb=1";

    const org_data = {
        id: 1,
        owner: "0x297CB824dA8Ca6F0d3cB1298387A3e77012703dC",
        deadline: "5/31/22",
        title: "Save the turties",
        description: "I was going for the title but got hit by the tidal wave.",
        location: "Santa Barabra, CA",
        links: ["isnta", "snap", "facebook"],
        progress: [100, 100, 20],
        milestone: ["pick up trash in ocean", "save turties injured by human trash", "Clean beaches for turtle's mating season"],
        imgUrl: imgUrl,
        donated: 10,
        goal: 100,
    }

    return (
        <></>
    );
};