import React, {InputHTMLAttributes, forwardRef} from 'react';
import {MagnifyingGlass} from '@phosphor-icons/react';
import {SearchInputContainer, Input, SearchInputLabel, InputWrapper, SubmitButton} from './styles';

type InputBaseProps = InputHTMLAttributes<HTMLInputElement>;

type Props = InputBaseProps & {
    id: string;
    label: string;
};

export const SearchInput = forwardRef<HTMLInputElement, Props>(
    ({id, label, ...restInputProps}, ref) => {
        return (
            <SearchInputContainer>
                <SearchInputLabel htmlFor={id}>{label}</SearchInputLabel>
                <InputWrapper>
                    <Input id={id} {...restInputProps} ref={ref} type="search" />
                    <SubmitButton data-testid="submit-button" type="submit" title="submit-button">
                        <MagnifyingGlass size={16} weight="bold" />
                    </SubmitButton>
                </InputWrapper>
            </SearchInputContainer>
        );
    }
);
