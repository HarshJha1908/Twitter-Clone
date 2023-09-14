import Header from "@/components/header";
import NotificationsFeed from "@/components/notifications";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

const Notifications = () => {
  return (
    <div>
      <Header label="Notification" showBackArrow />
      <NotificationsFeed />
    </div>
  );
};

export default Notifications;
