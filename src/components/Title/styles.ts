import styled from 'styled-components/native';

interface ITitle {
  fontWeight?: 400 | 700;
  fontSize?: string;
}

export const ViewTitle = styled.View`
  width: 100%;
`;

export const TitleTag = styled.Text<ITitle>`
  font-size: ${(props) => (props.fontSize ? props.fontSize : '36px')};
  text-align: center;
  width: 100%;
  font-weight: ${(props) =>
    props.fontWeight ? props.fontWeight : 700};
  color: #28c17e;
  text-transform: uppercase;
  padding-bottom: 20px;
`;
