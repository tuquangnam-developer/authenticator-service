/**
 * Configuration và Constants cho ứng dụng OTP
 */

// Sử dụng IIFE để tránh xung đột biến toàn cục
(function() {
    // Cấu hình OTP
    window.OTP_CONFIG = {
        STEP: 30,           // Thời gian mỗi bước (giây)
        DIGITS: 6,          // Số chữ số OTP
        MIN_SECRET_LENGTH: 16,  // Độ dài tối thiểu của Secret Key
    };

    // Regex kiểm tra Secret Key (Base32)
    window.SECRET_REGEX = /^[A-Z2-7]+$/;

    // Các message thông báo
    window.MESSAGES = {
        INVALID_SECRET: '❌ Mã khóa không hợp lệ! Vui lòng kiểm tra lại (cần ít nhất 16 ký tự A-Z, 2-7)',
        DUPLICATE_SECRET: '⚠️ Mã khóa này đã tồn tại!',
        EMPTY_SECRET: '⚠️ Vui lòng nhập mã khóa!',
        DELETE_CONFIRM: 'Bạn có chắc muốn xóa mã khóa này?',
        NO_ACCOUNTS: '🔑 Chưa có mã khóa nào',
        NO_ACCOUNTS_SUB: 'Nhập mã khóa ở trên để bắt đầu',
    };

    console.log('✅ Config loaded');
})();