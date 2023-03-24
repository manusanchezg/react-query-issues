import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { githubAPI } from "../../api/githubAPI";
import { Issue, State } from "../interfaces/issue";

interface Props {
  state?: State;
  labels: string[];
  page?: number;
}

const getIssues = async ({
  labels,
  state,
  page = 1,
}: Props): Promise<Issue[]> => {
  const params = new URLSearchParams();

  if (state) params.append("state", state);

  if (labels.length > 0) {
    const labelsString = labels.join(",");
    params.append("labels", labelsString);
  }

  params.append("page", page.toString());
  params.append("per_page", "10");

  const { data } = await githubAPI.get<Issue[]>("/issues", { params });
  return data;
};

export const useIssues = ({ state, labels }: Props) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [state, labels]);

  const issuesQuery = useQuery(["issues", { state, labels, page }], async () =>
    await getIssues({ labels, state, page })
  );

  const nextPage = () => {
    if (issuesQuery.data?.length === 0) return;
    setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return {
    // Properties
    issuesQuery,
    // Getters
    page: issuesQuery.isFetching ? "Loading..." : page,
    // Methods
    nextPage,
    prevPage,
  };
};
