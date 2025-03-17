# Lost & Found Portal

A comprehensive web application for reporting and finding lost items, built with Next.js 15, MongoDB, and Auth.js with Google OAuth.

![Lost & Found Portal](https://placeholder.svg?height=400&width=800&text=Lost+%26+Found+Portal)

## Features

- **User Authentication**
  - Google OAuth integration
  - User roles (regular users and administrators)

- **Item Management**
  - Report lost items with detailed descriptions
  - Report found items with detailed descriptions
  - Browse lost and found items with filtering options
  - View detailed information about items
  - Track your own reported items

- **Matching System**
  - Automatic matching of lost and found items based on descriptions
  - View potential matches for your items
  - Contact item reporters through provided contact information

- **Admin Dashboard**
  - Manage all reported items
  - Remove spam or inappropriate content
  - Resolve matched items
  - View statistics about the platform

- **Responsive Design**
  - Works on mobile, tablet, and desktop devices
  - Clean and modern UI using shadcn/ui components

## Tech Stack

- **Frontend**
  - Next.js 15 (App Router)
  - React
  - Tailwind CSS
  - shadcn/ui components
  - Sonner for toast notifications

- **Backend**
  - Next.js API Routes
  - MongoDB with Mongoose ODM
  - Auth.js v5 for authentication

- **Authentication**
  - Google OAuth

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- MongoDB database (local or Atlas)
- Google OAuth credentials (for authentication)

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

