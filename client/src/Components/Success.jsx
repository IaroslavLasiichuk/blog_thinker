import { Box, Heading, Text } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@chakra-ui/react';

export default function Success() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
      Payment has been processed
      </Heading>
      <Text color={'gray.500'}>
       Thank you for donation
      </Text>
      <Link as={RouterLink} margin={3} fontSize={'lg'} fontWeight={900} to="/">
            GO HOME
          </Link>
    </Box>
  );
}