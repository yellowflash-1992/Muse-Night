import { useAuth } from "@/hooks/useAuth";
import { createClient } from "@/lib/supabase/client"; // <-- Import createClient
import { Link } from "@tanstack/react-router";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";

export function NotificationBell() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const supabase = createClient(); // <-- Initialize it here
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Fetch notifications
  const fetchNotifications = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("Notification")
      .select("*")
      .order("createdAt", { ascending: false })
      .limit(10);
    if (data) setNotifications(data);
  };
  // ... rest of the component stays exactly the same

  useEffect(() => {
    fetchNotifications();
    // Optional: Use Supabase Realtime here later to listen for new notifications live
  }, [user]);

  const markAsRead = async () => {
    if (unreadCount === 0) return;
    await supabase
      .from("Notification")
      .update({ isRead: true })
      .eq("userId", user?.id)
      .eq("isRead", false);
    fetchNotifications();
  };

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) markAsRead();
        }}
        className="relative p-2 rounded-full hover:bg-neon/10 text-paper transition"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white shadow-sm">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 w-80 rounded-2xl border border-neon/20 bg-ink-2 shadow-2xl p-2 z-50">
          <div className="flex items-center justify-between px-3 py-2 border-b border-neon/10">
            <span className="text-xs font-semibold text-paper uppercase tracking-widest">
              Notifications
            </span>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="text-center text-xs text-paper-faint p-4">No notifications yet.</p>
            ) : (
              notifications.map((n) => (
                <Link
                  key={n.id}
                  to={n.link || "/"}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-3 text-sm border-b border-neon/5 hover:bg-ink-3 transition ${!n.isRead ? "bg-neon/5" : ""}`}
                >
                  <p className="text-paper leading-snug">{n.message}</p>
                  <span className="text-[10px] text-paper-faint mt-1 block">
                    {new Date(n.createdAt).toLocaleDateString()}
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
