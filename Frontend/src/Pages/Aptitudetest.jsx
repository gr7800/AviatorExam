import React from 'react'
import { Box, Heading, Flex, Text, Button, Link, Image, Center, Stack } from "@chakra-ui/react"
import Aptitudebg from "../utills/images/aptitude/aptitudeheaderbg.png"
import sortterm1 from "../utills/images/aptitude/sortterm1.png"
import shortterm2 from "../utills/images/aptitude/shortterm2.png"
import spatialawarnes1 from "../utills/images/aptitude/spatialawarnes1.png"
import spatialawarnes2 from "../utills/images/aptitude/spatialawarnes2.png"
import multitasking1 from "../utills/images/aptitude/multitasking1.png"
import multitasking2 from "../utills/images/aptitude/multitasking2.png"
import advancedcontrol1 from "../utills/images/aptitude/advancedcontrol1.png"
import advancedcontrol2 from "../utills/images/aptitude/advancedcontrol2.png"
import multitaskingadvanced1 from "../utills/images/aptitude/multitaskingadvanced1.png"
import multitaskingadvanced2 from "../utills/images/aptitude/multitaskingadvanced2.png"
import normalcontrol1 from "../utills/images/aptitude/normalcontrol1.png"
import normalcontrol2 from "../utills/images/aptitude/normalcontrol2.png"
import bottomcircle from "../utills/images/aptitude/bottomcircle.png"


