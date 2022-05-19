import {useEffect, useState} from "react";
import Moralis from "moralis";
import { useMoralisQuery } from "react-moralis";

export const useOrgData = (org_id) => {
    const [title, setTitle] = useState("")
    const [user, setUser] = useState("")
    const [location, setLocation] = useState("")
    const [imgUrl, setImgUrl] = useState("")
    const [donated, setDonated] = useState(0)
    const [goal, setGoal] = useState("")
    const [description, setDescription] = useState("");
    const [ethAddress, setEthAddress] = useState("");
    const [deadline, setDeadline] = useState();
    
    useEffect(() => {
        const getTokensByChain = async () => {
            const transactionQuery = new Moralis.Query("EthTransactions");
            const tokens = await transactionQuery.find({ useMasterKey: true });
            let result = 0;
            tokens.map((props)=>{
                if(props.attributes.to_address == ethAddress.toLowerCase()){
                    result += parseFloat(props.attributes.decimal.value.$numberDecimal)
                }
            })
            setDonated(result.toFixed(4))
        }
        getTokensByChain();
      }, [Moralis,ethAddress]);


    const { fetch } = useMoralisQuery(
        "Organization",
        (query) => query.equalTo("objectId", org_id),
        [],
        { autoFetch: false }
    );
    
    const objectIdQuery = () => {
        fetch({
            onSuccess: (org) => {
                if(org != null){
                    if(org.length != 0){
                        setTitle(org[0].get("title"))
                        setUser(org[0].get("user"))
                        setLocation(org[0].get("location"))
                        setImgUrl(org[0].get("imgUrl"))
                        // setDonated(org[0].get("donated"))
                        setGoal(org[0].get("goal"))
                        setDescription(org[0].get("description"))
                        setEthAddress(org[0].get("ethAddress"))
                        setDeadline(org[0].get("deadline"))
                    }
                }
            },
            onError: (error) => {
                console.log(error)
            },
        });
    };

    useEffect(() => {
        console.log(objectIdQuery())
      }, [useMoralisQuery]);
    

    const org_data = {
        id: org_id,
        owner: user,
        deadline: "5/31/22",
        title: title,
        description: description,
        location: location,
        links: ["insta", "snap", "facebook"],
        progress: [true,true, false],
        milestone: ["pick up trash in ocean", "save turties injured by human trash", "Clean beaches for turtle's mating season"],
        imgUrl: imgUrl,
        donated: donated,
        goal: goal,
        ethAddress: ethAddress,
        deadline: deadline
    }
    return org_data
}