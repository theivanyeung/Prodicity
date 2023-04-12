import path from "path";
import { promises as fs } from "fs";

export default async function getFollowings(req, res) {
  const jsonDirectory = path.join(process.cwd(), "json");

  const fileContents = await fs.readFile(
    jsonDirectory + "/Followings.json",
    "utf8"
  );

  res.status(200).json(fileContents);
}
