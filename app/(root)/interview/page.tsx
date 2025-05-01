import React from 'react';
import Agent from '@/components/Agent';

const page = () => {
  return (
    <>
      <h3 className="">
        Interview Generator
        <Agent userName="You" userId="user1" type="generate" />
      </h3>
    </>
  );
};

export default page;
