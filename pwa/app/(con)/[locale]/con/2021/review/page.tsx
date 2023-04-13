import { getAllEditionPictures } from "api/con/editions";
import ReviewCover from "components/con/review/ReviewCover";
import ReviewList from "./components/Review/ReviewList";
import Image from "next/image";
import PictureGallery from "components/con/common/PictureGallery";
import Button from "components/con/common/Button";

export default async function Page() {
  const images = await getAllEditionPictures("2021");
  return (
    <>
      <ReviewCover
        edition="2021"
        title="It was a blast!"
        baseline={
          <p>
            Thank you again for joining and trusting us on this first edition!
            <br />
            We are looking forward to seeing you all again next year.
          </p>
        }
        button={
          <Button to="https://www.youtube.com/playlist?list=PL3hoUDjLa7eSo7-CAyiirYfhJe4h_Wxs4">
            Watch the Conferences
          </Button>
        }
      />
      <ReviewList />
      <PictureGallery
        className="pb-60 pt-12"
        link="https://www.flickr.com/photos/194052559@N02/albums/72157719936921021"
      >
        {images.map((image: string) => (
          <Image
            className="object-cover"
            key={image}
            fill
            src={image}
            alt=""
            sizes="400px"
          />
        ))}
      </PictureGallery>
    </>
  );
}
