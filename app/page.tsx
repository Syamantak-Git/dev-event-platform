import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { EventItem } from "@/lib/constants";
// import events from "@/lib/constants";
import Image from "next/image";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL 
export default async function Home() {
  console.log("baseurlis",BASE_URL)
  const response = await fetch(`${BASE_URL}/api/events`)
  const {events} = await response.json()
  return (
    <section>
      <h1 className="text-center">
        The Hub For Every Dev <br /> Event You Can't Miss
      </h1>
      <p className="text-center mt-5">
        Hackathons, Meetups, and Conferences, All in One Place
      </p>
      <ExploreBtn />
      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>
        <ul className="events">
          {events && events.length > 0 && events.map((event:EventItem) => (
            <li key={event.title} className="list-none"><EventCard {...event}/></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
