import React from "react";
import { useLocalSearchParams } from "expo-router";

import GeneralEventDetail from "../../../components/Events/GeneralEventDetail";

const DisplayEvent = () => {
  // let { eventId } = useLocalSearchParams();
  // eventId = Number(eventId);
  // console.log("Event Id:", eventId);
  // const event = useSelector((state) => selectEventById(state, eventId));

  let { event } = useLocalSearchParams();
  event = JSON.parse(event);
  // console.log("Event from display event:", event);

  return <GeneralEventDetail event={event} />;
};

export default DisplayEvent;
