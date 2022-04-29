import { Box, GridItem, SimpleGrid, VStack } from '@chakra-ui/react';
import { InView } from 'react-intersection-observer';
import { EventManyQueryVariables } from '../../../generated/graphql';
import { EventManyArray } from '../types';
import ExploreCard from './ExploreCard';

type Props = {
  events: EventManyArray;
  refetch?: (vars?: EventManyQueryVariables) => void;
  loading?: boolean;
  hasNext?: boolean;
  columns?: Record<string, any>;
};

const baseGridLayout = { base: 1, sm: 2, md: 4 };

export default function ExploreGrid({ events, columns, refetch, loading, hasNext, ...rest }: Props) {
  return (
    <SimpleGrid
      columns={columns || baseGridLayout}
      height={'auto'}
      overflowX={'hidden'}
      overflowY={'auto'}
      pr={{ base: 0, md: 3 }}
      gap={3}
      spacingY={'10px'}
    >
      {events.map((e) => (
        <GridItem key={e.id}>
          <ExploreCard {...e} />
        </GridItem>
      ))}
      {hasNext && (
        <GridItem as={VStack} colSpan={columns || baseGridLayout} justifyItems={'center'}>
          <InView
            as="div"
            onChange={(inView, entry) => {
              if (inView && hasNext && refetch) {
                refetch();
              }
            }}
          >
            <Box pb={10} />
          </InView>
        </GridItem>
      )}
    </SimpleGrid>
  );
}
