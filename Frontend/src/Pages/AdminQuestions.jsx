import { Box, Button, Flex, Heading, Select, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addQuestion, deleteQuestion, fetchQuestions, updateQuestion } from '../Redux/Questions/question.action';
import AddQuestionModal from '../Components/AddQuestionModel';
import imageloading from "../utills/images/loading/imageloading.gif"
import UpdateQuestionModel from '../Components/UpdateQuestionModel';

let subjectData = ['All Subjects', 'General Navigation', 'Radio Navigation', 'Principles of Light', 'Instrumentation', 'Airframes Powerplants And Eletrics', 'Performance'];

const AdminQuestions = () => {
    const [subject, setSubject] = useState('All Subjects');
    const [renderq, setRrenderq] = useState([])
    const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] = useState(false);
    const [isUpdateQuestionModelOpen, setIsUpdateQuestionModelOpen] = useState(false);
    const [updatedata,setUpdatedData] = useState("");

    const Question = useSelector((store) => store.question.questions);

    const isLoading = useSelector((store) => store.question.loading);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useToast();

    const handleUser = () => {
        navigate('/admin');
    };

    const handleDeleteQuestion = async (id) => {
        try {
            let res = await dispatch(deleteQuestion(id));
            console.log(res.data.message);
            toast({
                title: "Question Deleted",
                description: res.data.message,
                status: "success",
                isClosable: true,
                position: "top",
                variant: "left-accent",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete question",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
                variant: "left-accent",
            });
        }
    }

    const handleAddQuestion = () => {
        setIsAddQuestionModalOpen(true);
    };

    const handleCloseAddQuestionModal = (el) => {
        setIsAddQuestionModalOpen(false);
    };

    const handleUpdateQuestion = (el)=>{
        setIsUpdateQuestionModelOpen(true);
        setUpdatedData(el);
    }
    const handleCloseUpdateQuestionModal = () => {
        setIsUpdateQuestionModelOpen(false);
    };

    const handleSubmitQuestion = async (newQuestion) => {
        let res = await dispatch(addQuestion(newQuestion));
        console.log(res);

        toast({
            title: 'Question Added',
            description: 'The question has been successfully added.',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    };

    const handleSubmitUpdateQuestion =async(newQuestion)=>{
        console.log(updatedata)
        let res =await dispatch(updateQuestion(newQuestion,updatedata._id))
        if(res===200){
            toast({
                title: 'Question Updated',
                description: 'The question has been successfully Updated.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        }else{
            toast({
                title: 'Question Updated',
                description: 'Something went wrong.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
        handleCloseUpdateQuestionModal()
    }


    const handleSubjectChange = (event) => {
        setSubject(event.target.value);
    };

    useEffect(() => {
        dispatch(fetchQuestions(subject));
    }, [subject])

    useEffect(() => {
        setRrenderq(Question);
    }, [Question])

    if (isLoading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                h="100vh"
                bg="blue.800"
            >
                <img src={imageloading} alt="Loading" />
            </Box>
        );
    }


    return (
        <>
            <Flex bgColor={'aqua'} justifyContent={'space-between'} p={'0px 20px 0px 20px'}>
                <Flex>
                    <Heading fontSize={{ base: "30px" }} fontWeight={'semibold'} textShadow={'2px 2px 4px rgba(0, 0, 0, 0.5)'} transform={'perspective(500px) rotateX(0deg)'} cursor={'pointer'}>
                        {'<'}
                    </Heading>
                    <Heading fontSize={{ base: "30px" }} fontWeight={'semibold'} textShadow={'2px 2px 4px rgba(0, 0, 0, 0.5)'} transform={'perspective(500px) rotateX(0deg)'}>
                        Admin
                    </Heading>
                </Flex>
                <Flex cursor={'pointer'} onClick={handleUser} _hover={{ color: "red" }}>
                    <Heading fontSize={{ base: "30px" }} fontWeight={'semibold'} textShadow={'2px 2px 4px rgba(0, 0, 0, 0.5)'} transform={'perspective(500px) rotateX(0deg)'} cursor={'pointer'}>
                        {'>'}
                    </Heading>
                    <Heading fontSize={{ base: "30px" }} fontWeight={'semibold'} textShadow={'2px 2px 4px rgba(0, 0, 0, 0.5)'} transform={'perspective(500px) rotateX(0deg)'}>
                        {'Handle Users'}
                    </Heading>
                </Flex>
            </Flex>
            <Box>
                <Flex justify={'center'}>
                    <Heading fontSize="40px" fontWeight={'semibold'} textShadow={'2px 2px 4px rgba(0, 0, 0, 0.5)'} transform={'perspective(500px) rotateX(0deg)'}>
                        Questions Section
                    </Heading>
                </Flex>
                <Flex justifyContent={"space-evenly"} mt={4} bg={"aqua"} p={"5px"} boxShadow={"outline"}>
                    <Flex justify={'center'} >
                        <Select value={subject} onChange={handleSubjectChange} bg={"gray.300"} _hover={{ bg: "white" }} cursor="pointer" color='blue.800' textShadow={'2px 2px 4px rgba(0, 0, 0, 0.5)'} transform={'perspective(500px) rotateX(0deg)'}>
                            {subjectData.map((subject) => (
                                <option key={subject} value={subject} >
                                    {subject}
                                </option>
                            ))}
                        </Select>
                    </Flex>
                    <Button bg="gray.300" _hover={{ bg: 'white' }} color="blue.800" textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)" transform="perspective(500px) rotateX(0deg)" onClick={handleAddQuestion}>
                        Add Question
                    </Button>

                </Flex>
                {/* ... existing JSX code ... */}
                <AddQuestionModal isOpen={isAddQuestionModalOpen} onClose={handleCloseAddQuestionModal} onSubmit={handleSubmitQuestion} />
                <UpdateQuestionModel isOpen={isUpdateQuestionModelOpen} onClose={handleCloseUpdateQuestionModal} onSubmit={handleSubmitUpdateQuestion} data={updatedata} />
                {/* ... existing JSX code ... */}
                <Box
                    p={4}
                    bg="white"
                    boxShadow="lg"
                    borderRadius="md"
                    bgColor={"aquamarine"}
                    color={"blue.800"}
                    flex={{ base: "1", md: "0.7" }}
                >
                    {renderq.length > 0 && (renderq.map((el, index) => (
                        <Box key={el._id} bgColor={"gray.300"} p={"20px"} borderRadius={"15px"} boxShadow={"2xl"} m={"10px"}>
                            <Box
                                fontSize="lg"
                                mb={4}
                                textAlign={"left"}
                                fontWeight={"semibold"}
                                textShadow={"2px 2px 4px rgba(0, 0, 0, 0.5)"}
                                transform={"perspective(500px) rotateX(0deg)"}
                            >
                                {`Q. ${index + 1} - ${el.question}`}
                            </Box>
                            <Flex gap={"20px"} textShadow={"2px 2px 4px rgba(0, 0, 0, 0.5)"}
                                transform={"perspective(500px) rotateX(0deg)"}
                                direction={{ base: "column", md: 'row' }}>
                                {el.options.map((option, index) => (
                                    <Box color={option.correct ? "green" : "red"} key={option._id} textAlign={"left"}>{`${index + 1} :-${option.text}`}</Box>
                                ))}
                            </Flex>
                            <Flex justifyContent={"space-evenly"}>
                                <Button
                                    mt={4}
                                    bgColor="blue.800"
                                    color={"white"}
                                    _hover={{ bg: "blue", color: "red" }}
                                    fontWeight={"bold"}
                                    borderRadius={"15px"}
                                    w={"200px"}
                                    boxShadow="0px 2px 4px rgba(0, 0, 0, 0.5)"
                                    onClick={() => handleDeleteQuestion(el._id)}
                                >
                                    Delete
                                </Button>
                                <Button
                                    mt={4}
                                    bgColor="blue.800"
                                    color={"white"}
                                    _hover={{ bg: "blue", color: "red" }}
                                    fontWeight={"bold"}
                                    borderRadius={"15px"}
                                    w={"200px"}
                                    boxShadow="0px 2px 4px rgba(0, 0, 0, 0.5)"
                                    onClick={() => handleUpdateQuestion(el)}
                                >
                                    Update 
                                </Button>
                            </Flex>
                        </Box>
                    )))}
                </Box>
            </Box>
        </>
    );
};

export default AdminQuestions;
