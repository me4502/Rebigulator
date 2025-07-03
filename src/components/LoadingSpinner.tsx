import type { FC } from 'react';
import { spinner } from './LoadingSpinner.module.css';

export const LoadingSpinner: FC = () => (
  <div className={spinner}>
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
  </div>
);

export default LoadingSpinner;
