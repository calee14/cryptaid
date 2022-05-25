import { Box, Heading, Image, Spacer, Text, Progress } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Moralis from "moralis";
import { useState, useEffect } from "react";
import "./OrgCard.css";

export const OrgCard = (props) => {
    const { id, title, description, imgUrl, location, goal, ethAddress } = props;
    const [donated, setDonated] = useState(0)
    useEffect(() => {
        const getTokensByChain = async () => {
            const transactionQuery = new Moralis.Query("EthTransactions", { useMasterKey: true });
            const tokens = await transactionQuery.find({ useMasterKey: true });
            let result = 0;
            tokens.map((props)=>{
                if(props.attributes.to_address === ethAddress.toLowerCase()){
                    result += parseFloat(props.attributes.decimal.value.$numberDecimal)
                }
            })
            setDonated(result.toFixed(4))
        }
        getTokensByChain();
    }, [Moralis,ethAddress]);

    return (
        <Link to={"/organization/" + id}>
        <Box boxShadow={'md'} border="1px" borderColor={"gray.200"} rounded={10} padding={5} minWidth={"15rem"} height={"26rem"}>
            <Heading fontSize="2xl" className="twoLineOverflow">{title}</Heading>
            <Heading fontSize="sm" className="twoLineOverflow">{location}</Heading>
            <Spacer my={2} />
            <Image position={"relative"} width={"100%"} objectFit={"cover"} height={"50%"} src={imgUrl} rounded={"md"} alt='Org Image here' />
            <Spacer my={2} />
            <Text fontSize={"md"} className={'twoLineOverflow'}>{description}</Text>
            <Spacer my={2} />
            <Progress value={donated/goal*100} rounded="md" size={"sm"}></Progress>
            <Text fontSize={"smaller"}>Raised {donated} ETH out of {goal} ETH</Text>
            <Spacer my={2}/>
            {/* <Text fontSize={"md"}>Latest NFT sold for 0.5 ETH</Text> */}
      </Box>
      </Link>
    );
}