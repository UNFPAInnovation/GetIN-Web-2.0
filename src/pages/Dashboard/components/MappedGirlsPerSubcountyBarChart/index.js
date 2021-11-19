import React, { useState, useMemo } from "react";

// Chart Stuff
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Drilldown from "highcharts/modules/drilldown.js";

// Chart Card Component
import ChartCard from "../../../../components/ChartCard";

// Utils
import { getDistrict } from "../../../../components/Charts/utils/utils";

// Chart + Chart Data
import { MappedGirlsPerSubcountyBarChart } from "../../../../components/Charts/MappedGirlsPerSubcountyBarChart";

const MappedGirlsPerSubcountyBarChartCard = ({ data }) => {
  const [chart, setChart] = useState();
  const [district, setDistrict] = useState();

  useMemo(() => {
    if (data && data) {
      console.log(data)
      setDistrict(getDistrict(data));
      setChart(MappedGirlsPerSubcountyBarChart(data));
    }
  }, [data]);

  return (
    <ChartCard
      title={"Mapped women per subcounty from " + district}
      content={
        <HighchartsReact
          highcharts={Drilldown(Highcharts)}
          options={chart && chart}
        />
      }
    />
  );
};

export default MappedGirlsPerSubcountyBarChartCard;
