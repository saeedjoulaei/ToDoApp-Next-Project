import Link from "next/link";
import { VscListSelection } from "react-icons/vsc";
import { BiMessageSquareAdd } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import { signOut, useSession } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";

function Layout({ children }) {
  const { status } = useSession();

  const clickHandler = () => {
    signOut();
  };
  return (
    <div className="container">
      <header>
        <p>Sj- ToDoApp</p>
        {status === "authenticated" ? (
          <button onClick={clickHandler}>
            Logout
            <FiLogOut />
          </button>
        ) : null}
      </header>
      <div className="container--main">
        <aside>
          <p> Welcome ❤️</p>
          <ul>
            <li>
              <VscListSelection />
              <Link href={"/"}>ToDos</Link>
            </li>
            <li>
              <BiMessageSquareAdd />
              <Link href={"/add-todo"}>Add Todo</Link>
            </li>
            <li>
              <RxDashboard />
              <Link href={"/profile"}>Profile</Link>
            </li>
          </ul>
        </aside>
        <section>{children}</section>
      </div>
    </div>
  );
}

export default Layout;
