# Atoms Guide

## Mục tiêu

Bộ atoms được tối ưu theo hệ token trong `src/styles/globals.css` để:

- Đồng nhất màu sắc và độ tương phản trên cả light/dark mode.
- Giảm hardcode màu trong component.
- Tái sử dụng style primitives trong `src/components/atoms/styles.ts`.

---

## Nguyên tắc sử dụng

### 1. Ưu tiên semantic token
- Dùng các utility map theo token: `text-foreground`, `bg-(--surface)`, `border-(--border-subtle)`, `text-(--text-muted)`.
- Nếu cần status (success/warning/danger/info), dùng class map trong `styles.ts` thay vì hardcode emerald/amber/red.

### 2. Ưu tiên style primitives
- **Form controls:** `atomControlBaseClass`, `atomControlInvalidClass`.
- **Text phụ trợ:** `atomHelperTextClass`, `atomErrorTextClass`.
- **Trạng thái:** `atomStatusSurfaceClasses`, `atomStatusFillClasses`.
- **Surface/floating:** `atomSurfaceCardClass`, `atomPanelClass`, `atomFloatingClass`.

### 3. Không duplicate class màu
- Nếu một pattern đã có trong `styles.ts`, import và dùng lại.
- Chỉ thêm class trực tiếp ở atom khi là behavior đặc thù (layout/size/state animation).

---

## Cách import

```tsx
import { Button, Input, Alert, ProgressBar, StatusDot } from '@/components/atoms';
```

Hoặc import style primitives:

```tsx
import {
  atomControlBaseClass,
  atomControlInvalidClass,
  atomHelperTextClass,
  atomErrorTextClass,
  atomStatusSurfaceClasses,
  atomStatusFillClasses,
} from '@/components/atoms/styles';
```

## Ví dụ sử dụng theo nhóm
### 1. Form controls

```tsx
import { Input, Textarea, Select, FileInput, Label } from '@/components/atoms';

export function ProfileForm() {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="fullName" requiredMark>
          Họ và tên
        </Label>
        <Input id="fullName" placeholder="Nhập họ và tên" />
      </div>

      <div>
        <Label htmlFor="bio">Mô tả</Label>
        <Textarea id="bio" rows={4} />
      </div>

      <div>
        <Label htmlFor="role">Vai trò</Label>
        <Select id="role" defaultValue="staff">
          <option value="staff">Nhân viên</option>
          <option value="lead">Trưởng nhóm</option>
        </Select>
      </div>

      <FileInput hint="Dung lượng tối đa 2MB" />
    </div>
  );
}
```

### 2. Feedback và status

```tsx
import { Alert, ProgressBar, StatusDot, Tag, Pill } from '@/components/atoms';

export function SyncStatus() {
  return (
    <div className="space-y-4">
      <Alert variant="success" message="Dong bo du lieu thanh cong" />

      <ProgressBar label="Tien do xu ly" value={68} tone="warning" showValue />

      <div className="flex items-center gap-4">
        <StatusDot tone="success" label="Online" pulse />
        <Tag tone="brand">Beta</Tag>
        <Pill tone="danger">Qua han</Pill>
      </div>
    </div>
  );
}
```

### 3. Surface và interactive atoms

```tsx
import { Collapse, Selectable, Switch, Divider, Kbd } from '@/components/atoms';
import { useState } from 'react';

export function PreferencesCard() {
  const [emailEnabled, setEmailEnabled] = useState(true);

  return (
    <div className="surface-card p-4 space-y-4">
      <Collapse title="Thong bao email" defaultOpen>
        <div className="flex items-center justify-between">
          <span>Bat/tat thong bao</span>
          <Switch checked={emailEnabled} onCheckedChange={setEmailEnabled} />
        </div>
      </Collapse>

      <Divider label="Lua chon" />

      <Selectable selected>Lua chon mac dinh</Selectable>

      <div className="text-sm">
        Nhan <Kbd>Ctrl</Kbd> + <Kbd>S</Kbd> de luu.
      </div>
    </div>
  );
}
```

### 4. Skeleton và media fallback

```tsx
import { Skeleton, SkeletonText, ImageFallback } from '@/components/atoms';

export function LoadingCard() {
  return (
    <div className="surface-card p-4 space-y-3">
      <Skeleton className="h-40" />
      <SkeletonText lines={3} />
      <ImageFallback className="h-24 rounded-xl">Dang tai anh</ImageFallback>
    </div>
  );
}
```

## Mapping token chính trong globals.css

- Surface:
  - `--surface`, `--surface-muted`, `--surface-elevated`
- Border/shadow:
  - `--border-subtle`, `--shadow-card`, `--shadow-soft`, `--shadow-focus`
- Text:
  - `--foreground`, `--text-muted`
- Status:
  - `--status-success-*`, `--status-warning-*`, `--status-danger-*`, `--status-info-*`
- Overlay/divider:
  - `--overlay`, `--divider-color`
- Progress/skeleton track:
  - `--progress-track`

## Checklist khi tạo atom mới

1. Có cần style semantic đã có trong styles.ts không?

2. Màu có dùng token trong globals.css không?

3. Có hỗ trợ dark mode từ token hay đang hardcode?

4. Có đầy đủ state disabled, focus-visible, error (nếu là control) không?

5. Có pass className để cho phép mở rộng giao diện không?

## Ghi chú thực hành
- Nếu cần thêm tone/trạng thái mới, ưu tiên thêm token vào globals.css trước, sau đó map vào styles.ts.

- Tránh thêm class màu trực tiếp trong atom nếu có thể đại diện bằng token.

- Khi refactor, ưu tiên giữ API component không đổi để tránh ảnh hưởng đến các feature layer.
