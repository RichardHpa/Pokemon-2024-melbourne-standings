import { forwardRef, useRef, useEffect, useState } from 'react';
// import ReactVirtualizedAutoSizer from 'react-virtualized-auto-sizer';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';
// import { FixedSizeList as List } from 'react-window';

import type { ListChildComponentProps } from 'react-window';
import type { Size } from 'react-virtualized-auto-sizer';
import type { StandingsListProps } from './types';
import type { FC } from 'react';

const innerElementType = forwardRef(({ ...rest }: ListChildComponentProps, ref) => {
  console.log('ref', ref);
  // @ts-expect-error
  return <ul ref={ref} {...rest} className="divide-y divide-gray-200 dark:divide-gray-700" />;
});

export const StandingsList: FC<StandingsListProps> = ({ currentPlayerIndex, data }) => {
  const listRef = useRef(null);
  const [test, setTest] = useState(false);

  console.log('render', test, listRef.current);

  useEffect(() => {
    // this is to demonstrate a case where the rendering
    // of the variable size list is delayed for whatever
    // reason. E.g. the surrounding container dimensions
    // need to be determined first
    setTimeout(() => setTest(true), 100);
  }, []);

  useEffect(() => {
    console.log('effect', listRef.current);
    if (listRef.current) {
      // @ts-expect-error
      listRef.current.scrollToItem(currentPlayerIndex, 'start');
    }
  }, [currentPlayerIndex, test]);

  return (
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
                      <div className="flex-1 min-w-0 ms-4">
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
  );
};
