import { Box, Link, List, ListItem, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { links } from '../links';

type Props = {};

export default function DesktopNav(props: Props) {
  const router = useRouter();

  return (
    <Box as={'nav'}>
      <List as={'ul'} display={'flex'} alignItems={'center'} gap={6}>
        {links.map((l) => (
          <NextLink href={l.href} passHref key={l.label}>
            <ListItem
              as={Link}
              p={2}
              fontSize={'sm'}
              fontWeight={router.pathname.startsWith(l.href) ? 700 : 500}
              _hover={{
                textDecoration: 'none',
              }}
              borderBottom={'3px solid'}
              borderColor={router.pathname.startsWith(l.href) ? 'pink.300' : 'transparent'}
            >
              {l.label}
            </ListItem>
          </NextLink>
        ))}
      </List>
    </Box>
  );
}
