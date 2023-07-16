import {captureException} from '@sentry/react';

export const getData = async (path = '') => {
    try {
      const url = `${process.env.REACT_APP_API_BASE_URL}${path}`;
      const res = await fetch(url);
      const json = await res.json();

      return json;
    } catch (error) {
      captureException(error);
      return null;
    }
};


