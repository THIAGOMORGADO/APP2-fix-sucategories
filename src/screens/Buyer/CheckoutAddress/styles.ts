import styled from 'styled-components/native';
import { colors } from '../../../constants/colors';
import { Title as TitleComponent } from '../../../components/Title';

export const Container = styled.ScrollView`
  flex: 1;
`;

export const Form = styled.View`
  width: 100%;
  padding: 16px;
  background-color: ${colors.default.bgLighter};
`;

export const Title = styled(TitleComponent)`
  margin: 8px 0 24px 0;
`;
