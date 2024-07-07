import * as React from 'react';
import DatePicker from 'react-datepicker';
import { Control, Controller } from 'react-hook-form';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import getYear from 'date-fns/getYear';
import getMonth from 'date-fns/getMonth';
import range from 'lodash/range';
import { Icon } from 'components/Icon';
import { Box } from 'components/Box';
import { Colors } from 'constants/Colors';
import { Dimensions } from 'constants/Dimensions';
import { FontSize } from 'constants/FontSize';
import { MONTHS } from 'constants/month';

type DimensionTypes = keyof typeof Dimensions;
type FontSizeTypes = keyof typeof FontSize;

interface SelectProps {
  width?: DimensionTypes;
  size?: FontSizeTypes;
  value?: string | number;
  label: string;
  name: string;
  error?: any;
  control?: Control<Record<string, unknown>, any>;
  minDate?: Date;
  selectedDate: Date | null;
  transparentBackground?: boolean;

  [x: string]: any;
}

export const DateInput = React.forwardRef<any, SelectProps>(
  (props: SelectProps, ref) => {
    const {
      label,
      error,
      name,
      control,
      minDate,
      transparentBackground,
      ...SelectProps
    } = props;
    const years = range(2021, getYear(new Date()) + 20, 1);
    const startDay = 1;
    const [calendarOpen, setCalendarOpen] = React.useState(false);

    const toggleCalendar = () => {
      setCalendarOpen(!calendarOpen);
    };

    const navigationClick = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      onClick: () => void,
    ) => {
      e.preventDefault();
      onClick();
    };

    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <Wrapper>
              <DatePickerInput
                transparentBackground={transparentBackground}
                error={error}
                onClick={() => setCalendarOpen(true)}
              >
                <DatePicker
                  {...field}
                  calendarStartDay={startDay}
                  showPopperArrow={false}
                  {...SelectProps}
                  minDate={minDate && minDate}
                  ref={ref}
                  open={calendarOpen}
                  onClickOutside={() => setCalendarOpen(false)}
                  renderCustomHeader={({
                    date,
                    changeYear,
                    changeMonth,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled,
                  }) => (
                    <Box flexDirection="column" justifyContent="center">
                      <Box
                        justifyContent="center"
                        flexDirection="row"
                        background="PURPLE100"
                      >
                        <Select
                          value={getYear(date)}
                          onChange={({ target: { value } }) =>
                            changeYear(value)
                          }
                        >
                          {years.map(option => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Select>
                      </Box>
                      <Box
                        flexDirection="row"
                        width="full"
                        justifyContent="space-between"
                        paddingX="S8"
                        marginBottom="S8"
                        background="BLUE300"
                      >
                        <NavigatorBtn
                          onClick={e => navigationClick(e, decreaseMonth)}
                          disabled={prevMonthButtonDisabled}
                        >
                          <Icon iconName="arrow-left-circle" size="D24" />
                        </NavigatorBtn>

                        <MonthSelect
                          value={MONTHS[getMonth(date)]}
                          onChange={({ target: { value } }) =>
                            changeMonth(MONTHS.indexOf(value))
                          }
                        >
                          {MONTHS.map(option => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </MonthSelect>

                        <NavigatorBtn
                          onClick={e => navigationClick(e, increaseMonth)}
                          disabled={nextMonthButtonDisabled}
                        >
                          <Icon iconName="arrow-right-circle" size="D24" />
                        </NavigatorBtn>
                      </Box>
                    </Box>
                  )}
                  selected={props.selectedDate}
                  onChange={date => {
                    field.onChange(date);
                    props.onChange(date);
                  }}
                />
                {props.label && (
                  <Label selectedDate={props.selectedDate}>{props.label}</Label>
                )}
                <InputIcon onClick={toggleCalendar}>
                  <Icon iconName="calendar" />
                </InputIcon>
              </DatePickerInput>
              {error && (
                <ErrorWrapper>
                  <ErrorText>{error}</ErrorText>
                </ErrorWrapper>
              )}
              {calendarOpen && (
                <ClearDiv onClick={() => setCalendarOpen(false)} />
              )}
            </Wrapper>
          );
        }}
      />
    );
  },
);

const ClearDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

