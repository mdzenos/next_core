# Huong Dan Su Dung Molecules

## Muc tieu

`molecules` la cac khoi UI ket hop tu nhieu `atoms`, phuc vu tinh huong cu the nhu tim kiem + loc, item thong bao, card KPI, upload, composer binh luan.

## Nguyen tac thiet ke

1. Molecule khong quan ly du lieu xa (API, store), chi nhan `props` va phat su kien callback.
2. Uu tien dung lai atoms va token tu `globals.css`.
3. Props uu tien dang `value` + `onChange` de de controlled.
4. Mac dinh tao giao dien dep, nhung cho phep mo rong bang `className`.

## Nhom molecules hien co

### Nhom form va input
- `FormField`
- `FieldWithCounter`
- `SearchBox`
- `SearchFilterInline`
- `UploadDropHint`
- `CommentComposer`

### Nhom thong tin va trang thai
- `MetricCard`
- `MetricWithTrend`
- `KPIHighlightCard`
- `StatusPill`
- `NotificationListItem`
- `KeyValueGrid`

### Nhom dieu huong va bo tro
- `BreadcrumbTrail`
- `TabNav`
- `SettingsNavItem`
- `Pagination`
- `SidebarDrilldownItem`

## Vi du nhanh

### 1. Search + Filter + Action

```tsx
import { SearchFilterInline } from '@/components/molecules';

<SearchFilterInline
  query={query}
  onQueryChange={setQuery}
  filterValue={status}
  onFilterChange={setStatus}
  filterOptions={[
    { label: 'Tat ca', value: 'all' },
    { label: 'Dang xu ly', value: 'processing' },
    { label: 'Hoan tat', value: 'done' },
  ]}
  actionLabel="Tao moi"
  onAction={() => setOpenCreate(true)}
/>
```

### 2. Notification Item

```tsx
import { NotificationListItem } from '@/components/molecules';

<NotificationListItem
  id="n-1"
  actorName="Nguyen Van A"
  title="Ban co yeu cau phe duyet moi"
  description="Can duyet trong 24 gio"
  tone="warning"
  unread
  actionLabel="Xem"
  onAction={(id) => console.log(id)}
/>
```

### 3. Composer binh luan

```tsx
import { CommentComposer } from '@/components/molecules';

<CommentComposer
  value={comment}
  onValueChange={setComment}
  onSubmit={handleSubmitComment}
  authorName="Le Thi B"
/>
```

## Khi nao tao molecule moi?

Tao molecule moi khi:
1. Co it nhat 2 atoms duoc ket hop lap lai o >= 2 man hinh.
2. Co hanh vi tuong tac nho (clear search, submit mini form, item action).
3. Chua du lon de thanh organism.

Khong nen tao molecule moi neu chi la wrapper don gian cua 1 atom.

## Checklist truoc khi merge

1. Co API props ro rang (`value`, `onChange`, callback su kien).
2. Co trang thai co ban: empty, disabled, error (neu phu hop).
3. Khong hardcode du lieu mau.
4. Da export trong `molecules/index.ts`.
