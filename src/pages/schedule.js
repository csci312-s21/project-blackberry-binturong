import Layout from "../components/Layout.js";
import ScheduleContainer from "../components/ScheduleContainer.js";
import { useState, useEffect} from "react";

export default function Schedule() {
  const [shows, setShows] = useState();

  useEffect(() => {
    const getData = async () => {
      const response = await fetch( "/api/shows");
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const showData = await response.json();
      setShows(showData);
    };
    getData();
  }, []);

  let mainContents;
  if (shows){
    mainContents = <Layout title="Schedule | WRMC 91.1 FM">
      <ScheduleContainer shows={shows}/>
    </Layout>
  }

  return (
    <div>
      {mainContents}
    </div>
  );
}
