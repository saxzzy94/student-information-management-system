import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from './providers'
import React from 'react';
import { Box, Container } from '@chakra-ui/react';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Student Information Management System",
  description: "Manage student information efficiently",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}>
        <Providers>
          <Box minHeight="100vh" display="flex" flexDirection="column">
            <Container maxW="container.xl" flex="1" py={8}>
              {children}
            </Container>
          </Box>
        </Providers>
      </body>
    </html>
  );
}
