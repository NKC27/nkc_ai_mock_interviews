import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { dummyInterviews } from '@/constants';
import InterviewCard from '@/components/InterviewCard';

const Page = () => {
  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview-Ready with AI Powered Practice & Feedback</h2>
          <p className="text-lg">
            Practice on real interview questions and get instant feedback
          </p>
          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Get Started</Link>
          </Button>
        </div>
        <Image
          src="/robot.png"
          alt="robot"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      <section className="flex flex-col mt-8 gap-6">
        <h2>Your Interviews</h2>
        <div className="interviews-section">
          {dummyInterviews.length > 0 ? (
            dummyInterviews.map((interview, index) => (
              <InterviewCard key={`your-${index}`} {...interview} />
            ))
          ) : (
            <p>You have not taken any interviews yet</p>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Take an interview</h2>
        <div className="interviews-section">
          {dummyInterviews.length > 0 ? (
            dummyInterviews.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))
          ) : (
            <p>No interviews available</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Page;
