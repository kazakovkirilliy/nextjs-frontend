import { Heading, Spinner, VStack } from '@chakra-ui/react';
import ExploreGrid from '../../components/EventsPage/ExploreGrid';
import { EventManySavedDocument, useEventManySavedQuery } from '../../generated/graphql';
import { addApolloState, initializeApollo } from '../../lib/apolloClient';

export default function EventsSaved() {
  const { data, loading } = useEventManySavedQuery();

  return (
    <VStack px={{ base: 2, md: '10%', lg: '20%' }} mt={{ base: 5, md: 10, lg: 20 }} spacing={10}>
      <Heading>Saved events</Heading>
      {loading ? <Spinner /> : <ExploreGrid events={data?.eventManySaved || []} />}
    </VStack>
  );
}

export async function getServerSideProps({ req }) {
  const apolloClient = initializeApollo();
  const jwt = req.cookies['uid'];

  await apolloClient.query({
    query: EventManySavedDocument,
    context: {
      headers: { Authorization: `Bearer ${jwt}` },
    },
  });

  return addApolloState(apolloClient, {
    props: {},
  });
}
