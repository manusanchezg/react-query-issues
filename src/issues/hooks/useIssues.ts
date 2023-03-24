import { useQuery } from "@tanstack/react-query";
import { githubAPI } from "../../api/githubAPI";
import { Issue, State } from "../interfaces/issue";

interface Props {
  state?: State;
  labels: string[];
}

const getIssues = async (labels: string[], state?: State): Promise<Issue[]> => {
  const params = new URLSearchParams();

  if (state) params.append("state", state);

  if (labels.length > 0) {
    const labelsString = labels.join(",");
    params.append("labels", labelsString);
  }

  params.append('page', '1')
  params.append('per_page', '10')

  const { data } = await githubAPI.get<Issue[]>("/issues", { params });
  return data;
};

export const useIssues = ({ state, labels }: Props) => {
  const issuesQuery = useQuery(["issues", { state, labels }], () =>
    getIssues(labels, state)
  );

  return {
    issuesQuery,
  };
};
