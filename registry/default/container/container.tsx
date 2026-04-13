import { cn } from './cn';
import React, { PropsWithChildren } from 'react';

export interface ContainerProps extends PropsWithChildren {
  className?: string;
}

export interface SectionProps extends PropsWithChildren {
  className?: string;
  contentContainerClassName?: string;
}

export const Container: React.FC<ContainerProps> = ({ className, children }) => {
  return <div className={cn('mx-auto w-full max-w-[1440px] px-3 md:px-8', className)}>{children}</div>;
};

export const Section: React.FC<SectionProps> = ({ className, contentContainerClassName, children }) => {
  return (
    <section className={cn('w-full font-archivo bg-white', className)}>
      <Container className={contentContainerClassName}>{children}</Container>
    </section>
  );
};
