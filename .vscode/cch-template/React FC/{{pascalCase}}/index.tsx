import React, { FC } from 'react';
import styles from './{{pascalCase}}.module.scss'

type {{pascalCase}}Props = {

}

const {{pascalCase}}: FC<{{pascalCase}}Props> = () => {
  return <div className={styles.root}>
    {{pascalCase}} component is mounted!
  </div>;
};

export default {{pascalCase}};