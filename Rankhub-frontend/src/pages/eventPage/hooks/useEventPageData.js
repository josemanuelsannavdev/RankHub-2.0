import { useEffect, useState } from "react";
import {getEvent} from "../../../services/eventApi";


const useEventPageData = ({eventId}) => {

    const [event,setEvent] = useState(null)

    useEffect(() => {
        // Simulate an API call to fetch event data
        const fetchEvent = async () => {
            // Replace this with your actual API call
            const eventData = await getEvent(eventId);
            setEvent(eventData);
        };

        fetchEvent();
    }, [eventId]);

    return { event };
}

export default useEventPageData