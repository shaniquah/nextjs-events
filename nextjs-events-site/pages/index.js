import EventList from "@/components/events/event-list";
import NewsletterRegistration from "@/components/input/newsletter-regitsration";
import { getFeaturedEvents } from "@/helpers/api-util";
import Head from "next/head";

export default function HomePage(props) {
  return (
    <div>
      <Head>
        <title>NiquáhEvents</title>
        <meta
          name="description"
          content="find a lot of great events that allow you to evolve..."
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents()
  return {
    props: {
      events: featuredEvents
    },
    revalidate: 1800,
  }
}
