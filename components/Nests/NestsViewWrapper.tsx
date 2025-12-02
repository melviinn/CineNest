import { getNests } from "@/app/data/nests/get-nests";
import NestsView from "./NestsView";

export default async function NestsViewWrapper({ user }: { user: any }) {
  const { initialNests, sharedNests } = await getNests({ user });

  return (
    <NestsView
      initialNests={initialNests}
      sharedNests={sharedNests}
      user={user}
    />
  );
}
