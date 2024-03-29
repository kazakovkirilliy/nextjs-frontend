import {
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure,
  FormControl,
  FormLabel,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { HiTrash } from 'react-icons/hi';
import PrimaryButton from '../../base/PrimaryButton';

type Props = { eventTitle: string; action: () => void };

export default function ButtonEventRemove({ eventTitle, action }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inputMatched, setInputMatched] = useState(false);

  return (
    <>
      <Tooltip label="Remove event" mt="2" rounded={'md'} p={2} shouldWrapChildren>
        <IconButton
          icon={<HiTrash />}
          variant={'ghost'}
          aria-label={''}
          fontSize={'lg'}
          color={'gray.400'}
          onClick={onOpen}
        />
      </Tooltip>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Confirm removal
            <Text fontSize={'sm'} fontWeight={'normal'}>
              Type <span style={{ fontWeight: 'bold' }}>{eventTitle}</span> to remove event
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl variant="floating" id="first-name">
              <Input
                placeholder=" "
                onChange={(e) => {
                  if (e.target.value === eventTitle) {
                    setInputMatched(true);
                  } else if (inputMatched) {
                    setInputMatched(false);
                  }
                }}
                bg={'white'}
                border={'1px solid'}
                borderColor={'gray.200'}
                _focus={{ borderColor: 'inherit' }}
              />
              {/* It is important that the Label comes after the Control due to css selectors */}
              <FormLabel>Event title</FormLabel>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <PrimaryButton
              onClick={() => {
                onClose();
                action();
              }}
              disabled={!inputMatched}
            >
              Confirm & delete
            </PrimaryButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
