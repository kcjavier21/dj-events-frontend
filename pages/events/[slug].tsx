import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/components/Layout";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { API_URL } from "@/config/index";
import styles from "@/styles/event.module.css";

const EventPage = ({ evt }: any) => {
  const router = useRouter();

  const deleteEvent = async (e: any) => {
    if (confirm("Are you sure?")) {
      const res = await fetch(`${API_URL}/api/events/${evt.id}`, {
        method: "DELETE",
        mode: "cors",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.push("/events");
      }
    }
  };

  console.log(evt);

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>

        <span>
          {new Date(evt.attributes.date).toLocaleDateString("en-US")} at{" "}
          {evt.attributes.time}
        </span>
        <h1>{evt.attributes.name}</h1>
        <ToastContainer />
        {evt.attributes.image && (
          <div className={styles.image}>
            {evt.attributes.image.data ? (
              <Image
                src={evt.attributes.image.data.attributes.formats.medium.url}
                width={960}
                height={600}
                alt={evt.attributes.name}
              />
            ) : (
              <></>
            )}
          </div>
        )}

        <h3>Performers:</h3>
        <p>{evt.attributes.performers}</p>
        <h3>Description:</h3>
        <p>{evt.attributes.description}</p>
        <h3>Venue:</h3>
        <p>{evt.attributes.address}</p>

        <Link href="/events">
          <a className={styles.back}>{"<"} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events?populate=*`);
  const { data: events } = await res.json();

  const paths = events.map((evt: any) => ({
    params: {
      slug: evt.attributes.slug,
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const res = await fetch(
    `${API_URL}/api/events?filters[slug]=${slug}&populate=*`
  );
  const { data: events } = await res.json();

  return {
    props: {
      evt: events[0],
    },
  };
}

export default EventPage;
