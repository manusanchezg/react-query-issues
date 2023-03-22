import LoadingIcon from "../../shared/components/LoadingIcon";
import { useLabels } from "../hooks/useLabels";

export const LabelPicker = () => {
  const labelQuery = useLabels();

  // shows message when there is nothing in cache and no data loaded
  if (labelQuery.isLoading) return <LoadingIcon />;

  return (
    <div>
      {labelQuery.data?.map((label) => (
        <span
          key={label.id}
          className="badge rounded-pill m-1 label-picker p-2"
          style={{
            border: `1px solid #${label.color}`,
            color: `#${label.color}`,
          }}
        >
          {label.name}
        </span>
      ))}
    </div>
  );
};
