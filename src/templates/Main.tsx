import React, { ReactNode } from 'react';
import Link from 'next/link';
import { Config } from '../utils/Config';
import { useSession } from 'next-auth/client'

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

export default function Main (props: IMainProps) {
  const [session, loading] = useSession();

  return (
    <div className="antialiased w-full text-gray-700">
      {props.meta}

      <div className="max-w-screen-md mx-auto">
        <div className="border-b border-gray-300">
          <div className="pt-16 pb-8">
            <div className="font-bold text-3xl text-gray-900">{Config.title}</div>
            <div className="text-xl">{Config.description}</div>
          </div>
          <div>
            <ul className="flex flex-wrap text-xl">
              <li className="mr-6">
                <Link href="/">
                  <a className="text-gray-700 border-none hover:text-gray-900">Home</a>
                </Link>
              </li>
              <li className="mr-6">
                <Link href="/about/">
                  <a className="text-gray-700 border-none hover:text-gray-900">About</a>
                </Link>
              </li>
              <li className="mr-6">
                <a
                  className="text-gray-700 border-none hover:text-gray-900"
                  href="https://github.com/victari0n/Next-js-Boilerplate"
                >
                  GitHub
                </a>
              </li>
              <li className="mr-6">
              {session ?
                <>
                  You are signed in {session.user.name}!
                </>
                : 
                <div>
                  You are not signed in! <a style={{color: 'blue'}} href="/api/auth/signin">You must sign in to access documentation!</a>
                </div>
              }
              </li>
            </ul>
          </div>
        </div>

        <div className="py-5 text-xl content">{props.children}</div>

        <div className="border-t border-gray-300 text-center py-8 text-sm">
          © Copyright
          {' '}
          {new Date().getFullYear()}
          {' '}
          {Config.title}
          . Powered with
          {' '}
          <span role="img" aria-label="Love">
            ♥
          </span>
          {' '}
          by
          {' '}
          <a href="https://giddygig.com">GiddyGig</a>
        </div>
      </div>
    </div>
  )};
