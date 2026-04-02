import type { Metadata } from 'next';

type BuildMetadataParams = {
  title?: string;
  description?: string;
};

type BuildRootMetadataParams = {
  description?: string;
  icons?: Metadata['icons'];
};

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'NextJS Core';
const DEFAULT_TITLE = process.env.NEXT_PUBLIC_DEFAULT_TITLE || 'Tiêu đề trang';
const DEFAULT_DESCRIPTION = process.env.NEXT_PUBLIC_DEFAULT_DESCRIPTION || 'Mô tả mặc định cho ứng dụng NextJS Core';

function formatTitle(title?: string) {
  if (!title) {
    return DEFAULT_TITLE;
  }

  if (title.includes(APP_NAME)) {
    return title;
  }

  return `${title} | ${APP_NAME}`;
}

export function buildRootMetadata(
  params: BuildRootMetadataParams = {}
): Metadata {
  const { description = DEFAULT_DESCRIPTION, icons } = params;

  return {
    title: DEFAULT_TITLE,
    description,
    icons,
  };
}

export function buildMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
}: BuildMetadataParams = {}): Metadata {
  return {
    title: formatTitle(title),
    description,
  };
}
