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
  const labelsQuery = useQuery(["labels"], getLabels, {
    staleTime: 1000 * 60 * 60,
    placeholderData: [
      {
        id: 139653724,
        node_id: "MDU6TGFiZWwxMzk2NTM3MjQ=",
        url: "https://api.github.com/repos/facebook/react/labels/Component:%20Core%20Utilities",
        name: "Component: Core Utilities",
        color: "c5def5",
        default: false,
      },
      {
        id: 739761016,
        node_id: "MDU6TGFiZWw3Mzk3NjEwMTY=",
        url: "https://api.github.com/repos/facebook/react/labels/Component:%20Reconciler",
        name: "Component: Reconciler",
        color: "f9a798",
        default: false,
      },
    ],
  });

  return labelsQuery;
};
