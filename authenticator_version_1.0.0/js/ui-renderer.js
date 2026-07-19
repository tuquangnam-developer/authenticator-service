/**
 * UI Renderer - Quản lý hiển thị giao diện
 */

class UIRenderer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.otpManager = null;
        this.updateInterval = null;
    }

    /**
     * Khởi tạo với OTP Manager
     */
    init(otpManager) {
        this.otpManager = otpManager;
        this.render();
        this.startAutoUpdate();
    }

    /**
     * Render danh sách tài khoản
     */
    render() {
        if (!this.container) return;
        
        const accounts = this.otpManager.getAccounts();
        
        if (accounts.length === 0) {
            this.renderEmptyState();
            return;
        }

        let html = '';
        const now = Date.now();

        accounts.forEach((account, index) => {
            const otp = this.otpManager.generateOTP(account.secret);
            const timeRemaining = this.otpManager.getTimeRemaining();
            
            html += `
                <div class="account-card">
                    <div class="info">
                        <span class="key-label">🔑 ${account.name}</span>
                        <span class="otp-code">${otp}</span>
                        <span class="countdown">⏱️ ${timeRemaining}s</span>
                    </div>
                    <button class="delete-btn" data-index="${index}" title="Xóa">✕</button>
                </div>
            `;
        });

        this.container.innerHTML = html;

        // Gán sự kiện xóa
        this.container.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.handleDelete(index);
            });
        });
    }

    /**
     * Render trạng thái rỗng
     */
    renderEmptyState() {
        this.container.innerHTML = `
            <div class="empty-state">
                <p>🔑 Chưa có mã khóa nào</p>
                <p>Nhập mã khóa ở trên để bắt đầu</p>
            </div>
        `;
    }

    /**
     * Xử lý xóa tài khoản
     */
    handleDelete(index) {
        const MESSAGES = window.MESSAGES || { DELETE_CONFIRM: 'Bạn có chắc muốn xóa mã khóa này?' };
        if (confirm(MESSAGES.DELETE_CONFIRM)) {
            this.otpManager.deleteAccount(index);
            this.render();
        }
    }

    /**
     * Bắt đầu tự động cập nhật
     */
    startAutoUpdate() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
        this.updateInterval = setInterval(() => {
            this.render();
        }, 1000);
    }

    /**
     * Dừng tự động cập nhật
     */
    stopAutoUpdate() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }

    /**
     * Làm mới giao diện
     */
    refresh() {
        this.render();
    }

    /**
     * Dọn dẹp
     */
    destroy() {
        this.stopAutoUpdate();
        this.container = null;
        this.otpManager = null;
    }
}

// Export cho các file khác sử dụng
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UIRenderer;
} else {
    // Browser environment
    window.UIRenderer = UIRenderer;
}