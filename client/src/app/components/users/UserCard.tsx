import React from 'react';

import { User } from '@models/User';
import Form from '../generic/form/Form';
import Title from '../generic/form/Title';
import CardImage from '../generic/card/CardImage';
import Control from '../generic/form/Control';
import Check from '../generic/form/Check';

import CardImageSection from '../generic/card/CardImageSection'

import CardComponentProps from '../../types/props/CardComponentProps';


// import '../../styles/card.css';

export default function UserCard({ item, isEditing, handleCheckChange, handleTextChange, handleImageChange, handlePriceChange }: CardComponentProps<User>) {

  return (
    <div className="d-flex flex-column flex-lg-row w-100" >
      
      <CardImageSection
        imageUrl={item.imageUrl}
        handleImageChange={handleImageChange}
        isEditing={isEditing}
      >
      </CardImageSection>

      <div className="d-flex w-100">
        <div
          className="w-100 p-2 ps-3 flex-grow-1"
          style={{
            borderTopRightRadius: "15px",
            borderBottomRightRadius: "15px",
          }}
        >
          <Form isEditing={isEditing}>

            <Title title={item.name + " " + item.surname} />

            <Control
              type="text"
              itemKey={String(item.id)}
              value={item.email}
              fieldName="Email"
              isEditing={isEditing}
              handleChange={(event) => handleTextChange(event, "email")}
            />

            <Control
              type="text"
              itemKey={String(item.id)}
              value={item.role}
              fieldName="Role"
              isEditing={isEditing}
              handleChange={(event) => handleTextChange(event, "role")}
            />

          </Form>
        </div>
      </div>
    </div>
  );
}