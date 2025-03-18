"use client"

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from '@/components/ui/button'

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  useEffect(() => {
    // Log the error to your error tracking service
    if (error) console.error('Authentication Error:', error)
  }, [error])

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

