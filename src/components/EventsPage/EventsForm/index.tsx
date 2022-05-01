import { QueryLazyOptions } from '@apollo/client';
import { Button, Flex, InputLeftElement, Tag, Text } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlineSearch } from 'react-icons/hi';
import { MdFilterList } from 'react-icons/md';
import { Category, EventManyQueryVariables, useEventManyCitiesQuery } from '../../../generated/graphql';
import { CATEGORY_OPTIONS, OptionType } from '../../../lib/constants';
import { parseUserLocationFromStorage } from '../../../lib/utils/parseUserLocationFromStorage';
import { EVENT_FETCH_LIMIT } from '../../../pages/events';
import PrimaryButton from '../../base/PrimaryButton';
import { FormInput } from '../../Form/FormInput';
import { FormSelect } from '../../Form/FormSelect';
import DateTime from './DateTime';

const SearchResults = dynamic(() => import('./SearchResults'), { ssr: false });

type Props = {
  fetch: (options?: QueryLazyOptions<EventManyQueryVariables>) => void;
  refetch: (variables?: EventManyQueryVariables) => void;
};

export type FormPayloadType = {
  search?: string;
  category?: Category;
  dateFrom?: string;
  dateTo?: string;
  city?: string;
};

export default function EventsForm({ fetch, refetch }: Props) {
  const [filtersShown, setFiltersShown] = useState(false);
  const [cityOptions, setCityOptions] = useState<OptionType[]>([]);
  const { data, loading } = useEventManyCitiesQuery();
  const [currentPayload, setCurrentPayload] = useState<FormPayloadType>({});
  const userCity = parseUserLocationFromStorage()?.city;

  useEffect(() => {
    if (data?.eventManyCities) {
      const options = data.eventManyCities.map((city) => ({
        label: city,
        value: city,
      }));

      setCityOptions(options);
    }
  }, [data?.eventManyCities]);

  const { watch, control, register, handleSubmit, setValue } = useForm<FormPayloadType>();

  const formValues = watch();

  useEffect(() => {
    const variables: EventManyQueryVariables = { pagination: { take: EVENT_FETCH_LIMIT } };

    if (cityOptions.length === 0) {
      return;
    }

    if (userCity && cityOptions.find((o) => o.value === userCity)) {
      fetch({
        variables: { ...variables, filters: { field: 'city', value: userCity } },
      });
      setCurrentPayload({ city: userCity });
    } else {
      fetch({ variables });
    }
  }, [cityOptions, fetch, userCity]);

  const onSubmit = async (data: FormPayloadType) => {
    const variables: EventManyQueryVariables = { search: null, date: null, filters: null };
    if (data.search) {
      variables.search = { field: 'title', value: data.search };
    }

    if (data.category) {
      variables.filters = { field: 'category', value: data.category };
    }

    if (data.city) {
      variables.filters =
        variables.filters && !Array.isArray(variables.filters)
          ? [variables.filters, { field: 'city', value: data.city }]
          : { field: 'city', value: data.city };
    }

    if (data.dateFrom || data.dateTo) {
      variables.date = {
        field: 'dateFrom', // events starting between <data.dateFrom> and <data.dateTo>
        value: {
          gte: data.dateFrom || undefined,
          lt: data.dateTo || undefined,
        },
      };
    }

    setCurrentPayload(data);
    refetch(variables);
  };

  const appliedFilters = Object.values(currentPayload).filter((v) => v && v !== '');

  return (
    <Flex as={'form'} flexDirection={'column'} width={'full'} onSubmit={handleSubmit(onSubmit)} gap={4} zIndex={5}>
      <Flex gap={4}>
        <FormInput name="search" register={register} placeholder={'Search'} isRequired>
          <InputLeftElement color={'gray.400'}>
            <HiOutlineSearch />
          </InputLeftElement>
        </FormInput>
        <Button
          aria-label={'Filter list'}
          onClick={() => setFiltersShown((prev) => !prev)}
          fontWeight={'normal'}
          variant={'outline'}
          leftIcon={
            appliedFilters.length > 0 ? <Tag fontWeight={'bold'}>{appliedFilters.length}</Tag> : <MdFilterList />
          }
          width={'max-content'}
        >
          <Text>Filters</Text>
        </Button>
      </Flex>

      {filtersShown && (
        <Flex direction={{ base: 'column', md: 'row' }} gap={{ base: 4 }} alignItems={'center'}>
          <Flex zIndex={10} width={'100%'} justifyItems={'stretch'} gap={4}>
            <FormSelect
              name={'city'}
              control={control}
              options={cityOptions}
              placeholder={'City'}
              width={'100%'}
              defaultSelectValue={userCity ? cityOptions.find((o) => o.value === userCity) : undefined}
              isLoading={loading}
            />
            <FormSelect
              name={'category'}
              control={control}
              options={CATEGORY_OPTIONS}
              placeholder={'Category'}
              width={'100%'}
              isClearable
            />
          </Flex>
          <DateTime register={register} setValue={setValue} dateFrom={formValues.dateFrom} dateTo={formValues.dateTo} />

          <PrimaryButton px={10} type={'submit'} width={'min-content'}>
            Apply & search
          </PrimaryButton>
        </Flex>
      )}

      <SearchResults currentPayload={currentPayload} userCity={userCity} />
    </Flex>
  );
}
