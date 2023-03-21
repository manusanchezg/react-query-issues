import { useQuery } from "@tanstack/react-query";
import { githubAPI } from "../../api/githubAPI";
import { sleep } from "../../helpers/sleep";
import { Label } from "../interfaces/label";

const getLabels = async (): Promise<Label[]> => {
//   await sleep(2);
  const { data } = await githubAPI.get<Label[]>("/labels");
  return data;
};

export const useLabels = () => {
  const labelsQuery = useQuery(["labels"], getLabels);

  return labelsQuery;
};
