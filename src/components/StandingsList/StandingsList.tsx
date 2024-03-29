import { forwardRef, useRef, useEffect, useState, useCallback } from 'react';
// import ReactVirtualizedAutoSizer from 'react-virtualized-auto-sizer';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';
// import { FixedSizeList as List } from 'react-window';

import type { ListChildComponentProps } from 'react-window';
import type { Size } from 'react-virtualized-auto-sizer';
import type { StandingsListProps } from './types';
import type { FC } from 'react';

const innerElementType = forwardRef(({ ...rest }: ListChildComponentProps, ref) => {
  // @ts-expect-error
  return <ul ref={ref} {...rest} className="divide-y divide-gray-200 dark:divide-gray-700" />;
});

export const StandingsList: FC<StandingsListProps> = ({ currentPlayerIndex, data }) => {
  console.log(data);
  const listRef = useRef(null);
  const [test, setTest] = useState(false);

  useEffect(() => {
    // this is to demonstrate a case where the rendering
    // of the variable size list is delayed for whatever
    // reason. E.g. the surrounding container dimensions
    // need to be determined first
    setTimeout(() => setTest(true), 100);
  }, []);

  useEffect(() => {
    if (listRef.current) {
      // @ts-expect-error
      listRef.current.scrollToItem(currentPlayerIndex, 'start');
    }
  }, [currentPlayerIndex, test]);

  const resetScroll = useCallback(() => {
    if (listRef.current) {
      // @ts-expect-error
      listRef.current.scrollToItem(currentPlayerIndex, 'start');
    }
  }, [currentPlayerIndex]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between align-center mb-2">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white ">
          Current placement on the ladder
        </h5>
        <button
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-xs px-3 py-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          onClick={resetScroll}
        >
          reset
        </button>
      </div>

      <div className="grow">
        <AutoSizer>
          {/* @ts-ignore */}
          {({ height, width }: Size) => {
            return (
              <List
                ref={listRef}
                innerElementType={innerElementType}
                itemData={data}
                itemCount={data.length}
                itemSize={77}
                height={height}
                width={width}
              >
                {({ data, index, style }) => {
                  return (
                    <li className="py-3 sm:py-4" key={index} style={style}>
                      <div className="flex items-center justify-between">
                        <div className="flex">
                          {data[index].placing}
                          <div className="flex-1 min-w-0 mx-2">
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                              {data[index].record.wins}-{data[index].record.losses}-
                              {data[index].record.ties}
                            </p>
                            <div className="flex justify-between">
                              <p>{data[index].name}</p>
                            </div>
                          </div>
                        </div>
                        {data[index].drop > 0 && (
                          <div className="text-red-500">
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              stroke-width="0"
                              viewBox="0 0 416 512"
                              className="shrink-0 h-5 w-5"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M272 96c26.51 0 48-21.49 48-48S298.51 0 272 0s-48 21.49-48 48 21.49 48 48 48zM113.69 317.47l-14.8 34.52H32c-17.67 0-32 14.33-32 32s14.33 32 32 32h77.45c19.25 0 36.58-11.44 44.11-29.09l8.79-20.52-10.67-6.3c-17.32-10.23-30.06-25.37-37.99-42.61zM384 223.99h-44.03l-26.06-53.25c-12.5-25.55-35.45-44.23-61.78-50.94l-71.08-21.14c-28.3-6.8-57.77-.55-80.84 17.14l-39.67 30.41c-14.03 10.75-16.69 30.83-5.92 44.86s30.84 16.66 44.86 5.92l39.69-30.41c7.67-5.89 17.44-8 25.27-6.14l14.7 4.37-37.46 87.39c-12.62 29.48-1.31 64.01 26.3 80.31l84.98 50.17-27.47 87.73c-5.28 16.86 4.11 34.81 20.97 40.09 3.19 1 6.41 1.48 9.58 1.48 13.61 0 26.23-8.77 30.52-22.45l31.64-101.06c5.91-20.77-2.89-43.08-21.64-54.39l-61.24-36.14 31.31-78.28 20.27 41.43c8 16.34 24.92 26.89 43.11 26.89H384c17.67 0 32-14.33 32-32s-14.33-31.99-32-31.99z"></path>
                            </svg>
                          </div>
                        )}
                      </div>
                    </li>
                  );
                }}
              </List>
            );
          }}
        </AutoSizer>
      </div>
    </div>
  );
};
