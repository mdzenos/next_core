import type { MatrixClient, Room } from "matrix-js-sdk";
import { ClientEvent, createClient, RoomEvent } from "matrix-js-sdk";

const MATRIX_BASE_URL = process.env.NEXT_PUBLIC_MATRIX_BASE_URL?.replace(/\/+$/, "");

if (!MATRIX_BASE_URL) {
  throw new Error("Missing NEXT_PUBLIC_MATRIX_BASE_URL");
}

export interface MatrixSession {
  userId: string;
  accessToken: string;
  deviceId?: string;
}

export type ChatMessageType = "text" | "image" | "video" | "audio" | "file";

export interface ChatMessage {
  eventId: string;
  roomId: string;
  sender: string;
  body: string;
  timestamp: number;
  type: ChatMessageType;
  url?: string;
  filename?: string;
  mimetype?: string;
  size?: number;
}

type SyncListener = (state: string, previousState?: string) => void;
type RoomListener = (room: Room) => void;
type MessageListener = (message: ChatMessage) => void;

class MatrixService {
  private client: MatrixClient | null = null;
  private roomListeners = new Set<RoomListener>();
  private messageListeners = new Set<MessageListener>();
  private syncListeners = new Set<SyncListener>();
  private emittedRooms = new Set<string>();
  private emittedMessages = new Set<string>();
  private creatingGuest = false;

  private async createGuest(): Promise<MatrixSession> {
    console.log("[Matrix] Creating guest...");

    const response = await fetch(`${MATRIX_BASE_URL}/_matrix/client/v3/register?kind=guest`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });

    const data = await response.json().catch(() => ({}));

    console.log("[Matrix] Guest response:", response.status, {
      user_id: data.user_id,
      device_id: data.device_id,
      has_access_token: Boolean(data.access_token),
    });

    if (!response.ok) {
      throw new Error(`Create guest failed: ${response.status} ${JSON.stringify(data)}`);
    }

    if (!data.user_id || !data.access_token) {
      throw new Error("Synapse không trả về user_id hoặc access_token.");
    }

