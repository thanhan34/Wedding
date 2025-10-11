# Hướng Dẫn Sử Dụng Link Mời Cá Nhân Hóa

## 📋 Tổng Quan

Hệ thống thiệp mời của bạn có tính năng **cá nhân hóa** - mỗi khách mời sẽ có một link riêng với:
- Lời mời được cá nhân hóa theo tên và mối quan hệ
- Thông tin sự kiện phù hợp (nhà trai/nhà gái/cả hai)
- Trải nghiệm thiệp mời độc đáo cho từng người

---

## 🔗 Cách Hoạt Động

### 1. Khi Thêm Khách Mới

Khi bạn thêm khách mời mới trong trang **Quản Lý Khách Mời** (`/admin/guests`):

1. Nhập thông tin khách: Tên, xưng hô, mối quan hệ, lời nhắn cá nhân
2. Hệ thống **tự động tạo slug** từ tên khách
3. Link mời được tạo theo format: `https://your-domain.com/[slug]`

**Ví dụ:**
- Tên khách: `Nguyễn Văn A`
- Slug tự động: `nguyen-van-a`
- Link mời: `https://your-domain.com/nguyen-van-a`

### 2. Quy Tắc Tạo Slug

Hệ thống tự động chuyển đổi tên thành slug:
- Chuyển thành chữ thường
- Bỏ dấu tiếng Việt
- Thay khoảng trắng bằng dấu gạch ngang (-)
- Chỉ giữ lại chữ cái, số và dấu gạch ngang

**Ví dụ:**
| Tên Khách | Slug | Link |
|-----------|------|------|
| Nguyễn Văn A | nguyen-van-a | `/nguyen-van-a` |
| Trần Thị Bình | tran-thi-binh | `/tran-thi-binh` |
| Lê Minh Cường | le-minh-cuong | `/le-minh-cuong` |
| Phạm Hữu Đức | pham-huu-duc | `/pham-huu-duc` |

---

## 📱 Cách Lấy và Gửi Link Mời

### Bước 1: Truy Cập Trang Quản Lý
1. Vào trang: `https://your-domain.com/admin/guests`
2. Đăng nhập nếu cần

### Bước 2: Xem Link Của Từng Khách
Mỗi khách mời trong danh sách sẽ có một box **"URL Cá nhân hóa"** bên phải với:

```
┌─────────────────────────────┐
│  URL Cá nhân hóa            │
├─────────────────────────────┤
│  https://your-domain.com/   │
│  nguyen-van-a               │
├─────────────────────────────┤
│  [📋 Sao chép URL]          │
│  [🔗 Xem trước]             │
└─────────────────────────────┘
```

### Bước 3: Sao Chép Link
1. Click nút **"Sao chép URL"** 
2. Link sẽ được copy vào clipboard
3. Thông báo "Đã sao chép vào clipboard!" xuất hiện

### Bước 4: Gửi Link Cho Khách
Paste link vào:
- ✉️ Email
- 💬 Zalo, Facebook Messenger
- 📱 SMS
- 🔗 Bất kỳ phương tiện nào bạn muốn

---

## 🎯 Sử Dụng Nâng Cao

### Xem Trước Link
Click nút **"Xem trước"** để:
- Kiểm tra thiệp mời trước khi gửi
- Đảm bảo thông tin hiển thị chính xác
- Kiểm tra lời nhắn cá nhân hóa

### Tìm Kiếm Nhanh
Sử dụng thanh tìm kiếm để:
- Tìm khách theo tên
- Lọc theo mối quan hệ
- Lọc theo nhà trai/nhà gái/cả hai

### Chỉnh Sửa Thông Tin
Nếu cần sửa thông tin khách:
1. Click nút **✏️ Edit**
2. Cập nhật thông tin
3. **Lưu ý:** Nếu đổi tên, slug và link cũng sẽ thay đổi!

---

## ⚠️ Lưu Ý Quan Trọng

