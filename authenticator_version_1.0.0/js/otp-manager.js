/**
 * Quản lý OTP - Xử lý logic tạo và quản lý mã OTP
 */

// Import config nếu dùng module, nếu không thì dùng global
const OTP_CONFIG = window.OTP_CONFIG || { STEP: 30, DIGITS: 6, MIN_SECRET_LENGTH: 16 };
const SECRET_REGEX = window.SECRET_REGEX || /^[A-Z2-7]+$/;

class OTPManager {
    constructor() {
        this.accounts = [];
        this.otplib = null;
        this.initOTPLib();
    }

    /**
     * Khởi tạo thư viện otplib
     */
    initOTPLib() {
        try {
            if (typeof window.otplib !== 'undefined') {
                this.otplib = window.otplib;
                if (this.otplib.authenticator) {
                    this.otplib.authenticator.options = {
                        step: OTP_CONFIG.STEP,
                        digits: OTP_CONFIG.DIGITS,
                    };
                }
                console.log('✅ OTP Library loaded successfully');
            } else {
                console.warn('⚠️ OTP Library not found, using fallback');
                this.otplib = null;
            }
        } catch (error) {
            console.error('❌ Error loading OTP library:', error);
            this.otplib = null;
        }
    }

    /**
     * Tạo mã OTP từ Secret Key
     */
    generateOTP(secret) {
        try {
            const cleanSecret = this.cleanSecret(secret);
            
            // Sử dụng thư viện nếu có
            if (this.otplib && this.otplib.authenticator && 
                typeof this.otplib.authenticator.generate === 'function') {
                return this.otplib.authenticator.generate(cleanSecret);
            }
            
            // Fallback: tính OTP đơn giản
            return this.fallbackGenerateOTP(cleanSecret);
        } catch (error) {
            console.error('❌ Error generating OTP:', error);
            return '------';
        }
    }

    /**
     * Fallback: Tạo OTP bằng hàm băm đơn giản (không an toàn, chỉ để demo)
     */
    fallbackGenerateOTP(secret) {
        try {
            const time = Math.floor(Date.now() / 1000 / OTP_CONFIG.STEP);
            const str = secret + time;
            let hash = 0;
            for (let i = 0; i < str.length; i++) {
                hash = ((hash << 5) - hash) + str.charCodeAt(i);
                hash = hash & hash;
            }
            const otp = Math.abs(hash) % Math.pow(10, OTP_CONFIG.DIGITS);
            return otp.toString().padStart(OTP_CONFIG.DIGITS, '0');
        } catch (error) {
            console.error('❌ Fallback OTP error:', error);
            return '000000';
        }
    }

    /**
     * Làm sạch Secret Key
     */
    cleanSecret(secret) {
        return secret.replace(/\s/g, '').toUpperCase();
    }

    /**
     * Kiểm tra Secret Key hợp lệ
     */
    isValidSecret(secret) {
        try {
            const cleanSecret = this.cleanSecret(secret);
            return SECRET_REGEX.test(cleanSecret) && 
                   cleanSecret.length >= OTP_CONFIG.MIN_SECRET_LENGTH;
        } catch {
            return false;
        }
    }

    /**
     * Thêm tài khoản mới
     */
    addAccount(secret) {
        const cleanSecret = this.cleanSecret(secret);
        
        if (!this.isValidSecret(cleanSecret)) {
            return { success: false, message: 'INVALID_SECRET' };
        }

        if (this.accounts.some(acc => acc.secret === cleanSecret)) {
            return { success: false, message: 'DUPLICATE_SECRET' };
        }

        const displayName = this.generateDisplayName(cleanSecret);

        this.accounts.push({
            secret: cleanSecret,
            name: displayName,
            addedAt: Date.now()
        });

        return { success: true, account: this.accounts[this.accounts.length - 1] };
    }

    /**
     * Tạo tên hiển thị từ Secret Key
     */
    generateDisplayName(secret) {
        return secret.length > 12 
            ? secret.slice(0, 8) + '...' + secret.slice(-4)
            : secret;
    }

    /**
     * Xóa tài khoản
     */
    deleteAccount(index) {
        if (index >= 0 && index < this.accounts.length) {
            this.accounts.splice(index, 1);
            return true;
        }
        return false;
    }

    /**
     * Lấy danh sách tài khoản
     */
    getAccounts() {
        return this.accounts;
    }

    /**
     * Lấy số lượng tài khoản
     */
    getAccountCount() {
        return this.accounts.length;
    }

    /**
     * Xóa tất cả tài khoản
     */
    clearAllAccounts() {
        this.accounts = [];
    }

    /**
     * Lấy thời gian còn lại của OTP hiện tại
     */
    getTimeRemaining() {
        return OTP_CONFIG.STEP - Math.floor((Date.now() / 1000) % OTP_CONFIG.STEP);
    }
}

// Export cho các file khác sử dụng
if (typeof module !== 'undefined' && module.exports) {
    module.exports = OTPManager;
} else {
    // Browser environment
    window.OTPManager = OTPManager;
}