import { FC } from "react";
import LoadingIcon from "../../shared/components/LoadingIcon";
import { useLabels } from "../hooks/useLabels";

interface Props {
  selectedLabels: string[];
  onChange: (labelName: string) => void;
}

export const LabelPicker: FC<Props> = ({ selectedLabels, onChange }) => {
  const labelQuery = useLabels();

  // shows message when there is nothing in cache and no data loaded
  if (labelQuery.isLoading) return <LoadingIcon />;

  return (
    <div>
      {labelQuery.data?.map((label) => (
        <span
          key={label.id}
          className={`badge rounded-pill m-1 label-picker p-2 ${
            selectedLabels.includes(label.name) ? "label-active" : ''
          }`}
          style={{
            border: `1px solid #${label.color}`,
            color: `#${label.color}`,
          }}
          onClick={() => onChange(label.name)}
        >
          {label.name}
        </span>
      ))}
    </div>
  );
};
