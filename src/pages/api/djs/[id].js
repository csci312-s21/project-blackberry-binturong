import nc from "next-connect";
import { getDJNames } from "../../../lib/backend-utils";

function onError(error, req, res) {
  console.error(error);
  res.status(500).end(error.toString());
}

const handler = nc({ onError })
  .get(async (req, res) => {
    const { id } = req.query;
    const djs = await getDJNames(id);
    if (djs) {
      res.status(200).json(djs);
    } else {
      res.status(404).end(`DJs with show id ${id} not found`);
    }
  });

export default handler;