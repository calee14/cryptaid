import React from "react"
import { InputGroup, Input, InputRightElement, Button } from "@chakra-ui/react"
import { useState, useEffect } from "react"

const MilestoneInputs = (props) => {
    const [completed1,setCompleted1] = useState(props.milestoneProgress[0])
    const [completed2,setCompleted2] = useState(props.milestoneProgress[1])
    const [completed3,setCompleted3] = useState(props.milestoneProgress[2])
    const [completed4,setCompleted4] = useState(props.milestoneProgress[3])
    const [completed5,setCompleted5] = useState(props.milestoneProgress[4])
    const [input1,setInput1] = useState(props.milestone[0])
    const [input2,setInput2] = useState(props.milestone[1])
    const [input3,setInput3] = useState(props.milestone[2])
    const [input4,setInput4] = useState(props.milestone[3])
    const [input5,setInput5] = useState(props.milestone[4])

    
    useEffect(() => {
        const updateMilestone = () => {
            let result = [input1, input2, input3, input4, input5]
            props.setMilestone(result)
        }
        updateMilestone();
    }, [input1, input2, input3, input4, input5]);


    useEffect(() => {
        const updateCheckbox = () => {
            let result = [completed1, completed2, completed3, completed4, completed5]
            props.setMilestoneProgress(result)
        }
        updateCheckbox();
    }, [completed1, completed2, completed3, completed4, completed5]);

    return(
        <div>
        {props.num>=1?<InputGroup size='md'>
            <Input
                pr='4.5rem'
                defaultValue={props.milestone[0]}
                placeholder="Add milestone here"
                onChange={(event)=>setInput1(event.target.value)}
            />                        
            <InputRightElement width='6rem'>
                <Button h='1.75rem' size='sm' onClick={()=>setCompleted1(!completed1)} colorScheme={completed1? "green" : "gray"}>
                {completed1 ? 'Completed' : 'Incompleted'}
                </Button>
            </InputRightElement>
            </InputGroup>
        :""}

        
        {props.num>=2?<InputGroup size='md'>
            <Input
                pr='4.5rem'
                defaultValue={props.milestone[1]}
                placeholder="Add milestone here"
                onChange={(event)=>setInput2(event.target.value)}
            />                        
            <InputRightElement width='6rem'>
                <Button h='1.75rem' size='sm' onClick={()=>setCompleted2(!completed2)} colorScheme={completed2? "green" : "gray"}>
                {completed2 ? 'Completed' : 'Incompleted'}
                </Button>
            </InputRightElement>
            </InputGroup>
        :""}

        
        {props.num>=3?<InputGroup size='md'>
            <Input
                pr='4.5rem'
                defaultValue={props.milestone[2]}
                placeholder="Add milestone here"
                onChange={(event)=>setInput3(event.target.value)}
            />                        
            <InputRightElement width='6rem'>
                <Button h='1.75rem' size='sm' onClick={()=>setCompleted3(!completed3)} colorScheme={completed3? "green" : "gray"}>
                {completed3 ? 'Completed' : 'Incompleted'}
                </Button>
            </InputRightElement>
            </InputGroup>
        :""}

        
        {props.num>=4?<InputGroup size='md'>
            <Input
                pr='4.5rem'
                defaultValue={props.milestone[3]}
                placeholder="Add milestone here"
                onChange={(event)=>setInput4(event.target.value)}
            />                        
            <InputRightElement width='6rem'>
                <Button h='1.75rem' size='sm' onClick={()=>setCompleted4(!completed4)} colorScheme={completed4? "green" : "gray"}>
                {completed4 ? 'Completed' : 'Incompleted'}
                </Button>
            </InputRightElement>
            </InputGroup>
        :""}

        
        {props.num>=5?<InputGroup size='md'>
            <Input
                pr='4.5rem'
                defaultValue={props.milestone[4]}
                placeholder="Add milestone here"
                onChange={(event)=>setInput5(event.target.value)}
            />                        
            <InputRightElement width='6rem'>
                <Button h='1.75rem' size='sm' onClick={()=>setCompleted5(!completed5)} colorScheme={completed5? "green" : "gray"}>
                {completed5 ? 'Completed' : 'Incompleted'}
                </Button>
            </InputRightElement>
            </InputGroup>
        :""}
            
        </div>
    )
}

export default MilestoneInputs