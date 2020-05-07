import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <Container>
      <section>
        <h2>About the charts</h2>
        <p>
          The first chart displays investment performance during past recessions
          and the current recession for four common types of assets: US stocks,
          US bonds, gold, and the US dollar. The second chart displays case data
          for the COVID-19 pandemic.
        </p>
      </section>
      <section>
        <h2>Historical time periods</h2>
        <p>
          Up to five past recessions are displayed for the investment assets:
          The Great Depression of 1929, The 1970s Recession, The 2001 Dotcom
          Bubble Recession, The Great Recession of 2007/2008, and the current
          COVID19/Coronavirus Recession of 2020. The beginning of the data for
          each recession is set to the previous high in the stock market before
          the recession officially began. Note: only the stock market data
          includes the Great Depression. The other data sets do not go back that
          far unfortunately.
        </p>
      </section>
      <section>
        <h2>Interpretation of historical asset performance</h2>
        <p>
          Past performance is not indicative of future results. However,
          comparing how an asset performed in previous recessions can help
          establish a range of possible outcomes. While no single past recession
          is exactly like the 2020 Coronavirus Recession, elements of past
          recessions are likely to be similar to the events that unfold.
        </p>
      </section>
      <section>
        <h2>Interpretation of COVID19 data</h2>
        <p>
          Undoubtedly, the Coronavirus pandemic will have major effects on the
          global economy. Markets vary between leading and lagging indicators of
          impacts to the economy. It is difficult to time a market's reaction to
          world events. However, the magnitude of the Coronavirus's impact on
          humanity is a fundamental driver of the economic impacts of this
          recession. The new and total case data can provide insight into the
          severity of the pandemic's effect on the global economy.
        </p>
      </section>
      <section>
        <h2>COVID19 data</h2>
        <p>
          Data for the COVID19 case statistics is provided by the{' '}
          <a
            href='https://corona.lmao.ninja/'
            target='_blank'
            rel='noopener noreferrer'
          >
            Novel COVID API
          </a>
          .
        </p>
      </section>
      <section>
        <h2>Stock market data</h2>
        <p>
          The stock market is represented by the{' '}
          <a
            href='https://en.wikipedia.org/wiki/S%26P_500_Index'
            target='_blank'
            rel='noopener noreferrer'
          >
            S&P500
          </a>{' '}
          index, which is a marketcap-weighted index of the largest 500
          companies traded on the New York Stock Exchange. Historical data is
          based on the inflation-adjusted total return of the{' '}
          <a
            href='https://finance.yahoo.com/quote/%5EGSPC/'
            target='_blank'
            rel='noopener noreferrer'
          >
            ^GSPC
          </a>
          &nbsp;data set. Present day data is calculated from the{' '}
          <a
            href='https://finance.yahoo.com/quote/SPY'
            target='_blank'
            rel='noopener noreferrer'
          >
            SPY ETF
          </a>
          , updated daily via the{' '}
          <a
            href='https://www.alphavantage.co/'
            target='_blank'
            rel='noopener noreferrer'
          >
            AlphaVantage API
          </a>
          .
        </p>
      </section>
      <section>
        <h2>Bond market data</h2>
        <p>
          The bond market is represented by{' '}
          <a
            href='https://www.investopedia.com/terms/i/intermediatetermdebt.asp'
            target='_blank'
            rel='noopener noreferrer'
          >
            intermediate term US bonds
          </a>
          . Historical data is based on inflation-adjusted returns of the{' '}
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://www.bloomberg.com/quote/LF97TRUU:IND'
          >
            Bloomberg Barclays Intermediate US Bond Index
          </a>
          . Present data is based on the{' '}
          <a
            href='https://finance.yahoo.com/quote/GVI'
            target='_blank'
            rel='noopener noreferrer'
          >
            GVI ETF
          </a>
          , updated daily via AlphaVantage.
        </p>
      </section>
      <section>
        <h2>Gold market data</h2>
        <p>
          Historical data is based on inflation-adjusted returns of the{' '}
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://fred.stlouisfed.org/series/GOLDAMGBD228NLBM'
          >
            London Bullion Market
          </a>
          . Present data is based on the{' '}
          <a
            href='https://finance.yahoo.com/quote/GLD'
            target='_blank'
            rel='noopener noreferrer'
          >
            GLD ETF
          </a>
          , updated daily via AlphaVantage.
        </p>
      </section>
      <section>
        <h2>Dollar market data</h2>
        <p>
          The US Dollar data is represented by the{' '}
          <a
            href='https://www.investopedia.com/terms/u/usdx.asp'
            target='_blank'
            rel='noopener noreferrer'
          >
            USDX
          </a>
          , an index that measures the value of the US dollar against other
          major currencies. Historical data is based on inflation-adjusted
          returns of the{' '}
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://fred.stlouisfed.org/series/DTWEXM'
          >
            FRED USDX data
          </a>
          . Present data is based on the{' '}
          <a
            href='https://finance.yahoo.com/quote/UUP'
            target='_blank'
            rel='noopener noreferrer'
          >
            UUP ETF
          </a>
          , updated daily via AlphaVantage.
        </p>
      </section>
      <section>
        <h2>Improvements</h2>
        <p>
          I am always looking for ways to improve this site! If you have any
          ideas on the design or how to improve the data,{' '}
          <Link to='/contact'>contact me</Link>!
        </p>
      </section>
      <section>
        <h2>Disclaimer</h2>
        <p>
          This site is not investment advice. Use this site's information at
          your own risk. Data is not guaranteed to be accurate. As always, do
          your own research before making any investment decisions.
        </p>
      </section>
    </Container>
  );
}

const Container = styled.main`
  max-width: 900px;
  margin: 0 auto;
  color: ${({ theme }) => theme.color.onBackgroundLight};
  a,
  a:visited {
    color: ${({ theme }) => theme.color.primary};
  }
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: left;
  line-height: 1.5rem;
  section {
    h2 {
      color: ${({ theme }) => theme.color.primary};
      margin: 3rem 0 1rem 0;
    }
  }
`;
