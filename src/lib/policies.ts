export type Policy = {
  slug: string;
  title: string;
  summary: string;
  updatedAt: string;
  sections: { heading: string; paragraphs?: string[]; bullets?: string[] }[];
};

export const policyConfig = {
  brand: "MoonPrice",
  legalName: "CÔNG TY CỔ PHẦN ĐÀ NẴNG TOURIST",
  taxCode: "0402141272",
  address: "04 Hoàng Văn Thải, Phường Hòà Minh, Quận Liên Chiều, Thành phố Đà Nẵng, Việt Nam",
  hotline: "0938367886",
  email: "hoangnguyettravel84@gmail.com",
  workingHours: "24/7",
  zaloUrl: "https://zalo.me/0938367886",
  facebookUrl: "https://www.facebook.com/",
  // Điền ngày cập nhật thực tế trước khi đưa nội dung lên website.
  updatedAt: "16/11/2026",
};

export const policies: Policy[] = [
  {
    slug: "bao-mat",
    title: "Chính sách bảo mật",
    summary:
      "Quy định về việc thu thập, sử dụng, lưu trữ và bảo vệ thông tin của khách hàng khi sử dụng website MoonPrice.",
    updatedAt: policyConfig.updatedAt,
    sections: [
      {
        heading: "1. Phạm vi áp dụng",
        paragraphs: [
          "Chính sách này áp dụng đối với khách hàng truy cập website, tìm kiếm thông tin, đặt mua vé hoặc liên hệ với MoonPrice.",
          "Khi sử dụng website hoặc cung cấp thông tin cho MoonPrice, khách hàng xác nhận đã đọc và hiểu nội dung chính sách này. Trường hợp pháp luật yêu cầu sự đồng ý riêng cho một hoạt động xử lý dữ liệu, MoonPrice sẽ thực hiện việc lấy ý kiến theo quy định.",
        ],
      },
      {
        heading: "2. Thông tin có thể được thu thập",
        bullets: [
          "Thông tin liên hệ và nhận vé: họ tên, số điện thoại, địa chỉ email và thông tin người nhận vé do khách hàng cung cấp.",
          "Thông tin đặt dịch vụ: sản phẩm/vé đã chọn, số lượng, ngày sử dụng, mã đơn hàng và yêu cầu hỗ trợ.",
          "Thông tin giao dịch: phương thức thanh toán, mã giao dịch, trạng thái thanh toán và thông tin cần thiết để đối soát. MoonPrice không chủ động yêu cầu khách hàng gửi mật khẩu ngân hàng hoặc mã OTP.",
          "Thông tin kỹ thuật: địa chỉ IP, loại trình duyệt, thiết bị, thời điểm truy cập và dữ liệu cookie cần thiết cho hoạt động của website.",
        ],
      },
      {
        heading: "3. Mục đích sử dụng thông tin",
        bullets: [
          "Tiếp nhận và xử lý đơn đặt vé, xác nhận thanh toán và gửi vé hoặc thông tin dịch vụ.",
          "Liên hệ để xác minh thông tin đơn hàng, thông báo thay đổi từ nhà cung cấp và hỗ trợ sau bán hàng.",
          "Giải quyết khiếu nại, đối soát giao dịch, phòng chống gian lận và bảo vệ quyền lợi hợp pháp của khách hàng.",
          "Cải thiện chất lượng website, thống kê hoạt động và thực hiện nghĩa vụ theo quy định pháp luật.",
          "Gửi thông tin khuyến mãi hoặc tiếp thị khi có căn cứ hợp pháp và/hoặc sự đồng ý phù hợp của khách hàng. Khách hàng có thể yêu cầu ngừng nhận thông tin này.",
        ],
      },
      {
        heading: "4. Chia sẻ thông tin",
        paragraphs: [
          "MoonPrice chỉ chia sẻ thông tin ở phạm vi cần thiết với đơn vị phát hành/vận hành điểm tham quan để xác nhận hoặc cung cấp vé; đơn vị thanh toán/ngân hàng để xử lý và đối soát giao dịch; nhà cung cấp hạ tầng công nghệ để vận hành website; hoặc cơ quan có thẩm quyền khi có yêu cầu hợp pháp.",
          "MoonPrice không bán dữ liệu cá nhân của khách hàng. Các bên tiếp nhận thông tin có trách nhiệm sử dụng thông tin đúng mục đích và áp dụng biện pháp bảo vệ phù hợp theo thỏa thuận và quy định pháp luật.",
        ],
      },
      {
        heading: "5. Thời gian lưu trữ và bảo vệ thông tin",
        paragraphs: [
          "Thông tin được lưu trữ trong thời gian cần thiết để thực hiện mục đích đã nêu, giải quyết tranh chấp, đối soát và đáp ứng nghĩa vụ lưu trữ theo pháp luật. Khi không còn cần thiết và không có nghĩa vụ lưu trữ, thông tin sẽ được xóa, hủy hoặc xử lý theo quy định.",
          "MoonPrice áp dụng các biện pháp quản lý và kỹ thuật phù hợp để hạn chế truy cập, sử dụng, tiết lộ hoặc thay đổi thông tin trái phép. Tuy nhiên, không phương thức truyền tải hay lưu trữ điện tử nào có thể bảo đảm an toàn tuyệt đối.",
        ],
      },
      {
        heading: "6. Quyền và yêu cầu của khách hàng",
        paragraphs: [
          "Theo quy định pháp luật hiện hành, khách hàng có thể gửi yêu cầu liên quan đến việc truy cập, cập nhật, chỉnh sửa, rút lại sự đồng ý, hạn chế hoặc phản đối việc xử lý, xóa dữ liệu cá nhân và các quyền khác (nếu áp dụng). MoonPrice có thể cần xác minh danh tính và có thể từ chối hoặc giới hạn yêu cầu trong trường hợp pháp luật cho phép hoặc yêu cầu lưu trữ bắt buộc.",
          "Gửi yêu cầu qua email [EMAIL HỖ TRỢ] với tiêu đề “Yêu cầu về dữ liệu cá nhân”, kèm thông tin đủ để xác định đơn hàng hoặc yêu cầu. Không gửi mật khẩu, mã OTP hoặc thông tin bảo mật ngân hàng.",
        ],
      },
      {
        heading: "7. Cookie và công nghệ tương tự",
        paragraphs: [
          "Website có thể sử dụng cookie hoặc công nghệ tương tự để duy trì phiên truy cập, ghi nhớ lựa chọn, bảo đảm an ninh và phân tích hiệu quả hoạt động. Khách hàng có thể quản lý cookie trong cài đặt trình duyệt; việc tắt một số cookie có thể ảnh hưởng đến chức năng website.",
        ],
      },
      {
        heading: "8. Thay đổi chính sách và liên hệ",
        paragraphs: [
          "MoonPrice có thể cập nhật chính sách để phù hợp với hoạt động hoặc quy định pháp luật. Phiên bản mới sẽ được đăng trên website cùng ngày cập nhật.",
          "Đơn vị phụ trách: CÔNG TY CỔ PHẦN ĐÀ NẴNG TOURIST. Địa chỉ: 04 Hoàng Văn Thải, Phường Hòà Minh, Quận Liên Chiều, Thành phố Đà Nẵng, Việt Nam. Email: hoangnguyettravel84@gmail.com. Hotline: 0938367886.",
        ],
      },
    ],
  },
  {
    slug: "giai-quyet-khieu-nai",
    title: "Phương thức tiếp nhận và giải quyết phản ánh, yêu cầu, khiếu nại",
    summary:
      "Hướng dẫn gửi phản ánh và quy trình MoonPrice tiếp nhận, kiểm tra, phản hồi và xử lý khiếu nại.",
    updatedAt: policyConfig.updatedAt,
    sections: [
      {
        heading: "1. Kênh tiếp nhận",
        paragraphs: [
          "Khách hàng có thể gửi phản ánh, yêu cầu hỗ trợ hoặc khiếu nại qua hotline 0938367886, email hoangnguyettravel84@gmail.com, Zalo https://zalo.me/0938367886, Facebook  hoặc các kênh hỗ trợ trực tuyến được công bố trên website.",
        ],
      },
      {
        heading: "2. Thông tin cần cung cấp",
        bullets: [
          "Họ tên và thông tin liên hệ của người gửi.",
          "Mã đơn hàng/mã vé, thời điểm đặt vé và sản phẩm liên quan (nếu có).",
          "Mô tả rõ vấn đề, yêu cầu mong muốn và thời điểm phát sinh.",
          "Tài liệu liên quan như xác nhận đặt vé, chứng từ thanh toán hoặc hình ảnh lỗi. Vui lòng che thông tin nhạy cảm không cần thiết.",
        ],
      },
      {
        heading: "3. Quy trình xử lý",
        bullets: [
          "Bước 1 – Tiếp nhận: MoonPrice ghi nhận nội dung và thông tin liên hệ của khách hàng.",
          "Bước 2 – Xác minh: kiểm tra đơn hàng, trạng thái thanh toán, thông tin vé và làm việc với nhà cung cấp hoặc đơn vị thanh toán khi cần.",
          "Bước 3 – Phản hồi: thông báo kết quả xác minh, phương án xử lý hoặc thông tin cần bổ sung.",
          "Bước 4 – Hoàn tất: thực hiện phương án đã thống nhất và thông báo kết quả cho khách hàng.",
        ],
      },
      {
        heading: "4. Thời gian xử lý",
        paragraphs: [
          "MoonPrice cố gắng xác nhận đã nhận yêu cầu trong vòng [THỜI GIAN XÁC NHẬN] và phản hồi kết quả trong vòng [THỜI GIAN XỬ LÝ] kể từ khi nhận đủ thông tin. Trường hợp cần xác minh với bên thứ ba hoặc nhà cung cấp, thời gian xử lý có thể kéo dài; MoonPrice sẽ thông báo lý do và tiến độ dự kiến.",
        ],
      },
      {
        heading: "5. Nguyên tắc giải quyết",
        paragraphs: [
          "Khiếu nại được xem xét trên cơ sở thông tin đơn hàng, chứng từ, điều kiện vé tại thời điểm mua và quy định của nhà cung cấp. MoonPrice ưu tiên giải quyết thiện chí, minh bạch và bảo vệ quyền lợi hợp pháp của khách hàng.",
          "Nếu không đồng ý với kết quả xử lý, khách hàng có thể phản hồi lại MoonPrice hoặc gửi yêu cầu đến cơ quan nhà nước có thẩm quyền theo quy định pháp luật.",
        ],
      },
    ],
  },
  {
    slug: "gia",
    title: "Chính sách giá",
    summary:
      "Thông tin về giá vé, đối tượng áp dụng, phụ thu, ưu đãi và nguyên tắc hiển thị giá trên MoonPrice.",
    updatedAt: policyConfig.updatedAt,
    sections: [
      {
        heading: "1. Giá vé niêm yết",
        paragraphs: [
          "Giá bán được hiển thị tại trang thông tin sản phẩm hoặc trong quá trình đặt vé trên website. Giá áp dụng là giá được hệ thống hiển thị tại bước xác nhận đơn hàng trước khi khách hàng thanh toán.",
          "Tùy sản phẩm, giá có thể được phân theo người lớn, trẻ em, người cao tuổi, khách hàng thuộc nhóm ưu đãi hoặc loại vé/combo. Điều kiện độ tuổi, chiều cao, giấy tờ chứng minh và quyền lợi đi kèm được nêu tại trang sản phẩm hoặc theo quy định của nhà cung cấp.",
        ],
      },
      {
        heading: "2. Thành phần giá và phụ phí",
        paragraphs: [
          "Giá hiển thị sẽ nêu rõ các dịch vụ đã bao gồm và chưa bao gồm trong phạm vi thông tin MoonPrice nhận được từ nhà cung cấp. Các khoản phụ thu, dịch vụ tùy chọn hoặc chi phí phát sinh (nếu có) sẽ được thông báo trước khi khách hàng xác nhận thanh toán.",
          "Khách hàng nên kiểm tra kỹ ngày sử dụng, loại vé, số lượng, đối tượng áp dụng và quyền lợi của combo trước khi đặt hàng.",
        ],
      },
      {
        heading: "3. Khuyến mãi và ưu đãi",
        paragraphs: [
          "Chương trình khuyến mãi được áp dụng theo thời gian, số lượng, đối tượng và điều kiện công bố cụ thể. Một số ưu đãi không được cộng dồn hoặc không áp dụng đồng thời với chương trình khác.",
          "Trường hợp chương trình có yêu cầu giấy tờ xác minh, khách hàng cần xuất trình giấy tờ hợp lệ theo hướng dẫn của nhà cung cấp tại thời điểm sử dụng.",
        ],
      },
      {
        heading: "4. Điều chỉnh giá và sai sót hiển thị",
        paragraphs: [
          "Giá vé có thể thay đổi theo chính sách của nhà cung cấp, mùa cao điểm, ngày sử dụng hoặc chương trình ưu đãi. Việc thay đổi giá không ảnh hưởng đến đơn hàng đã được MoonPrice xác nhận hợp lệ, trừ trường hợp có sai sót rõ ràng hoặc trường hợp pháp luật/điều kiện giao dịch có quy định khác.",
          "Nếu phát hiện giá hiển thị có sai sót, MoonPrice sẽ liên hệ khách hàng để xác minh và thống nhất phương án phù hợp trước khi thu thêm khoản tiền hoặc hủy giao dịch. MoonPrice không tự ý thu thêm tiền khi chưa có thông báo và căn cứ phù hợp.",
        ],
      },
    ],
  },
  {
    slug: "thanh-toan",
    title: "Chính sách thanh toán",
    summary:
      "Các phương thức thanh toán, quy trình xác nhận giao dịch và hướng dẫn xử lý khi thanh toán chưa thành công.",
    updatedAt: policyConfig.updatedAt,
    sections: [
      {
        heading: "1. Phương thức thanh toán",
        paragraphs: [
          "MoonPrice cung cấp các phương thức thanh toán được hiển thị tại bước thanh toán của đơn hàng, có thể bao gồm chuyển khoản ngân hàng/QR thanh toán hoặc phương thức trực tuyến được tích hợp tại thời điểm giao dịch.",
          "Khách hàng chỉ thực hiện thanh toán theo thông tin do website hoặc nhân viên MoonPrice cung cấp qua kênh chính thức. Không chuyển tiền vào tài khoản cá nhân không được xác nhận.",
        ],
      },
      {
        heading: "2. Quy trình thanh toán",
        bullets: [
          "Khách hàng kiểm tra thông tin vé, ngày sử dụng, số lượng, thông tin người nhận và tổng tiền.",
          "Chọn phương thức thanh toán được hỗ trợ và thực hiện theo hướng dẫn.",
          "Hệ thống/nhân viên đối soát giao dịch. Đơn hàng chỉ được xác nhận thanh toán khi MoonPrice nhận được thông báo giao dịch thành công hoặc xác minh được tiền đã vào tài khoản.",
          "Sau khi thanh toán được xác nhận và vé được phát hành, MoonPrice gửi thông tin vé theo thông tin liên hệ khách hàng đã cung cấp.",
        ],
      },
      {
        heading: "3. Lưu ý khi chuyển khoản",
        bullets: [
          "Nhập chính xác số tiền và nội dung chuyển khoản/mã đơn hàng theo hướng dẫn.",
          "Không chỉnh sửa nội dung thanh toán nếu hệ thống yêu cầu mã tham chiếu cụ thể.",
          "Lưu lại chứng từ giao dịch cho đến khi đơn hàng được xác nhận.",
          "Không cung cấp mật khẩu ngân hàng, mã PIN hoặc mã OTP cho bất kỳ ai.",
        ],
      },
      {
        heading: "4. Thanh toán chưa được ghi nhận",
        paragraphs: [
          "Nếu tài khoản đã bị trừ tiền nhưng đơn hàng vẫn hiển thị chưa thanh toán, khách hàng không nên thanh toán lặp lại ngay. Vui lòng liên hệ [HOTLINE] hoặc [EMAIL HỖ TRỢ], cung cấp mã đơn hàng và chứng từ giao dịch để MoonPrice kiểm tra với ngân hàng/đơn vị thanh toán.",
          "Thời gian đối soát và hoàn trả (nếu phát sinh giao dịch trùng, sai hoặc không hoàn tất) phụ thuộc vào ngân hàng, đơn vị thanh toán và kết quả xác minh.",
        ],
      },
      {
        heading: "5. Hóa đơn và chứng từ",
        paragraphs: [
          "Khách hàng có nhu cầu nhận hóa đơn vui lòng cung cấp thông tin xuất hóa đơn và yêu cầu trong thời điểm phù hợp theo quy định. Việc phát hành hóa đơn được thực hiện theo tư cách pháp lý và nghĩa vụ của đơn vị bán hàng.",
        ],
      },
    ],
  },
  {
    slug: "dieu-kien-dich-vu",
    title: "Các điều kiện hoặc hạn chế trong việc cung cấp dịch vụ",
    summary:
      "Các điều kiện đặt vé, nhận vé, sử dụng vé và những giới hạn khách hàng cần lưu ý trước khi giao dịch.",
    updatedAt: policyConfig.updatedAt,
    sections: [
      {
        heading: "1. Điều kiện đặt vé",
        bullets: [
          "Khách hàng cần cung cấp thông tin chính xác, đầy đủ và có quyền sử dụng thông tin liên hệ đã đăng ký.",
          "Khách hàng kiểm tra kỹ điểm tham quan, loại vé, số lượng, ngày sử dụng, đối tượng áp dụng và thông tin người nhận trước khi thanh toán.",
          "Đơn hàng chỉ được xem là hoàn tất khi đáp ứng điều kiện xác nhận đơn và thanh toán được MoonPrice công bố.",
        ],
      },
      {
        heading: "2. Điều kiện nhận và sử dụng vé",
        bullets: [
          "Vé điện tử được gửi qua kênh liên hệ khách hàng đã đăng ký hoặc hiển thị theo hướng dẫn của đơn hàng.",
          "Khách hàng có trách nhiệm kiểm tra thông tin trên vé ngay sau khi nhận và liên hệ MoonPrice nếu phát hiện sai lệch.",
          "Khi đến điểm tham quan, khách hàng xuất trình mã vé/QR và giấy tờ chứng minh độ tuổi hoặc điều kiện ưu đãi nếu nhà cung cấp yêu cầu.",
          "Mỗi vé chỉ có giá trị sử dụng theo số lần, ngày, khung giờ và điều kiện ghi trên vé hoặc thông báo của nhà cung cấp.",
        ],
      },
      {
        heading: "3. Điều kiện từ nhà cung cấp",
        paragraphs: [
          "Dịch vụ tham quan, vui chơi do đơn vị vận hành điểm đến cung cấp. Giờ hoạt động, tuyến cáp, khu vực mở cửa, chương trình biểu diễn, dịch vụ ăn uống và tiện ích có thể thay đổi do thời tiết, bảo trì, vận hành hoặc yêu cầu của cơ quan có thẩm quyền.",
          "Khách hàng cần tuân thủ nội quy, hướng dẫn an toàn và quy định tại điểm tham quan. MoonPrice không có quyền thay đổi quy định vận hành của nhà cung cấp.",
        ],
      },
      {
        heading: "4. Hạn chế và trường hợp từ chối cung cấp",
        paragraphs: [
          "MoonPrice có thể tạm dừng hoặc từ chối xử lý đơn hàng khi phát hiện thông tin không chính xác, dấu hiệu gian lận, thanh toán không hợp lệ, yêu cầu trái pháp luật hoặc sản phẩm không còn khả năng cung cấp. MoonPrice sẽ thông báo và phối hợp xử lý khoản tiền đã nhận (nếu có) theo điều kiện giao dịch và quy định pháp luật.",
          "Khách hàng không được tự ý sửa đổi, sao chép để sử dụng nhiều lần, bán lại trái phép hoặc sử dụng vé sai mục đích/đối tượng.",
        ],
      },
      {
        heading: "5. Trách nhiệm của khách hàng",
        bullets: [
          "Đọc kỹ mô tả sản phẩm và các điều kiện vé trước khi thanh toán.",
          "Đến đúng địa điểm, ngày và khung giờ áp dụng (nếu có).",
          "Bảo mật mã vé/QR, không công khai hoặc chuyển cho người không có quyền sử dụng.",
          "Liên hệ MoonPrice ngay khi có vấn đề phát sinh trước ngày sử dụng vé.",
        ],
      },
    ],
  },
  {
    slug: "doi-tra-hoan-tien",
    title: "Chính sách giao vé, đổi trả và hoàn tiền",
    summary:
      "Quy định về phương thức cung cấp vé điện tử, yêu cầu đổi/hủy và xử lý hoàn tiền đối với dịch vụ du lịch.",
    updatedAt: policyConfig.updatedAt,
    sections: [
      {
        heading: "1. Phương thức cung cấp vé",
        paragraphs: [
          "MoonPrice cung cấp vé dưới hình thức vé điện tử hoặc hình thức khác được mô tả tại trang sản phẩm. Vé được gửi qua email, Zalo, số điện thoại hoặc kênh nhận vé đã được khách hàng lựa chọn/cung cấp trong quá trình đặt hàng.",
          "Thời điểm gửi vé phụ thuộc vào trạng thái thanh toán, khả năng phát hành của nhà cung cấp và thông tin đơn hàng. Nếu chưa nhận được vé trong thời gian dự kiến, khách hàng vui lòng kiểm tra thư rác/tin nhắn và liên hệ MoonPrice để được hỗ trợ.",
        ],
      },
      {
        heading: "2. Kiểm tra vé sau khi nhận",
        bullets: [
          "Kiểm tra tên sản phẩm, số lượng, ngày sử dụng, loại vé và thông tin áp dụng.",
          "Thông báo ngay cho MoonPrice nếu vé không nhận được, sai thông tin hoặc mã vé có dấu hiệu không hợp lệ.",
          "Không tự ý chỉnh sửa nội dung, mã QR hoặc thông tin trên vé.",
        ],
      },
      {
        heading: "3. Điều kiện đổi vé hoặc thay đổi ngày sử dụng",
        paragraphs: [
          "Việc đổi vé, đổi ngày, đổi loại vé hoặc thay đổi thông tin phụ thuộc vào điều kiện của từng sản phẩm và nhà cung cấp. Một số loại vé có thể không hỗ trợ đổi sau khi phát hành hoặc sau khi đã sử dụng.",
          "Khách hàng cần gửi yêu cầu qua [HOTLINE] hoặc [EMAIL HỖ TRỢ] trước ngày sử dụng, cung cấp mã đơn hàng và nội dung cần thay đổi. MoonPrice sẽ kiểm tra điều kiện với nhà cung cấp và thông báo phí phát sinh (nếu có) trước khi thực hiện.",
          "Yêu cầu chỉ được xem là chấp thuận khi MoonPrice xác nhận bằng văn bản/tin nhắn qua kênh liên hệ chính thức.",
        ],
      },
      {
        heading: "4. Điều kiện hủy vé và hoàn tiền",
        paragraphs: [
          "Điều kiện hủy và hoàn tiền được áp dụng theo chính sách của từng loại vé/nhà cung cấp và thông tin được công bố tại trang sản phẩm hoặc trước khi khách hàng thanh toán. Khách hàng cần đọc kỹ điều kiện này trước khi đặt mua.",
          "Trường hợp vé được xác định là không hoàn, đã sử dụng, đã quá hạn, phát hành theo chương trình ưu đãi có điều kiện không hủy hoặc thuộc trường hợp nhà cung cấp không chấp nhận hoàn, MoonPrice có thể không thực hiện hoàn tiền, trừ khi pháp luật hoặc thỏa thuận cụ thể có quy định khác.",
          "Nếu dịch vụ bị hủy hoặc không thể cung cấp do lỗi từ MoonPrice/nhà cung cấp, MoonPrice sẽ phối hợp với khách hàng để áp dụng phương án phù hợp như đổi lịch, đổi sản phẩm hoặc hoàn khoản tiền đủ điều kiện theo thông báo và quy định áp dụng.",
        ],
      },
      {
        heading: "5. Quy trình yêu cầu hoàn tiền",
        bullets: [
          "Bước 1: Khách hàng gửi yêu cầu, mã đơn hàng, lý do và thông tin liên hệ.",
          "Bước 2: MoonPrice kiểm tra tình trạng vé, giao dịch và điều kiện hoàn của nhà cung cấp.",
          "Bước 3: MoonPrice thông báo kết quả, số tiền được hoàn (nếu có), khoản phí khấu trừ hợp lệ (nếu có) và phương thức hoàn.",
          "Bước 4: Sau khi khách hàng xác nhận thông tin cần thiết, MoonPrice/đơn vị liên quan tiến hành hoàn tiền và thông báo kết quả.",
        ],
      },
      {
        heading: "6. Phương thức và thời gian hoàn tiền",
        paragraphs: [
          "Tiền được hoàn về phương thức thanh toán ban đầu hoặc tài khoản hợp lệ do các bên thống nhất, tùy khả năng của ngân hàng/đơn vị thanh toán và quy định áp dụng. MoonPrice không yêu cầu khách hàng cung cấp mật khẩu hoặc mã OTP để nhận tiền hoàn.",
          "Thời gian xử lý dự kiến: [SỐ NGÀY LÀM VIỆC] kể từ khi yêu cầu được duyệt và MoonPrice có đủ thông tin. Thời gian tiền hiển thị trong tài khoản có thể phụ thuộc vào ngân hàng hoặc đơn vị thanh toán.",
        ],
      },
      {
        heading: "7. Trường hợp cần lưu ý",
        bullets: [
          "Khách hàng nhập sai thông tin liên hệ hoặc không kiểm tra vé sau khi nhận.",
          "Khách hàng đến sai ngày/địa điểm hoặc không đáp ứng điều kiện sử dụng được ghi trên vé.",
          "Vé đã được quét, sử dụng, chuyển nhượng hoặc bị lộ mã QR dẫn đến việc sử dụng bởi người khác.",
          "Các trường hợp bất khả kháng hoặc thay đổi vận hành từ nhà cung cấp sẽ được xem xét theo điều kiện vé và quy định pháp luật.",
        ],
      },
    ],
  },
  {
    slug: "ho-tro",
    title: "Hình thức hỗ trợ trực tuyến",
    summary:
      "Các kênh liên hệ chính thức để được hỗ trợ trong quá trình tìm kiếm, đặt mua và sử dụng vé.",
    updatedAt: policyConfig.updatedAt,
    sections: [
      {
        heading: "1. Các kênh hỗ trợ",
        paragraphs: [
          "Khách hàng có thể liên hệ MoonPrice qua hotline, email, Zalo, Facebook hoặc tính năng chat trực tuyến (nếu đang được kích hoạt trên website). Thông tin liên hệ chính thức được công bố tại trang này và chân trang website.",
        ],
      },
      {
        heading: "2. Hỗ trợ đơn hàng",
        bullets: [
          "Tư vấn thông tin sản phẩm, loại vé, đối tượng áp dụng và ngày sử dụng.",
          "Kiểm tra trạng thái đặt vé và thanh toán.",
          "Hỗ trợ gửi lại vé điện tử hoặc kiểm tra thông tin vé.",
          "Tiếp nhận yêu cầu đổi vé, hủy vé, hoàn tiền và khiếu nại theo điều kiện áp dụng.",
        ],
      },
      {
        heading: "3. Thời gian hỗ trợ",
        paragraphs: [
          "Thời gian hỗ trợ: 24/7. Các yêu cầu ngoài giờ sẽ được tiếp nhận và phản hồi trong thời gian làm việc gần nhất. Thời gian xử lý thực tế có thể phụ thuộc vào phản hồi của nhà cung cấp hoặc đơn vị thanh toán.",
        ],
      },
      {
        heading: "4. Lưu ý an toàn",
        paragraphs: [
          "MoonPrice không yêu cầu khách hàng cung cấp mật khẩu ngân hàng, mã PIN, mã OTP hoặc thông tin đăng nhập tài khoản. Khách hàng chỉ nên trao đổi và thanh toán qua website hoặc kênh liên hệ chính thức được công bố.",
        ],
      },
    ],
  },

  {
    slug: "thong-tin-chu-so-huu",
    title: "Thông tin chủ sở hữu",
    summary:
      "Thông tin về đơn vị sở hữu, quản lý và chịu trách nhiệm vận hành website MoonPrice, cùng các thông tin liên hệ chính thức.",
    updatedAt: policyConfig.updatedAt,
    sections: [
      {
        heading: "1. Thông tin đơn vị sở hữu website",
        paragraphs: [
          "MoonPrice là nền tảng cung cấp thông tin, tư vấn và hỗ trợ khách hàng tìm kiếm, đặt mua vé tham quan, vui chơi, giải trí và các dịch vụ du lịch.",
          "Website MoonPrice được quản lý và vận hành bởi đơn vị sở hữu được công bố dưới đây:",
        ],
        bullets: [
          "Tên đơn vị: CÔNG TY CỔ PHẦN ĐÀ NẴNG TOURIST",
          "Tên thương hiệu: MoonPrice",
          "Mã số thuế: 0402141272",
          "Địa chỉ đăng ký kinh doanh: 04 Hoàng Văn Thải, Phường Hòà Minh, Quận Liên Chiều, Thành phố Đà Nẵng, Việt Nam",
          "Người đại diện: HOÀNG THỊ MỸ",
          "Chức vụ: Giám đốc",
        ],
      },
      {
        heading: "2. Thông tin website",
        bullets: [
          "Tên website: MoonPrice",
          "Địa chỉ website: [Tên miền chính thức]",
          "Lĩnh vực hoạt động: Du lịch, dịch vụ đặt vé tham quan và vui chơi giải trí.",
          "Phạm vi cung cấp dịch vụ: Khách hàng trong nước và quốc tế.",
        ],
      },
      {
        heading: "3. Thông tin liên hệ chính thức",
        paragraphs: [
          "Khách hàng có thể liên hệ với MoonPrice thông qua các kênh chính thức dưới đây để được tư vấn, hỗ trợ đặt vé, thanh toán và giải quyết các vấn đề liên quan đến dịch vụ.",
        ],
        bullets: [
          "Hotline: [Số điện thoại]",
          "Email: [Địa chỉ email]",
          "Zalo: [Đường dẫn Zalo]",
          "Facebook: [Đường dẫn Fanpage]",
          "Địa chỉ văn phòng: [Địa chỉ liên hệ]",
        ],
      },
      {
        heading: "4. Trách nhiệm quản lý và vận hành",
        paragraphs: [
          "Đơn vị sở hữu chịu trách nhiệm quản lý, duy trì và vận hành website MoonPrice; cung cấp thông tin về sản phẩm, dịch vụ và giá bán; tiếp nhận và xử lý các yêu cầu hỗ trợ, phản ánh và khiếu nại của khách hàng theo chính sách được công bố.",
          "MoonPrice cam kết nỗ lực cung cấp thông tin rõ ràng, minh bạch và bảo vệ quyền lợi hợp pháp của khách hàng trong quá trình sử dụng dịch vụ.",
        ],
      },
      {
        heading: "5. Quyền sở hữu trí tuệ",
        paragraphs: [
          "Tên thương hiệu MoonPrice, nội dung, hình ảnh, giao diện và các thành phần thuộc website được bảo vệ theo quy định pháp luật về sở hữu trí tuệ, trừ các nội dung, hình ảnh và nhãn hiệu thuộc quyền sở hữu của bên thứ ba.",
          "Mọi hành vi sao chép, sử dụng hoặc khai thác nội dung website cho mục đích thương mại khi chưa được sự đồng ý của chủ sở hữu có thể bị xử lý theo quy định pháp luật.",
        ],
      },
      {
        heading: "6. Cam kết thông tin",
        paragraphs: [
          "MoonPrice cam kết các thông tin về đơn vị sở hữu và kênh liên hệ được công bố trên website là thông tin chính thức. Khi có thay đổi liên quan đến chủ sở hữu, địa chỉ hoặc thông tin liên hệ, nội dung trang này sẽ được cập nhật để khách hàng thuận tiện tra cứu.",
        ],
      },
    ],
  },
];

export function getPolicy(slug: string) {
  return policies.find((policy) => policy.slug === slug);
}
