import React, { useMemo, useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";

import GeneralUserEventDetail from "../../../components/Events/GeneralUserEventDetail";

const DisplayUserEvent = () => {
  // let { eventId } = useLocalSearchParams();
  // eventId = Number(eventId);
  // console.log("Event Id:", eventId);
  // const event = useSelector((state) => selectEventById(state, eventId));

  let { event } = useLocalSearchParams();
  event = JSON.parse(event);
  // console.log("Event from display event:", event);

  return <GeneralUserEventDetail event={event} />;
};

export default DisplayUserEvent;
