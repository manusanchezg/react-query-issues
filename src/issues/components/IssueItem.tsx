import { FC } from "react";
import { FiInfo, FiMessageSquare, FiCheckCircle } from "react-icons/fi";

import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { Issue, State } from "../interfaces";
import { getIssueComments, getIssueInfo } from "../hooks/useIssue";

interface Props {
  issue: Issue;
}

export const IssueItem: FC<Props> = ({ issue }) => {
  const { state, title, number, user, comments, labels } = issue;
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  // const prefetchData = () => {
  //   queryClient.prefetchQuery(
  //     ["issue", issue.number],
  //     () => getIssueInfo(issue.number),
  //     { staleTime: 1000 * 60 }
  //   );

  //   queryClient.prefetchQuery(
  //     ["issue", issue.number, "comments"],
  //     () => getIssueComments(issue.number),
  //     { staleTime: 1000 * 60 }
  //   );
  // };

  const preSetData = () => {
    queryClient.prefetchQuery(
      ["issue", issue.number],
      // @ts-ignore
      issue,
      {
        initialDataUpdatedAt: new Date().getTime() + 100000,
      }
    );
  };

  return (
    <div
      className="card mb-2 issue"
      onClick={() => navigate(`/issues/issue/${number}`)}
      onMouseEnter={preSetData}
    >
      <div className="card-body d-flex align-items-center">
        {state === State.Closed ? (
          <FiCheckCircle size={30} color="green" />
        ) : (
          <FiInfo size={30} color="red" />
        )}

        <div className="d-flex flex-column flex-fill px-2">
          <span>{title}</span>
          <span className="issue-subinfo">
            #{number} opened 2 days ago by{" "}
            <span className="fw-bold">{user.login}</span>
          </span>
          <div>
            {labels.map((label) => (
              <span
                key={label.id}
                className="badge rounded-pill m-1"
                style={{ backgroundColor: `#${label.color}`, color: "black" }}
              >{label.name}</span>
            ))}
          </div>
        </div>

        <div className="d-flex align-items-center">
          <img src={user.avatar_url} alt="User Avatar" className="avatar" />
          <span className="px-2">{comments}</span>
          <FiMessageSquare />
        </div>
      </div>
    </div>
  );
};
