import 'react';
import { act, renderHook } from '@testing-library/react-hooks';

import { useDebounceLoader, DEFAULT_DEBOUNCE_TIME_MS } from '../src/useDebounceLoader';

describe('useDebounceLoader', () => {
    jest.useFakeTimers();

    describe('default options', () => {
        it('shows loading state while value is being debounced', () => {
            const { result } = renderHook(() => useDebounceLoader<string>());

            const newValue = 'Hello';

            act(() => {
                result.current[0](newValue);
            });

            expect(result.current[1].isLoading).toBeTruthy();
            expect(result.current[1].value).toEqual(newValue);

            act(() => {
                // Do not complete the debounce time
                jest.runTimersToTime(DEFAULT_DEBOUNCE_TIME_MS / 2);
            });

            expect(result.current[1].isLoading).toBeTruthy();
            expect(result.current[1].value).toEqual(newValue);
        });

        it('it resolves loading state when value is unbounced', () => {
            const { result } = renderHook(() => useDebounceLoader<string>());

            const newValue = 'Hello';

            act(() => {
                result.current[0](newValue);
            });

            expect(result.current[1].isLoading).toBeTruthy();
            expect(result.current[1].value).toEqual(newValue);

            act(() => {
                jest.runTimersToTime(DEFAULT_DEBOUNCE_TIME_MS);
            });

            expect(result.current[1].isLoading).toBeFalsy();
            expect(result.current[1].value).toEqual(newValue);
        });
    });

    describe.only('custom options', () => {
        it('debounces for user specified time', () => {
            const DEBOUNCE_TIME_MS = 3000;

            const { result } = renderHook(() =>
                useDebounceLoader<string>({
                    debounceTime: DEBOUNCE_TIME_MS,
                }),
            );

            act(() => {
                result.current[0]('Hello World');
            });

            expect(result.current[1].isLoading).toBeTruthy();

            act(() => {
                // Do not complete the debounce time
                jest.runTimersToTime(DEBOUNCE_TIME_MS / 2);
            });

            expect(result.current[1].isLoading).toBeTruthy();

            act(() => {
                // Complete the remaining debounce time
                jest.runTimersToTime(DEBOUNCE_TIME_MS / 2);
            });

            expect(result.current[1].isLoading).toBeFalsy();
        });

        it('it uses the initial value', () => {
            const initialValue = 'foo';
            const { result } = renderHook(() =>
                useDebounceLoader<string>({
                    initialValue,
                }),
            );

            expect(result.current[1].value).toEqual(initialValue);
        });

        it('it fires debounce resolved callback', () => {
            const onFinish = jest.fn();
            const { result } = renderHook(() =>
                useDebounceLoader<string>({
                    onFinish,
                }),
            );

            const newValue = 'bar';

            act(() => {
                result.current[0](newValue);
            });

            act(() => {
                // Complete the remaining debounce time
                jest.runTimersToTime(DEFAULT_DEBOUNCE_TIME_MS);
            });

            expect(onFinish).toHaveBeenCalledTimes(1);
            expect(onFinish).toHaveBeenCalledWith(newValue);
        });
    });
});
