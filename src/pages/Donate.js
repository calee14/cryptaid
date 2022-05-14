import { useLocation } from "react-router";
import { useTransferEth } from "../hooks/useTransferEth";
import { ErrorBox } from "../components/Error";
import { Button, Container, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useState } from "react";

export const Donate = (props) => {
    const { state } = useLocation();
    const { org_id } = state;
    const [amount, setAmount] = useState();

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

    const { fetch, error, isFetching } = useTransferEth(!Number.isNaN(parseFloat(amount)) ? amount : 0.0, org_data.owner);

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handlePayment = () => {
        if(parseFloat(amount)) {
            fetch();
        }
    }

    return (
        
        <Container>
            {/* need to be logged in to donate */}
            {error && <ErrorBox title={"Error transferring eth"}  message={error.message}/>}
            <InputGroup>
                <InputLeftElement
                    pointerEvents='none'
                    children={"Eth"}
                />
                <Input value={amount} onChange={handleAmountChange} placeholder="0.0"/>
            </InputGroup>
            
            <Button onClick={handlePayment} disabled={isFetching}>
                Donate now
            </Button>
        </Container>
    );
};