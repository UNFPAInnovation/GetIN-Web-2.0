import React from 'react';

import { faFemale } from '@fortawesome/free-solid-svg-icons';

// Card Component
import Card from '../../../../components/Card';

const MappedGirlsCard = ({ data }) => {
  return (
    <Card
      title='Mapped women'
      icon={faFemale}
      rate='30%'
      direction='up'
      number={
        data &&
        new Intl.NumberFormat('lg-UG').format(
          Math.ceil(
            data
              .map(c => c.count)
              .reduce(
                (accumulator, currentValue) => accumulator + currentValue,
                0
              )
          )
        )
      }
      color='card-purple'
    />
  );
};

export default MappedGirlsCard;
