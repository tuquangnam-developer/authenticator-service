/**
 * Ứng dụng chính - Khởi tạo và kết nối các thành phần
 */

// Đợi DOM load xong
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Starting OTP Authenticator...');

    // Khởi tạo OTP Manager
    const otpManager = new OTPManager();
    console.log('✅ OTP Manager initialized');

    // Khởi tạo UI Renderer
    const uiRenderer = new UIRenderer('accountList');
    uiRenderer.init(otpManager);
    console.log('✅ UI Renderer initialized');

    // DOM Elements
    const secretInput = document.getElementById('secretKey');
    const addBtn = document.getElementById('addBtn');

    // Xử lý thêm tài khoản
    function handleAddAccount() {
        const secret = secretInput.value.trim();
        
        if (!secret) {
            const MESSAGES = window.MESSAGES || { EMPTY_SECRET: '⚠️ Vui lòng nhập mã khóa!' };
            alert(MESSAGES.EMPTY_SECRET);
            return;
        }

        const result = otpManager.addAccount(secret);
        
        if (result.success) {
            uiRenderer.render();
            secretInput.value = '';
            secretInput.focus();
            console.log(`✅ Added account: ${result.account.name}`);
        } else {
            const MESSAGES = window.MESSAGES || {
                INVALID_SECRET: '❌ Mã khóa không hợp lệ!',
                DUPLICATE_SECRET: '⚠️ Mã khóa này đã tồn tại!'
            };
            alert(MESSAGES[result.message] || '❌ Lỗi không xác định!');
        }
    }

    // Event Listeners
    addBtn.addEventListener('click', handleAddAccount);

    secretInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleAddAccount();
        }
    });

    // Tự động xóa khoảng trắng khi paste
    secretInput.addEventListener('paste', (e) => {
        setTimeout(() => {
            secretInput.value = secretInput.value.replace(/\s/g, '');
        }, 10);
    });

    // Xử lý lỗi toàn cục
    window.addEventListener('error', (e) => {
        console.error('❌ Global error:', e.message);
    });

    // Log thông tin
    console.log('✅ Authenticator is ready!');
    console.log(`📌 ${otpManager.getAccountCount()} accounts loaded`);
    console.log('🔒 Secret keys are stored in memory only');
});
