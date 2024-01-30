import { useEffect, useState } from 'react';
import { StoreandUpdate, paymentDetails } from '../Redux/Payment/payment.action';
import { useDispatch } from "react-redux"
import imageloading from "../utills/images/loading/imageloading.gif"
import paymentsucessimg from "../utills/images/paymentInfo/paymentsucess.gif"
import paymentfailed from "../utills/images/paymentInfo/paymentfailed.gif"
import { Box, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const PaymentStatusPage = () => {
  const dispatch = useDispatch();
  const paymentInfo = JSON.parse(localStorage.getItem("avitorPaymentInfo"));
  const [loading, setLoading] = useState(false);
  const [paymentsucess, setPaymentSuccess] = useState(false);

  const getdata = async (creds) => {
    const res = await dispatch(StoreandUpdate(creds));
    return res;
  }
  useEffect(() => {
    // Function to parse query string and get parameters
    setLoading(true);
    const getQueryStringParams = (query) => {
      const params = {};
      const search = new URLSearchParams(query);
      for (let param of search.entries()) {
        params[param[0]] = param[1];
      }
      return params;
    };
    const queryString = window.location.search;
    const queryParams = getQueryStringParams(queryString);
    const paymentId = queryParams.payment_id;
    const paymentStatus = queryParams.payment_status;
    const paymentRequestId = queryParams.payment_request_id;

    // Use the parameters as required (e.g., check payment status)
    console.log('Payment ID:', paymentId);
    console.log('Payment Status:', paymentStatus);
    console.log('Payment Request ID:', paymentRequestId);

    const creds = { ...paymentInfo, ["status"]: "Completed" }

    // Perform further actions based on payment status, if needed
    // For example, update the UI or show a success/failure message
    const fetchData = async () => {
      try {
        if (paymentStatus === 'Credit') {
          const res = await getdata(creds)
          console.log(res);
          setLoading(false);
          setPaymentSuccess(true);
        } else {
          // Payment failed
          setLoading(false)
          setPaymentSuccess(false);
        }
      } catch (error) {
        console.error('Error in fetchData:', error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
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
    <Box>
      <Box>
      <Box
            p="4"
            bgGradient="linear(to-r, yellow, red)" // Use the linear gradient from yellow to red
            textAlign="center"
            display={"flex"}
            justifyContent={"center"}
          >
            <Text color="white" display={"flex"} fontWeight={"bold"} fontSize={"20px"}> {/* Set text color to white for visibility */}
              If you are already signed up, please proceed to
              <Link to="/login" >
                <Text color="blue.900" fontWeight="bold" mx="2" textDecoration={"underline"}>{" "}Login</Text>
              </Link>
              If not, you can
              <Link to="/signup">
                <Text color="blue.900" fontWeight="bold" mx="2" textDecoration={"underline"}>{" "}Sign Up{" "}</Text>
              </Link>
              first.
            </Text>
          </Box>
          <Heading textAlign="center" size="xl" mt="4" mb="2">Payment Successful</Heading>
          <Text textAlign="center">Thank you for your payment!</Text>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            bg="blue.800"
          >
            <img src={paymentsucessimg} alt="paymentsucess" />
          </Box>
      </Box>
      {paymentsucess ? (
        <Box>
          <Box
            p="4"
            bgGradient="linear(to-r, yellow, red)" // Use the linear gradient from yellow to red
            textAlign="center"
            display={"flex"}
            justifyContent={"center"}
          >
            <Text color="white" display={"flex"} fontWeight={"bold"} fontSize={"20px"}> {/* Set text color to white for visibility */}
              If you are already signed up, please proceed to
              <Link to="/login" >
                <Text color="blue.900" fontWeight="bold" mx="2" textDecoration={"underline"}>{" "}Login</Text>
              </Link>
              If not, you can
              <Link to="/signup">
                <Text color="blue.900" fontWeight="bold" mx="2" textDecoration={"underline"}>{" "}Sign Up{" "}</Text>
              </Link>
              first.
            </Text>
          </Box>
          <Heading textAlign="center" size="xl" mt="4" mb="2">Payment Successful</Heading>
          <Text textAlign="center">Thank you for your payment!</Text>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            bg="blue.800"
          >
            <img src={paymentsucessimg} alt="paymentsucess" />
          </Box>
        </Box>
      ) : (
        <Box>
          <Box
            p="4"
            bgGradient="linear(to-r, yellow, red)" // Use the linear gradient from yellow to red
            textAlign="center"
            color={"white"}
          >
            <Heading textAlign="center" size="xl" mt="4" mb="2">Payment Unsuccessful</Heading>
            <Text textAlign="center">Oops! Payment failed. Please
              <Link to="/payment">
                <Text color="blue.900" fontWeight="bold" mx="2" textDecoration={"underline"}>{" "}Try Again{" "}</Text>
              </Link></Text>
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            bg="blue.800"
          >
            <img src={paymentfailed} alt="paymentfailed" />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default PaymentStatusPage;
