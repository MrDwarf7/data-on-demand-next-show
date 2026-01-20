"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ProgressPortalProps {
	children: React.ReactNode;
	containerId?: string;
	className?: string;
	style?: React.CSSProperties;
}

export const ProgressPortal = ({
	children,
	containerId = "progress-portal",
	className,
	style,
}: ProgressPortalProps) => {
	const portalRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const container = document.getElementById(containerId);
		if (container && !portalRef.current) {
			portalRef.current = document.createElement("div");
			if (className) {
				portalRef.current.className = className;
			}
			if (style) {
				Object.assign(portalRef.current.style, style);
			}
			container.appendChild(portalRef.current);
		}

		return () => {
			if (portalRef.current && container && container.contains(portalRef.current)) {
				container.removeChild(portalRef.current);
			}
		};
	}, [containerId, className, style]);

	if (!portalRef.current) return null;

	return createPortal(children, portalRef.current);
};
