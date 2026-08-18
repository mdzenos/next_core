"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import {
  matrix,
  MatrixMessage,
} from "@/lib/matrix";

export default function MatrixTestPage() {
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [userId, setUserId] = useState("");
  const [syncState, setSyncState] = useState("");

  const [roomInput, setRoomInput] = useState("");
  const [roomId, setRoomId] = useState("");

  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<MatrixMessage[]>([]);

  const [error, setError] = useState("");

  useEffect(() => {
    if (!started) return;

    const unsubscribeMessage = matrix.onMessage(
      (message) => {
        setMessages((current) => {
          if (
            current.some(
              (item) =>
                item.eventId === message.eventId,
            )
          ) {
            return current;
          }

          return [...current, message];
        });
      },
    );

    const unsubscribeSync = matrix.onSync(
      (state) => {
        setSyncState(state);
      },
    );

    return () => {
      unsubscribeMessage();
      unsubscribeSync();
    };
  }, [started]);

  async function startGuest() {
    try {
      setLoading(true);
      setError("");

      const client =
        await matrix.startAsGuest();

      setUserId(
        client.getUserId() ?? "",
      );

      setSyncState(
        client.getSyncState() ?? "",
      );

      setStarted(true);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Không thể tạo tài khoản Guest",
      );
    } finally {
      setLoading(false);
    }
  }

  async function joinRoom(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const value = roomInput.trim();

    if (!value) return;

    try {
      setError("");

      const room =
        await matrix.joinRoom(value);

      setRoomId(room.roomId);
      setRoomInput("");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Không thể tham gia room",
      );
    }
  }

  async function sendMessage(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const body = messageInput.trim();

    if (!roomId || !body) return;

    try {
      setError("");

      await matrix.sendMessage(
        roomId,
        body,
      );

      setMessageInput("");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Không thể gửi tin nhắn",
      );
    }
  }

  async function logout() {
    try {
      await matrix.logout();
    } catch {
      // Ignore logout errors.
    } finally {
      setStarted(false);
      setUserId("");
      setSyncState("");
      setRoomId("");
      setMessages([]);
      setError("");
    }
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-bold">
        Matrix Guest Chat
      </h1>

      {!started && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-semibold">
              Hỗ trợ khách hàng
            </h2>

            <p className="mt-2 text-gray-600">
              Bạn có muốn bắt đầu phiên hỗ
              trợ với nhân viên?
            </p>

            {error && (
              <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="button"
              onClick={startGuest}
              disabled={loading}
              className="mt-5 w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white disabled:opacity-50"
            >
              {loading
                ? "Đang kết nối..."
                : "Bắt đầu hỗ trợ"}
            </button>
          </div>
        </div>
      )}

      {started && (
        <>
          <section className="mt-6 rounded-lg border p-4">
            <div>
              <strong>User:</strong>{" "}
              {userId}
            </div>

            <div className="mt-1">
              <strong>Sync:</strong>{" "}
              {syncState}
            </div>

            <button
              type="button"
              onClick={logout}
              className="mt-3 rounded-lg border px-4 py-2"
            >
              Kết thúc
            </button>
          </section>

          <form
            onSubmit={joinRoom}
            className="mt-6 flex gap-2"
          >
            <input
              value={roomInput}
              onChange={(event) =>
                setRoomInput(
                  event.target.value,
                )
              }
              placeholder="Room ID hoặc alias"
              className="flex-1 rounded-lg border px-3 py-2"
            />

            <button
              type="submit"
              className="rounded-lg bg-black px-4 py-2 text-white"
            >
              Tham gia
            </button>
          </form>

          {roomId && (
            <section className="mt-6">
              <div className="mb-3 font-medium">
                Room: {roomId}
              </div>

              <div className="h-96 overflow-y-auto rounded-lg border p-4">
                {messages
                  .filter(
                    (message) =>
                      message.roomId ===
                      roomId,
                  )
                  .map((message) => {
                    const own =
                      message.sender ===
                      userId;

                    return (
                      <div
                        key={message.eventId}
                        className={`mb-3 flex ${
                          own
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div className="max-w-[75%] rounded-lg bg-gray-100 px-3 py-2">
                          {!own && (
                            <div className="mb-1 text-xs font-medium text-gray-500">
                              {message.sender}
                            </div>
                          )}

                          <div>
                            {message.body}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>

              <form
                onSubmit={sendMessage}
                className="mt-3 flex gap-2"
              >
                <input
                  value={messageInput}
                  onChange={(event) =>
                    setMessageInput(
                      event.target.value,
                    )
                  }
                  placeholder="Nhập tin nhắn..."
                  className="flex-1 rounded-lg border px-3 py-2"
                />

                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-5 py-2 text-white"
                >
                  Gửi
                </button>
              </form>
            </section>
          )}

          {error && (
            <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}
        </>
      )}
    </main>
  );
}
