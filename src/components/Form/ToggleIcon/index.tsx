import styled from 'styled-components';
import { Colors } from 'constants/Colors';

interface Props {
  checked: boolean;
  onChange: (e) => void;
  disabled?: boolean;
}

const Toggle = ({ checked, disabled, onChange }: Props) => {
  return (
    <label>
      <SwitchWrapper>
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={e => onChange(e)}
        />
        <Switch checked={checked}>
          <SwitchHandle checked={checked} />
        </Switch>
      </SwitchWrapper>
    </label>
  );
};

const SwitchWrapper = styled.div`
  border-radius: 2rem;
  cursor: pointer;
  height: 2.4rem;
  float: left;
  overflow: hidden;
  position: relative;
  width: 4.8rem;

  input {
    opacity: 0;
    position: absolute;
  }
`;

const Switch = styled.span<{ checked: boolean }>`
  color: #fff;
  background-color: ${({ checked, theme }) =>
    checked ? theme.color.primary : Colors.GRAY500};
  display: flex;
  align-items: center;
  height: 100%;
  position: relative;
  left: -100%;
  transition: 100ms linear;
  width: 200%;
  transform: ${({ checked }) =>
    checked && 'translateX(50%) translateX(-19px);'};
`;

const SwitchHandle = styled.span<{ checked: boolean }>`
  background: #fff;
  border-radius: 50%;
  display: inline-block;
  height: 1.5rem;
  width: 1.5rem;
  left: 50%;
  position: absolute;
  z-index: 3;
  transform: ${({ checked }) => !checked && 'translateX(5px)'};
`;

export default Toggle;
