import React, { useState } from "react";
import Image from "next/image";
import GetAppModal from "../Others/GetAppModal";

const EventExcerpt = React.memo(({ event }) => {
  const eventMediaFiles = event?.media_files;

  const firstImage =
    eventMediaFiles.find(
      (eventMediaFile) =>
        eventMediaFile?.media_file?.endsWith(".jpg") ||
        eventMediaFile?.media_file?.endsWith(".png") ||
        eventMediaFile?.media_file?.endsWith(".jpeg") ||
        eventMediaFile?.media_file?.endsWith(".webp")
    )?.media_file || null;

  const uniqueKey = `event-${event?.id}`;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-white px-4 py-2 cursor-pointer">
      <div className="flex flex-row" onClick={() => setIsModalOpen(true)}>
        {event?.media_files.length != 0 && firstImage != null ? (
          <Image
            className="rounded-sm mr-3"
            src={firstImage}
            alt="Event Image"
            // layout="responsive" // ✅ Makes it responsive
            width={70} // ✅ Controls aspect ratio
            height={70} // ✅ Controls aspect ratio
          />
        ) : (
          <Image
            className="rounded-sm mr-3"
            src="/images/default-event-image.png" // ✅ Use a relative path from the public folder
            alt="Event Image"
            // layout="responsive" // ✅ Makes it responsive
            width={70} // ✅ Controls aspect ratio
            height={70} // ✅ Controls aspect ratio
          />
        )}
        <div className="flex-1 truncate">
          <p
            className=" text-base font-semibold text-gray-800"
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap", // Keeps text on a single line
            }}
          >
            {event?.event_title}
          </p>

          {event?.event_date || event?.event_time ? (
            <p className="text-sm text-gray-800">
              {event?.event_date} {event?.event_time}
            </p>
          ) : (
            <p
              className="text-sm text-gray-800"
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap", // Keeps text on a single line
              }}
            >
              {event?.event_domain} event
            </p>
          )}

          {event?.interested_count > 0 ? (
            <p className="text-sm text-gray-500">
              {event?.interested_count} interested
            </p>
          ) : (
            <p
              className="text-sm text-gray-500"
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap", // Keeps text on a single line
              }}
            >
              {event?.event_description}
            </p>
          )}
        </div>
      </div>
      <GetAppModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
});
export default EventExcerpt;