### 1. Slug Phải Duy Nhất
- Mỗi slug chỉ có thể dùng cho 1 khách
- Nếu trùng tên, thêm số phân biệt: `nguyen-van-a-2`

### 2. Link Không Thay Đổi
- Sau khi tạo, bạn có thể chỉnh sửa thông tin khách
- NHƯNG nếu đổi TÊN, slug sẽ thay đổi → link cũ không còn hoạt động

### 3. Link Công Khai
- Bất kỳ ai có link đều có thể truy cập
- Không cần đăng nhập
- Phù hợp để chia sẻ

---

## 💡 Mẹo Sử Dụng

### Mẹo 1: Gửi Link Kèm Lời Nhắn
```
Xin chào Anh Nguyễn Văn A,

chúng mình TRÂN TRỌNG KÍNH MỜI ! anh tham dự lễ cưới của chúng mình.
Vui lòng xem thiệp mời cá nhân tại:

👉 https://your-domain.com/nguyen-van-a

Rất mong được đón tiếp anh!
```

### Mẹo 2: Tạo QR Code
- Sử dụng công cụ tạo QR code online
- Chuyển link thành mã QR
- In vào thiệp giấy nếu muốn

### Mẹo 3: Rút Gọn Link
Nếu link quá dài, sử dụng:
- Bitly.com
- Tinyurl.com
- Hoặc dịch vụ rút gọn khác

---

## 🔧 Xử Lý Vấn Đề

### Link Không Hoạt Động?
1. ✅ Kiểm tra chính tả
2. ✅ Đảm bảo website đang chạy
3. ✅ Kiểm tra khách có tồn tại trong database

### Muốn Đổi Link?
1. Vào trang quản lý khách
2. Xóa khách cũ
3. Tạo khách mới với tên khác
4. Gửi link mới cho khách

### Khách Không Nhận Được?
1. ✅ Kiểm tra khách đã nhận tin nhắn
2. ✅ Thử gửi qua phương tiện khác
3. ✅ Kiểm tra link có bị lọc spam

---

## 📊 Thống Kê và Quản Lý

Trang quản lý hiển thị:
- 📈 **Tổng số khách**: Tất cả khách mời
- 👔 **Nhà trai**: Khách mời bên chú rể
- 👰 **Nhà gái**: Khách mời bên cô dâu
- 💑 **Cả hai**: Khách tham dự cả 2 buổi

---

## 🎨 Ví Dụ Thực Tế

### Kịch Bản 1: Thêm Bạn Thân
```
1. Vào /admin/guests
2. Click "Thêm khách mời"
3. Nhập:
   - Tên: Nguyễn Minh Tuấn
   - Xưng hô: Bạn
   - Mối quan hệ: Bạn thân
   - Lời nhắn: "Bạn là người bạn thân thiết..."
   - Được mời: Cả hai ngày
4. Click "Thêm khách mời"
5. Link tạo ra: /nguyen-minh-tuan
6. Copy và gửi cho bạn
```

### Kịch Bản 2: Thêm Đồng Nghiệp
```
1. Vào /admin/guests
2. Thêm nhiều đồng nghiệp cùng lúc
3. Sử dụng "Chọn mẫu có sẵn" để nhanh
4. Copy từng link và gửi hàng loạt
```

---

## 📞 Hỗ Trợ

Nếu gặp vấn đề:
1. Kiểm tra tài liệu này trước
2. Xem log trong Console (F12)
3. Kiểm tra kết nối Firebase

---

## ✨ Tóm Tắt

**Quy trình 3 bước đơn giản:**

1. 🎯 **Thêm khách** → Hệ thống tự tạo link
2. 📋 **Copy link** → Click "Sao chép URL"
3. 💌 **Gửi link** → Qua bất kỳ phương tiện nào

**Link có dạng:**
```
https://your-domain.com/[ten-khach-khong-dau]
```

**Mỗi khách một link riêng, trải nghiệm cá nhân hóa!** ❤️

---

*Cập nhật lần cuối: 04/01/2025*
