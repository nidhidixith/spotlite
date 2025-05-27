import Image from "next/image";
import GetAppModal from "../Others/GetAppModal";
import { useState } from "react";

const PostCarousel = ({ mediaFiles }) => {
  // console.log("Media files: ", mediaFiles);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const firstImage =
    mediaFiles.find(
      (mediaFile) =>
        mediaFile?.media_file?.endsWith(".jpg") ||
        mediaFile?.media_file?.endsWith(".png") ||
        mediaFile?.media_file?.endsWith(".jpeg") ||
        mediaFile?.media_file?.endsWith(".webp")
    )?.media_file || null;

  return (
    <>
      {firstImage && (
        <Image
          src={firstImage}
          alt="Post Image"
          // layout="responsive" // ✅ Makes it responsive
          width={400} // ✅ Controls aspect ratio
          height={400} // ✅ Controls aspect ratio
          className="rounded-sm cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        />
      )}
      <GetAppModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default PostCarousel;
