import styled, { css } from 'styled-components/native';

export const Pressable = styled.Pressable`
  flex: 1;
  padding: 25px;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
`;

export const ViewContent = styled.View`
  background-color: #fff;
  width: 100%;
  align-items: center;
  padding-top: 45px;
  border-radius: 15px;
`;

export const MessageIconContainer = styled.View`
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
`;

export const Content = styled.View`
  width: 100%;
  align-items: center;
  padding: 20px;
`;

export const ContentTitle = styled.Text`
  font-size: 24px;
  text-align: center;
  margin-bottom: 10px;
`;

export const ContentDescription = styled.Text`
  font-size: 16px;
  text-align: center;
  margin-bottom: 20px;
`;

export const FooterContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;
