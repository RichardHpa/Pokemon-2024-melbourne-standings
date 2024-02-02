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
    <>
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
              {({ data, index, style, ...rest2 }) => {
                return (
                  <li className="py-3 sm:py-4" key={index} style={style}>
                    <div className="flex items-center">
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
                    </div>
                  </li>
                );
              }}
            </List>
          );
        }}
      </AutoSizer>
    </>
  );
};
