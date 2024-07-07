import { Box } from '../../Box';
import { Icon, IconV2 } from '../../Icon';
import { Text } from '../../Typography';
import * as React from 'react';
import styled from 'styled-components';
import { TextInput } from '../TextInput';
import { Colors } from '../../../constants';
import { IconDiv } from 'app/pages/business/product/CreateProduct/components/Variations/VariationTable/Components';
import { DimensionType, Dimensions } from 'constants/Dimensions';

export interface ISelectOption {
  label: string;
  value: string;

  [key: string]: any;
}

interface Props {
  label?: string;
  selectValue?: ISelectOption | null;
  onSelect: (value: ISelectOption) => void;
  options: ISelectOption[];
  ctaText?: string;
  ctaAction?: () => void;
  error?: string;
  searchFiltererKeys?: Array<keyof ISelectOption>;
  hideSideBar?: boolean;
  withBorder?: boolean;
  disabled?: boolean;
  height?: DimensionType;
  transparentBackground?: boolean;

  [key: string]: any;
}

export const SelectWithActionInput = (props: Props) => {
  const {
    name,
    control,
    label,
    selectValue,
    onSelect,
    options,
    ctaText,
    ctaAction,
    error,
    searchFiltererKeys = ['label'],
    hideSearchbar = false,
    withBorder = true,
    transparentBackground = false,
    disabled,
    height,
    ...textInputProps
  } = props;

  const [showOptions, setShowOptions] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const filteredOptions = React.useMemo(() => {
    if (searchValue !== '') {
      let filter: any = [];
      for (let keys of searchFiltererKeys) {
        filter = [
          ...filter,
          ...options.filter(option =>
            option[keys].toLowerCase().includes(searchValue.toLowerCase()),
          ),
        ];
      }

      return filter;
    }
    return options;
    // eslint-disable-next-line
  }, [options, searchValue]);

  React.useEffect(() => {
    if (error) {
      setErrorMessage(error);
    }
  }, [error]);

  const deleteOption = optionId => {
    textInputProps.onDelete(optionId);
  };

  const handleClickOutside = event => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowOptions(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <React.Fragment>
      <RelativeBox gap="S8">
        <Wrapper ref={dropdownRef}>
          <CustomTextInput
            {...textInputProps}
            name={name}
            label={label}
            disabled={disabled}
            height={height}
            value={selectValue && selectValue.label}
            renderIcon={() => (
              <span onClick={() => !disabled && setShowOptions(!showOptions)}>
                <IconV2 name={showOptions ? 'chevron-up' : 'chevron-down'} />
              </span>
            )}
            iconSize="D16"
            error={errorMessage}
            withBorder={withBorder}
            transparentBackground={transparentBackground}
          />
          <CustomTextOverlay
            onClick={() => {
              setSearchValue('');
              !disabled && setShowOptions(!showOptions);
            }}
          />
          {showOptions && (
            <Dropdown>
              {!hideSearchbar && options.length > 0 && (
                <SearchBox
                  flexDirection="row"
                  justifyContent="center"
                  alignItems="center"
                  gap="S8"
                >
                  <Icon
                    iconName="magnifying-glass"
                    size="D16"
                    color="GRAY400"
                  />
                  <SearchInput
                    onChange={(e: any) => {
                      setSearchValue(e.target.value);
                    }}
                  />
                </SearchBox>
              )}
              {filteredOptions.length > 0 ? (
                <OptionBox>
                  {filteredOptions.map(option => (
                    <Option
                      onClick={() => {
                        onSelect(option);
                        setShowOptions(false);
                        setErrorMessage('');
                      }}
                      flexDirection="row"
                      justifyContent="space-between"
                      padding="S8"
                    >
                      <Text size="F10">{option.label}</Text>
                      <Box flexDirection="row" gap="S8" alignItems="center">
                        {textInputProps.hasSymbol && (
                          <Text size="F10">{option.symbol}</Text>
                        )}
                        {textInputProps.canDelete && !option.isSystemDefined && (
                          <IconDiv
                            onClick={e => {
                              e.stopPropagation();
                              deleteOption(option.id);
                            }}
                          >
                            <IconV2 name="trash" size="D12" color="GRAY400" />
                          </IconDiv>
                        )}
                      </Box>
                    </Option>
                  ))}
                </OptionBox>
              ) : (
                <Box
                  padding="S8"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text size="F10">No options to display</Text>
                </Box>
              )}
              {ctaAction && (
                <CreateUnitBox padding="S10">
                  <Box
                    flexDirection="row"
                    gap="S4"
                    alignItems="center"
                    onClick={() => {
                      setShowOptions(false);
                      ctaAction();
                    }}
                  >
                    <IconV2 name="plus-circle" color="PRIMARY" size="D16" />
                    <Text size="F12" colorType="primary">
                      {ctaText}
                    </Text>
                  </Box>
                </CreateUnitBox>
              )}
            </Dropdown>
          )}
        </Wrapper>
      </RelativeBox>
    </React.Fragment>
  );
};

const Wrapper = styled.div``;

const RelativeBox = styled(Box)`
  position: relative;
`;

const OptionBox = styled(Box)`
  z-index: 1000;
  background-color: ${props => props.theme.color.background};
  border-radius: 5px 5px 0 0;
  height: max-content;
  max-height: 20rem;
  overflow: auto;
  position: relative;
`;

const CustomTextInput = styled(TextInput)<{
  withBorder?: boolean;
  transparentBackground?: boolean;
  height?: string;
}>`
  caret-color: transparent;
  ${({ withBorder }) => !withBorder && `border: none;`};
  ${({ height }) => height && `height: ${Dimensions[height]};`};
  ${({ transparentBackground }) =>
    transparentBackground && `background-color: transparent;`};
`;
const CustomTextOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const Option = styled(Box)`
  &:hover {
    background-color: ${({ theme }) => theme.color.hoverColor};
  }
`;

const Dropdown = styled(Box)`
  width: 100%;
  position: absolute;
  top: 101%;
  left: 0;
  z-index: 10001;
  background-color: ${props => props.theme.color.background};
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.color.border};
`;

const SearchBox = styled(Box)`
  border-bottom: 1px solid ${Colors.GRAY400};
  padding-left: 5px;
`;

const SearchInput = styled.input`
  height: 30px;
  border: 0;
  width: 100%;
  background: none;
  position: sticky;
  top: 0;

  &:focus {
    outline: none;
  }

  color: ${props => props.theme.color.inputText};
`;

const CreateUnitBox = styled(Box)`
  border: 1px solid ${({ theme }) => theme.color.border};
  cursor: pointer;
`;
