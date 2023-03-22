import { useQuery } from "@tanstack/react-query";
import { githubAPI } from "../../api/githubAPI";
import { Issue } from "../interfaces/issue";

const getIssues = async (): Promise<Issue[]> => {
  const { data } = await githubAPI.get<Issue[]>("/issues");
  console.log(data);
  return data;
};

export const useIssues = () => {
  const issuesQuery = useQuery(["issues"], getIssues);

  return {
    issuesQuery,
  };
};
