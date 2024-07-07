import { IconV2, IconV2Name } from 'components/Icon';
import styled from 'styled-components';
import React, { useState } from 'react';
import { Colors } from 'constants/Colors';
import { ClearDiv } from '../Common/ClearDiv';
import { OrderStatus } from 'app/pages/personal/contract/_common/constants';
import { useSelector } from 'react-redux';
import { selectedTheme } from '../../../styles/theme/slice/selectors';
import {
  translations,
  useInternationalization,
} from 'locales/useInternationalization';
import { Spacing } from 'constants/Spacing';

interface OptionType {
  iconName?: string;
  label: string;
  value: string | number;
  disabled?: boolean;
}

type SpacingTypes = keyof typeof Spacing;
type ColorTypes = keyof typeof Colors;

interface Props {
  options: OptionType[];
  selectLabel?: string;
  withDivider?: boolean;
  gap?: SpacingTypes;
  background?: ColorTypes;
  withBorder?: boolean;
  position?: 'top' | 'bottom';
  selectionAction?: any;
  labelColor?: Colors;
  disabled?: boolean;
  extendDelivery?: () => void;
  shouldUseInitialOption?: boolean;
  selectedValue?: string;
  dropdownMaxHeight?: string;
  showSelectedOption?: boolean;
  truncate?: boolean;
}

export const OptionSelector = ({
  selectLabel,
  options,
  withDivider,
  withBorder = true,
  position,
  selectionAction,
  disabled = false,
  labelColor,
  gap,
  background,
  extendDelivery,
  shouldUseInitialOption,
  selectedValue,
  dropdownMaxHeight,
  showSelectedOption,
  truncate = true,
}: Props) => {
  const intl = useInternationalization();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const initOptionLabel =
    shouldUseInitialOption && options.length > 0
      ? options[0].label
      : selectLabel || intl.t(translations.common.select);
  const [selectedOption, setSelectedOption] = useState(
    selectedValue || initOptionLabel,
  );
  const themeColor = useSelector(selectedTheme);
  const iconColor = themeColor === 'dark' ? 'WHITE' : 'GRAY700';

  const chooseOption = option => {
    const userSelected = options.filter(
      ({ value }) => value === option?.value,
    )[0];

    if (option?.value === OrderStatus.BUYER_EXTENDS_DELIVERY) {
      extendDelivery && extendDelivery();
    }

    setSelectedOption(userSelected.label);
    setIsCollapsed(false);
    selectionAction && selectionAction(option?.value);
  };

  const toggleDropdown = () => {
    !disabled && setIsCollapsed(!isCollapsed);
  };

  const truncateLabel = (label: string, truncate: boolean) => {
    if (label.length > 6 && truncate) {
      return `${label.slice(0, 6)}...`;
    }
    return label;
  };

  return (
    <Select
      onClick={toggleDropdown}
      withBorder={withBorder}
      gap={gap}
      background={background}
    >
      <DisplayedText isDisabled={disabled} labelColor={labelColor}>
        {!showSelectedOption
          ? intl.t(translations.common.select)
          : truncateLabel(selectedOption, truncate)}
      </DisplayedText>
      <IconDiv
        className="icon-div"
        withDivider={withDivider}
        labelColor={labelColor}
      >
        {isCollapsed ? (
          <IconV2 name="chevron-up" size="D8" />
        ) : (
          <IconV2 name="chevron-down" size="D8" />
        )}
      </IconDiv>
      {isCollapsed && <ClearDiv onClick={() => setIsCollapsed(false)} />}
      {options.length > 0 && isCollapsed && (
        <DropdownDiv dropdownposition={position}>
          <DropdownContent dropdownMaxHeight={dropdownMaxHeight}>
            {options.map((option, index) => {
              return (
                <Option
                  key={index}
                  disabled={option.disabled}
                  onClick={
                    option.disabled ? undefined : () => chooseOption(option)
                  }
                >
                  {option?.iconName && (
                    <IconV2
                      name={option.iconName as IconV2Name}
                      size="D16"
                      color={iconColor}
                    />
                  )}
                  {option?.label}
                </Option>
              );
            })}
          </DropdownContent>
        </DropdownDiv>
      )}
    </Select>
  );
};

const Select = styled.span<{ withBorder?: boolean; gap; background }>`
  ${({ background }) =>
    background && `background-color: ${Colors[background]};`}
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  max-height: 5rem;
  max-width: 100%;
  border: ${({ withBorder, theme }) =>
    withBorder && `1px solid` + theme.color.border};
  border-radius: 4px;
  position: relative;
  gap: ${({ gap }) => gap || '1rem'};
  padding: 0 1rem;
`;

const DisplayedText = styled.span<{ isDisabled: boolean; labelColor }>`
  height: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme, isDisabled, labelColor }) =>
    !isDisabled ? labelColor || theme.color.blackText : Colors.GRAY500};
  font-size: 1.2rem;
`;

const IconDiv = styled.span<{ withDivider?: boolean; labelColor }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 30%;
  border-left: ${({ withDivider, theme }) =>
    withDivider && '1px solid' + theme.color.border};
  position: relative;

  svg {
    stroke: ${({ labelColor, theme }) => labelColor || theme.color.text};
  }
`;

const DropdownDiv = styled.div<{
  dropdownposition: 'top' | 'bottom' | undefined;
}>`
  position: absolute;
  top: ${({ dropdownposition }) => dropdownposition === 'bottom' && '101%'};
  bottom: ${({ dropdownposition }) => dropdownposition === 'top' && '101%'};
  right: 0;
  z-index: 9999;
`;

const DropdownContent = styled.div<{ dropdownMaxHeight?: string }>`
  z-index: 9999;
  background: ${p => p.theme.color.background};
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.05);
  padding: 1rem 0;
  width: max-content;
  max-height: 400px;
  overflow-y: auto;
`;

const Option = styled.span<{ disabled?: boolean }>`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  transition: all 0.5s;
  color: ${({ theme, disabled }) =>
    disabled ? Colors.GRAY300 : theme.color.blackText};
  display: flex;
  gap: 1rem;
  align-items: center;

  &:hover {
    background: ${p => p.theme.color.hoverColor};
    border-left: 2px solid ${({ theme }) => theme.color.primary};
  }
`;
