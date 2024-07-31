import { getSession } from "next-auth/react";
import HomePage from "../components/template/HomePage";
import { redirect } from "next/dist/server/api-utils";

export default function Home() {
  return <HomePage />;
}

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
