import React from 'react';

import { faFemale } from '@fortawesome/free-solid-svg-icons';

// Card Component
import Card from '../../../../components/Card';

const MappedGirlsCard = ({ data }) => {
  return (
    <Card
      title='Mapped girls'
      icon={faFemale}
      rate='30%'
      direction='up'
      number={data && data.results.count}
      color='card-purple'
    />
  );
};

export default MappedGirlsCard;
