# Huong Dan Su Dung Organisms

## Muc tieu

`organisms` la cac khoi giao dien lon hon, ket hop nhieu molecules + atoms de tao section hoan chinh tren trang.

## Nguyen tac

1. Organism chi nhan du lieu qua props, han che phu thuoc state toan cuc.
2. Co the chua nhieu slot (`actions`, `toolbar`, `aside`) de tai su dung nhieu context.
3. Muc tieu la de templates lap rap nhanh.

## Nhom organisms hien co

### Nhom dashboard / analytics
- `StatsOverview`
- `DataExplorer`
- `KPIOverviewGrid`
- `FilterToolbar`

### Nhom profile / settings
- `ProfileOverviewCard`
- `PreferenceGroup`
- `SettingsNavigationPanel`

### Nhom communication / stream
- `ActivityTimeline`
- `NotificationCenterPanel`
- `CommentThreadPanel`

### Nhom utility section
- `AppHeader`
- `SectionPanel`
- `DataTable`
- `UploadManagementPanel`

## Vi du nhanh

### 1. Notification Center

```tsx
import { NotificationCenterPanel } from '@/components/organisms';

<NotificationCenterPanel
  items={notifications}
  onActionItem={(id) => router.push(`/notifications/${id}`)}
  emptyActionLabel="Lam moi"
  onEmptyAction={reload}
/>
```

### 2. KPI Grid

```tsx
import { KPIOverviewGrid } from '@/components/organisms';

<KPIOverviewGrid
  items={[
    { key: 'k1', title: 'Doanh thu', value: '2.4B', delta: '+12%', deltaTone: 'success' },
    { key: 'k2', title: 'Chi phi', value: '1.1B', delta: '-4%', deltaTone: 'danger' },
  ]}
/>
```

### 3. Comment Thread

```tsx
import { CommentThreadPanel } from '@/components/organisms';

<CommentThreadPanel
  comments={comments}
  composeValue={message}
  onComposeValueChange={setMessage}
  onSubmitComment={submitComment}
/>
```

## Goi y phan tach

- Neu section can >= 2 molecules va co bo cuc rieng, dat no o organisms.
- Neu bo cuc da gom nhieu organisms tren toan trang, dat o templates.

## Checklist truoc khi merge

1. Co props typed ro rang cho data list va callback.
2. Co xu ly empty state neu la list.
3. Da export trong `organisms/index.ts`.
4. Khong tro thanh “god component” (qua nhieu business logic).
