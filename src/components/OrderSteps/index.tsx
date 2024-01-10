import React from 'react';
import { type ICompraStatus } from '../../@types';

import { Circle, Icon, Line, StepWrapper } from './styles';

interface IOrderSteps {
  icon: string[];
  status: ICompraStatus;
}

interface IStep {
  isFirst?: boolean;
  isLast?: boolean;
  icon: string;
  isActive: boolean;
  status: ICompraStatus;
}

const handleStepActive = (status: ICompraStatus, step: number) => {
  const statusList = [
    'AGUARDANDO_PAGAMENTO',
    'AGUARDANDO_CONFIRMACAO',
    'EM_PREPARACAO',
    'A_CAMINHO',
    'ENTREGUE',
  ];
  return status === 'CANCELADA'
    ? true
    : statusList.some(
        (state, index) => state === status && step < index
      );
};

const Steps: React.FC<IStep> = ({
  isFirst,
  isLast,
  icon,
  isActive,
  status,
}) => {
  return (
    <StepWrapper>
      {!isFirst && (
        <Line
          isActive={isActive}
          isCanceled={status === 'CANCELADA'}
        />
      )}
      <Circle isActive={isActive} isCanceled={status === 'CANCELADA'}>
        <Icon
          name={icon}
          isActive={isActive}
          isCanceled={status === 'CANCELADA'}
        />
      </Circle>
      {!isLast && (
        <Line
          isActive={isActive}
          isCanceled={status === 'CANCELADA'}
        />
      )}
    </StepWrapper>
  );
};

export const OrderSteps: React.FC<IOrderSteps> = ({
  icon,
  status,
}) => {
  return (
    <>
      {icon.map((ico, index) => (
        <Steps
          key={index}
          status={status}
          isActive={handleStepActive(status, index)}
          icon={ico}
          isFirst={index === 0}
          isLast={index === icon.length - 1}
        />
      ))}
    </>
  );
};
