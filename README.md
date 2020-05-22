
# useDebounceLoader React Hook

A React hook that exposes the pending state of a debounced value.

This is useful to show loading, **typing** and pending user interactions.

# Installation

**yarn**
`yarn install use-debounce-lodader`

**npm**
`npm install use-debounce-loader`

# Example

https://codesandbox.io/s/frosty-antonelli-idx3l?file=/src/App.js:36-53

**userInput.jsx**

    import React, { useState } from 'react';
    import { useDebounceLoader } from 'use-debounce-loader';
    
    export default function Input() {
      const [onChange, {
        isLoading,
        value,
      }] = useDebounceLoader()
    
      return (
        <div>
          <input
            onChange={(e) => {
              onChange(e.target.value);
            }}
          />
          <p>Text value: {value}</p>
          <p>Is typing: {isLoading}</p>
        </div>
      );
    }

# API

The useDebounceLoader returns a callback to trigger the debounce and the current state of the debounce

    useDebounceLoader: (options: Options<T>) => [
        (newValue: T) =>  void,
        {
    	    isLoading: boolean;
    	    value: T;
    	}
    ]

**onChange** `(newValue: T) =>  void`


Call this function with the value you wish to debounce. 

    const [onChange, debouncer] = useDebounceLoader()
    
    useEffect(() => {
	      onChange('First value)
     })
    
    return (
    	<input
    		onChange=(e => onChange(e.target.value)
    	/>
    )

 **isLoading** `boolean`

Whether the value is currently being debounced.

**value** `T`

The current value being debounced - this will be updated as soon as the `onChange` callback is fired.

# Optional Arguments

You can also pass a range of options to customise the behaviour of the debouncer.

    interface Options<T> {
	    debounceTime?: number;
	    initialValue?: T;
        onFinish?: (value: T) =>  void;
    }

**Example**

    const [onChange, debouncer] = useDebounceLoader({
	    debounceTime: 2000,
	    initialValue: 100,
	    onFinish,
	})

**debounceTime (Optional)** `number`

Set the time you wish to debounce in milliseconds.

Default is 1000ms - 1 second.

**initialValue (Optional)** `T`

The initialValue to set as the debounced value

**onFinish (Optional)** `(value: T) => void`

Will fire when the debouncer has resolved. This is useful to trigger data fetches or other side effects.

    const onFetchData = (search: string) => {
        // Perform some request
    }
    
    const [onChange, debouncer] = useDebounceLoader({
    	onFinish: onFetchData,
    })

Note - `debouncer.value` will be the same as the `search` 
