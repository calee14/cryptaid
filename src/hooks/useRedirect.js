import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useRedirect = (to="/") => {
    const navigate = useNavigate();

    return (to="/") => {
        navigate(to);
    };
};