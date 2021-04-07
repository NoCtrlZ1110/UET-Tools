import { Colors } from './Colors';

interface University {
  name: string;
  acronym: string;
  color: Colors;
}

export const universities: Array<University> = [
  {
    name: 'Trường Đại học Công nghệ',
    acronym: 'UET',
    color: Colors.Blue,
  },
  {
    name: 'Trường Đại học Ngoại ngữ',
    acronym: 'ULIS',
    color: Colors.Purple,
  },
];
