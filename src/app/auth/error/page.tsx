"use client"

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from '@/components/ui/button'

function ErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return (
    <div className="container flex h-screen flex-col items-center justify-center">
      <Alert variant="destructive" className="max-w-md">
        <AlertTitle>Authentication Error</AlertTitle>
        <AlertDescription>
          {error === 'Configuration' && 'Server configuration error'}
          {error === 'AccessDenied' && 'You do not have permission to sign in'}
          {error === 'Verification' && 'Token verification failed'}
          {error === 'OAuthSignin' && 'Error handling OAuth signin'}
          {error === 'OAuthCallback' && 'Error handling OAuth callback'}
          {error === 'OAuthCreateAccount' && 'Error creating OAuth account'}
          {error === 'Default' && 'Unknown authentication error'}
        </AlertDescription>
      </Alert>

      <Button asChild className="mt-4">
        <Link href="/auth/signin">Return to Sign In</Link>
      </Button>
    </div>
  )
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<div>Loading error information...</div>}>
      <ErrorContent />
    </Suspense>
  )
}

// Static generation config
export const dynamic = 'force-static'

export async function generateStaticParams() {
  return [
    { error: 'Configuration' },
    { error: 'AccessDenied' },
    { error: 'Verification' },
    { error: 'OAuthSignin' },
    { error: 'OAuthCallback' },
    { error: 'OAuthCreateAccount' },
    { error: 'Default' }
  ].map((e) => ({ error: [e.error] }))
}
