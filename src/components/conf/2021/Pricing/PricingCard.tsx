import React from 'react';
import dayjs from 'dayjs';
import classnames from 'classnames';
import { GridItem } from '@components/common/Grid';
import { Price } from '../types';
import Button from '../common/Button';

interface PricingCardProps {
  active: boolean;
  price: Price;
}

const PricingCard: React.ComponentType<PricingCardProps> = ({ price, active }) => {
  const { offers, title, limitDate } = price;
  return (
    <GridItem padding={0} className={classnames('conf__pricing-item', { disabled: !active })}>
      <div className="conf__pricing-card">
        <div className="pricing__header">
          <div className="overline">{`until ${dayjs(limitDate).format('LL')}`}</div>
          <h3 className="h5 lined lined-white">{title}</h3>
        </div>
        <div className="pricing__content dotted-corner corner-bottom">
          {offers.map((offer) => (
            <div key={offer.title}>
              <span className="overline">{offer.title}</span>
              <span className="h4 pricing__amount">{offer.price}$</span>
            </div>
          ))}
        </div>
        <Button className="square" size="small" disabled={!active}>
          {active ? 'Buy ticket' : 'unavailable'}
        </Button>
      </div>
    </GridItem>
  );
};

export default PricingCard;
