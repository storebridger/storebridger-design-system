import * as React from 'react';
import { Icon, IconV2 } from '../../Icon';
import { Text } from '../../Typography';
import { Box } from '../../Box';
import styled from 'styled-components';
import { TextInput } from '../TextInput';
import { Colors } from '../../../constants';
import { customMedia } from '../../../../styles/media';
import { ClearDiv } from '../../Common/ClearDiv';

export interface ISelectOption {
  label: string;
  value: string;

  [key: string]: any;
}

interface Props {
  label: string;
  showTags?: boolean;
  addedTags?: string[];
  addNewTagAction: (value: string) => void;
  deleteTagAction?: (value: string) => void;
  selectValue?: ISelectOption;
  error?: any;
  options?: ISelectOption[];
  onSelect?: (value: ISelectOption) => void;

  [key: string]: any;
}

export const SelectInputWithTags = (props: Props) => {
  const {
    name,
    label,
    showTags,
    addedTags,
    addNewTagAction,
    deleteTagAction,
    // for select
    selectValue,
    onSelect,
    options,
    error,
  } = props;

  const [showOptions, setShowOptions] = React.useState(false);
  const [showAddNewTagAction, setShowAddNewTagAction] = React.useState(false);
  const [currentTagInput, setCurrentTagInput] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const filteredOptions = React.useMemo(() => {
    if (!options) return [];
    if (options.length === 0) return [];
    if (currentTagInput !== '') {
      return options.filter(option =>
        option.label.toLowerCase().includes(currentTagInput.toLowerCase()),
      );
    }
    return options;
    // eslint-disable-next-line
  }, [options, currentTagInput]);

  const addedTagsInLowerCase = addedTags
    ? addedTags.map(tag => tag.toLowerCase())
    : [];

  const addNewTag = () => {
    addNewTagAction(currentTagInput);
    setCurrentTagInput('');
    setShowAddNewTagAction(false);
  };

  const handleOnchange = e => {
    setShowAddNewTagAction(false);
    setCurrentTagInput(e.target.value);
    if (
      (e.target.value.length > 0 || currentTagInput.length > 0) &&
      filteredOptions.length === 0 &&
      !addedTagsInLowerCase.includes(e.target.value.toLowerCase())
    ) {
      setShowAddNewTagAction(true);
    }
    const showActionTimer = setTimeout(() => {
      if (e.target.value === 0) {
        setShowAddNewTagAction(false);
        return;
      }
      const lowerCasedOptions = options
        ? options.map(option => option.label.toLowerCase())
        : [];

      if (
        !lowerCasedOptions.includes(e.target.value.toLowerCase()) &&
        e.target.value.length > 0
      ) {
        setShowAddNewTagAction(true);
      }
      clearTimeout(showActionTimer);
    }, 2000);
  };

  React.useEffect(() => {
    if (selectValue) {
      setCurrentTagInput(selectValue.label);
    }
    if (error) {
      setErrorMessage(error);
    }
  }, [error, selectValue]);

  return (
    <React.Fragment>
      {showOptions && (
        <ClearDiv
          onClick={() => {
            setShowOptions(false);
            setShowAddNewTagAction(false);
            if (options && !selectValue) {
              setCurrentTagInput('');
            } else {
              setCurrentTagInput(selectValue ? selectValue.label : '');
            }
          }}
        />
      )}
      <RelativeBox gap="S8">
        <TextInput
          name={name}
          label={label}
          value={currentTagInput}
          error={errorMessage}
          onFocus={() => {
            setShowOptions(true);
          }}
          onChange={handleOnchange}
        />
        {showTags && (
          <TagsList
            flexDirection="row"
            width="full"
            isResponsiveRow
            gap="S4"
            toggleActive={currentTagInput.length > 0}
          >
            {addedTags &&
              addedTags.length > 0 &&
              addedTags.map((tag, index) => {
                return (
                  <Tag key={index}>
                    <Text size="F12" colorType="black">
                      {tag}
                    </Text>
                    <span
                      onClick={() => deleteTagAction && deleteTagAction(tag)}
                    >
                      <IconV2 name="x" size="D12" />
                    </span>
                  </Tag>
                );
              })}
          </TagsList>
        )}
        {showAddNewTagAction && (
          <TagDropdown onClick={addNewTag}>
            <TagButton>
              <Icon iconName="tag" size="D12" />
              <Text colorType="black">Add</Text>
              <Text>{currentTagInput}</Text>
            </TagButton>
          </TagDropdown>
        )}
        {options && showOptions && filteredOptions.length > 0 && (
          <Dropdown>
            <OptionBox>
              {filteredOptions.map(option => (
                <Option
                  onClick={() => {
                    onSelect && onSelect(option);
                    setCurrentTagInput(option.label);
                    setShowOptions(false);
                    setErrorMessage('');
                  }}
                  flexDirection="row"
                  justifyContent="space-between"
                  padding="S8"
                >
                  <Text size="F10">{option.label}</Text>
                </Option>
              ))}
            </OptionBox>
          </Dropdown>
        )}
      </RelativeBox>
    </React.Fragment>
  );
};
const RelativeBox = styled(Box)`
  position: relative;
`;

const OptionBox = styled(Box)`
  z-index: 1000;
  background-color: ${props => props.theme.color.background};
  border-radius: 5px 5px 0 0;
  height: max-content;
  max-height: 20rem;
  min-height: 5rem;
  overflow: auto;
  position: relative;
`;

const Option = styled(Box)`
  &:hover {
    background-color: ${Colors.GRAY400};
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

const TagDropdown = styled.div`
  z-index: 1001;
  position: absolute;
  top: 101%;
  left: 0;
  width: 100%;
  border: 1px solid ${Colors.GRAY400};
  background: ${({ theme }) => theme.color.background};
  height: 4rem;
  padding: 0.5rem;
  border-radius: 5px;
  ${customMedia.lessThan('small')`
    position: static; margin-top: 1rem;
  `}
`;

const TagButton = styled(Box)`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.8rem;
  background-color: ${({ theme }) => theme.color.colorBubble};
  padding: 0 1rem;
`;

const TagsList = styled(Box)<{ toggleActive: boolean }>`
  @media (max-width: 600px) {
    ${({ toggleActive }) =>
      toggleActive && 'position: absolute; left: 0; top: 5rem;'}
    padding-top: 1rem;
  }
`;

const Tag = styled.span`
  width: fit-content;
  height: 2rem;
  display: flex;
  align-items: center;
  background-color: ${Colors.GRAY500};
  border-radius: 20px;
  gap: 0.5rem;
  font-size: 1rem;
  padding: 0 0.8rem;
`;
