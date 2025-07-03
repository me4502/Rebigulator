import Link from 'next/link';
import { mainLink, mainButton } from './MainLink.module.css';
import type { FC, ComponentProps } from 'react';
import classNames from 'classnames';

export const MainNextLink: FC<ComponentProps<typeof Link>> = ({
  className,
  ...props
}) => <Link className={classNames(mainLink, className)} {...props} />;

export const MainLink: FC<ComponentProps<'a'>> = ({ className, ...props }) => (
  <a className={classNames(mainLink, className)} {...props} />
);

export const MainButton: FC<ComponentProps<'button'>> = ({
  className,
  ...props
}) => <button className={classNames(mainButton, className)} {...props} />;

export const MainButtonLink: FC<ComponentProps<typeof Link>> = ({
  className,
  ...props
}) => <Link className={classNames(mainButton, className)} {...props} />;
