import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import Pagination from "@/components/Pagination";
import { API_URL } from "@/config/index";

const PER_PAGE = 3;

const EventsPage = ({ events, page, total }: any) => {
  page = parseInt(page);

  return (
    <Layout>
      <h2>Events</h2>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((evt: any) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      <Pagination page={page} total={total} perPage={PER_PAGE} />
    </Layout>
  );
};

export async function getServerSideProps({ query: { page = 1 } }: any) {
  const qs = require("qs");
  const qr = qs.stringify(
    {
      sort: ["date"],
      populate: "*",
      pagination: {
        page: page,
        pageSize: PER_PAGE,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  // const allEvents = await fetch(`${API_URL}/api/events`);
  // const { data } = await allEvents.json();

  const res = await fetch(`${API_URL}/api/events?${qr}`);
  const { data: events, meta } = await res.json();
  const total = meta.pagination.total;

  return {
    props: { events, page, total },
  };
}

export default EventsPage;
