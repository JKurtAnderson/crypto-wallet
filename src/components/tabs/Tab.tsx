
interface TabHeader {
	icon?: JSX.Element;
	label: string;
}

interface TabProps {
	children: React.ReactNode;
	header: TabHeader;
}

export default function Tab({ children }: TabProps) {
	return <div>{children}</div>;
}