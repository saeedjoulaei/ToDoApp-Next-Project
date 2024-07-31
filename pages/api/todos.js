import { getSession } from "next-auth/react";
import connectDB from "../../utils/connectDB";
import User from "../../models/User";
import { sortTodos } from "../../utils/sortToDos";

async function handler(req, res) {
  try {
    await connectDB();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "failed", message: "Error in connecting to DB" });
  }
  const session = await getSession({ req });
  // console.log(session);

  if (!session) {
    return res
      .status(401)
      .json({ status: "failed", message: "you are not logged in" });
  }

  const user = await User.findOne({ email: session.user.email });

  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "user doesn't exist" });
  }

  if (req.method === "POST") {
    const { status, title } = req.body;

    if (!status || !title) {
      return res
        .status(422)
        .json({ status: "failed", message: "invalid data" });
    }
    user.todos.push({ status, title });
    user.save();
    return res.status(201).json({ status: "success", message: "Todo Created" });
  } else if (req.method === "GET") {
    const sortedData = sortTodos(user.todos);
    res.status(200).json({ status: "success", data: { todos: sortedData } });
  } else if (req.method === "PATCH") {
    const { id, status } = req.body;
    if (!id || !status)
      res.status(422).json({ status: "failed", message: "invalid data" });
    const result = await User.updateOne(
      { "todos._id": id },
      { $set: { "todos.$.status": status } }
    );
    console.log(result);
    res.status(200).json({ status: "success" });
  }
}
export default handler;
