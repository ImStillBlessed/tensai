import HistoryCard from "@/components/dashboard/HistoryCard";
import HotTopicsCard from "@/components/dashboard/HotTopicsCard";
import RecentActivities from "@/components/dashboard/RecentActivities";
import StartQuizCard from "@/components/dashboard/StartQuizCard";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

export const metadata = {
  title: "Dashboard | Tensai",
};

const Dashboard = async (props: Props) => {
  const session = await getAuthSession();
  //   if (!session?.user) {
  //     // if the user is not logged in, redirect to the home page
  //     return redirect("/");
  //   }
  return (
    <main className="p-8 mx-auto max-w-7xl">
      <div className="flex items-center">
        <h2 className="mr-2 text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 mt-4 md:grid-cols-2">
        <StartQuizCard />
        <HistoryCard />
      </div>
      <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-7">
        <HotTopicsCard />
        <RecentActivities />
      </div>
    </main>
  );
};

export default Dashboard;
