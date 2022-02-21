import qs from "qs";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL } from "@/config/index";

const SearchPage = ({ events }: any) => {
  const router = useRouter();

  return (
    <Layout>
      <Link href="/events">
        <a>Go Back</a>
      </Link>
      <h2>Search Results for {router.query.term}</h2>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((evt: any) => (
        <EventItem key={evt.attributes.id} evt={evt} />
      ))}
    </Layout>
  );
};

export async function getServerSideProps({ query: { term } }: any) {
  const query = qs.stringify({
    filters: {
      $or: [
        { name: { $containsi: term } },
        { performers: { $containsi: term } },
        { description: { $containsi: term } },
        { venue: { $containsi: term } },
      ],
    },
  });
  console.log(query);

  const res = await fetch(`${API_URL}/api/events?${query}&populate=*`);
  const { data: events } = await res.json();

  return {
    props: { events },
  };
}

export default SearchPage;
