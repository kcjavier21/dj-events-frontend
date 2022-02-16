import type { NextPage } from "next";
import Link from "next/link";
import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL } from "@/config/index";

const Home: NextPage = ({ events }: any) => {
  console.log(events);

  return (
    <Layout>
      <h2>Upcoming Events</h2>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((evt: any) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      {events.length > 0 && (
        <Link href="/events">
          <a className="btn-secondary">View All Events</a>
        </Link>
      )}
    </Layout>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();

  return {
    props: { events: events.slice(0, 3) },
  };
}

export default Home;
