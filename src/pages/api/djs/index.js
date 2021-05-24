import nc from "next-connect";
import { getAllDJs } from "../../../lib/backend-utils";

const handler = nc().get(async (req, res) => {
  const djs = await getAllDJs();
  res.status(200).json(djs);
});

export default handler;