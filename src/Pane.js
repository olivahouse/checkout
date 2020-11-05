import React from 'react';
import getClassNames from 'classnames';

import styles from './styles.module.css';

export const Pane = ({
  children,
  showOnStep,
  step,
}) => (
    <div
      className={getClassNames(
        styles.pane,
        [...Array(showOnStep).fill(styles.right), styles.middle][step] || styles.left
      )}
    >
      {children}
    </div>
  );
