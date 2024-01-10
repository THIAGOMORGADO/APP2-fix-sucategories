import React from 'react';

import { Container, DateContainer, DayTxt, Icon } from './styles';

export const CalendarBar: React.FC = () => {
  const date = new Date();

  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  return (
    <Container>
      {[...Array(5)].map((item, index) => {
        date.setDate(date.getDate() + (!index ? 0 : 1));

        return (
          <DateContainer key={index} highLight={!index}>
            <DayTxt highLight={!index}>{date.getDate()}</DayTxt>
            <DayTxt highLight={!index}>{days[date.getDay()]}</DayTxt>
          </DateContainer>
        );
      })}

      <DateContainer>
        <Icon name="calendar" />
      </DateContainer>
    </Container>
  );
};
