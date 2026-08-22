"use client";

import { ChatMessage, matrix } from "@/lib/matrix";
import { FormEvent, useEffect, useRef, useState } from "react";

const MATRIX_BASE_URL = process.env.NEXT_PUBLIC_MATRIX_BASE_URL?.replace(/\/+$/, "");
const SUPPORT_SPACE_ID = process.env.NEXT_PUBLIC_SPACE_ID;
const CUSTOMER_STORAGE_KEY = "vnpost_support_customer";

type Step = "closed" | "welcome" | "customer" | "connecting" | "waiting" | "chat";

export default function SupportWidget() {
  const [step, setStep] = useState<Step>("closed");
  const [minimized, setMinimized] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [userId, setUserId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [error, setError] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);
  const [mediaUrls, setMediaUrls] = useState<Record<string, string>>({});
  const [sendingMedia, setSendingMedia] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);
  const mediaUrlsRef = useRef<Record<string, string>>({});
  const hasSupportSession = step === "connecting" || step === "waiting" || step === "chat";

  useEffect(() => {
    try {
      const value = localStorage.getItem(CUSTOMER_STORAGE_KEY);
      if (!value) return;
      const customer = JSON.parse(value);
      setFullName(customer.fullName ?? "");
      setPhone(customer.phone ?? "");
    } catch (error) {
      console.error("[Support] Load customer failed:", error);
    }
  }, []);

  useEffect(() => {
    const unsubscribeSync = matrix.onSync((state) => {
      console.log("[FE] Sync state:", state);
      if (state !== "PREPARED") return;

      const rooms = matrix.getJoinedRooms();
      console.log("[FE] Joined rooms:", rooms.map((room) => room.roomId));
      if (rooms.length === 0) return;

      const room = rooms[0];
      setRoomId(room.roomId);
      setStep("chat");
      setMessages(matrix.getRoomMessages(room.roomId));
    });

    const unsubscribeRoom = matrix.onRoom((room) => {
      console.log("[FE] Room:", { roomId: room.roomId, membership: room.getMyMembership() });
      if (room.getMyMembership() !== "join") return;

      setRoomId(room.roomId);
      setMessages(matrix.getRoomMessages(room.roomId));
      setStep("chat");
    });

    const unsubscribeMessage = matrix.onMessage((message) => {
      console.log("[FE] Message:", message);

      setMessages((current) => current.some((item) => item.eventId === message.eventId) ? current : [...current, message]);

      if (message.sender !== matrix.getUserId() && minimized) {
        setUnreadCount((current) => current + 1);
      }

      setStep("chat");
    });

    return () => {
      unsubscribeSync();
      unsubscribeRoom();
      unsubscribeMessage();
    };
  }, [minimized]);

  useEffect(() => {
    const element = messagesRef.current;
    if (!element) return;
    element.scrollTop = element.scrollHeight;
  }, [messages]);

  useEffect(() => {
    let cancelled = false;

    async function loadMedia() {
      const mediaMessages = messages.filter((message) => message.type !== "text" && message.url);

      for (const message of mediaMessages) {
        if (!message.url || mediaUrlsRef.current[message.eventId]) continue;

        try {
          const blobUrl = await matrix.getMediaBlob(message.url);

          if (cancelled) {
            URL.revokeObjectURL(blobUrl);
            return;
          }

          mediaUrlsRef.current[message.eventId] = blobUrl;
          setMediaUrls((current) => ({ ...current, [message.eventId]: blobUrl }));
        } catch (error) {
          console.error("[FE] Load media failed:", { eventId: message.eventId, url: message.url, error });
        }
      }
    }

    void loadMedia();

    return () => {
      cancelled = true;
    };
  }, [messages]);

  useEffect(() => {
    return () => {
      Object.values(mediaUrlsRef.current).forEach((url) => URL.revokeObjectURL(url));
      mediaUrlsRef.current = {};
    };
  }, []);

  function openWidget() {
    setError("");
    setMinimized(false);
    setUnreadCount(0);
    if (hasSupportSession) return;
    setStep("welcome");
  }

  function minimizeWidget() {
    setError("");
    setMinimized(true);
  }

  function openMinimizedWidget() {
    setMinimized(false);
    setUnreadCount(0);
  }

  function openCustomerForm() {
    setError("");
    setMinimized(false);
    setUnreadCount(0);
    setStep("customer");
  }

  async function startSupport(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = fullName.trim();
    const phoneNumber = phone.trim();

    if (!name) {
      setError("Vui lòng nhập họ tên.");
      return;
    }

    if (!phoneNumber) {
      setError("Vui lòng nhập số điện thoại.");
      return;
    }

    if (!MATRIX_BASE_URL) {
      setError("Thiếu NEXT_PUBLIC_MATRIX_BASE_URL.");
      return;
    }

    if (!SUPPORT_SPACE_ID) {
      setError("Thiếu NEXT_PUBLIC_SPACE_ID.");
      return;
    }

    try {
      setError("");
      setMinimized(false);
      setUnreadCount(0);

      localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify({ fullName: name, phone: phoneNumber }));
      setStep("connecting");
      setMessages([]);
      setRoomId("");

      const client = await matrix.startAsGuest();
      const currentUserId = client.getUserId();

      if (!currentUserId) throw new Error("Không lấy được Matrix user ID.");

      setUserId(currentUserId);

      const supportUrl = `${MATRIX_BASE_URL}/_synapse/client/vnpost_support/request`;
      const supportBody = { fullName: name, phone: phoneNumber, guestUserId: currentUserId, spaceId: SUPPORT_SPACE_ID };

      console.log("[FE] Support request:", { url: supportUrl, ...supportBody });

      const response = await fetch(supportUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(supportBody),
      });

      const result = await response.json().catch(() => ({}));

      console.log("[FE] Support API:", { status: response.status, result });

      if (!response.ok || !result.success) {
        throw new Error(result.message ?? "Không thể tạo yêu cầu hỗ trợ.");
      }

      if (result.roomId) setRoomId(result.roomId);

      setStep("waiting");
    } catch (error) {
      console.error("[FE] Start support failed:", error);
      matrix.stop();
      setError(error instanceof Error ? error.message : "Không thể bắt đầu hỗ trợ.");
      setStep("customer");
    }
  }

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const body = messageInput.trim();

    if (!body) return;

    if (!roomId) {
      setError("Chưa có phòng chat.");
      return;
    }

    try {
      setError("");
      await matrix.sendMessage(roomId, body);
      setMessageInput("");
    } catch (error) {
      console.error("[FE] Send message failed:", error);
      setError(error instanceof Error ? error.message : "Không thể gửi tin nhắn.");
    }
  }

  async function sendMedia(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    if (!roomId) {
      setError("Chưa có phòng chat.");
      return;
    }

    try {
      setError("");
      setSendingMedia(true);
      await matrix.uploadMedia(roomId, file);
    } catch (error) {
      console.error("[FE] Upload media failed:", error);
      setError(error instanceof Error ? error.message : "Không thể gửi media.");
    } finally {
      setSendingMedia(false);
    }
  }

  async function closeSupport() {
    const name = fullName.trim();
    const phoneNumber = phone.trim();
    const closingUserId = userId || matrix.getUserId() || "";

    if (!MATRIX_BASE_URL || !SUPPORT_SPACE_ID || !closingUserId) {
      console.error("[FE] Cannot close support:", {
        hasMatrixBaseUrl: Boolean(MATRIX_BASE_URL),
        hasSpaceId: Boolean(SUPPORT_SPACE_ID),
        guestUserId: closingUserId,
      });
      endChat();
      return;
    }

    const closeUrl = `${MATRIX_BASE_URL}/_synapse/client/vnpost_support/request`;
    const closeBody = {
      fullName: name,
      phone: phoneNumber,
      guestUserId: closingUserId,
      spaceId: SUPPORT_SPACE_ID,
      action: "close",
    };

    console.log("[FE] Close support request:", { url: closeUrl, ...closeBody });

    try {
      const response = await fetch(closeUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(closeBody),
      });

      const result = await response.json().catch(() => ({}));

      console.log("[FE] Close support API:", { status: response.status, result });

      if (!response.ok || !result.success) {
        console.error("[FE] Close support API failed:", result);
      }
    } catch (error) {
      console.error("[FE] Close support request failed:", error);
    } finally {
      endChat();
    }
  }

  function endChat() {
    matrix.logout();

    Object.values(mediaUrlsRef.current).forEach((url) => URL.revokeObjectURL(url));
    mediaUrlsRef.current = {};

    setUserId("");
    setRoomId("");
    setMessages([]);
    setMessageInput("");
    setError("");
    setUnreadCount(0);
    setMediaUrls({});
    setSendingMedia(false);
    setMinimized(false);
    setStep("closed");
  }

  function renderMedia(message: ChatMessage) {
    const mediaUrl = mediaUrls[message.eventId];

    if (!mediaUrl) {
      return <div className="flex min-h-24 min-w-32 items-center justify-center rounded-xl bg-gray-100 px-4 text-xs text-gray-400">Đang tải...</div>;
    }

    if (message.type === "image") return <img src={mediaUrl} alt={message.filename ?? "Ảnh"} className="max-h-72 max-w-full rounded-xl object-contain" />;
    if (message.type === "video") return <video src={mediaUrl} controls className="max-h-72 max-w-full rounded-xl" />;
    if (message.type === "audio") return <audio src={mediaUrl} controls className="max-w-full" />;

    return <a href={mediaUrl} download={message.filename ?? "file"} className="block rounded-xl bg-gray-100 px-4 py-3 text-sm text-blue-600 hover:bg-gray-200">Tải {message.filename ?? "tệp"}</a>;
  }

  if (step === "closed") {
    return <button type="button" onClick={openWidget} aria-label="Hỗ trợ khách hàng" className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-2xl text-white shadow-xl transition hover:scale-105 hover:bg-blue-700">💬</button>;
  }

  if (minimized) {
    return (
      <button type="button" onClick={openMinimizedWidget} aria-label="Mở lại cuộc trò chuyện" className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-2xl text-white shadow-xl transition hover:scale-105 hover:bg-blue-700">
        <span className="relative">
          💬
          {unreadCount > 0 && <span className="absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white shadow">{unreadCount > 99 ? "99+" : unreadCount}</span>}
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[calc(100vw-32px)] max-w-[400px] overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10">
      <div className="flex h-16 items-center justify-between bg-blue-600 px-4 text-white">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">💬</div>
          <div>
            <div className="font-semibold">Hỗ trợ khách hàng</div>
            <div className="text-xs text-blue-100">{step === "chat" ? "Đang trò chuyện" : hasSupportSession ? "Đang chờ hỗ trợ" : "Vietnam Post"}</div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button type="button" onClick={minimizeWidget} aria-label="Thu nhỏ cuộc trò chuyện" className="flex h-8 w-8 items-center justify-center rounded-full text-xl hover:bg-white/20">−</button>
          <button type="button" onClick={closeSupport} aria-label="Kết thúc hỗ trợ" className="flex h-8 w-8 items-center justify-center rounded-full text-xl hover:bg-white/20">×</button>
        </div>
      </div>

      {step === "welcome" && (
        <div className="p-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-2xl">👋</div>
          <h2 className="mt-4 text-lg font-semibold">Xin chào!</h2>
          <p className="mt-2 text-sm leading-6 text-gray-500">Bạn cần hỗ trợ? Hãy bắt đầu cuộc trò chuyện với nhân viên Vietnam Post.</p>
          <button type="button" onClick={openCustomerForm} className="mt-5 w-full rounded-xl bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700">Bắt đầu hỗ trợ</button>
        </div>
      )}

      {step === "customer" && (
        <form onSubmit={startSupport} className="p-5">
          <h2 className="text-lg font-semibold">Thông tin khách hàng</h2>

          <div className="mt-5">
            <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-gray-700">Họ và tên</label>
            <input id="fullName" type="text" value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="Nguyễn Văn A" autoFocus className="w-full rounded-xl border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500" />
          </div>

          <div className="mt-4">
            <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-gray-700">Số điện thoại</label>
            <input id="phone" type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="0981234567" className="w-full rounded-xl border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500" />
          </div>

          {error && <div className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</div>}

          <button type="submit" className="mt-5 w-full rounded-xl bg-blue-600 px-4 py-3 font-medium text-white">Bắt đầu</button>
        </form>
      )}

      {step === "connecting" && (
        <div className="flex min-h-[300px] flex-col items-center justify-center p-6 text-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
          <div className="mt-5 font-medium">Đang kết nối...</div>
          <div className="mt-2 text-sm text-gray-500">Đang khởi tạo phiên Guest.</div>
        </div>
      )}

      {step === "waiting" && (
        <div className="flex min-h-[320px] flex-col items-center justify-center p-6 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-3xl">👨‍💼</div>
          <p className="mt-2 text-sm leading-6 text-gray-500">Yêu cầu hỗ trợ đã được tiếp nhận.<br />Bạn có thể gửi tin nhắn ngay khi<br />phòng chat sẵn sàng.</p>
          <div className="mt-5 flex items-center gap-2 text-xs text-gray-400"><span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />Đang khởi tạo phòng chat...</div>
        </div>
      )}

      {step === "chat" && (
        <>
          <div ref={messagesRef} className="h-[390px] overflow-y-auto bg-gray-50 p-4">
            {messages.length === 0 ? (
              <div className="flex h-full items-center justify-center text-center text-sm text-gray-400">
                <div>
                  <div className="text-2xl">👋</div>
                  <div className="mt-2">Phòng chat đã sẵn sàng.</div>
                  <div className="mt-1">Hãy gửi tin nhắn.</div>
                </div>
              </div>
            ) : (
              messages.map((message) => {
                const own = message.sender === userId;

                return (
                  <div key={message.eventId} className={`mb-3 flex ${own ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm ${own ? "rounded-br-md bg-blue-600 text-white" : "rounded-bl-md bg-white text-gray-900 shadow-sm"}`}>
                      {!own && <div className="mb-1 text-xs font-medium text-gray-500">Nhân viên</div>}
                      {message.type === "text" ? message.body : renderMedia(message)}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {error && <div className="border-t bg-red-50 px-3 py-2 text-xs text-red-600">{error}</div>}

          <form onSubmit={sendMessage} className="flex gap-2 border-t bg-white p-3">
            <input value={messageInput} onChange={(event) => setMessageInput(event.target.value)} placeholder={sendingMedia ? "Đang gửi file..." : "Nhập tin nhắn..."} disabled={sendingMedia} className="min-w-0 flex-1 rounded-xl border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 disabled:bg-gray-100" />
            <button type="submit" disabled={!messageInput.trim() || sendingMedia} className="rounded-xl bg-blue-600 px-4 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50">Gửi</button>
          </form>
        </>
      )}
    </div>
  );
}
