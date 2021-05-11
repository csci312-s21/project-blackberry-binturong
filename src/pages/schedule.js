import Layout from "../components/Layout.js";
import WeeklySchedule from "../components/WeeklySchedule.js";
import { useState } from "react";
import shows from "../../data/shows.json";

export default function Schedule() {
  const [allShows] = useState(shows);
  return (
    <Layout title="Schedule | WRMC 91.1 FM">
      <WeeklySchedule shows={allShows}/>
    </Layout>
  );
}