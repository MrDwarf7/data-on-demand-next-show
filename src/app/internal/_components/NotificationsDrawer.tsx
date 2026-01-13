"use client";

import Link from "next/link";
import { useState } from "react";
import { FiCheck, FiExternalLink, FiTrash2 } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	getNotificationStyles,
	type Notification,
	SAMPLE_NOTIFICATIONS,
} from "@/config/internal/notifications-config";

export const NotificationsDrawer = () => {
	const [notifications, setNotifications] = useState<Notification[]>(SAMPLE_NOTIFICATIONS);
	const [isOpen, setIsOpen] = useState(false);

	const unreadCount = notifications.filter((n) => !n.read).length;

	const markAsRead = (id: number) => {
		setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
	};

	const markAllAsRead = () => {
		setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
	};

	const deleteNotification = (id: number) => {
		setNotifications((prev) => prev.filter((n) => n.id !== id));
	};

	const clearAll = () => {
		setNotifications([]);
	};

	return (
		<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
			<DropdownMenuTrigger asChild>
				<button
					type="button"
					className="relative p-2 rounded-lg hover:bg-accent/50 transition-colors group"
				>
					<svg
						className="w-5 h-5 text-foreground group-hover:scale-110 transition-transform"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
						/>
					</svg>
					{unreadCount > 0 && (
						<span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
					)}
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-95 sm:w-105 p-0">
				<div className="p-4 border-b border-accent">
					<div className="flex items-center justify-between mb-3">
						<h3 className="text-lg font-bold text-foreground">Notifications</h3>
						{unreadCount > 0 && (
							<span className="px-2 py-1 text-xs font-medium bg-blue-600 text-white rounded-full">
								{unreadCount} new
							</span>
						)}
					</div>

					{notifications.length > 0 && (
						<div className="flex gap-2">
							<Button
								variant="outline"
								size="sm"
								onClick={markAllAsRead}
								disabled={unreadCount === 0}
								className="flex-1 h-8"
							>
								<FiCheck className="mr-2 h-3 w-3" />
								Mark all read
							</Button>
							<Button variant="outline" size="sm" onClick={clearAll} className="flex-1 h-8">
								<FiTrash2 className="mr-2 h-3 w-3" />
								Clear all
							</Button>
						</div>
					)}
				</div>

				<ScrollArea className="max-h-125">
					{notifications.length === 0 ? (
						<div className="flex flex-col items-center justify-center py-12 px-4 text-center">
							<div className="w-16 h-16 rounded-full bg-accent/50 flex items-center justify-center mb-4">
								<svg
									className="w-8 h-8 text-muted-foreground"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
									/>
								</svg>
							</div>
							<p className="text-sm font-medium text-foreground">No notifications</p>
							<p className="text-xs text-muted-foreground mt-1">You're all caught up!</p>
						</div>
					) : (
						<div className="p-3 space-y-2">
							{notifications.map((notification) => {
								const styles = getNotificationStyles(notification.type);
								return (
									<div
										key={notification.id}
										className={`p-3 rounded-xl border transition-all ${
											notification.read
												? "bg-accent/10 border-accent/30 opacity-60"
												: `${styles.bg} ${styles.border}`
										}`}
									>
										<div className="flex gap-3">
											<div
												className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${styles.icon}`}
											>
												<span className="text-sm font-bold">
													{notification.type === "success" && "✓"}
													{notification.type === "warning" && "!"}
													{notification.type === "error" && "✕"}
													{notification.type === "info" && "i"}
												</span>
											</div>
											<div className="flex-1 min-w-0">
												<div className="flex items-start justify-between gap-2 mb-1">
													<h4 className="text-sm font-semibold text-foreground">
														{notification.title}
													</h4>
													{!notification.read && (
														<button
															type="button"
															onClick={() => markAsRead(notification.id)}
															className="p-1 hover:bg-accent/50 rounded transition-colors shrink-0"
															title="Mark as read"
														>
															<FiCheck className="w-3 h-3 text-muted-foreground" />
														</button>
													)}
												</div>
												<p className="text-xs text-muted-foreground mb-2 leading-relaxed">
													{notification.message}
												</p>
												<div className="flex items-center justify-between">
													<span className="text-xs text-muted-foreground">
														{notification.timestamp}
													</span>
													<div className="flex items-center gap-2">
														{notification.actionLink && (
															<Link
																href={notification.actionLink}
																onClick={() => setIsOpen(false)}
																className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
															>
																View
																<FiExternalLink className="w-3 h-3" />
															</Link>
														)}
														<button
															type="button"
															onClick={() => deleteNotification(notification.id)}
															className="p-1 hover:bg-accent/50 rounded transition-colors"
															title="Delete"
														>
															<FiTrash2 className="w-3 h-3 text-muted-foreground" />
														</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					)}
				</ScrollArea>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
