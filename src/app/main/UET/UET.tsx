import React, { useEffect, useState } from 'react';
import {
  addMessageListener,
  newMessage,
  sendMessage,
} from '../../../chrome/utils';
import { NewsModel } from '../../../models/NewsModel';
import { MessageType, Sender } from '../../../types';
import NewsTile from '../components/NewsTile';
import Splash from '../components/Splash';
let testData = [
  {
    thumbnail:
      'https://uet.vnu.edu.vn/wp-content/uploads/2018/01/GetArticleImage.jpg',
    title:
      'Lấy ý kiến phản hồi của sinh viên về học phần và các hoạt động hỗ trợ người học',
    url: 'https://uet.vnu.edu.vn/lay-y-kien-phan-hoi-cua-sinh-vien-ve-hoc-phan-va-cac-hoat-dong-ho-tro-nguoi-hoc-2/',
    excerpt:
      '   Thực hiện hướng dẫn của Đại học Quốc gia Hà Nội, Trường Đại học Công nghệ đề nghị toàn thể sinh viên thực hiện nhiệm vụ lấy ý kiến phản hồi của sinh viên về học phần học kỳ II năm học 2020-2021và lấy ý kiến phản hồi về chất lượng các hoạt động […]',
    month: 'Th8',
    date: '06',
    tag: 'Tin Sinh Viên',
  },
  {
    thumbnail:
      'https://uet.vnu.edu.vn/wp-content/uploads/2018/01/GetArticleImage.jpg',
    title: 'WEBINAR: TÌM HIỂU CHƯƠNG TRÌNH TECHCOMBANK FUTURE GEN TECH & DATA',
    url: 'https://uet.vnu.edu.vn/webinar-tim-hieu-chuong-trinh-techcombank-future-gen-tech-data/',
    excerpt:
      '  Với mong muốn cung cấp thêm thông tin và giúp các bạn giải đáp các thắc mắc về chương trình TECHCOMBANK FUTURE GEN TECH & DATA, Techcombank tổ chức một buổi chia sẻ online với thông tin chi tiết:    ⏰ Thời gian: 15h – 17h Thứ 4 ngày 18/08/2021    💻 Hình thức: […]',
    month:
      '\n            \n                \n                    \n    \n        \t\t\t\n        \t\n        \t\n\t\t    \n\n\n            \n            Th8\n            06\n        \n    \n                \n            \n        ',
    date: '',
    tag: 'Tin Sinh Viên',
  },
  {
    thumbnail:
      'https://uet.vnu.edu.vn/wp-content/uploads/2018/01/GetArticleImage.jpg',
    title:
      'Quỹ học bổng Đồng Hành Singapore triển khai chương trình “Cùng sinh viên vượt qua mùa dịch”',
    url: 'https://uet.vnu.edu.vn/quy-hoc-bong-dong-hanh-singapore-trien-khai-chuong-trinh-cung-sinh-vien-vuot-qua-mua-dich/',
    excerpt:
      '    Ngày 05/8/2021, Nhà trường nhận được thông báo từ Quỹ học bổng Đồng Hành Singapore (đây là  học bổng được thiết lập năm 2001 bởi một nhóm du học sinh Việt Nam tại Pháp với mục đích hỗ trợ các sinh viên Việt Nam có hoàn cảnh khó khăn nhưng có tinh thần […]',
    month: 'Th8',
    date: '06',
    tag: 'Tin Sinh Viên',
  },
  {
    thumbnail:
      'https://uet.vnu.edu.vn/wp-content/uploads/2018/01/GetArticleImage.jpg',
    title:
      'Dự kiến lịch thi kỳ thi phụ HKII (đợt 2) và học kỳ phụ năm học 2020-2021',
    url: 'https://uet.vnu.edu.vn/du-kien-lich-thi-ky-thi-phu-hkii-dot-2-va-hoc-ky-phu-nam-hoc-2020-2021/',
    excerpt:
      '    Phòng Đào tạo (ĐT) xin gửi đến các đơn vị Dự kiến lịch thi kỳ thi phụ HKII (đợt 2) và học kỳ phụ, năm học 2020-2021 của các lớp đại học hệ chính quy, đề nghị: Các lãnh đạo đơn vị thông báo cho cán bộ thuộc đơn vị mình quản lý […]',
    month: 'Th8',
    date: '03',
    tag: 'Tin Sinh Viên',
  },
  {
    thumbnail:
      'https://uet.vnu.edu.vn/wp-content/uploads/2018/01/GetArticleImage.jpg',
    title:
      'Chương trình học bổng của Trung tâm Hướng nghiệp trực tuyến Việt Nam (VOCO)',
    url: 'https://uet.vnu.edu.vn/chuong-trinh-hoc-bong-cua-trung-tam-huong-nghiep-truc-tuyen-viet-nam-voco/',
    excerpt:
      '   Trung tâm Hướng nghiệp Trực tuyến Việt Nam (VOCO) là một dự án phi lợi nhuận được thành lập với mục đích cải thiện khả năng tuyển dụng của các tài năng trẻ Việt Nam trên toàn quốc, bằng cách cung cấp giáo dục định hướng nghề nghiệp và phát triển kỹ năng trên […]',
    month: 'Th8',
    date: '02',
    tag: 'Tin Sinh Viên',
  },
  {
    thumbnail:
      'https://uet.vnu.edu.vn/wp-content/uploads/2018/01/GetArticleImage.jpg',
    title:
      'Danh sách sinh viên chưa hoàn thành nghĩa vụ nộp học phí (tính đến hết ngày 29/7/2021)',
    url: 'https://uet.vnu.edu.vn/danh-sach-sinh-vien-chua-hoan-thanh-nghia-vu-nop-hoc-phi-tinh-den-het-ngay-2972021/',
    excerpt:
      '    Ngày 22/7/2021, Trường ĐH Công nghệ đã có thông báo về việc thu HP trong HKII năm học 2020-2021: https://uet.vnu.edu.vn/nop-hoc-phi-hoc-ki-nam-hoc-2020-2021-2/      Phòng CTSV và phòng KHTC xin cập nhật danh sách sinh viên chưa hoàn thành nghĩa vụ thu học phí (tính đến hết ngày 28/7/2021).       Đề nghị tất cả sinh […]',
    month: 'Th7',
    date: '30',
    tag: 'Tin Sinh Viên',
  },
  {
    thumbnail:
      'https://uet.vnu.edu.vn/wp-content/uploads/2018/01/GetArticleImage.jpg',
    title: 'Kết quả học bổng Đồng hành kì 40, HKII, năm học 2020-2021',
    url: 'https://uet.vnu.edu.vn/ket-qua-hoc-bong-dong-hanh-ki-40-hkii-nam-hoc-2020-2021/',
    excerpt:
      '  Ngày 29/7/2021, trường ĐH Công nghệ nhận được thông báo từ Quỹ HB Đồng hành về Danh sách sinh viên nhận Học bổng Đồng hành kỳ 40, học kỳ II, năm học 2020-2021. Xin chúc mừng các sinh viên, có tên trong Danh sách, đã đại diện cho sinh viên Trường ĐH Công nghệ vinh […]',
    month: 'Th7',
    date: '30',
    tag: 'Tin Sinh Viên',
  },
  {
    thumbnail:
      'https://uet.vnu.edu.vn/wp-content/uploads/2018/01/GetArticleImage.jpg',
    title: 'Dự kiến thời khóa biểu học kỳ I năm học 2021-2022',
    url: 'https://uet.vnu.edu.vn/du-kien-thoi-khoa-bieu-hoc-ky-nam-hoc-2021-2022/',
    excerpt:
      'Phòng Đào tạo (P.ĐT) gửi tới toàn thể sinh viên trong Trường “Dự kiến Thời khóa biểu học kỳ I năm học 2021-2022”. Đề nghị sinh viên lưu ý các vấn đề sau: 1. Học kỳ I dự kiến bắt đầu từ ngày 30/08/2021 ÷ 12/12/2021. Lịch học bài tập, thực hành bắt đầu học […]',
    month: 'Th7',
    date: '28',
    tag: 'Tin Sinh Viên',
  },
];

const UET: React.FC = () => {
  const [data, setData] = useState<NewsModel[]>(testData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const message = newMessage(Sender.React, {}, MessageType.REQ_UET_NEWS);
    sendMessage(message);
    addMessageListener(MessageType.RES_UET_NEWS, (m) => {
      setData(m.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      {isLoading ? (
        <Splash />
      ) : (
        <div>
          {data &&
            data.map((news, index) => <NewsTile news={news} key={index} />)}
        </div>
      )}
    </div>
  );
};

export default UET;