    return {
      userId: data.user_id,
      accessToken: data.access_token,
      deviceId: data.device_id,
    };
  }

  private createMatrixClient(session: MatrixSession): MatrixClient {
    const client = createClient({
      baseUrl: MATRIX_BASE_URL,
      userId: session.userId,
      accessToken: session.accessToken,
      deviceId: session.deviceId,
    });

    client.setGuest(true);

    if (!client.isGuest()) {
      throw new Error("matrix-js-sdk không nhận diện client là Guest.");
    }

    this.registerEvents(client);

    return client;
  }

  private registerEvents(client: MatrixClient) {
    client.on(ClientEvent.Sync, (state, previousState, data) => {
      console.log("[Matrix] SYNC:", {
        state,
        previousState,
        nextBatch: data?.next_batch,
      });

      this.emitSync(state, previousState);

      if (state === "PREPARED") {
        this.emitJoinedRooms();
      }
    });

    client.on(ClientEvent.SyncUnexpectedError, (error) => {
      console.error("[Matrix] Sync unexpected error:", error);
    });

    client.on(ClientEvent.Room, (room) => {
      console.log("[Matrix] ROOM:", {
        roomId: room.roomId,
        membership: room.getMyMembership(),
      });

      this.handleRoom(room);
    });

    client.on(RoomEvent.MyMembership, (room, membership, previousMembership) => {
      console.log("[Matrix] MY MEMBERSHIP:", {
        roomId: room.roomId,
        membership,
        previousMembership,
      });

      if (membership === "invite") {
        void this.handleInvite(room);
      }

      if (membership === "join") {
        this.handleRoom(room);
      }
    });

    client.on(ClientEvent.Event, (event) => {
      if (event.getType() !== "m.room.member") {
        return;
      }

      console.log("[Matrix] MEMBER EVENT:", {
        roomId: event.getRoomId(),
        sender: event.getSender(),
        stateKey: event.getStateKey(),
        membership: event.getContent()?.membership,
      });
    });

    client.on(RoomEvent.Timeline, (event, room, toStartOfTimeline) => {
      if (toStartOfTimeline || !room) {
        return;
      }

      const message = this.parseMessage(event, room);

      if (!message) {
        return;
      }

      this.emitMessage(message);
    });
  }

  private parseMessage(event: any, room: Room): ChatMessage | null {
    if (event.getType() !== "m.room.message") {
      return null;
    }

    const content = event.getContent();
    const eventId = event.getId();

    if (!eventId || !content) {
      return null;
    }

    const sender = event.getSender() ?? "";
    const timestamp = event.getTs();

    if (content.msgtype === "m.text") {
      return {
        eventId,
        roomId: room.roomId,
        sender,
        body: content.body ?? "",
        timestamp,
        type: "text",
      };
    }

    if (content.msgtype === "m.image") {
      return {
        eventId,
        roomId: room.roomId,
        sender,
        body: content.body ?? "Ảnh",
        timestamp,
        type: "image",
        url: content.url,
        filename: content.body,
        mimetype: content.info?.mimetype,
        size: content.info?.size,
      };
    }

    if (content.msgtype === "m.video") {
      return {
        eventId,
        roomId: room.roomId,
        sender,
        body: content.body ?? "Video",
        timestamp,
        type: "video",
        url: content.url,
        filename: content.body,
        mimetype: content.info?.mimetype,
        size: content.info?.size,
      };
    }

    if (content.msgtype === "m.audio") {
      return {
        eventId,
        roomId: room.roomId,
        sender,
        body: content.body ?? "Âm thanh",
        timestamp,
        type: "audio",
        url: content.url,
        filename: content.body,
        mimetype: content.info?.mimetype,
        size: content.info?.size,
      };
    }

    if (content.msgtype === "m.file") {
      return {
        eventId,
        roomId: room.roomId,
        sender,
        body: content.body ?? "Tệp",
        timestamp,
        type: "file",
        url: content.url,
        filename: content.filename ?? content.body,
        mimetype: content.info?.mimetype,
        size: content.info?.size,
      };
    }

    return null;
  }

  private handleRoom(room: Room) {
    if (room.getMyMembership() !== "join") {
      return;
    }

    if (this.emittedRooms.has(room.roomId)) {
      return;
    }

    this.emittedRooms.add(room.roomId);

    console.log("[Matrix] JOINED ROOM:", room.roomId);

    this.roomListeners.forEach((listener) => {
      try {
        listener(room);
      } catch (error) {
        console.error("[Matrix] Room listener error:", error);
      }
    });
  }

  private emitJoinedRooms() {
    if (!this.client) {
      return;
    }

    const rooms = this.client.getRooms();

    console.log(
      "[Matrix] All SDK rooms:",
      rooms.map((room) => ({
        roomId: room.roomId,
        membership: room.getMyMembership(),
      })),
    );

    for (const room of rooms) {
      this.handleRoom(room);
    }
  }

  private async handleInvite(room: Room) {
    if (!this.client) {
      return;
    }

    const membership = room.getMyMembership();

    if (membership === "join") {
      this.handleRoom(room);
      return;
    }

    if (membership !== "invite") {
      return;
    }

    console.log("[Matrix] Guest invited:", room.roomId);

    try {
      await this.client.joinRoom(room.roomId);

      console.log("[Matrix] JOIN SUCCESS:", room.roomId);

      this.handleRoom(room);
    } catch (error) {
      console.error("[Matrix] JOIN FAILED:", room.roomId, error);
    }
  }

  async startAsGuest(): Promise<MatrixClient> {
    if (this.creatingGuest) {
      throw new Error("Matrix Guest đang được khởi tạo.");
    }

    this.creatingGuest = true;

    try {
      console.log("[Matrix] ====================");
      console.log("[Matrix] startAsGuest()");

      this.stop();

      this.emittedRooms.clear();
      this.emittedMessages.clear();

      const session = await this.createGuest();

      console.log("[Matrix] Guest created:", {
        userId: session.userId,
        deviceId: session.deviceId,
      });

      const client = this.createMatrixClient(session);

      this.client = client;

      console.log("[Matrix] User:", client.getUserId());
      console.log("[Matrix] Guest:", client.isGuest());

      client.startClient({
        initialSyncLimit: 20,
      });

      console.log("[Matrix] Client started.");
      console.log("[Matrix] ====================");

      return client;
    } finally {
      this.creatingGuest = false;
    }
  }

  getJoinedRooms(): Room[] {
    if (!this.client) {
      return [];
    }

    return this.client.getRooms().filter((room) => room.getMyMembership() === "join");
  }

  getRoom(roomId: string): Room | null {
    return this.client?.getRoom(roomId) ?? null;
  }

  getRoomMessages(roomId: string): ChatMessage[] {
    const room = this.getRoom(roomId);

    if (!room) {
      return [];
    }

    return room
      .getLiveTimeline()
      .getEvents()
      .map((event) => this.parseMessage(event, room))
      .filter((message): message is ChatMessage => Boolean(message));
  }

  async sendMessage(roomId: string, body: string) {
    if (!this.client) {
      throw new Error("Matrix client chưa được khởi tạo.");
    }

    const message = body.trim();

    if (!message) {
      return;
    }

    const room = this.client.getRoom(roomId);

    if (!room) {
      throw new Error("Không tìm thấy phòng Matrix.");
    }

    if (room.getMyMembership() !== "join") {
      throw new Error("Guest chưa tham gia phòng.");
    }

    console.log("[Matrix] Sending message:", {
      roomId,
      body: message,
    });

    await this.client.sendTextMessage(roomId, message);
  }

  async uploadMedia(roomId: string, file: File) {
    if (!this.client) {
      throw new Error("Matrix client chưa được khởi tạo.");
    }

    const room = this.client.getRoom(roomId);

    if (!room) {
      throw new Error("Không tìm thấy phòng Matrix.");
    }

    if (room.getMyMembership() !== "join") {
      throw new Error("Guest chưa tham gia phòng.");
    }

    console.log("[Matrix] Uploading media:", {
      roomId,
      name: file.name,
      type: file.type,
      size: file.size,
    });

    const upload = await this.client.uploadContent(file, {
      name: file.name,
      type: file.type || "application/octet-stream",
      includeFilename: true,
    });

    const content: Record<string, any> = {
      msgtype: "m.file",
      body: file.name,
      url: upload.content_uri,
      info: {
        mimetype: file.type || "application/octet-stream",
        size: file.size,
      },
    };

    if (file.type.startsWith("image/")) {
      content.msgtype = "m.image";
      content.info.width = 0;
      content.info.height = 0;
    } else if (file.type.startsWith("video/")) {
      content.msgtype = "m.video";
    } else if (file.type.startsWith("audio/")) {
      content.msgtype = "m.audio";
    }

    await this.client.sendMessage(roomId, content);

    return upload.content_uri;
  }

  async getMediaBlob(mxcUrl: string): Promise<string> {
    if (!this.client) {
      throw new Error("Matrix client chưa được khởi tạo.");
    }

    if (!mxcUrl || !mxcUrl.startsWith("mxc://")) {
      throw new Error(`MXC URL không hợp lệ: ${mxcUrl}`);
    }

    const accessToken = this.client.getAccessToken();

    if (!accessToken) {
      throw new Error("Matrix access token không tồn tại.");
    }

    const parts = mxcUrl.substring("mxc://".length).split("/");

    if (parts.length !== 2 || !parts[0] || !parts[1]) {
      throw new Error(`MXC URL không hợp lệ: ${mxcUrl}`);
    }

    const serverName = parts[0];
    const mediaId = parts[1];

    const url = `${MATRIX_BASE_URL}/_matrix/client/v1/media/download/${encodeURIComponent(serverName)}/${encodeURIComponent(mediaId)}`;

    console.log("[Matrix] Downloading authenticated media:", {
      mxcUrl,
      url,
    });

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      throw new Error(`Không thể tải media: ${response.status} ${text}`);
    }

    const blob = await response.blob();

    return URL.createObjectURL(blob);
  }

  getClient() {
    return this.client;
  }

  getUserId() {
    return this.client?.getUserId() ?? null;
  }

  getSyncState() {
    return this.client?.getSyncState() ?? null;
  }

  onRoom(listener: RoomListener) {
    this.roomListeners.add(listener);

    return () => {
      this.roomListeners.delete(listener);
    };
  }

  onMessage(listener: MessageListener) {
    this.messageListeners.add(listener);

    return () => {
      this.messageListeners.delete(listener);
    };
  }

  onSync(listener: SyncListener) {
    this.syncListeners.add(listener);

    return () => {
      this.syncListeners.delete(listener);
    };
  }

  private emitSync(state: string, previousState?: string) {
    this.syncListeners.forEach((listener) => {
      try {
        listener(state, previousState);
      } catch (error) {
        console.error("[Matrix] Sync listener error:", error);
      }
    });
  }

  private emitMessage(message: ChatMessage) {
    if (this.emittedMessages.has(message.eventId)) {
      return;
    }

    this.emittedMessages.add(message.eventId);

    console.log("[Matrix] MESSAGE:", message);

    this.messageListeners.forEach((listener) => {
      try {
        listener(message);
      } catch (error) {
        console.error("[Matrix] Message listener error:", error);
      }
    });
  }

  stop() {
    const client = this.client;

    if (!client) {
      return;
    }

    console.log("[Matrix] Stopping client...");

    try {
      client.stopClient();
    } catch (error) {
      console.error("[Matrix] Stop failed:", error);
    }

    client.removeAllListeners();
    this.client = null;
    this.emittedRooms.clear();
    this.emittedMessages.clear();
  }

  logout() {
    const client = this.client;

    if (!client) {
      return;
    }

    console.log("[Matrix] Closing Guest session locally...", {
      userId: client.getUserId(),
    });

    this.stop();
  }
}

export const matrix = new MatrixService();
