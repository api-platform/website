import React, { useLayoutEffect } from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { GridItem } from '@components/common/Grid';
import { Price } from '../types';
import BuyButton from '../common/BuyButton';

interface PricingCardProps {
  price: Price;
}

const PricingCard: React.ComponentType<PricingCardProps> = ({ price }) => {
  const sortedOffers = price.offers.sort((a, b) => {
    if (dayjs(a.limitDate).isAfter(dayjs(b.limitDate))) return 1;
    if (dayjs(b.limitDate).isAfter(dayjs(a.limitDate))) return -1;
    return 0;
  });
  const activeIndex = sortedOffers.findIndex((offer) => dayjs(offer.limitDate).isAfter(dayjs()));

  useLayoutEffect(() => {
    const onOrderComplete = () => console.log('order complete!');

    window.EBWidgets?.createWidget({
      widgetType: 'checkout',
      eventId: '146559873527',
      modal: true,
      modalTriggerElementId: `price${price.id}`,
      onOrderComplete,
    });
  }, [price.id]);

  return (
    <GridItem padding={5} className="conf__pricing-item">
      <div className="conf__pricing-card" id={`price${price.id}`}>
        <div className="pricing__header">
          <h3 className="h5 lined lined-white">{price.title}</h3>
        </div>
        <div className="pricing__content dotted-corner corner-bottom">
          {sortedOffers.map((offer, index) => (
            <div key={offer.title} className={classNames('pricing__offer', { active: index === activeIndex })}>
              <span className="overline offer__limit">{`until ${dayjs(offer.limitDate).format('LL')}`}</span>
              <span className="overline offer__title">{offer.title}</span>
              <span className="h4 pricing__amount">{offer.price}$</span>
            </div>
          ))}
        </div>
        <BuyButton className="square" size="small">
          Buy tickets
        </BuyButton>
      </div>
    </GridItem>
  );
};

export default PricingCard;
