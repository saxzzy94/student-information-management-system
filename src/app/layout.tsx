import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from './providers'
import React from 'react';
import { Box, Container, ChakraProvider } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import theme from './theme';
import { createStandaloneToast } from '@chakra-ui/react'


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

const metadata: Metadata = {
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <ChakraProvider theme={theme}>
            <Box minHeight="100vh" display="flex" flexDirection="column">
              <Navbar />
              <Container maxW="container.xl" flex="1" py={8} mt="60px">
                {children}
              </Container>
            </Box>
          </ChakraProvider>
        </Providers>
      </body>
    </html>
  );
}

