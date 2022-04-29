import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest, res: NextResponse) {
  const authPages = /\/login|\/register|\/events\/saved/;
  const securePages = /\/events\/saved|\/events\/created|\/events\/manage|\/notifications/;
  const requestPageName = req.nextUrl.pathname;
  const url = req.nextUrl.clone();

  console.log(requestPageName);

  if (requestPageName === '/') {
    url.pathname = '/events';
    return NextResponse.redirect(url);
  }

  // do not allow users to login/register if authenticated
  if (securePages.test(requestPageName) && !req.cookies['uid']) {
    url.pathname = '/events';
    return NextResponse.redirect(url);
  }

  // do not allow users to login/register if authenticated
  if (authPages.test(requestPageName) && req.cookies['uid']) {
    url.pathname = '/events';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
