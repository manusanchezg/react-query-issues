import { useQuery } from "@tanstack/react-query";
import { githubAPI } from "../../api/githubAPI";
import { sleep } from "../../helpers/sleep";
import { Issue } from "../interfaces";

const getIssueInfo = async (issueNumber: number): Promise<Issue> => {
  sleep(2);
  const { data } = await githubAPI.get(`/issues/${issueNumber}`);
  return data;
};

export const useIssue = (issueNumber: number) => {
  const issueQuery = useQuery(["issue", issueNumber], () =>
    getIssueInfo(issueNumber)
  );

  return {issueQuery};
};
