import React from 'react';

import { Container } from './styles';

interface TooltipsProps {
  title: string;
  className?: string;
}
const Tooltips: React.FC<TooltipsProps> = ({
  title,
  className = '',
  children,
}) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tooltips;
