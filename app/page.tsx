import ExploreBtn from "@/components/ExploreBtn";
import Image from "next/image";

export default function Home() {
  return (
    <section>
      <h1 className="text-center">The Hub For Every Dev <br/> Event You Can't Miss</h1>
      <p className="text-center mt-5">Hackathons, Meetups, and Conferences, All in One Place</p>
      <ExploreBtn/>
    </section>
  );
}
