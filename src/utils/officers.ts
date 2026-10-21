import officersData from '../data/officers.json';
import presidentsData from '../data/presidents.json';

export interface Officer {
  id: string;
  year: number;
  term: number;
  name: string;
  title: string;
  photo?: string;
  description?: string;
  sort_order?: number;
  status: 'current' | 'past';
}

export interface President {
  id: string;
  term: number;
  year?: number;
  name: string;
  photo?: string;
  description?: string;
}

// 幹部職稱的顯示順序；不在清單內的職稱會歸在「其他幹部」。
export const TITLE_ORDER = ['會長', '副會長', '總幹事', '秘書', '財務組', '活動組', '宣傳組'];
export const OTHER_LABEL = '其他幹部';

export const officers = officersData as Officer[];
export const presidents = presidentsData as President[];

const bySortOrder = (a: Officer, b: Officer) =>
  (a.sort_order ?? 999) - (b.sort_order ?? 999) || a.name.localeCompare(b.name, 'zh-Hant');

export function currentOfficers(): Officer[] {
  return officers.filter((o) => o.status === 'current').sort(bySortOrder);
}

export interface TitleGroup {
  label: string;
  members: Officer[];
}

export interface TermGroup {
  term: number;
  year?: number;
  groups: TitleGroup[];
}

// 依「屆次」分組（新的在前），每屆再依職稱分組。
export function officersByTerm(list: Officer[] = officers): TermGroup[] {
  const terms = [...new Set(list.map((o) => o.term))].sort((a, b) => b - a);
  return terms.map((term) => {
    const inTerm = list.filter((o) => o.term === term).sort(bySortOrder);
    const groups: TitleGroup[] = TITLE_ORDER.map((label) => ({
      label,
      members: inTerm.filter((o) => o.title === label),
    }));
    groups.push({
      label: OTHER_LABEL,
      members: inTerm.filter((o) => !TITLE_ORDER.includes(o.title)),
    });
    return {
      term,
      year: inTerm.find((o) => o.year)?.year,
      groups: groups.filter((g) => g.members.length > 0),
    };
  });
}

export function sortedPresidents(): President[] {
  return [...presidents].sort((a, b) => b.term - a.term);
}

// 姓名縮寫：沒有照片時顯示。中文取第一個字，英文取前兩個字母。
export function initials(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return '？';
  if (/^[\x00-\x7F]/.test(trimmed)) {
    return trimmed
      .split(/\s+/)
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }
  return trimmed[0];
}