const Aptitudetest = () => {
  return (
    <Box>
      <Flex
        direction="column"
        justifyContent="center"
        width="100%"
        height="70vh"
        bgImage={`linear-gradient(rgba(128, 128, 128, 0.5), rgba(128, 128, 128, 0.5)), url(${Aptitudebg})`}
        bgSize="cover"
        bgRepeat="no-repeat"
        bgPos="center"
        color="white"
        tabIndex={-1}
      >
        <Flex width="100%" padding={{ base: "5%", md: "15%" }} direction={"column"} fontWeight={"bold"} >
          <Heading fontSize="40px" fontWeight={"semibold"} textShadow={'2px 2px 4px rgba(0, 0, 0, 0.5)'} transform={'perspective(500px) rotateX(0deg)'} >PILOT APTITUDE TEST</Heading>
          <Text fontSize={"20px"} color={"red.500"}>Unlock Your Flying Dreams: Ace the Pilot Aptitude Test with Confidence and Precision with Aviator Cloud.</Text>
        </Flex>
      </Flex>
      <Flex direction={"column"} rowGap={"20px"} textAlign={"left"} padding={"5% 10% 5% 10%"} >
        <Box>The Pilot Aptitude Test, often referred to as the PAT, is a specialized assessment used to evaluate a candidate's ability to succeed in flight training and subsequently in a career as a pilot. It's a crucial part of the selection process for aviation schools, the military, airlines, and other aviation-related organizations. The primary goal of the PAT is to measure various innate skills that are hard to teach but fundamental to successful pilot performance. This includes spatial awareness, multitasking ability, reaction times, and memory, among others.</Box>
        <Box>The test often incorporates both cognitive and psychomotor elements, reflecting the diverse set of skills required for a pilot's role. It covers several key areas that include, but aren't limited to:</Box>
        <Box padding={"20px"}>
          <Box>1. <b>Hand-eye coordination and motor control: </b> These sections assess an applicant's ability to control their movements with precision, a skill necessary for flying an aircraft.</Box>
          <Box>2. <b>Spatial orientation:</b> These tasks measure a candidate's ability to understand and interpret spatial relationships, an essential skill for navigation and handling an aircraft in three-dimensional space.</Box>
          <Box>3. <b>Multi-tasking:</b> Pilots must be able to handle multiple tasks at once. This section evaluates an individual's capability to manage and execute multiple tasks simultaneously and seamlessly.</Box>
          <Box>4. <b>Decision-making under pressure: </b> This section tests a candidate's ability to make quick, sound decisions under high-pressure situations, emulating real-life emergency scenarios that may occur during a flight.</Box>
          <Box>5. <b>Memory and information processing: </b> These tasks assess an applicant's ability to quickly process, retain and recall relevant information, crucial for remembering flight procedures and protocols.</Box>
          <Box>6. <b>Mathematical and verbal reasoning: </b> These sections test an applicant's basic math and English language skills, as these are key in understanding flight manuals, communicating with air traffic control, and making crucial calculations.</Box>
        </Box>
        <Box>The PAT is designed to be challenging and highly selective to ensure that only the most capable and suitable candidates progress to the demanding world of aviation. Each section of the test contributes a unique piece of the puzzle, creating a comprehensive picture of a candidate's potential aptitude for a career as a pilot.</Box>
        <Box>The PAT may vary somewhat in format and specific tasks between different institutions, but its core purpose remains the same: to evaluate the inherent skills that make a successful pilot. Hence, a high score on the PAT is a promising indicator of a candidate's future success in the aviation industry.</Box>
      </Flex>

      {/* Short term memory test  */}
      <Box
        padding={{ base: "1% 2%", md: "1% 5% 5% 5%" }}
        m={{ base: "10px", md: "20px" }}
        bg="gray.200" // Background color
        boxShadow="2px 2px 4px rgba(0, 0, 0, 0.5)" // Shadow effect
      >
        <Heading
          fontSize={{ base: "24px", md: "30px" }}
          fontWeight={"semibold"}
          textShadow={'2px 2px 4px rgba(0, 0, 0, 0.5)'}
          transform={'perspective(500px) rotateX(0deg)'}
          textAlign={{ base: "center", md: "center" }}
        >
          Short Term Memory Test
        </Heading>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: "20px", md: "0" }}
          mt="20px"
        >
          <Box>
            <Image src={sortterm1} alt="sortterm1" w={"100%"} />
          </Box>
          <Box textAlign={"left"} m={"5px"}>
            <Text>
              Aviator Cloud is proud to introduce our state-of-the-art, in-house
              developed Short-Term Memory Test application, an innovative tool
              designed to accurately evaluate the memory skills crucial for aspiring
              pilots. This pioneering platform is specifically engineered to provide a
              precise assessment of a candidate's ability to rapidly absorb, retain,
              and recall information, a critical skill in the dynamic, fast-paced
              environment of aviation.
            </Text>
          </Box>
        </Stack>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: "20px", md: "0" }}
          mt="20px"
        >
          <Box textAlign={"left"} m={"5px"}>
            <Text>
              Our Short-Term Memory Test application employs a range of carefully
              designed exercises and simulations, presenting users with different
              types of information (such as heading, altitude, or speed) that they
              must remember and reproduce accurately. Utilizing real-world scenarios
              and aviation-specific contexts, the test provides a rigorous yet
              practical measure of memory capability. It offers not only a reliable
              snapshot of a candidate's current short-term memory skills but also
              valuable insights into their potential to handle the demanding cognitive
              requirements of a career in the skies.
            </Text>
          </Box>
          <Box>
            <Image src={shortterm2} alt="sortterm2" />
          </Box>
        </Stack>
        <Center mt="20px">
          <Button
            w={{ base: "100%", md: "400px" }}
            bg={"yellow.500"}
            borderRadius={"20px"}
            m={"auto"}
            color={"blue"}
            fontWeight={"bold"}
            style={{
              boxShadow:
                'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
            }}
          >
            <Link
              href="https://short-term-memory-avitorcloud.netlify.app"
              isExternal
              target="_blank"
            >
              Start Short Term Test
            </Link>
          </Button>
        </Center>
      </Box>

      {/* Spatial awarness  */}
      <Box
        padding={{ base: "1% 2%", md: "1% 5% 5% 5%" }}
        m={{ base: "10px", md: "20px" }}
        bg="gray.200" // Background color
        boxShadow="2px 2px 4px rgba(0, 0, 0, 0.5)" // Shadow effect
      >
        <Heading
          fontSize={{ base: "24px", md: "30px" }}
          fontWeight={"semibold"}
          textShadow={'2px 2px 4px rgba(0, 0, 0, 0.5)'}
          transform={'perspective(500px) rotateX(0deg)'}
          textAlign={{ base: "center", md: "center" }}
        >
          Spatial Awareness Test
        </Heading>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: "20px", md: "0" }}
          mt="20px"
        >
          <Box>
            <Image src={spatialawarnes1} alt="sortterm1" w={"100%"} />
          </Box>
          <Box textAlign={"left"} m={"5px"}>
            <Text>
              Aviator Cloud is thrilled to present our bespoke, in-house developed Spatial Awareness Test application. This advanced platform is designed to assess a candidate's ability to understand and interpret three-dimensional spaces, a key skill that every pilot needs to master. Whether it's about visualizing flight paths, interpreting navigation charts, or understanding the aircraft's position relative to other objects, spatial awareness is a vital competency in the world of aviation.
            </Text>
          </Box>
        </Stack>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: "20px", md: "0" }}
          mt="20px"
        >
          <Box textAlign={"left"} m={"5px"}>
            <Text>
              Our Spatial Awareness Test application provides a comprehensive set of interactive exercises that challenge users to demonstrate their understanding of spatial relationships. These exercises utilize a variety of aviation-based scenarios, including flight path adjustments, landing approach trajectories, and airspace conflict resolution. The goal is to measure an individual's ability to process and reason spatial information quickly and accurately, simulating the real-world demands they would encounter in an actual flight cockpit. This application gives candidates an opportunity to showcase their spatial awareness skills, providing a strong indicator of their suitability for a career as a pilot.
            </Text>
          </Box>
          <Box>
            <Image src={spatialawarnes2} alt="sortterm2" />
          </Box>
        </Stack>
        <Center mt="20px">
          <Button
            w={{ base: "100%", md: "400px" }}
            bg={"yellow.500"}
            borderRadius={"20px"}
            m={"auto"}
            color={"blue"}
            fontWeight={"bold"}
            style={{
              boxShadow:
                'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
            }}
          >
            <Link
              href="https://spatial-awarness-avitor-cloud.netlify.app"
              isExternal
              target="_blank"
            >
              Start Spatial Awarness Test
            </Link>
          </Button>
        </Center>
      </Box>

      {/* Multi tasking  */}
      <Box
        padding={{ base: "1% 2%", md: "1% 5% 5% 5%" }}
        m={{ base: "10px", md: "20px" }}
        bg="gray.200" // Background color
        boxShadow="2px 2px 4px rgba(0, 0, 0, 0.5)" // Shadow effect
      >
        <Heading
          fontSize={{ base: "24px", md: "30px" }}
          fontWeight={"semibold"}
          textShadow={'2px 2px 4px rgba(0, 0, 0, 0.5)'}
          transform={'perspective(500px) rotateX(0deg)'}
          textAlign={{ base: "center", md: "center" }}
        >
          Multi-Tasking
        </Heading>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: "20px", md: "0" }}
          mt="20px"
        >
          <Box>
            <Image src={multitasking1} alt="sortterm1" w={"100%"} />
          </Box>
          <Box textAlign={"left"} m={"5px"}>
            <Text>
              Aviator Cloud is excited to unveil our uniquely designed, in-house developed Multi-Tasking Test application, a highly interactive tool built to evaluate an essential skill for any aspiring pilot - multitasking. Pilots are regularly required to manage several tasks at once, whether it's communicating with air traffic control, monitoring various flight parameters, or making quick adjustments based on the dynamic flight environment. Our test application aims to mimic these demands, providing an authentic assessment of a candidate's multitasking abilities.
            </Text>
          </Box>
        </Stack>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: "20px", md: "0" }}
          mt="20px"
        >
          <Box textAlign={"left"} m={"5px"}>
            <Text>
              Our Multi-Tasking Test application uses a set of simulated flight scenarios that necessitate simultaneous attention to multiple elements. Candidates might be tasked with maintaining altitude while responding to ATC instructions and monitoring fuel levels, for instance. The objective is to determine how effectively an individual can manage and switch between these concurrent tasks without letting their performance dip in any one area. By accurately simulating the workload of a real cockpit environment, this test offers valuable insights into a candidate's potential to thrive in the multifaceted role of a pilot.
            </Text>
          </Box>
          <Box>
            <Image src={multitasking2} alt="sortterm2" />
          </Box>
        </Stack>
        <Center mt="20px">
          <Button
            w={{ base: "100%", md: "400px" }}
            bg={"yellow.500"}
            borderRadius={"20px"}
            m={"auto"}
            color={"blue"}
            fontWeight={"bold"}
            style={{
              boxShadow:
                'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
            }}
          >
            <Link
              href="https://multitasking-avitor-cloud.netlify.app"
              isExternal
              target="_blank"
            >
              Start Multi-Tasking Test
            </Link>
          </Button>
        </Center>
      </Box>

      {/* Advanced Control Test  */}
      <Box
        padding={{ base: "1% 2%", md: "1% 5% 5% 5%" }}
        m={{ base: "10px", md: "20px" }}
        bg="gray.200" // Background color
        boxShadow="2px 2px 4px rgba(0, 0, 0, 0.5)" // Shadow effect
      >
        <Heading
          fontSize={{ base: "24px", md: "30px" }}
          fontWeight={"semibold"}
          textShadow={'2px 2px 4px rgba(0, 0, 0, 0.5)'}
          transform={'perspective(500px) rotateX(0deg)'}
          textAlign={{ base: "center", md: "center" }}
        >
          Advanced Flight Control
        </Heading>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: "20px", md: "0" }}
          mt="20px"
        >
          <Box>
            <Image src={advancedcontrol1} alt="sortterm1" w={"100%"} />
          </Box>
          <Box textAlign={"left"} m={"5px"}>
            <Text>
              Aviator Cloud is pleased to introduce our innovative, in-house developed Advanced Flight Control Test application. This groundbreaking tool is designed to test a candidate's proficiency in flight control, one of the most vital and complex tasks in aviation. A pilot's ability to master flight controls determines their competency in handling aircraft during various phases of flight, including takeoff, in-flight maneuvers, and landing, under a variety of atmospheric conditions.
            </Text>
          </Box>
        </Stack>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: "20px", md: "0" }}
          mt="20px"
        >
          <Box textAlign={"left"} m={"5px"}>
            <Text>
              Our Advanced Flight Control Test application is composed of sophisticated simulation scenarios, replicating real-world flight situations. The test focuses on a range of control aspects from fundamental operations such as maintaining steady flight and executing precise turns, to more complex maneuvers like handling emergencies or navigating through turbulent weather. By gauging a candidate's ability to control a simulated aircraft effectively and safely under varying conditions, this application provides a robust evaluation of their aptitude for pilot training and their potential to excel in a challenging aviation career.
            </Text>
          </Box>
          <Box>
            <Image src={advancedcontrol2} alt="sortterm2" />
          </Box>
        </Stack>
        <Center mt="20px">
          <Button
            w={{ base: "100%", md: "400px" }}
            bg={"yellow.500"}
            borderRadius={"20px"}
            m={"auto"}
            color={"blue"}
            fontWeight={"bold"}
            style={{
              boxShadow:
                'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
            }}
          >
            <Link
              href="https://advance-flight-control-aviatorcloud.netlify.app/"
              isExternal
              target="_blank"
            >
              Start Advanced Control Test
            </Link>
          </Button>
        </Center>
      </Box>

      {/* Multitasking Normal Flight Control Test  */}
      <Box
        padding={{ base: "1% 2%", md: "1% 5% 5% 5%" }}
        m={{ base: "10px", md: "20px" }}
        bg="gray.200" // Background color
        boxShadow="2px 2px 4px rgba(0, 0, 0, 0.5)" // Shadow effect
      >
        <Heading
          fontSize={{ base: "24px", md: "30px" }}
          fontWeight={"semibold"}
          textShadow={'2px 2px 4px rgba(0, 0, 0, 0.5)'}
          transform={'perspective(500px) rotateX(0deg)'}
          textAlign={{ base: "center", md: "center" }}
        >
          MultiTasking Normal Flight Control
        </Heading>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: "20px", md: "0" }}
          mt="20px"
        >
          <Box>
            <Image src={normalcontrol1} alt="sortterm1" w={"100%"} />
          </Box>
          <Box textAlign={"left"} m={"5px"}>
            <Text>
              Aviator Cloud is proud to present our proprietary, in-house developed Normal Flight Control with Multi-Tasking Test application. This unique platform integrates the assessment of basic flight control skills with multitasking capabilities, reflecting the true demands of piloting an aircraft. Mastering flight controls is fundamental, but in real-world aviation, pilots also need to juggle multiple tasks simultaneously. Our test application is designed to reflect this complex reality, offering a comprehensive evaluation of these intertwined skills.
            </Text>
          </Box>
        </Stack>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: "20px", md: "0" }}
          mt="20px"
        >
          <Box textAlign={"left"} m={"5px"}>
            <Text>
              Our Normal Flight Control with Multi-Tasking Test application leverages cutting-edge simulation technology to create realistic flight scenarios. Candidates may be required to maintain a steady flight path while responding to simulated air traffic control instructions, monitoring key aircraft parameters, or handling unexpected alerts. The scenarios range in complexity, and they're designed to assess how well a candidate can maintain control of an aircraft while managing various concurrent tasks. This robust and integrated approach gives us a comprehensive understanding of a candidate's readiness for pilot training, providing a reliable indicator of their potential to manage the demands of an actual cockpit environment.
            </Text>
          </Box>
          <Box>
            <Image src={normalcontrol2} alt="sortterm2" />
          </Box>
        </Stack>
        <Center mt="20px">
          <Button
            w={{ base: "100%", md: "400px" }}
            bg={"yellow.500"}
            borderRadius={"20px"}
            m={"auto"}
            color={"blue"}
            fontWeight={"bold"}
            style={{
              boxShadow:
                'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
            }}
          >
            <Link
              href="https://flight-control-aviator-cloud.netlify.app"
              isExternal
              target="_blank"
            >
              Start Multi-tasking Normal Control Test
            </Link>
          </Button>
        </Center>
      </Box>

      {/* MultiTasking Advance Flight Control */}
      <Box
        padding={{ base: "1% 2%", md: "1% 5% 5% 5%" }}
        m={{ base: "10px", md: "20px" }}
        bg="gray.200" // Background color
        boxShadow="2px 2px 4px rgba(0, 0, 0, 0.5)" // Shadow effect
      >
        <Heading
          fontSize={{ base: "24px", md: "30px" }}
          fontWeight={"semibold"}
          textShadow={'2px 2px 4px rgba(0, 0, 0, 0.5)'}
          transform={'perspective(500px) rotateX(0deg)'}
          textAlign={{ base: "center", md: "center" }}
        >
          MultiTasking Advance Flight Control
        </Heading>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: "20px", md: "0" }}
          mt="20px"
        >
          <Box>
            <Image src={multitaskingadvanced1} alt="sortterm1" w={"100%"} />
          </Box>
          <Box textAlign={"left"} m={"5px"}>
            <Text>
              Aviator Cloud is delighted to announce our premier, in-house developed Advanced Flight Control with Multi-Tasking Test application. This sophisticated tool combines an evaluation of advanced flight control skills with the ability to effectively multitask, offering a realistic reflection of the complexities pilots face in real-world flight conditions. As pilots need to manage intricate flight controls whilst dealing with simultaneous demands, our test application integrates these aspects, creating a comprehensive and practical evaluation framework.
            </Text>
          </Box>
        </Stack>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: "20px", md: "0" }}
          mt="20px"
        >
          <Box textAlign={"left"} m={"5px"}>
            <Text>
              Our Advanced Flight Control with Multi-Tasking Test application utilizes high-fidelity flight simulations to present candidates with challenging scenarios that mirror actual aviation circumstances. Candidates might find themselves navigating difficult weather conditions while managing radio communications and monitoring crucial flight systems, for example. These scenarios vary in complexity and are specifically designed to assess how effectively a candidate can maintain precise control over the aircraft amidst multiple concurrent tasks. By simulating this high-stress, multitasking environment, we can gauge a candidate's ability to handle the intricacies of piloting, providing invaluable insights into their potential for a successful aviation career.
            </Text>
          </Box>
          <Box>
            <Image src={multitaskingadvanced2} alt="sortterm2" />
          </Box>
        </Stack>
        <Center mt="20px">
          <Button
            w={{ base: "100%", md: "400px" }}
            bg={"yellow.500"}
            borderRadius={"20px"}
            m={"auto"}
            color={"blue"}
            fontWeight={"bold"}
            style={{
              boxShadow:
                'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
            }}
          >
            <Link
              href="https://multitasking-advancflight-aviatocloud.netlify.app"
              isExternal
              target="_blank"
            >
              Start Multi-Tasking Advanced Control Test
            </Link>
          </Button>
        </Center>
      </Box>

      <Flex justify={"center"} p={"20px"} bg="lightgray">
        <Center
          w={{ base: "80%", md: "50%" }}
          borderRadius={"100%"}
          boxShadow="0 2px 4px rgba(0, 0, 0, 0.4)" // Adding box shadow
          p={"20px"}
          m={"20px"}
          bg={"aqua"}
        >
          <Image
            src={bottomcircle}
            alt="bottomcenter"
            width={"100%"}
            border={"10px solid red"}
            borderRadius={"100%"} // Adding border radius to make the image circular
          />
        </Center>
      </Flex>


    </Box >
  )
}

export default Aptitudetest