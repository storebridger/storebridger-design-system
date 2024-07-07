import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Text } from 'components/Typography/Text';
import { Button } from 'components/Button';
import { Header3 } from '../Typography';
import { Icon } from '../Icon';

interface Props {
  title: string;
  subtitle: string;
  to: string;
  buttonText: string;
}

export const ActionSuccess = React.memo(
  ({ title, subtitle, to, buttonText }: Props) => {
    return (
      <Wrapper>
        <IconDiv>
          <Icon iconName="check" />
        </IconDiv>
        <Title>{title}</Title>
        <SubTitle>{subtitle}</SubTitle>

        <Cta as={Link} to={to} className="btn btn-primary">
          {buttonText}
        </Cta>
      </Wrapper>
    );
  },
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  max-width: 340px;
`;

const IconDiv = styled.div`
  margin: auto;
  width: 60px;
  height: 60px;
`;

const Title = styled(Header3)`
  margin-top: 20px;
  margin-bottom: 5px;
  font-weight: 600;
`;
const SubTitle = styled(Text)``;

const Cta = styled(Button)`
  width: 225px;
  margin: 35px auto auto auto;

  &:last-child {
    margin: 35px auto auto auto;
  }
`;
