import Card from "components/common/Card";
import Image from "next/image";

interface ColouringListProps {
  images: string[];
}

export default function ColouringList({ images }: ColouringListProps) {
  return (
    <div className="container grid gap-6 grid-cols-[repeat(auto-fit,350px)] w-full place-content-center py-12">
      {images.map((image: string) => {
        return (
          <Card
            key={image}
            padding
            bordered
            externalLink={`/images/colouring/${image}.jpg`}
            className="flex flex-col w-full aspect-[4/3]"
          >
            <div className="w-full h-full relative overflow-hidden">
              <Image
                className="object-cover w-full h-full transition-all duration-300 group-hover/card:scale-110 group-hover/card:opacity-70"
                src={`/images/colouring/mini/${image}.jpg`}
                alt="Colouring webby"
                width="330"
                height="200"
              />
            </div>
          </Card>
        );
      })}
    </div>
  );
}
