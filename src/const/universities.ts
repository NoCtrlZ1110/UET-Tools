import { Colors } from './colors';

interface University {
  name: string;
  acronym: string;
  color: Colors;
}

export const universities: Array<University> = [
  {
    name: 'Đại học Công nghệ',
    acronym: 'UET',
    color: Colors.Blue,
  },
  {
    name: 'Đại học Ngoại ngữ',
    acronym: 'ULIS',
    color: Colors.Purple,
  },

  {
    name: 'Đại học Khoa học Tự nhiên',
    acronym: 'HUS',
    color: Colors.Green,
  },
  {
    name: 'Đại học Kinh tế',
    acronym: 'UEB',
    color: Colors.Red,
  },
  {
    name: 'Đại học Khoa học Xã hội và Nhân văn',
    acronym: 'USSH',
    color: Colors.Yellow,
  },
];
