import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Viewport } from "next";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Unplayit",
	description: "The perfect solution to random ports and long ips",
	generator: "Next.js",
	applicationName: "Unplayit",
	keywords: [
		"playit gg",
		"minecraft",
		"playit minecraft",
		"unplayit",
		"Unplayit",
		"Unplayit gg",
	],
	robots: "index, follow",
	alternates: {
		canonical: "https://unplayit.tectrix.dev",
	},
	authors: [{ name: "Joran Hennion" }],
	creator: "Joran Hennion",
	publisher: "Joran Hennion",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	metadataBase: new URL("https://unplayit.tectrix.dev"),
};

export const viewport: Viewport = {
	colorScheme: "dark",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
