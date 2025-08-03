import type { FC } from 'react';
import { spinner, loadingBox } from './LoadingSpinner.module.css';

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

interface LoadingBoxProps {
  text?: string;
}

export const LoadingBox: FC<LoadingBoxProps> = ({ text = 'Loading...' }) => (
  <div className={loadingBox}>
    <p>{text}</p>
    <LoadingSpinner />
  </div>
);
