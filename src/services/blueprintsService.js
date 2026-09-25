import apimock from './apimock';
import apiclientService from './apiclientService';

const service = import.meta.env.VITE_USE_MOCK === 'true' ? apimock : apiclientService;

export default service;