import { useState } from 'react';

import { useDebouncedCallback } from 'use-debounce';

interface Options<T> {
    debounceTime?: number;
    initialValue?: T;
    onFinish?: (value: T) => void;
}

export const DEFAULT_DEBOUNCE_TIME_MS = 1000;

export function useDebounceLoader<T>(
    { debounceTime, initialValue, onFinish }: Options<T> = {
        debounceTime: DEFAULT_DEBOUNCE_TIME_MS,
    },
): [(newValue: T) => void, { isLoading: boolean; value: T }] {
    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue] = useState(initialValue);

    const onDebounceFinish = (): void => {
        if (onFinish) {
            onFinish(value);
        }

        setIsLoading(false);
    };

    const [debounceOnChange] = useDebouncedCallback(onDebounceFinish, debounceTime || 1000);

    const onChange = (newValue: T): void => {
        setIsLoading(true);
        setValue(newValue);

        debounceOnChange();
    };

    return [
        onChange,
        {
            isLoading,
            value,
        },
    ];
}
