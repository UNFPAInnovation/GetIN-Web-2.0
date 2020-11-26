import React from 'react';

import { faBaby } from '@fortawesome/free-solid-svg-icons';

// Card Component
import Card from '../../../../components/Card';

const DeliveriesCard = ({ data }) => {
  return (
    <Card
      title='Health facility Deliveries'
      icon={faBaby}
      rate='60%'
      direction='up'
      number={data && data.count}
      color='card-blue'
    />
  );
};
export default DeliveriesCard;
