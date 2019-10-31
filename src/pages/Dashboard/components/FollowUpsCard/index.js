import React from "react";

import { faSync } from "@fortawesome/free-solid-svg-icons";

// Card Component
import Card from "../../../../components/Card";

const FollowUpsCard = ({ data }) => {
  return (
    <Card
      title="Follow ups"
      icon={faSync}
      rate="5%"
      direction="down"
      number={data && data.count}
      color="card-orange"
    />
  );
};

export default FollowUpsCard;
