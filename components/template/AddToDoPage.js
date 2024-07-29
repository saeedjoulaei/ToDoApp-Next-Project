import { useState } from "react";
import RadioButton from "../element/RadioButton";
import { BsAlignStart } from "react-icons/bs";
import { GrAddCircle } from "react-icons/gr";
import { FiSettings } from "react-icons/fi";
import { AiOutlineFileSearch } from "react-icons/ai";
import { MdDoneAll } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddToDoPage() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("todo");

  const addHandler = async () => {
    const res = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ status, title }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    if (data.status === "success") {
      setTitle("");
      setStatus("todo");
      toast.success("Todo added!");
    }
  };

  return (
    <div className="add-form">
      <h2>
        <GrAddCircle />
        Add New Todo
      </h2>

      <div className="add-form__input">
        <div className="add-form__input--first">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="add-form__input--second">
          <RadioButton
            status={status}
            setStatus={setStatus}
            title="Todo"
            value="todo"
          >
            <BsAlignStart />
          </RadioButton>

          <RadioButton
            status={status}
            setStatus={setStatus}
            title="In Progress"
            value="inProgress"
          >
            <FiSettings />
          </RadioButton>

          <RadioButton
            status={status}
            setStatus={setStatus}
            title="Review"
            value="review"
          >
            <AiOutlineFileSearch />
          </RadioButton>

          <RadioButton
            status={status}
            setStatus={setStatus}
            title="Done"
            value="done"
          >
            <MdDoneAll />
          </RadioButton>
        </div>
        <button onClick={addHandler}>Add</button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddToDoPage;
