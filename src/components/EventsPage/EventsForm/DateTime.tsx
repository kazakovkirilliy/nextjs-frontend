import {
  Button,
  Divider,
  Flex,
  HStack,
  ListItem,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Tag,
  Text,
  useDisclosure,
  VisuallyHiddenInput,
  VStack,
} from '@chakra-ui/react';
import { addDays, format, startOfToday, startOfTomorrow } from 'date-fns';
import { useState } from 'react';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { FormPayloadType } from '.';
import { FormInput } from '../../Form/FormInput';

type Props = {
  register: UseFormRegister<FormPayloadType>;
  setValue: UseFormSetValue<FormPayloadType>;
  dateFrom?: string;
  dateTo?: string;
};

const today = startOfToday();
const tomorrow = startOfTomorrow();

export default function DateTime({ register, setValue, dateFrom, dateTo }: Props) {
  const { onOpen, onClose, isOpen } = useDisclosure();

  const renderDatepickerLabel = () => {
    if (dateFrom && dateTo) {
      return `From ${format(new Date(dateFrom), 'Pp')} to ${format(new Date(dateTo), 'Pp')}`;
    } else if (dateFrom) {
      return `From ${format(new Date(dateFrom), 'Pp')}`;
    } else if (dateTo) {
      return `To ${format(new Date(dateTo), 'Pp')}`;
    } else {
      return `Starts from & Starts till`;
    }
  };

  const setToday = () => {
    setValue('dateFrom', today.toISOString());
    setValue('dateTo', tomorrow.toISOString());
  };

  const setTomorrow = () => {
    const dayAfterTomorrow = addDays(tomorrow, 1);
    setValue('dateFrom', tomorrow.toISOString());
    setValue('dateTo', dayAfterTomorrow.toISOString());
  };

  const clearDates = () => {
    setValue('dateFrom', '');
    setValue('dateTo', '');
  };

  return (
    <>
      <Popover placement="bottom-start" isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
        <PopoverTrigger>
          <Flex
            width={'100%'}
            justifyContent={'space-between'}
            alignItems={'center'}
            color={'gray.400'}
            px={4}
            py={2}
            transition="all 0.2s"
            borderRadius="md"
            borderWidth="1px"
            bg={'white'}
            cursor={'pointer'}
          >
            <Text noOfLines={1} wordBreak={'break-all'}>
              {renderDatepickerLabel()}
            </Text>
            <HiOutlineChevronDown />
          </Flex>
        </PopoverTrigger>
        <PopoverContent p={3} gap={4} width={'100%'}>
          <VStack>
            <Button
              display={'flex'}
              justifyContent={'space-between'}
              width={'100%'}
              variant={'outline'}
              onClick={setToday}
            >
              <Text>Today</Text>
              <Tag>{format(today, 'P')}</Tag>
            </Button>
            <Button
              display={'flex'}
              justifyContent={'space-between'}
              width={'100%'}
              variant={'outline'}
              onClick={setTomorrow}
            >
              <Text>Tomorrow</Text>
              <Tag>{format(tomorrow, 'P')}</Tag>
            </Button>
          </VStack>
          <Divider />
          <Stack direction={{ base: 'column', lg: 'row' }}>
            <FormInput title={'From'} name="dateFrom" register={register} type={'datetime-local'} />
            <FormInput title={'Till'} name="dateTo" register={register} type={'datetime-local'} />
          </Stack>
          <Flex gap={2}>
            <Button variant={'outline'} onClick={clearDates}>
              Clear
            </Button>
            <Button display={'flex'} flex={1} onClick={onClose}>
              Apply dates
            </Button>
          </Flex>
        </PopoverContent>
      </Popover>
    </>
  );
}
