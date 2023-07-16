import React from 'react';

export enum FlagsEnum {
    IS_CARD_COMPONENT_APPROACH_ON = 'IS_CARD_COMPONENT_APPROACH_ON',
}

interface Props {
    flag: FlagsEnum;
    renderOnMatch: React.JSX.Element;
    fallback?: React.JSX.Element;
}

export const FLAG_LIST = {
    [FlagsEnum.IS_CARD_COMPONENT_APPROACH_ON]: process.env.REACT_APP_IS_CARD_COMPONENT_APPROACH_ON,
};

export const Flags = ({flag, renderOnMatch, fallback = null}: Props) => {
    const trueValues = [1, true, 'true'];
    if (trueValues.includes(FLAG_LIST[flag])) {
        return renderOnMatch;
    }

    return fallback;
};
