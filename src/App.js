import React, { useState, useEffect } from 'react';
import { parse } from 'query-string';
import { Pricing } from '@olivahouse/price';
import '@olivahouse/price/lib/styles.css';

import { getStrings } from './utils/getStrings';
import { EN, EUR } from './constants';
import styles from './styles.module.css';

const languageCode = parse(window.location.search).language || EN;
const currencyCode = parse(window.location.search).currency || EUR;

const strings = getStrings(languageCode);

const App = () => {
  const [step, setStep] = useState(0);
  const [pack, setPack] = useState(null);

  useEffect(() => {
    if (pack === null) return;

    setStep(1);
  }, [pack])

  return (
    <div className={styles.viewport}>
      <img
        className={styles.logo}
        src="https://oliva-static-assets.s3.amazonaws.com/5f4625e7bfab83f32de77fe9_Oliva-logo-svg.svg"
        alt="logo"
      />
      <div className={styles.panes}>
        <div className={styles.pane}>
          <p className={styles.subtitle}>{strings.CHOOSE_THE_PACK}</p>
          <Pricing
            currencyCode={currencyCode}
            handleClickPrice={setPack}
            isTooltipHidden
            languageCode={languageCode}
            strings={strings}
          />
        </div>
        <div className={styles.pane}>
          Something
        </div>
      </div>
    </div>
  );
}

export default App;
