'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import FormField from './FormField';

import Link from 'next/link';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

// const formSchema = z.object({
//   username: z.string().min(2).max(50),
// });

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(8),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === 'sign-up') {
        toast.success('Account created successfully');
        router.push('/sign-in');
        console.log('Sign Up', values);
      } else {
        toast.success('Sign in successful');
        router.push('/');
        console.log('Sign In', values);
      }
    } catch (error) {
      console.log('Error:', error);
      toast.error(`There was an error`);
    }
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const isSignIn = type === 'sign-in';
  // Return the form JSX from the component
  return (
    <div className="card-dash-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row justify-center ">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">Interview Prep</h2>
        </div>
        <h3>Practice for job interviews with AI</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name"
                type="text"
              />
            )}

            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your email address"
              type="email"
            />

            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />

            <Button className="btn" type="submit">
              {isSignIn ? 'Sign In' : 'Create an Account'}
            </Button>
          </form>
        </Form>
        <p className="text-center">
          {isSignIn ? 'Don’t have an account?' : 'Already have an account?'}
          <Link
            href={!isSignIn ? '/sign-in' : '/sign-up'}
            className="font-bold text-user-primary ml-1 "
          >
            {!isSignIn ? 'Sign In' : 'Sign Up'}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