const NavigatorBtn = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
`;

const DatePickerInput = styled.div<{
  error: any;
  transparentBackground?: boolean;
}>`
  background-color: ${props =>
    props.transparentBackground
      ? props.theme.color.background
      : props.theme.color.inputBackground};
  display: block;
  width: 100%;
  height: 5rem;
  padding: 1rem 0;
  border-radius: 5px;
  box-sizing: border-box;
  transition: border 0.3s;
  font-size: 1.4rem;
  border: 1px solid ${({ theme }) => theme.color.border};
  z-index: 1;

  &:focus-within label {
    padding-top: 6px;
    transform: translateY(-15px) scale(0.75);
  }

  &:focus-within react-datepicker {
    padding-top: 6px;

    transform: translateY(-15px) scale(0.75);
  }

  &.error {
    background-color: ${Colors.INPUT_ERROR_FILL};
    border: 1px solid ${Colors.INPUT_ERROR_STROKE};
  }

  .react-datepicker__header {
    text-align: center;
    background-color: ${({ theme }) => theme.color.bodyBackground};
    border-bottom: 0;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    padding: 0;
    position: relative;
  }

  .react-datepicker {
    border: none;
    background-color: ${({ theme }) => theme.color.bodyBackground};
    box-shadow: 0 0.5rem 1rem rgba(142, 141, 208, 0.12);
    z-index: 100;
  }

  .react-datepicker-popper {
    z-index: 10000;
  }

  .react-datepicker__day {
    font-size: 1.2rem;
    width: 2rem;
    margin: 0.4rem 0.8rem;
    line-height: 2rem;
    text-align: center;
    font-family: inherit;
    color: ${({ theme }) => theme.color.text};

    &:hover {
      background-color: ${Colors.PURPLE100};
    }
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--in-range {
    background-color: ${({ theme }) => theme.color.primary};
    color: ${Colors.WHITE};
    width: 2rem;
    position: relative;
  }

  .react-datepicker__day--outside-month {
    background: none;
    color: ${({ theme }) => theme.color.dateMonthName};
  }

  .react-datepicker__day-name,
  .react-datepicker__time-name {
    display: inline-block;
    width: 3.2rem;
    line-height: 1.7rem;
    text-align: center;
    font-size: 1rem;
    margin-bottom: 1rem;
    text-transform: uppercase;
  }

  .react-datepicker__day-name {
    color: ${({ theme }) => theme.color.dateMonthName};

    &:nth-last-child(-n + 2) {
      color: ${Colors.RED500};
    }
  }

  .react-datepicker__day--keyboard-selected {
    background-color: ${({ theme }) => theme.color.primary};
    color: ${Colors.WHITE};
  }

  .react-datepicker__day--disabled {
    color: ${({ theme }) => theme.color.datePickerDisabledDayText};
  }

  .react-datepicker__input-container {
    height: 3rem;

    input {
      display: block;
      width: 100%;
      height: 100%;
      background-color: ${Colors.TRANSPARENT};
      padding: 1.1rem 1.6rem 0;
      border-radius: 5px;
      color: ${({ theme }) => theme.color.inputText};
      box-sizing: border-box;
      transition: border 0.3s;
      font-size: 1.4rem;
      border: none;
      outline: none;
    }
  }
`;

const Select = styled.select`
  width: ${Dimensions.minContent};
  height: 35px;
  background: transparent;
  color: ${({ theme }) => theme.color.primary};
  padding-left: 5px;
  font-weight: 700;
  font-size: ${({ size }) => (size && FontSize[size]) || FontSize['F14']};
  border: none;
  outline: none;
`;

const MonthSelect = styled(Select)`
  appearance: none;
  text-align: center;
`;

const InputIcon = styled.span`
  position: absolute;
  right: 12px;
  top: 0;
  transform: translateY(80%);
  width: 20px;
  height: 20px;
  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;
  }
`;

const Wrapper = styled.div`
  height: 5rem;
  position: relative;
  width: 100%;
  background-color: ${({ theme }) => theme.color.inputBackground};
`;

const Label = styled.label<{ selectedDate: Date | null }>`
  color: ${({ theme }) => theme.color.inputPlaceholderText};
  font-family: 'Nunito Sans';
  left: 1.6rem;
  line-height: 14px;
  pointer-events: none;
  position: absolute;
  transform-origin: 0 50%;
  top: 35%;
  transform: ${props =>
    props.selectedDate && `translateY(-1.4rem) scale(0.75)`};
  transition: transform 200ms;
  font-size: 1.4rem;
  ${props => props.selectedDate && `padding-top: 6px`};
`;

const ErrorText = styled.small`
  color: ${Colors.RED500};
  font-size: ${Dimensions.D10};
`;

const ErrorWrapper = styled.div`
  padding: 1px;
  color: ${Colors.RED500};
`;
