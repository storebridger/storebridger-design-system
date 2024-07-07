import { Controller } from 'react-hook-form';
import { Box } from 'components/Box';
import { Spacing } from 'constants/Spacing';
import { RadioInput } from './RadioButton';

type FlexDirection = 'row' | 'column';
type SpacingTypes = keyof typeof Spacing;

type IOption = {
  label: string;
  name?: string;
  value?: string | boolean | number;
  disabled?: boolean;
};

type IInputGroup = {
  label: string;
  options: IOption[];
  gap?: SpacingTypes;
  hasFullWidth?: boolean;
  name: string;
  control: any;
  flexDirection?: FlexDirection;
  [key: string]: any;
};

export const RadioButtonGroup = ({
  options,
  onChange,
  flexDirection,
  gap,
  name,
  control,
}: IInputGroup) => {
  function radioGroupHandler(event: React.ChangeEvent<HTMLInputElement>) {
    onChange && onChange(event.target.value);
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <Box>
            <Box flexDirection={flexDirection || 'column'} gap={gap}>
              {options.map(({ label, value, disabled }: IOption, index) => {
                const shortenedOptionLabel = label.replace(/\s+/g, '');
                const optionId = `radio-option-${shortenedOptionLabel}`;

                return (
                  <RadioInput
                    value={value as any}
                    label={label}
                    key={optionId}
                    id={optionId}
                    name={name}
                    disabled={disabled}
                    defaultChecked={index === 0}
                    onChange={event => {
                      radioGroupHandler(event);
                      field.onChange(event);
                    }}
                  />
                );
              })}
            </Box>
          </Box>
        );
      }}
    />
  );
};
