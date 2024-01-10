import styled from 'styled-components/native';

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  background-color: #28c17e;
  height: 60px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
`;

export const Logo = styled.Image`
  width: 35px;
  height: 40px;
`;

export const TextWraper = styled.View`
  width: 100%;
  height: 45%;
  align-items: center;
  padding: 20px;
`;
