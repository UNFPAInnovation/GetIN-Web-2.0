import React from "react";

import { faBaby } from "@fortawesome/free-solid-svg-icons";

// Card Component
import Card from "../../../../components/Card";

const DeliveriesCard = props => {
  return (
    <Card
      title="Deliveries"
      icon={faBaby}
      rate="60%"
      direction="up"
      amount={400}
      color="card-blue"
    />
  );
};
export default DeliveriesCard;
