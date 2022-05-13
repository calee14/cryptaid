import { CheckCircleIcon, SettingsIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Divider, Heading, Image, Spacer, Text, Flex, Container, Progress, List, ListItem, ListIcon } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router";

export const OrgPage = () => {
    const params = useParams();
    const org_id = params.id;
    const navigate = useNavigate();

    const imgUrl = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.kym-cdn.com%2Fentries%2Ficons%2Foriginal%2F000%2F029%2F514%2FScreen_Shot_2019-04-30_at_2.58.37_PM.png&f=1&nofb=1";

    const org_data = {
        id: 1,
        owner: "1345",
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
        <Box mx={'10%'}>
            <Flex width={"100%"}>
                <Box flex={2} paddingX={"3rem"}>
                    <Heading>{org_data.title}</Heading>
                    <Spacer my={3}/>
                    <Text fontSize={"lg"} fontWeight={"semibold"}>Raised {org_data.donated} ETH out of {org_data.goal} ETH</Text>
                    <Spacer my={3}/>
                    <Progress height={1} value={org_data.donated/org_data.goal*100} rounded="md" size={"sm"}></Progress>
                    <Spacer my={3}/>
                    <Button width={"50%"} onClick={() => navigate("/organization/" + org_id + "/donate")}>Donate Now</Button>
                    <Spacer my={3}/>
                    <Text fontWeight={"medium"} >Deadline: <b>{org_data.deadline}</b></Text>
                    <Spacer my={3}/>
                    <Image position={"relative"} width={"100%"} objectFit={"cover"} height={"26rem"} src={org_data.imgUrl} rounded={"xl"} alt='Org Image here'/>
                    <Center height={5} >
                        <Divider orientation="horizontal"/>
                    </Center>
                    <Text fontWeight={"medium"}>I was going for the title but got hit by the tidal wave.
                    I was going for the title but got hit by the tidal wave.
                    I was going for the title but got hit by the tidal wave.
                    I was going for the title but got hit by the tidal wave.
                    </Text>
                    <Center height={5} >
                        <Divider orientation="horizontal"/>
                    </Center>
                    <Heading fontSize="lg">Milestones:</Heading>
                    <Spacer my={2}/>
                    <List spacing={3}>
                        {org_data.milestone.map((ms, i) => {
                            return (
                            <ListItem>
                                <ListIcon as={org_data.progress[i] == 100 ? CheckCircleIcon : SettingsIcon} color={org_data.progress[i] == 100 ? "green.500" : "gray.600"}/>
                                {ms}
                            </ListItem>
                            );
                        })}
                        
                    </List>
                    <Spacer my={3}/>
                    <Button width={"50%"} onClick={() => navigate("/organization/" + org_id + "/donate")}>Donate Now</Button>
                    <Center height={5} >
                        <Divider orientation="horizontal"/>
                    </Center>
                    <Heading fontSize="lg">Socials:</Heading>
                    <Spacer my={2}/>
                    <List spacing={2}>
                        {org_data.links.map((link) => {
                            return (
                                <ListItem>
                                    <a href={link}>{link}</a>
                                </ListItem>
                            );
                        })}
                    </List>
                </Box>
                <Center backgroundColor={"green"} flex={1}>
                    sell nfts here
                </Center>
            </Flex>
        </Box>
    );
};