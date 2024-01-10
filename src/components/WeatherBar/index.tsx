import React from 'react';
import { colors } from '../../constants/colors';
import {
  CityName,
  Container,
  CityWrapper,
  IconInfoWrapper,
  Row,
  IconWrapper,
  FontAwesome5Styled,
  InfoWrapper,
  InfoName,
  InfoValue,
} from './styles';

interface IICon {
  name: string;
  bgColor?: string;
  color?: string;
}

const Icon: React.FC<IICon> = ({ name, bgColor, color }) => (
  <IconWrapper bgColor={bgColor}>
    <FontAwesome5Styled name={name} color={color} />
  </IconWrapper>
);

export const WeatherBar: React.FC = () => {
  return (
    <Container>
      <Row>
        <CityWrapper>
          <Icon name="cloud-rain" color={colors.default.blue} />
          <CityName>Luanda-Angola</CityName>
        </CityWrapper>
        <IconInfoWrapper>
          <Icon
            name="thermometer-half"
            bgColor={colors.default.blue}
            color={colors.default.textLight}
          />
          <InfoWrapper>
            <InfoName>Temp.</InfoName>
            <InfoValue>16ºc</InfoValue>
          </InfoWrapper>
        </IconInfoWrapper>
      </Row>
      <Row>
        <IconInfoWrapper>
          <Icon
            name="sun"
            color={colors.default.textLight}
            bgColor={colors.default.yellow}
          />
          <InfoWrapper>
            <InfoName>Light</InfoName>
            <InfoValue>5,8k lux</InfoValue>
          </InfoWrapper>
        </IconInfoWrapper>
        <IconInfoWrapper>
          <Icon
            name="wind"
            color={colors.default.textLight}
            bgColor={colors.default.green}
          />
          <InfoWrapper>
            <InfoName>Wind</InfoName>
            <InfoValue>10km/h</InfoValue>
          </InfoWrapper>
        </IconInfoWrapper>
        <IconInfoWrapper>
          <Icon
            name="tint"
            color={colors.default.textLight}
            bgColor={colors.default.blueLight}
          />
          <InfoWrapper>
            <InfoName>Humidity</InfoName>
            <InfoValue>76%</InfoValue>
          </InfoWrapper>
        </IconInfoWrapper>
      </Row>
    </Container>
  );
};
