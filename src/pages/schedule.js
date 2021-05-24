import Layout from "../components/Layout.js";
import ScheduleContainer from "../components/ScheduleContainer.js";
import { useState } from "react";
import shows from "../../data/shows.json";

export default function Schedule() {
  const [allShows] = useState(shows);
  return (
    <Layout title="Schedule | WRMC 91.1 FM">
      <ScheduleContainer shows={allShows} />
    </Layout>
  );
}
