import React from 'react';

type FiltersProps = {
  showFilters: boolean;
  children: React.ReactNode;
};

export default function FiltersContainer({ showFilters, children }: FiltersProps) {
  return (
    <div
      className="p-3"
      style={{ height: '100%' }}
    >
      <p className="m-0">Filters:</p>
      <div className="d-flex gap-5">
        {children}
      </div>
    </div>
  );
}