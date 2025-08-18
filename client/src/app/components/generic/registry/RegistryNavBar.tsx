import React, { useState } from 'react';

import Navbar from 'react-bootstrap/Navbar';

import { Search } from 'lucide-react';


import Form from 'react-bootstrap/Form';
import IconButton from '../button/IconButton';

type RegistryNavBarProps = {
  searchTerm: boolean;
  setSearchTerm: () => void;
  showFilters?: boolean;
  setShowFilters?: () => void;
  renderCreationModal: (visible: boolean, close: () => void) => React.ReactNode;
};

export default function RegistryNavBar({ searchTerm, setSearchTerm, showFilters, setShowFilters, renderCreationModal }: RegistryNavBarProps) {

  const [showCreationModal, setShowCreationModal] = useState(false);

  function handleFiltersClick() {
    setShowFilters(!showFilters)
  }

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  function handleCreationModalClick() {
    setShowCreationModal(true);
  }

  function creationModalClose() {
    setShowCreationModal(false);
  }

  return (
    <>
      
      {renderCreationModal(showCreationModal, creationModalClose)}

      <Navbar bg="transparent" data-bs-theme="light" className="d-flex justify-content-center p-0" > 
        <div className="d-flex align-items-center justify-content-between" style={{ width: '100%' }}>
          <div
            className="d-flex align-items-center gap-2 me-2"
            style={{
              width: '100%',
            }}
          >
            {showFilters && (
              <IconButton
                variant={"outline-secondary"}
                iconName="SlidersHorizontal" 
                color="rgb(89, 92, 94)"
                onClick={handleFiltersClick}
              />
            )}
            
            
            <Form className="d-flex" style={{ width: '100%', maxWidth: '600px' }}>
              <div
                className="d-flex align-items-center bg-white border px-2 gap-2 shadow-sm"
                style={{
                  width: "100%",
                  borderRadius: '10px'
                }}
              >
                <Search size={20} className="text-muted" color="rgb(89, 92, 94)" strokeWidth={1}/>
                <Form.Control
                  type="search"
                  placeholder="Search..."
                  className="p-0 py-1 m-0 shadow-none flex-grow-1 border-0"
                  aria-label="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </Form>

            <Form className="d-flex" style={{ width: '100%', maxWidth: '200px' }}>
              <div
                className="d-flex align-items-center bg-white border px-2 gap-2 shadow-sm"
                style={{
                  width: "100%",
                  borderRadius: '10px'
                }}
              >
                <Form.Select
                  className="p-0 py-1 m-0 shadow-none flex-grow-1 border-0"

                >
                  <option>Alphabetical Asc</option>
                  <option>Alphabetical Desc</option>
                </Form.Select>
                {/* <Form.Control
                  type="search"
                  placeholder="Search..."
                  className="p-0 py-1 m-0 shadow-none flex-grow-1 border-0"
                  aria-label="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                /> */}
              </div>
            </Form>


          </div>
            
          <IconButton variant="secondary" iconName="Plus" onClick={handleCreationModalClick} />

        </div>
      </Navbar>
    </>
  );
}