import { Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

export const OrgPage = () => {
    const params = useParams();
    const org_id = params.id;

    return (
        <>
        <Heading>
            {org_id}
        </Heading>
        </>
    );
};