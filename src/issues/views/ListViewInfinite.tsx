import { useState } from "react";
import { useIssues } from "../hooks";

import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import LoadingIcon from "../../shared/components/LoadingIcon";
import { State } from "../interfaces";

export const ListViewInfinite = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [state, setState] = useState<State>();
  const { issuesQuery, page, nextPage, prevPage } = useIssues({
    state,
    labels: selectedLabels,
  });

  const onLabelChange = (labelName: string) => {
    selectedLabels.includes(labelName)
      ? setSelectedLabels(selectedLabels.filter((label) => label !== labelName))
      : setSelectedLabels([...selectedLabels, labelName]);
  };

  return (
    <div className="row mt-5">
      <div className="col-8">
        {issuesQuery.isLoading ? (
          <LoadingIcon />
        ) : (
          <IssueList
            state={state}
            onStateChange={(newState) => setState(newState)}
            issues={issuesQuery.data || []}
          />
        )}
      <button className="btn btn-outline-primary my-3">Load more...</button>
      </div>


      <div className="col-4">
        <LabelPicker
          selectedLabels={selectedLabels}
          onChange={(labelName) => onLabelChange(labelName)}
        />
      </div>
    </div>
  );
};
