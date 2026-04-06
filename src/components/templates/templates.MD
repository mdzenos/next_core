# Huong Dan Su Dung Templates

## Muc tieu

`templates` xac dinh bo cuc trang o muc cao nhat: header, khu vuc chinh, sidebar, slot filter/actions/footer. Templates giup giu giao dien dong nhat giua cac man hinh.

## Nguyen tac

1. Template khong chua business logic, chi sap xep layout.
2. Du lieu va hanh vi duoc truyen vao qua props/slots.
3. Organisms la vat lieu chinh de lap template.

## Nhom templates hien co

### Nhom tong quat
- `CenteredContentTemplate`
- `SplitScreenTemplate`
- `ContentWorkspaceTemplate`
- `ControlCenterTemplate`

### Nhom nghiep vu
- `DashboardPageTemplate`
- `SettingsPageTemplate`
- `ListPageTemplate`
- `DetailPageTemplate`
- `FormPageTemplate`
- `DocsPageTemplate`
- `MarketingPageTemplate`

### Nhom moi mo rong
- `OperationsDeskTemplate`
- `ReviewStudioTemplate`
- `TeamPortalTemplate`
- `NotificationInboxTemplate`

## Vi du nhanh

### 1. Operations Desk

```tsx
import {
  OperationsDeskTemplate,
} from '@/components/templates';
import { DataExplorer, KPIOverviewGrid, NotificationCenterPanel, UploadManagementPanel } from '@/components/organisms';

<OperationsDeskTemplate
  title="Operations"
  description="Quan ly van hanh he thong"
  kpiSection={<KPIOverviewGrid items={kpis} />}
  notifications={<NotificationCenterPanel items={notifications} />}
  uploads={<UploadManagementPanel metadata={fileMeta} />}
  mainContent={<DataExplorer {...tableProps} />}
/>
```

### 2. Team Portal

```tsx
import {
  TeamPortalTemplate,
} from '@/components/templates';
import { ActivityTimeline, PreferenceGroup, ProfileOverviewCard, SettingsNavigationPanel } from '@/components/organisms';

<TeamPortalTemplate
  title="Team Portal"
  navigation={<SettingsNavigationPanel items={navItems} />}
  profileCard={<ProfileOverviewCard name="Tran Van C" role="Team Lead" />}
  timeline={<ActivityTimeline items={activities} />}
  preferences={<PreferenceGroup title="Thong bao" items={preferenceItems} />}
/>
```

### 3. Notification Inbox

```tsx
import { NotificationInboxTemplate } from '@/components/templates';
import { NotificationCenterPanel, CommentThreadPanel } from '@/components/organisms';
import { SearchFilterInline } from '@/components/molecules';

<NotificationInboxTemplate
  title="Inbox"
  filterBar={
    <SearchFilterInline
      query={query}
      onQueryChange={setQuery}
      filterValue={status}
      onFilterChange={setStatus}
      filterOptions={filterOptions}
    />
  }
  inbox={<NotificationCenterPanel items={notifications} />}
  details={<CommentThreadPanel comments={comments} composeValue={value} onComposeValueChange={setValue} />}
/>
```

## Chon template nao?

1. Can bo cuc 2 cot dong (main + aside): dung `ControlCenterTemplate` hoac `NotificationInboxTemplate`.
2. Can bo cuc quan tri day KPI, notifications, upload: dung `OperationsDeskTemplate`.
3. Can bo cuc doi nhom/profile/activity/preferences: dung `TeamPortalTemplate`.
4. Can bo cuc review data + comments: dung `ReviewStudioTemplate`.

## Checklist truoc khi merge

1. Template khong hardcode du lieu.
2. Co slot cho khu vuc phu (`actions`, `aside`, `filterBar`, `footer`).
3. Da export trong `templates/index.ts`.
4. De test responsive bang mock content ngan va dai.
