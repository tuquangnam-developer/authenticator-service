
```markdown
# 🔐 OTP Authenticator

Ứng dụng tạo mã xác thực OTP (TOTP) đơn giản, chạy hoàn toàn trên trình duyệt.

## ✨ Tính năng

- Tạo mã OTP từ Secret Key
- Hỗ trợ nhiều tài khoản
- Tự động cập nhật mã OTP mỗi giây
- Hiển thị thời gian đếm ngược
- Giao diện thân thiện, responsive
- **Không lưu trữ dữ liệu** - Bảo mật tối đa

## 🚀 Cài đặt

1. Clone repository:
```bash
git clone https://github.com/tuquangnam-developer/authenticator-service.git
```

2. Mở file `index.html` trong trình duyệt

## 📂 Cấu trúc dự án

```
authenticator-service/
├── index.html          # Trang chính
├── css/
│   └── style.css       # Styles
├── js/
│   ├── app.js          # Ứng dụng chính
│   ├── config.js       # Cấu hình
│   ├── otp-manager.js  # Logic OTP
│   └── ui-renderer.js  # Render giao diện
└── README.md
```

## 🔧 Công nghệ sử dụng

- HTML5, CSS3, JavaScript (ES6+)
- [otplib](https://github.com/yeojz/otplib) - Thư viện TOTP
- Vanilla JS - Không framework

## 🛡️ Bảo mật

- Secret Key **KHÔNG** được lưu vào localStorage hay cookie
- Dữ liệu chỉ tồn tại trong RAM
- Mất dữ liệu khi refresh/đóng tab (tính năng)

## 📝 Lưu ý

- Secret Key phải ở định dạng Base32 (A-Z, 2-7)
- Tối thiểu 16 ký tự
- Ứng dụng chỉ dùng cho mục đích học tập và cá nhân

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Vui lòng tạo Issue hoặc Pull Request.

## 📄 License

MIT License - Free to use and modify
```

---

## 📋 **Hướng dẫn sử dụng**

1. **Tạo thư mục dự án**:
```bash
mkdir authenticator-service
cd authenticator-service
```

2. **Tạo các thư mục con**:
```bash
mkdir css js
```

3. **Tạo các file** theo cấu trúc trên

4. **Mở index.html** trong trình duyệt

