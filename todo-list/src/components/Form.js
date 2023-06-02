import { v4 as uuid } from "uuid";
import { useMemo, useRef } from "react";
import { useAppContext } from "../context";

const Form = () => {
  const ref = useRef();
  const { state, dispatch } = useAppContext();
  const isValid = useMemo(() => !!state.input, [state.input]);
  const handleOnChange = (e) =>
    dispatch({
      type: "change",
      playload: { value: e.target.value },
    });
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      dispatch({
        type: "submit",
        playload: { item: { id: uuid(), content: state.input, done: false } },
      });
      ref.current.value = null;
    }
  };
  return (
    <form className="input-group mb-3" onSubmit={handleOnSubmit}>
      <input
        ref={ref}
        type="text"
        className="form-control form-control-lg mx-0"
        placeholder="Add new..."
        style={{ height: "max-content" }}
        onChange={handleOnChange}
      />
      <button type="submit" className="btn btn-info">
        Add
      </button>
    </form>
  );
};

export default Form;
