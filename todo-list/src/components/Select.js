import { useAppContext } from "../context";

function Select() {
  const { dispatch } = useAppContext();
  const options = ["All", "Completed", "Active", "Has due date"];
  const handleSelect = (option) => {
    dispatch({
      type: "select",
      playload: { option },
    });
  };
  const select = (e) => handleSelect(e.target.value);
  return (
    <div className="d-flex justify-content-end align-items-center my-3 ">
      <select
        onChange={select}
        className="select form-select form-control form-control-sm"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
export default Select;
