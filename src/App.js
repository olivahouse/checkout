import React, { useState } from 'react';
import { Stripe } from '@olivahouse/stripe';
import { parse } from 'query-string';
import { Pricing, adaptPrice } from '@olivahouse/price';
import getClassNames from 'classnames';

import '@olivahouse/ui/lib/styles.css';
import '@olivahouse/price/lib/styles.css';
import '@olivahouse/stripe/lib/styles.css';

import { Pane } from './Pane';
import { getStrings } from './utils/getStrings';
import { EN, EUR, STRIPE_PUBLIC_KEY } from './constants';
import styles from './styles.module.css';

const languageCode = parse(window.location.search).language || EN;
const currencyCode = parse(window.location.search).currency || EUR;

const strings = getStrings(languageCode);

const App = () => {
  const [step, setStep] = useState(0);
  const [pack, setPack] = useState(null);
  const [priceId, setPriceId] = useState(null);
  const [couponId, setCouponId] = useState(null);
  const [price, setPrice] = useState(null);
  const [discountedPrice, setDiscountedPrice] = useState(null);
  const [email, setEmail] = useState(null);

  const handleClickPrice = ({ couponId, discountedPrice, pack, price, priceId }) => {
    setPack(pack);
    setPriceId(priceId);
    setCouponId(couponId);
    setPrice(price);
    setDiscountedPrice(discountedPrice);

    setStep(1);
  }

  const handleClickBack = () => setStep(0);

  const handleFinish = ({ email }) => {
    setEmail(email);

    setStep(2);
  };

  return (
    <div className={styles.viewport}>
      <img
        className={styles.logo}
        src="https://oliva-static-assets.s3.amazonaws.com/5f4625e7bfab83f32de77fe9_Oliva-logo-svg.svg"
        alt="logo"
      />
      <div className={styles.panes}>
        <Pane showOnStep={0} step={step}>
          <p className={styles.subtitle}>{strings.CHOOSE_THE_PACK}</p>
            <Pricing
              currencyCode={currencyCode}
              handleClickPrice={handleClickPrice}
              isTooltipHidden
              languageCode={languageCode}
              strings={strings}
            />
            <div style={{ height: '48px', width: '100%' }} />
        </Pane>
        <Pane showOnStep={1} step={step}>
          <p
            className={getClassNames(styles.subtitle, styles.backButton)}
            onClick={handleClickBack}
          >
            {strings.GO_BACK_AND_CHANGE_PACK}
          </p>
          <div className={styles.stripeContainer}>
            <Stripe
              couponId={couponId}
              languageCode={languageCode}
              onFinish={handleFinish}
              pack={pack}
              priceId={priceId}
              renderChargeDescription={() =>
                `${adaptPrice(discountedPrice || price, currencyCode, languageCode)} ${strings.FOR} ${pack} ${strings.SESSIONS}`
              }
              strings={strings}
              stripePublicKey={STRIPE_PUBLIC_KEY}
            />
          </div>
        </Pane>
        <Pane showOnStep={2} step={step}>
          <div className={styles.thanks}>
            <p>{strings.THANKS}</p>
            <p>{strings.YOUR_PAYMENT_WAS_SUCCESSFUL}.</p>
            <p>{strings.WE_SENT_A_PAYMENT_RECEIPT_TO} {email}</p>
            <p>{strings.WE_ADDED} {pack} {strings.SESSIONS_TO_YOUR_ACCOUNT}.</p>
            <p>{strings.NEXT_TIME_YOU_SEE_YOUR_THERAPIST}.</p>
            <img src="https://oliva-static-assets.s3.amazonaws.com/5f89cb3bcff467d62478fefd_abstrakt-design-212.png" alt="Focus on you"/>
          </div>
        </Pane>
      </div>
    </div>
  );
}

export default App;
