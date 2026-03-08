/**
 * ISO 8601 타임스탬프에서 날짜 부분(YYYY-MM-DD)만 추출
 */
export const formatDate = (dateStr: string) => dateStr.slice(0, 10);
