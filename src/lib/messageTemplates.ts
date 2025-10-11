export interface MessageTemplate {
  id: string;
  category: string;
  relationship: string;
  title: string;
  message: string;
}

export const messageTemplates: MessageTemplate[] = [
  // Bạn thân
  {
    id: 'friend-1',
    category: 'Bạn bè',
    relationship: 'bạn thân',
    title: 'Bạn thân từ thời học sinh',
    message: 'Cảm ơn bạn đã luôn là người bạn tốt nhất và đồng hành cùng chúng mình trong suốt thời gian qua. Từ những ngày học sinh ngây thơ đến bây giờ, tình bạn của chúng ta vẫn luôn bền chặt. Sự hiện diện của bạn trong ngày trọng đại này sẽ làm cho đám cưới của chúng mình thêm ý nghĩa và trọn vẹn.'
  },
  {
    id: 'friend-2',
    category: 'Bạn bè',
    relationship: 'bạn thân',
    title: 'Người bạn tri kỷ',
    message: 'Bạn là người hiểu tôi nhất, là người luôn lắng nghe và chia sẻ mọi niềm vui nỗi buồn. Những kỷ niệm đẹp chúng ta đã cùng nhau trải qua sẽ mãi là những điều đáng nhớ nhất trong cuộc đời tôi. Mong bạn sẽ tiếp tục đồng hành cùng chúng mình trong chương mới của cuộc đời này.'
  },
  {
    id: 'friend-3',
    category: 'Bạn bè',
    relationship: 'bạn thân',
    title: 'Bạn thân không thể thiếu',
    message: 'Không có bạn thì ngày vui của tôi sẽ không trọn vẹn! Bạn là người đã cùng tôi cười, cùng tôi khóc, cùng tôi vượt qua bao khó khăn trong cuộc sống. Hôm nay, tôi muốn bạn chứng kiến khoảnh khắc hạnh phúc nhất của đời tôi và tiếp tục là người bạn tuyệt vời như vậy mãi mãi.'
  },
  {
    id: 'friend-4',
    category: 'Bạn bè',
    relationship: 'bạn thân',
    title: 'Người bạn đặc biệt',
    message: 'Tình bạn của chúng ta đã trải qua bao năm tháng và vẫn luôn tươi mới như ngày đầu. Bạn là người đã dạy tôi ý nghĩa của tình bạn chân thành, của sự chia sẻ và yêu thương. Tôi không thể tưởng tượng ngày cưới của mình mà không có sự hiện diện của bạn.'
  },

  // Đồng nghiệp
  {
    id: 'colleague-1',
    category: 'Công việc',
    relationship: 'đồng nghiệp',
    title: 'Đồng nghiệp thân thiết',
    message: 'Cảm ơn bạn đã luôn là người đồng nghiệp tuyệt vời và cũng là người bạn tốt trong công việc. Những ngày làm việc cùng nhau đã tạo nên những kỷ niệm đẹp và tình bạn quý giá. Sự hiện diện của bạn trong ngày trọng đại này sẽ làm cho đám cưới của chúng mình thêm ý nghĩa.'
  },
  {
    id: 'colleague-2',
    category: 'Công việc',
    relationship: 'đồng nghiệp',
    title: 'Người cộng sự đáng quý',
    message: 'Bạn không chỉ là đồng nghiệp mà còn là người thầy, người bạn đã hướng dẫn và hỗ trợ tôi rất nhiều trong công việc. Những kinh nghiệm quý báu mà bạn chia sẻ đã giúp tôi trưởng thành hơn. Tôi rất vinh dự khi có bạn tham dự đám cưới của mình.'
  },
  {
    id: 'colleague-3',
    category: 'Công việc',
    relationship: 'đồng nghiệp',
    title: 'Đồng đội tin cậy',
    message: 'Làm việc cùng bạn luôn là một niềm vui và động lực lớn đối với tôi. Bạn là người đồng đội đáng tin cậy, luôn sẵn sàng hỗ trợ và chia sẻ. Tình đồng nghiệp của chúng ta đã phát triển thành tình bạn chân thành, và tôi mong bạn sẽ có mặt để chúc phúc cho hạnh phúc mới của tôi.'
  },

  // Họ hàng
  {
    id: 'family-1',
    category: 'Gia đình',
    relationship: 'họ hàng',
    title: 'Người anh/chị trong gia đình',
    message: 'Anh/Chị luôn là tấm gương sáng cho em noi theo, là người đã dạy em biết yêu thương và quan tâm đến gia đình. Những lời khuyên và sự động viên của anh/chị đã giúp em rất nhiều trong cuộc sống. Em rất mong anh/chị sẽ có mặt để chứng kiến hạnh phúc của em.'
  },
  {
    id: 'family-2',
    category: 'Gia đình',
    relationship: 'họ hàng',
    title: 'Người cô/dì thân yêu',
    message: 'Cô/Dì luôn là người phụ nữ đáng yêu và tài năng mà chúng cháu rất ngưỡng mộ. Sự quan tâm và yêu thương của cô/dì dành cho gia đình chúng cháu thật sự rất ý nghĩa. Chúng cháu rất mong cô/dì sẽ có mặt trong ngày vui này để chúc phúc cho hạnh phúc mới của chúng cháu.'
  },
  {
    id: 'family-3',
    category: 'Gia đình',
    relationship: 'họ hàng',
    title: 'Người chú/bác kính yêu',
    message: 'Chú/Bác luôn là tấm gương sáng cho chúng cháu noi theo, là người đã truyền đạt những giá trị tốt đẹp của gia đình. Những kinh nghiệm sống và lời khuyên quý báu của chú/bác đã giúp chúng cháu trưởng thành hơn. Chúng cháu rất vinh dự khi có chú/bác tham dự đám cưới.'
  },
  {
    id: 'family-4',
    category: 'Gia đình',
    relationship: 'họ hàng',
    title: 'Người em thân yêu',
    message: 'Em luôn là niềm tự hào của anh/chị, là người em ngoan hiền và tài giỏi. Dù em còn trẻ nhưng sự hiểu biết và tình cảm của em dành cho gia đình thật đáng quý. Anh/Chị rất mong em sẽ có mặt để chia sẻ niềm vui trong ngày trọng đại này.'
  },

  // Thầy cô
  {
    id: 'teacher-1',
    category: 'Thầy cô',
    relationship: 'thầy cô',
    title: 'Thầy/Cô giáo kính yêu',
    message: 'Thầy/Cô không chỉ là người thầy truyền đạt kiến thức mà còn là người định hướng cuộc đời cho em. Những bài học quý giá về cuộc sống mà thầy/cô dạy em sẽ mãi là hành trang quý báu nhất. Em rất vinh dự khi có thầy/cô tham dự đám cưới và chúc phúc cho hạnh phúc mới của em.'
  },
  {
    id: 'teacher-2',
    category: 'Thầy cô',
    relationship: 'thầy cô',
    title: 'Người thầy đáng kính',
    message: 'Thầy/Cô đã dạy em không chỉ kiến thức sách vở mà còn dạy em cách làm người, cách sống có ích cho xã hội. Tình thầy trò thiêng liêng này sẽ mãi là điều em trân trọng nhất. Em mong thầy/cô sẽ có mặt để chứng kiến em bước vào giai đoạn mới của cuộc đời.'
  },

  // Hàng xóm
  {
    id: 'neighbor-1',
    category: 'Hàng xóm',
    relationship: 'hàng xóm',
    title: 'Người hàng xóm thân thiết',
    message: 'Cảm ơn bác/anh/chị đã luôn quan tâm và giúp đỡ gia đình chúng mình như người thân trong nhà. Tình nghĩa hàng xóm tốt đẹp này đã tạo nên những kỷ niệm đáng nhớ. chúng mình rất mong bác/anh/chị sẽ có mặt để chia sẻ niềm vui trong ngày trọng đại này.'
  },
  {
    id: 'neighbor-2',
    category: 'Hàng xóm',
    relationship: 'hàng xóm',
    title: 'Hàng xóm như người thân',
    message: 'Bác/Anh/Chị đã sống gần gũi với gia đình chúng mình từ lâu, luôn sẵn sàng giúp đỡ và chia sẻ. Tình cảm chân thành mà bác/anh/chị dành cho gia đình chúng mình thật đáng quý. chúng mình rất vinh dự khi có bác/anh/chị tham dự đám cưới.'
  },

  // Bạn học
  {
    id: 'classmate-1',
    category: 'Bạn học',
    relationship: 'bạn học',
    title: 'Bạn cùng lớp thân thiết',
    message: 'Những năm tháng học sinh với bạn thật đáng nhớ! Chúng ta đã cùng nhau học tập, vui chơi và trưởng thành. Tình bạn học trò trong sáng này là một trong những điều đẹp nhất của tuổi trẻ. Tôi rất mong bạn sẽ có mặt để chia sẻ niềm vui trong ngày trọng đại này.'
  },
  {
    id: 'classmate-2',
    category: 'Bạn học',
    relationship: 'bạn học',
    title: 'Người bạn đồng hành',
    message: 'Bạn là người đã cùng tôi trải qua những năm tháng học tập khó khăn nhưng đầy ý nghĩa. Chúng ta đã cùng nhau vượt qua bao kỳ thi, cùng chia sẻ những ước mơ tuổi trẻ. Giờ đây khi tôi bước vào giai đoạn mới của cuộc đời, tôi rất mong có sự hiện diện của bạn.'
  },

  // Sếp/Cấp trên
  {
    id: 'boss-1',
    category: 'Cấp trên',
    relationship: 'sếp',
    title: 'Người lãnh đạo kính trọng',
    message: 'Cảm ơn anh/chị đã luôn tin tưởng, hướng dẫn và tạo điều kiện cho tôi phát triển trong công việc. Những kinh nghiệm quý báu mà anh/chị truyền đạt đã giúp tôi trưởng thành rất nhiều. Tôi rất vinh dự khi có anh/chị tham dự đám cưới của mình.'
  },
  {
    id: 'boss-2',
    category: 'Cấp trên',
    relationship: 'sếp',
    title: 'Người thầy trong công việc',
    message: 'Anh/Chị không chỉ là người lãnh đạo mà còn là người thầy đã dạy tôi rất nhiều điều trong công việc và cuộc sống. Sự quan tâm và hỗ trợ của anh/chị đã giúp tôi có được thành công như hôm nay. Tôi mong anh/chị sẽ có mặt để chúc phúc cho hạnh phúc mới của tôi.'
  },

  // Khách VIP
  {
    id: 'vip-1',
    category: 'Khách VIP',
    relationship: 'khách quý',
    title: 'Khách quý đặc biệt',
    message: 'chúng mình rất vinh dự được mời anh/chị tham dự đám cưới của mình. Sự hiện diện của anh/chị sẽ làm cho ngày trọng đại này trở nên đặc biệt và ý nghĩa hơn. chúng mình mong anh/chị sẽ dành thời gian quý báu để chia sẻ niềm vui cùng gia đình chúng mình.'
  },
  {
    id: 'vip-2',
    category: 'Khách VIP',
    relationship: 'khách quý',
    title: 'Người đáng kính trọng',
    message: 'Anh/Chị là người mà chúng mình rất kính trọng và ngưỡng mộ. Những thành tựu và phẩm chất tốt đẹp của anh/chị luôn là tấm gương sáng cho chúng mình noi theo. chúng mình rất mong anh/chị sẽ có mặt để chúc phúc và chia sẻ kinh nghiệm sống cho vợ chồng trẻ chúng mình.'
  },

  // Bạn thời thơ ấu
  {
    id: 'childhood-1',
    category: 'Bạn thời thơ ấu',
    relationship: 'bạn thời thơ ấu',
    title: 'Người bạn tuổi thơ',
    message: 'Bạn là người bạn từ thuở nhỏ, đã cùng tôi trải qua những năm tháng tuổi thơ đáng nhớ nhất. Dù thời gian có trôi qua và chúng ta có ít gặp nhau hơn, nhưng tình bạn tuổi thơ trong sáng ấy vẫn luôn là điều quý giá nhất. Tôi rất mong bạn sẽ có mặt trong ngày trọng đại này.'
  },
  {
    id: 'childhood-2',
    category: 'Bạn thời thơ ấu',
    relationship: 'bạn thời thơ ấu',
    title: 'Kỷ niệm tuổi thơ',
    message: 'Những kỷ niệm tuổi thơ với bạn luôn là điều tôi trân trọng nhất. Chúng ta đã cùng nhau lớn lên, cùng chơi đùa và chia sẻ bao điều thú vị. Giờ đây khi tôi bước vào giai đoạn mới của cuộc đời, tôi muốn bạn - người bạn tuổi thơ thân thiết - có mặt để chứng kiến hạnh phúc của tôi.'
  },

  // Mentor/Người cố vấn
  {
    id: 'mentor-1',
    category: 'Người cố vấn',
    relationship: 'người cố vấn',
    title: 'Người dẫn đường',
    message: 'Anh/Chị là người đã định hướng và hướng dẫn tôi rất nhiều trong cuộc sống. Những lời khuyên quý báu và kinh nghiệm sống mà anh/chị chia sẻ đã giúp tôi trưởng thành và có được hạnh phúc như hôm nay. Tôi rất mong anh/chị sẽ có mặt để chúc phúc cho bước ngoặt mới trong đời tôi.'
  },
  {
    id: 'mentor-2',
    category: 'Người cố vấn',
    relationship: 'người cố vấn',
    title: 'Người thầy cuộc đời',
    message: 'Anh/Chị không chỉ là người cố vấn mà còn là người thầy cuộc đời của tôi. Những bài học về cuộc sống, về cách làm người mà anh/chị dạy tôi sẽ mãi là hành trang quý giá nhất. Tôi rất vinh dự khi có anh/chị tham dự đám cưới và tiếp tục hướng dẫn tôi trong hành trình mới này.'
  }
];

// Hàm lấy template theo category
export function getTemplatesByCategory(category: string): MessageTemplate[] {
  return messageTemplates.filter(template => template.category === category);
}

// Hàm lấy template theo relationship
export function getTemplatesByRelationship(relationship: string): MessageTemplate[] {
  return messageTemplates.filter(template => template.relationship === relationship);
}

// Hàm lấy tất cả categories
export function getAllCategories(): string[] {
  return [...new Set(messageTemplates.map(template => template.category))];
}

// Hàm lấy template ngẫu nhiên
export function getRandomTemplate(): MessageTemplate {
  return messageTemplates[Math.floor(Math.random() * messageTemplates.length)];
}

// Hàm tìm kiếm template
export function searchTemplates(keyword: string): MessageTemplate[] {
  const lowerKeyword = keyword.toLowerCase();
  return messageTemplates.filter(template => 
    template.title.toLowerCase().includes(lowerKeyword) ||
    template.message.toLowerCase().includes(lowerKeyword) ||
    template.relationship.toLowerCase().includes(lowerKeyword)
  );
}
