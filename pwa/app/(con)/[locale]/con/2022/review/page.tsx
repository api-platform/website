import { getAllEditionPictures } from "api/con/editions";
import ReviewCover from "components/con/review/ReviewCover";
import ReviewList from "./components/Review/ReviewList";
import Image from "next/image";
import PictureGallery from "components/con/common/PictureGallery";

export default async function Page() {
  const images = await getAllEditionPictures("2022");
  return (
    <>
      <ReviewCover
        edition="2022"
        title="An edition beyond our expectations"
        baseline={
          <>
            <p>
              Thank you to all our attendees for joining us for this second
              edition.
              <br />
              We hope you enjoyed it as much as we loved organizing it.
            </p>
            <p className="text-sm mt-4">
              API Platform Con will be back in 2023. To stay up to date on all
              of our latest news, follow us on{" "}
              <a
                href="https://twitter.com/ApiPlatform"
                target="_blank"
                rel="noreferrer noopener"
              >
                Twitter
              </a>
              .
            </p>
          </>
        }
      />
      <ReviewList />
      <PictureGallery
        className="pb-60 pt-12"
        link="https://www.flickr.com/photos/194052559@N02/albums/72177720302238684"
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
