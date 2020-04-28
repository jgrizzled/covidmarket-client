import createResource from './create-resource';
import { fetchMarketData, fetchCOVIDdata } from './api';

let COVIDdata = null;
const marketData = {};

export const useCOVIDdata = () => {
  if (!COVIDdata) COVIDdata = createResource(fetchCOVIDdata());
  return COVIDdata;
};

export const useMarketData = dataName => {
  if (!marketData[dataName])
    marketData[dataName] = createResource(fetchMarketData(dataName));
  return marketData[dataName];
};
