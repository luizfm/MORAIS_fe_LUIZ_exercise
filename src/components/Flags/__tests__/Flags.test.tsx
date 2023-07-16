import React from 'react';
import {render, screen} from '@testing-library/react';
import {FlagsEnum, Flags, FLAG_LIST} from '..';

const OnMatchRender = () => <p>onMatch</p>;
const Fallback = () => <p>fallback</p>;

describe('Flag | component | unit test', () => {
    it('should render provided component on flag match', () => {
        FLAG_LIST[FlagsEnum.IS_CARD_COMPONENT_APPROACH_ON] = 'true';
        render(
            <Flags
                flag={FlagsEnum.IS_CARD_COMPONENT_APPROACH_ON}
                renderOnMatch={<OnMatchRender />}
                fallback={<Fallback />}
            />
        );

        expect(screen.getByText('onMatch')).toBeInTheDocument();
    });

    it('should render provided fallback component on flag not match', () => {
        FLAG_LIST[FlagsEnum.IS_CARD_COMPONENT_APPROACH_ON] = 'false';

        render(
            <Flags
                flag={FlagsEnum.IS_CARD_COMPONENT_APPROACH_ON}
                renderOnMatch={<OnMatchRender />}
                fallback={<Fallback />}
            />
        );

        expect(screen.getByText('fallback')).toBeInTheDocument();
    });

    it('should render fallback or match value if they are not provided', () => {
        FLAG_LIST[FlagsEnum.IS_CARD_COMPONENT_APPROACH_ON] = 'false';

        render(
            <Flags
                flag={FlagsEnum.IS_CARD_COMPONENT_APPROACH_ON}
                renderOnMatch={<OnMatchRender />}
            />
        );

        expect(screen.queryAllByText('fallback')).toHaveLength(0);
        expect(screen.queryAllByText('onMatch')).toHaveLength(0);
    });
});
