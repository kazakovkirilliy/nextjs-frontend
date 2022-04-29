import { Heading, VStack } from '@chakra-ui/react';
import ManageEventCard from '../../components/Manage/ManageEventCard';
import { EventManyCreatedDocument, useEventManyCreatedQuery } from '../../generated/graphql';
import { addApolloState, initializeApollo } from '../../lib/apolloClient';

export default function Manage() {
  const { data } = useEventManyCreatedQuery();

  return (
    <VStack px={{ base: 2, md: '10%', lg: '20%' }} mt={{ base: 5, md: 10, lg: 20 }} spacing={5}>
      <Heading>Created events</Heading>
      {data?.eventManyCreated.map((e) => (
        <ManageEventCard key={e.id} event={e} />
      ))}
    </VStack>
  );
}

export async function getServerSideProps({ req }) {
  const apolloClient = initializeApollo();
  const jwt = req.cookies['uid'];

  await apolloClient.query({
    query: EventManyCreatedDocument,
    context: {
      headers: { Authorization: `Bearer ${jwt}` },
    },
  });

  return addApolloState(apolloClient, {
    props: {},
  });
}
