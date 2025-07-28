# Wedding Website Admin Panel

Hệ thống quản lý nội dung cho website đám cưới cho phép bạn thay đổi thông tin trên website mà không cần chỉnh sửa code.

## Cách sử dụng Admin Panel

### 1. Truy cập Admin Panel
- Mở trình duyệt và truy cập: `http://localhost:3000/admin`
- Nhập mật khẩu: `wedding2024` (có thể thay đổi trong file `src/app/admin/page.tsx`)

### 2. Các thông tin có thể chỉnh sửa

#### **Tên cặp đôi**
- Tên chú rể
- Tên cô dâu

#### **Địa điểm tổ chức**
- **Nhà trai:**
  - Tên địa điểm
  - Địa chỉ
  - Ngày (tiếng Anh)
  - Ngày (tiếng Việt)
- **Nhà gái:** (tương tự nhà trai)

#### **Timeline sự kiện**
- **Nhà trai & Nhà gái:**
  - Thêm/xóa sự kiện
  - Chỉnh sửa thời gian
  - Chỉnh sửa tên sự kiện

#### **Thông tin ngân hàng**
- Tên ngân hàng
- Số tài khoản
- Tên chủ tài khoản

#### **Love Story**
- **Chú rể:**
  - Mô tả
  - Lời nhắn
- **Cô dâu:**
  - Mô tả
  - Lời nhắn

### 3. Lưu thay đổi
- Sau khi chỉnh sửa, nhấn nút **"Lưu thay đổi"**
- Hệ thống sẽ lưu vào Firebase và cập nhật website chính

### 4. Xem kết quả
- Truy cập website chính: `http://localhost:3000`
- Tất cả thay đổi sẽ được hiển thị ngay lập tức

## Cấu trúc dữ liệu

Dữ liệu được lưu trữ trong Firebase Firestore với cấu trúc:
```
wedding/data: {
  coupleNames: { groom, bride },
  weddingDates: { groomSide, brideSide },
  venues: { groomSide: {...}, brideSide: {...} },
  timeline: { groomSide: [...], brideSide: [...] },
  bankAccounts: [...],
  loveStory: { groom: {...}, bride: {...} }
}
```

## Tính năng

### ✅ Đã hoàn thành
- [x] Giao diện admin thân thiện
- [x] Xác thực bằng mật khẩu
- [x] Chỉnh sửa tên cặp đôi
- [x] Quản lý địa điểm tổ chức
- [x] Quản lý timeline sự kiện
- [x] Quản lý thông tin ngân hàng
- [x] Chỉnh sửa Love Story
- [x] Lưu trữ dữ liệu Firebase
- [x] Cập nhật real-time trên website
- [x] Loading states
- [x] Responsive design

### 🔄 Có thể mở rộng
- [ ] Upload ảnh cho album
- [ ] Quản lý danh sách khách mời
- [ ] Thống kê RSVP
- [ ] Quản lý guestbook
- [ ] Backup/restore dữ liệu
- [ ] Multi-language support

## Bảo mật

- Mật khẩu admin có thể thay đổi trong `src/app/admin/page.tsx`
- Dữ liệu được lưu trữ an toàn trên Firebase
- Chỉ admin có quyền chỉnh sửa

## Cấu hình Firebase

### 1. File môi trường (.env.local)
Dự án sử dụng file `.env.local` để lưu trữ cấu hình Firebase một cách an toàn:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

### 2. Bảo mật
- File `.env.local` đã được thêm vào `.gitignore` để không commit thông tin nhạy cảm
- Chỉ sử dụng `NEXT_PUBLIC_` prefix cho các biến cần thiết ở client-side

## Hỗ trợ

Nếu gặp vấn đề, vui lòng kiểm tra:
1. File `.env.local` có tồn tại và chứa đúng thông tin Firebase
2. Kết nối Firebase
3. Cấu hình Firebase trong `src/lib/firebase.ts`
4. Console browser để xem lỗi

## Thay đổi mật khẩu Admin

Để thay đổi mật khẩu admin:
1. Mở file `src/app/admin/page.tsx`
2. Tìm dòng: `const ADMIN_PASSWORD = 'wedding2024';`
3. Thay đổi `'wedding2024'` thành mật khẩu mới
4. Lưu file và restart server
