import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
	return (
		<Link
			className="select-none no-underline"
			href="https://github.com/tectrixdev/unplayit"
			title="repo"
			draggable={false}
		>
			<footer className="w-full bg-black/75 backdrop-blur-lg p-4 text-center font-bold text-white fixed bottom-0">
				<p>
					&copy; {new Date().getFullYear()} Joran Hennion. All rights reserved.
					This site is open source! click here to view the source.
				</p>
			</footer>
		</Link>
	);
};

export default Footer;
