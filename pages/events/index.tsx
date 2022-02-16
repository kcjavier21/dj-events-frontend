import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL } from "@/config/index";

const EventsPage = ({ events }: any) => {
  console.log(events);

  return (
    <Layout>
      <h2>Events</h2>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((evt: any) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();

  return {
    props: { events },
  };
}

export default EventsPage;
