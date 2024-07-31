import { getSession } from "next-auth/react";
import ProfilePage from "../components/template/ProfilePage";

function profile() {
  return <ProfilePage />;
}

export default profile;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }
  return { props: {} };
}
