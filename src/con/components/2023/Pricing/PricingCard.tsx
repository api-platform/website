import React from 'react';
import dayjs from 'dayjs';
import { GridItem } from '@components/common/Grid';
import Button from '@con/components/common/Button';
import { Price } from 'src/con/types';
import useEventBriteModal from '@con/hooks/useEventBriteModal';

interface PricingCardProps {
  price: Price;
}

const PricingCard: React.ComponentType<PricingCardProps> = ({ price }) => {
  useEventBriteModal(`price${price.id}`);

  const isActiveOffer = (offer) => {
    if (offer.limitDate && dayjs(offer.limitDate).isBefore(dayjs(), 'day')) return false;
    if (offer.startDate && dayjs(offer.startDate).isAfter(dayjs(), 'day')) return false;
    return true;
  };

  const offers = price.offers.filter((offer) => isActiveOffer(offer));

  return (
    <GridItem padding={5} className="conf__pricing-item">
      <div className="conf__pricing-card" id={`price${price.id}`}>
        <div className="pricing__header">
          <h3 className="h5 lined lined-white">{price.title}</h3>
          <span className="overline">{price.languages}</span>
        </div>
        <div className="pricing__content dotted-corner corner-bottom">
          {offers.map((offer, index) => (
            <div key={`${offer.title}-${index}`} className="pricing__offer active">
              <div className="overline offer__title" dangerouslySetInnerHTML={{ __html: offer.title }} />
              <span className="h4 pricing__amount">{offer.price}€</span>
            </div>
          ))}
        </div>
        <Button className="square" size="small">
          Buy tickets
        </Button>
      </div>
    </GridItem>
  );
};

export default PricingCard;
