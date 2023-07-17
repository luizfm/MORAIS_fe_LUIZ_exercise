import {trackEvent} from '../index';

beforeEach(() => {
    window.analytics = {
        track: jest.fn(),
    };
});

describe('trackEvent function', () => {
    it('should call window.analytics.track with the correct arguments', () => {
        trackEvent('Card click', {id: '1'});

        expect(window.analytics.track).toHaveBeenCalledWith('Card click', {id: '1'});
    });
});
