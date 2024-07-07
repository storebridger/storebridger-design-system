import { OptionSelector } from 'components/OptionSelector';
import styled from 'styled-components';
import React, { useMemo } from 'react';
import { customMedia } from 'styles/media';
import { Icon } from 'components/Icon';
import { selectedTheme } from 'styles/theme/slice/selectors';
import { useSelector } from 'react-redux';
import {
  translations,
  useInternationalization,
} from 'locales/useInternationalization';

interface Props {
  [key: string]: any;
}

const batchOptions = [
  {
    label: '5',
    value: 5,
  },
  {
    label: '10',
    value: 10,
  },
  {
    label: '15',
    value: 15,
  },
  {
    label: '20',
    value: 20,
  },
];

export const Pagination = ({
  batchSize,
  setBatchSize,
  setPage,
  pageCount,
  currentPage,
  paginatedItems,
}: Props) => {
  const [selectedValue, setSelectedValue] = React.useState<number>(batchSize);
  const selectBatchSize = (val: any) => {
    setBatchSize && setBatchSize(val);
    setSelectedValue(val);
  };

  const getSelectedBatchOption = () => {
    return batchOptions.find(option => option.value === selectedValue)?.label;
  };

  const themeColor = useSelector(selectedTheme);
  const intl = useInternationalization();
  const iconColor = themeColor === 'dark' ? 'WHITE' : 'GRAY700';

  const pageOptions = useMemo(() => {
    const options: number[] = [];
    for (let i = 1; i <= pageCount; i++) {
      options.push(i);
    }

    return options;
  }, [pageCount]);

  return (
    <Wrapper>
      {pageCount > 1 && (
        <PageNavSection>
          <DoubleIconDiv
            aria-disabled={currentPage === 1}
            onClick={() => setPage(0)}
          >
            <Icon iconName="chevron-double-left" color={iconColor} size="D16" />
          </DoubleIconDiv>
          {intl.t(translations.pagination.previous)}
          <NumberCards>
            {pageOptions.map((option, index) => {
              return (
                <NumberCard
                  onClick={() => setPage(index)}
                  key={index}
                  isCurrent={option === currentPage}
                >
                  {option}
                </NumberCard>
              );
            })}
          </NumberCards>
          {intl.t(translations.pagination.next)}
          <DoubleIconDiv
            aria-disabled={currentPage === pageCount ? 'true' : 'false'}
            onClick={() => setPage(pageCount - 1)}
          >
            <Icon
              iconName="chevron-double-right"
              color={iconColor}
              size="D16"
            />
          </DoubleIconDiv>
        </PageNavSection>
      )}

      <BatchSection>
        <BatchSelection>
          <BatchSelector
            options={batchOptions}
            position="top"
            selectionAction={selectBatchSize}
            selectedValue={getSelectedBatchOption()}
          />
        </BatchSelection>
        <TextSpan>{intl.t(translations.pagination.perPage)}</TextSpan>
      </BatchSection>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5rem;
  padding: 0.4rem 2rem;

  ${customMedia.lessThan('medium')`
  width: 100%;
  flex-direction: column;
  height: fit-content;
  gap: 1.6rem;
  align-items: flex-end;
  `}
`;
const PageNavSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TextSpan = styled.div`
  font-size: 10px;
  color: ${({ theme }) => theme.color.text};
  ${customMedia.lessThan('small')`
  font-size: 8px;
  `}
`;
const DoubleIconDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3.5rem;
  width: 3.5rem;
  border-radius: 5px;
  color: ${({ theme }) => theme.color.text};
  transition: all 0.5s;

  &:not([aria-disabled='true']):hover {
    border: 1px solid ${({ theme }) => theme.color.primary};
    color: ${({ theme }) => theme.color.primary};
  }
`;

const NumberCards = styled.div`
  display: flex;
  gap: 1rem;
`;

const NumberCard = styled.span<{ isCurrent: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3.5rem;
  width: 3.5rem;
  border-radius: 5px;
  color: ${({ theme }) => theme.color.text};
  border: 1px solid
    ${({ theme, isCurrent }) =>
      isCurrent ? theme.color.primary : theme.color.border};
  background: ${({ theme }) => theme.color.background};
  transition: all 0.5s;

  &:hover {
    border: 1px solid ${({ theme }) => theme.color.primary};
    color: ${({ theme }) => theme.color.primary};
  }

  ${customMedia.lessThan('small')`
  height: 2.5rem;
  width: 2.5rem;
  `}
`;

const BatchSection = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const BatchSelection = styled.span`
  display: block;
  width: 8rem;
  height: 3rem;
`;

const BatchSelector = styled(OptionSelector)`
  .icon-div {
    width: 50%;
  }

  .dropdown {
    background: black;
    bottom: 100%;
  }

  div {
    background-color: blue;
  }
`;
