import React, { useContext } from "react";
import dayjs from "dayjs";
import Button from "components/con/common/Button";
import { Price, Offer } from "types/con";
import useEventBriteModal from "hooks/con/useEventBriteModal";
import { LanguageContext } from "contexts/con/LanguageContext";

interface PricingCardProps {
  price: Price;
}

export default function PricingCard({ price }: PricingCardProps) {
  const { t, locale } = useContext(LanguageContext);

  useEventBriteModal(`price${price.id}`);

  const isActiveOffer = (offer: Offer) => {
    if (offer.limitDate && dayjs(offer.limitDate).isBefore(dayjs(), "day"))
      return false;
    if (offer.startDate && dayjs(offer.startDate).isAfter(dayjs(), "day"))
      return false;
    return true;
  };

  const offers = price.offers.filter((offer) => isActiveOffer(offer));

  return (
    <div className="p-1 mb-14 relative transition-all max-w-sm w-full saturate-50 first:saturate-100 group | md:mb-8 md:max-w-none md:w-1/2 md:first:z-10 md:first:scale-110  | lg:w-1/3">
      <div
        className="flex flex-col items-center h-full justify-center shadow-md transition-all relative cursor-pointer hover:rotate-3 hover:shadow-xl hover:translate-x-4 hover:scale-105 group-first:hover:-translate-x-4 group-first:hover:-rotate-3"
        id={`price${price.id}`}
      >
        <div className="w-full bg-blue p-5 text-center">
          <h3 className="uppercase font-title font-bold text-2xl text-white lined-center lined-white">
            {price.title[locale]}
          </h3>
          <p className="uppercase font-medium leading-tight text-sm font-title text-blue-darkest">
            {price.languages[locale]}
          </p>
        </div>
        <div className="flex flex-col flex-1 p-5 w-full bg-white items-center justify-center border-b-8 border-b-blue dotted-corner corner-bottom">
          {offers.map((offer, index) => (
            <div
              key={`${offer.title}-${index}`}
              className="border-b-2 w-full text-center border-dotted border-b-blue last:border-b-0 flex items-center justify-center flex-col py-3"
            >
              <div
                className="uppercase font-extralight leading-tight text-sm"
                dangerouslySetInnerHTML={{ __html: offer.title[locale] }}
              />
              <span className="font-bold text-blue font-title text-4xl">
                {offer.price}€
              </span>
            </div>
          ))}
        </div>
        <Button
          className="square absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 hover:bg-white"
          size="small"
        >
          {t("buy_tickets")}
        </Button>
      </div>
    </div>
  );
}
