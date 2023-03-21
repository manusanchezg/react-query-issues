import { useLabels } from "../hooks/useLabels";

export const LabelPicker = () => {
  const labelQuery = useLabels();

  if (labelQuery.isLoading) return <h1>Loading...</h1>;

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
