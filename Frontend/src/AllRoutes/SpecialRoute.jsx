import React, { useEffect, useState } from 'react'
import { getPaymentInfo } from '../Redux/Payment/payment.action'
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SpecialAcess } from '../Redux/Auth/auth.action';

const SpecialRoute = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [access, setAccess] = useState(false);
    const location = useLocation()
    const dispatch = useDispatch();

    function addDays(dateString, days) {
        const currentDate = new Date(dateString);
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + days);

        // Formatting the new date to match the original format
        const formattedDate = newDate.toISOString();
        return formattedDate;
    }

    function formatDate(date) {
        return date.toISOString().slice(0, 23) + "Z";
    }

    function compareDates(receivedDateString) {
        const currentDate = new Date();
        const receivedDate = new Date(receivedDateString);

        const formattedCurrentDate = formatDate(currentDate);
        const formattedReceivedDate = formatDate(receivedDate);

        console.log(formattedCurrentDate, formattedReceivedDate);

        if (formattedCurrentDate <= formattedReceivedDate) {
            return true; // Current date is greater than or equal to the received date
        } else {
            return false; // Current date is earlier than the received date
        }
    }


    const fetchdata = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('useraviaton'));
            const res = await getPaymentInfo(user.email);
            if (res.email==="cto.aviatorcloud@gmail.com"){
                return true
            }
            let formateddates;
            if (res&&res?.status === 'Completed') {
                const created_at = res.created_at;

                if (res?.purpose === 'Buying aviation special Exam Platinum Plane') {
                    formateddates = addDays(created_at, 30);
                }
                if (res?.purpose === 'Buying aviation special Exam Silvar Plane') {
                    formateddates = addDays(created_at, 3);
                }
                if (res?.purpose === 'Buying aviation special Exam Gold Plane') {
                    formateddates = addDays(created_at, 15);
                }
            }
            const result = await compareDates(formateddates);
            console.log(result, formateddates)
            return result;
        } catch (error) {
            console.error('Error fetching payment info:', error);
            return false;
        }
    };

    useEffect(() => {
        fetchdata()
            .then((result) => {
                setAccess(result);
                dispatch(SpecialAcess(result));
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error determining access:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <h1>... Loading</h1>;
    }

    return children;
};

export default SpecialRoute;
