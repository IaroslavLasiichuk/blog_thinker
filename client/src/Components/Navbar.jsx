import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Input,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';

import {
  FormControl,
  FormLabel,
  //   FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';

import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export default function WithSubnavigation() {
  const { colorMode, toggleColorMode } = useColorMode();
  const drawer = useDisclosure();
  const drawerLogin = useDisclosure();
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          {/* Logo link */}
          <Link
              as={RouterLink}
            fontSize={'lg'}
            fontWeight={900}
            to='/'
          >
            LOGO
          </Link>
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
        >
          {/* Drawer for Login */}
          <Button onClick={drawerLogin.onOpen}>Login</Button>
          <Drawer isOpen={drawerLogin.isOpen} onClose={drawerLogin.onClose}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Login</DrawerHeader>
              <DrawerBody>
                <FormControl>
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" />
                  <FormHelperText>We'll never share your email.</FormHelperText>
                </FormControl>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" />
                </FormControl>
              </DrawerBody>
              <DrawerFooter>
                <Button type="submit" form="my-form">
                  Submit
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          {/* Drawer for Sugn Up */}
          <Button
            onClick={drawer.onOpen}
            as={'a'}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'pink.400'}
            _hover={{
              bg: 'pink.300',
            }}
          >
            Sign Up
          </Button>
          <Drawer isOpen={drawer.isOpen} onClose={drawer.onClose}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Create your account</DrawerHeader>
              <DrawerBody>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input type="text" />
                </FormControl>
                <FormControl>
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" />
                  <FormHelperText>We'll never share your email.</FormHelperText>
                </FormControl>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" />
                </FormControl>
              </DrawerBody>
              <DrawerFooter>
                <Button
                  fontSize={'sm'}
                  fontWeight={600}
                  color={'white'}
                  bg={'pink.400'}
                  _hover={{
                    bg: 'pink.300',
                  }}
                  type="submit"
                  form="my-form"
                >
                  Submit
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Stack>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map(navItem => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                as={RouterLink}
                p={2}
                to={navItem.href ?? '#'}
                fontSize={'sm'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}
              >
                <Stack>
                  {navItem.children.map(child => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      as={RouterLink}
      to={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}
    >
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'pink.400' }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}
        >
          <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}
    >
      {NAV_ITEMS.map(navItem => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={RouterLink}
        to={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}
        >
          {children &&
            children.map(child => (
              <Link as={RouterLink} key={child.label} py={2} to={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Profile',
    children: [
      {
        label: 'Add  Post',
        subLabel: 'Create new post',
        href: '/profile',
      },
      {
        label: 'View Posts',
        subLabel: 'View your posts',
        href: '/posts',
      },
    ],
  },
  {
    label: 'Contact',
    href: '/contact',
  },
  {
    label: 'About',
    href: '/about',
  },
];
