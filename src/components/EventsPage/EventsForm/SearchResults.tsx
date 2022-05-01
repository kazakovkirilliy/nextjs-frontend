import { Flex, Tag, Text } from '@chakra-ui/react';
import { format } from 'date-fns';
import { FormPayloadType } from '.';
import { CATEGORIES } from '../../../lib/constants';

type Props = {
  currentPayload: FormPayloadType;
  userCity?: string;
};

export default function SearchResults({ currentPayload, userCity }: Props) {
  return (
    <Flex align={'center'} gap={2} width={'100%'}>
      {currentPayload.search && (
        <Text maxWidth={{ base: '100%', lg: '30%' }} noOfLines={1} wordBreak={'break-all'}>
          Search for <i>&ldquo;{currentPayload.search}&ldquo;</i>
        </Text>
      )}

      <Flex gap={2} display={{ base: 'none', lg: 'flex' }}>
        {(currentPayload.city || userCity) && <Tag rounded={'md'}>City: {currentPayload.city || userCity}</Tag>}
        {currentPayload.category && <Tag rounded={'md'}>Category: {CATEGORIES[currentPayload.category]}</Tag>}
        {currentPayload.dateFrom && (
          <Tag rounded={'md'}>Starts from: {format(new Date(currentPayload.dateFrom), 'Pp')}</Tag>
        )}
        {currentPayload.dateTo && (
          <Tag rounded={'md'}>Starts till: {format(new Date(currentPayload.dateTo), 'Pp')}</Tag>
        )}
      </Flex>
    </Flex>
  );
}
