import React from 'react';
import Agent from '@/components/Agent';
import { getCurrentUser } from '@/lib/actions/auth.action';

const page = async () => {
  const user = await getCurrentUser();
  return (
    <>
      <h3 className="">
        Interview Generator
        <Agent userName={user?.name} userId={user?.id} type="generate" />
      </h3>
    </>
  );
};

export default page;
