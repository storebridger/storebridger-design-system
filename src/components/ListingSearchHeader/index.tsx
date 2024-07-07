import { Box } from 'components/Box';
import styled from 'styled-components';
import { Search } from './SearchBox';
import { customMedia } from 'styles/media';

interface Props {
  searchChangeHandler?: (e: string) => void;
}

export const ListingSearchHeader = ({ searchChangeHandler }: Props) => {
  return (
    <Wrapper
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      width="full"
      gap="S16"
    >
      <SearchContainer width="D480" height="D48">
        <Search placeholder="Search" changeAction={searchChangeHandler} />
      </SearchContainer>
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  position: sticky;
  left: 0;
  ${customMedia.lessThan('small')`
    flex-wrap: wrap;
    justify-content: space-between;
`}
`;

const SearchContainer = styled(Box)`
  ${customMedia.lessThan('small')`
    width: 100%;
`}
`;
