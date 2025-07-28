# Hướng Dẫn Sử Dụng Hệ Thống Cá Nhân Hóa Website Đám Cưới

## Tổng Quan

Hệ thống cá nhân hóa cho phép bạn tạo các URL riêng biệt cho từng khách mời, mỗi URL sẽ hiển thị website đám cưới với thông tin được cá nhân hóa dành riêng cho khách mời đó.

## Tính Năng Chính

### 1. **Trang Chủ Cá Nhân Hóa**
- Lời chào cá nhân với tên và xưng hô của khách mời
- Tin nhắn cá nhân riêng cho từng khách mời
- Hiển thị thông tin sự kiện phù hợp (nhà trai/nhà gái/cả hai)

### 2. **Thiệp Mời Cá Nhân Hóa**
- Thiệp mời có tên khách mời
- Chỉ hiển thị sự kiện mà khách mời được mời tham dự
- Lời mời được cá nhân hóa theo mối quan hệ

### 3. **Form RSVP Thông Minh**
- Tự động điền tên khách mời
- Lưu thông tin khách mời vào database
- Theo dõi phản hồi từng khách mời

### 4. **Trang Quản Lý Admin**
- Thêm/sửa/xóa khách mời
- Tạo URL cá nhân hóa tự động
- Thống kê khách mời theo từng nhóm
- Sao chép URL để gửi cho khách mời

## Cách Sử Dụng

### Bước 1: Truy Cập Trang Quản Lý
```
http://your-domain.com/admin/guests
```

### Bước 2: Thêm Khách Mời Mới
1. Nhấn nút "Thêm khách mời"
2. Điền thông tin:
   - **Họ tên**: Tên đầy đủ của khách mời
   - **Xưng hô**: Anh/Chị/Bạn/Cô/Chú/Bác/Em
   - **Mối quan hệ**: bạn thân, đồng nghiệp, họ hàng, v.v.
   - **Được mời tham dự**: Cả hai ngày/Nhà trai/Nhà gái
   - **Lời nhắn cá nhân**: Tin nhắn riêng cho khách mời này
   - **Ghi chú đặc biệt**: (Tùy chọn) Ghi chú thêm nếu cần

### Bước 3: Lấy URL Cá Nhân Hóa
1. Sau khi thêm khách mời, hệ thống sẽ tự động tạo URL
2. Nhấn "Sao chép URL" để copy link
3. Nhấn "Xem trước" để kiểm tra giao diện

### Bước 4: Gửi Lời Mời
- Gửi URL cá nhân hóa cho từng khách mời qua:
  - SMS/Zalo/Messenger
  - Email
  - In thành QR code

## Ví Dụ URL Cá Nhân Hóa

```
Khách mời: Nguyễn Văn A
URL: http://your-domain.com/nguyen-van-a

Khách mời: Trần Thị B  
URL: http://your-domain.com/tran-thi-b
```

## Các Tính Năng Cá Nhân Hóa

### 1. **Hero Section**
```
Kính gửi Anh Nguyễn Văn A
[Tin nhắn cá nhân]
```

### 2. **Thiệp Mời**
- Chỉ hiển thị sự kiện được mời
- Tên khách mời trên thiệp

### 3. **RSVP Form**
- Tên được điền sẵn
- Không thể chỉnh sửa (chỉ đọc)
- Lưu thông tin khách mời

### 4. **Các Section Khác**
- Timeline: Thông điệp cá nhân hóa
- Gift: Lời cảm ơn có tên khách mời
- Thank You: Tin nhắn cảm ơn cá nhân

## Quản Lý Khách Mời

### Tìm Kiếm & Lọc
- **Tìm kiếm**: Theo tên hoặc mối quan hệ
- **Lọc**: Theo loại mời (Tất cả/Cả hai ngày/Nhà trai/Nhà gái)

### Thống Kê
- Tổng số khách mời
- Số khách mời nhà trai
- Số khách mời nhà gái  
- Số khách mời cả hai ngày

## Cấu Trúc File

```
src/
├── app/
│   ├── [guest]/
│   │   └── page.tsx          # Trang cá nhân hóa
│   └── admin/
│       └── guests/
│           └── page.tsx      # Trang quản lý
├── components/
│   ├── PersonalizedWeddingInvitation.tsx
│   └── RSVPForm.tsx          # Form RSVP cá nhân hóa
└── lib/
    └── guestData.ts          # Quản lý dữ liệu khách mời
```

## Lưu Ý Quan Trọng

### 1. **Slug Generation**
- Tự động tạo từ tên khách mời
- Loại bỏ dấu tiếng Việt
- Chuyển thành lowercase
- Thay khoảng trắng bằng dấu gạch ngang

### 2. **URL Format**
```
Tên: Nguyễn Văn Anh
Slug: nguyen-van-anh
URL: /nguyen-van-anh
```

### 3. **Error Handling**
- Nếu URL không tồn tại → Hiển thị trang lỗi
- Link về trang chính
- Thông báo lỗi thân thiện

### 4. **Responsive Design**
- Tối ưu cho mobile
- Giao diện đẹp trên mọi thiết bị

## Mở Rộng Tính Năng

### Có Thể Thêm:
1. **QR Code Generator**: Tạo QR code cho mỗi URL
2. **Analytics**: Theo dõi lượt truy cập từng URL
3. **Email Integration**: Gửi email tự động
4. **SMS Integration**: Gửi SMS hàng loạt
5. **Export Data**: Xuất danh sách khách mời
6. **Import CSV**: Nhập khách mời từ file Excel

### Database Integration:
- Hiện tại: Lưu trong memory (mất khi restart)
- Nên nâng cấp: Firebase/Supabase/MongoDB

## Hỗ Trợ

Nếu gặp vấn đề, hãy kiểm tra:
1. URL có đúng format không
2. Khách mời đã được thêm vào hệ thống chưa
3. Thông tin cá nhân hóa có đầy đủ không

---

**Chúc bạn có một đám cưới thật hạnh phúc! 💕**
