import { Box, Heading, Image, Table, Tbody, Td, Th, Thead, Tr, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Button, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAuser, getAllUser, updateScore } from '../Redux/Auth/auth.action';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const [admin, setAdmin] = useState(JSON.parse(localStorage.getItem("useraviaton")) || []);
    const [users, setUsers] = useState("");
    const [secretKey, setSecretKey] = useState("");
    const [profileImgUrl, setProfileImgUrl] = useState("");
    const { isOpen: isSecretKeyModalOpen, onOpen: onSecretKeyModalOpen, onClose: onSecretKeyModalClose } = useDisclosure();
    const { isOpen: isProfileImgModalOpen, onOpen: onProfileImgModalOpen, onClose: onProfileImgModalClose } = useDisclosure();
    const adminAuth = useSelector((store) => store.auth.adminAuth);

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleSecretKeySubmit = async () => {
        if (secretKey.length > 0) {
            let creds = { "otp": secretKey }
            await dispatch(updateScore(creds))
            let temp = JSON.parse(localStorage.getItem("useraviaton"))
            setAdmin(temp);
        } else {
            alert("Please fill the secretKey first!")
        }
        onSecretKeyModalClose();
    }

    const handleProfileImgSubmit = async () => {
        if (profileImgUrl.length > 0) {
            let creds = { "avatar": profileImgUrl }
            await dispatch(updateScore(creds))
            let temp = JSON.parse(localStorage.getItem("useraviaton"))
            setAdmin(temp);
        } else {
            alert("Please fill the profile image URL first!")
        }
        onProfileImgModalClose();
    }

    const handleDelete = async (id) => {
        deleteAuser(id).then(res => {
            setUsers(res)
        }).catch((error) => console.log(error))
    }

    const handleQuestion =()=>{
        navigate("/adminquestions")
    }

    useEffect(() => {
        let temp = JSON.parse(localStorage.getItem("useraviaton"))
        setAdmin(temp);
        getAllUser().then(res => {
            setUsers(res);
        }).catch((error) => console.log(error));
    }, [])

    if (!adminAuth) {
        navigate("/")
    }

    return (
        <>
            <Flex display={{ base: "block", md: "flex" }} bgColor={"aqua"} justifyContent={"space-between"} p={"0px 20px 0px 20px"} >
                <Flex>
                    <Heading fontSize="40px" fontWeight={"semibold"} textShadow={'2px 2px 4px rgba(0, 0, 0, 0.5)'} transform={'perspective(500px) rotateX(0deg)'} cursor={'pointer'} >{'<'}</Heading>
                    <Heading fontSize="40px" fontWeight={"semibold"} textShadow={'2px 2px 4px rgba(0, 0, 0, 0.5)'} transform={'perspective(500px) rotateX(0deg)'} >Admin</Heading>
                </Flex>
                <Flex cursor={"pointer"} onClick={handleQuestion}>
                    <Heading fontSize="40px" fontWeight={"semibold"} textShadow={'2px 2px 4px rgba(0, 0, 0, 0.5)'} transform={'perspective(500px) rotateX(0deg)'} cursor={'pointer'} >{">"}</Heading>
                    <Heading fontSize="40px" fontWeight={"semibold"} textShadow={'2px 2px 4px rgba(0, 0, 0, 0.5)'} transform={'perspective(500px) rotateX(0deg)'} >{"Handle Questions"}</Heading>
                </Flex>
            </Flex>
            <Box overflowX="auto">
                <Table variant="simple" >
                    <Thead bg="blue.800" color="white">
                        <Tr>
                            <Th color={"white"}>Profile Pic</Th>
                            <Th color={"white"}>Full Name</Th>
                            <Th color={"white"}>Email</Th>
                            <Th color={"white"}>Secret Key</Th>
                        </Tr>
                    </Thead>
                    <Tbody bg={"lightgreen"}>
                        {admin && (<Tr fontWeight={"bold"}>
                            <Td>
                                <Image src={admin.avatar} alt='Profilepic' width="100px" borderRadius="full" />
                                <Button size="sm" colorScheme="blue" onClick={onProfileImgModalOpen} mt={2}>Change Profile Pic</Button>
                            </Td>
                            <Td>{admin.fullName}</Td>
                            <Td>{admin.email}</Td>
                            <Td>
                                <Button size="sm" colorScheme="blue" onClick={onSecretKeyModalOpen}>{admin.otp}</Button>
                            </Td>
                        </Tr>)}
                    </Tbody>
                </Table>
            </Box>

            <Heading size="lg" mb={4}>Users List</Heading>
            <Box overflowX="auto">
                <Table variant="simple" >
                    <Thead bg="blue.800" color="white">
                        <Tr>
                            <Th color={"white"}>Profile Pic</Th>
                            <Th color={"white"}>Full Name</Th>
                            <Th color={"white"}>Email</Th>
                            <Th color={"white"}>DeleteUser</Th>
                        </Tr>
                    </Thead>
                    <Tbody bg={"lightgreen"}>
                        {users.length > 0 && users.map((el) => (
                            <Tr fontWeight={"bold"} key={el.email}>
                                <Td>
                                    <Image src={el.avatar} alt='Profilepic' width="100px" borderRadius="full" />
                                </Td>
                                <Td>{el.fullName}</Td>
                                <Td>{el.email}</Td>
                                <Td>
                                    <Button size="sm" colorScheme="blue" onClick={() => handleDelete(el._id)}>Delete</Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>

            <Modal isOpen={isSecretKeyModalOpen} onClose={onSecretKeyModalClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Enter Secret Key</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Secret Key</FormLabel>
                            <Input type="password" value={secretKey} onChange={(e) => setSecretKey(e.target.value)} />
                        </FormControl>
                        <Button mt={4} colorScheme="blue" onClick={handleSecretKeySubmit}>Submit</Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Modal isOpen={isProfileImgModalOpen} onClose={onProfileImgModalClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Enter Profile Image</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Profile pic</FormLabel>
                            <Input type="text" value={profileImgUrl} onChange={(e) => setProfileImgUrl(e.target.value)} />
                        </FormControl>
                        <Button mt={4} colorScheme="blue" onClick={handleProfileImgSubmit}>Submit</Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default Admin;
