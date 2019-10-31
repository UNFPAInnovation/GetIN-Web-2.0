import React from "react";

import { faSync } from "@fortawesome/free-solid-svg-icons";

// Card Component
import Card from "../../../../components/Card";

const FollowUpsCard = props => {
  return (
    <Card
      title="Follow ups"
      icon={faSync}
      rate="5%"
      direction="down"
      amount={500}
      color="card-orange"
    />
  );
};

export default FollowUpsCard;
