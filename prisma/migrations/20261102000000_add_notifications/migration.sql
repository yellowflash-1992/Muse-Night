CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "link" TEXT,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "Notification_userId_idx" ON "Notification"("userId");
CREATE INDEX "Notification_isRead_idx" ON "Notification"("isRead");

ALTER TABLE "Notification" ENABLE ROW LEVEL SECURITY;

-- Only the user can see their own notifications
GRANT SELECT, UPDATE ON TABLE "Notification" TO authenticated;
CREATE POLICY "user_read_own_notifications" ON "Notification" FOR SELECT TO authenticated USING (auth.uid()::text = "userId");
CREATE POLICY "user_update_own_notifications" ON "Notification" FOR UPDATE TO authenticated USING (auth.uid()::text = "userId");

NOTIFY pgrst, 'reload schema';
