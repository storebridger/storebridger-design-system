import { Box } from 'components/Box';
import styled, { ThemeContext } from 'styled-components';
import { Colors, ColorType } from 'constants/Colors';
import { Text } from 'components/Typography';
import {
  ContractCreationStepType,
  CreationSteps,
} from 'app/pages/personal/contract/_common/constants';
import { useBuildContractCreationSteps } from '../../../app/pages/personal/contract/ContractCreation/useBuildContractCreationStep';
import { useContractCreationStep } from '../../../app/pages/personal/contract/ContractCreation/useContractCreationStep';
import { useSelector } from 'react-redux';
import {
  contractCreationDeliverydetailsSelector,
  contractCreationOrderItemsSelector,
} from 'app/pages/personal/contract/slice/selectors';
import { useContext } from 'react';

interface ProgressItemProps {
  background?: ColorType;
  onClick?: () => void;
}

const DEFAULT_COLOR = 'transparent';

export function StepIndicator() {
  const options = useBuildContractCreationSteps();
  const { contractStep, setStep } = useContractCreationStep();
  const deliveryDetails = useSelector(contractCreationDeliverydetailsSelector);
  const orderItemsList = useSelector(contractCreationOrderItemsSelector);

  const manageIndicators = (step: ContractCreationStepType, index: number) => {
    if (Object.keys(CreationSteps).indexOf(contractStep) <= index) {
      switch (step) {
        case 'INVITE':
          if (orderItemsList.length > 0 && deliveryDetails !== null) {
            setStep(step);
          }
          break;
        case 'DELIVERY_DETAILS':
          if (orderItemsList.length > 0) {
            setStep(step);
          }
          break;
      }
    } else {
      setStep(step);
    }
  };

  const hasPassedStep = (index: number) => {
    return Object.keys(CreationSteps).indexOf(contractStep) >= index;
  };

  const theme = useContext(ThemeContext);

  return (
    <Box flexDirection="column" gap="S16">
      <ProgressBar>
        {options.map((item, index) => {
          return (
            <ProgressItem
              key={index}
              onClick={() => manageIndicators(item.step, index)}
              background={
                hasPassedStep(index)
                  ? theme.color.primary
                  : theme.color.stepIndicatorColor
              }
            >
              <Text size="F10" color="GRAY600">
                {item.title}
              </Text>
            </ProgressItem>
          );
        })}
      </ProgressBar>
    </Box>
  );
}

const ProgressBar = styled.ul`
  list-style-type: none;
  padding: 0;
  counter-reset: step;
`;
const ProgressItem = styled.li<ProgressItemProps>`
  float: left;
  width: 20%;
  position: relative;
  text-align: center;
  cursor: pointer;

  &:before {
    content: counter(step);
    counter-increment: step;
    width: 25px;
    height: 25px;
    line-height: 25px;
    color: ${props =>
      ({ theme }) =>
        props.background === theme.color.primary ? Colors.WHITE : Colors.BLACK};
    display: block;
    text-align: center;
    margin: 0 auto 10px auto;
    border-radius: 50%;
    font-size: 12px;
    font-weight: 400;
    background-color: ${props => props.background || DEFAULT_COLOR};
  }

  &:after {
    content: '';
    position: absolute;
    width: 20%;
    height: 1px;
    background-color: ${props => props.background || DEFAULT_COLOR};
    top: 12px;
    left: -10%;
    z-index: 1;
  }

  &:first-child:after {
    content: none;
  }
`;
