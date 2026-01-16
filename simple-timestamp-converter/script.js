document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const timestampInput = document.getElementById('timestampInput');
    const timestampType = document.getElementById('timestampType');
    const timezoneSelect = document.getElementById('timezoneSelect');
    const convertToDateBtn = document.getElementById('convertToDateBtn');
    const dateResult = document.getElementById('dateResult');
    
    const dateTimeInput = document.getElementById('dateTimeInput');
    const outputTimezoneSelect = document.getElementById('outputTimezoneSelect');
    const convertToTimestampBtn = document.getElementById('convertToTimestampBtn');
    const timestampResult = document.getElementById('timestampResult');
    
    const currentLocalTime = document.getElementById('currentLocalTime');
    const currentUTCTime = document.getElementById('currentUTCTime');
    const currentTimestamp = document.getElementById('currentTimestamp');
    const currentTimestampMs = document.getElementById('currentTimestampMs');
    
    // 设置日期时间输入框为当前时间
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    dateTimeInput.value = `${year}-${month}-${day}T${hours}:${minutes}`;
    
    // 更新当前时间函数
    function updateCurrentTime() {
        const now = new Date();
        
        // 格式化本地时间
        const localOptions = { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit',
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit',
            hour12: false
        };
        // 当前本地时间
        currentLocalTime.textContent = now.toLocaleString('zh-CN', localOptions);
        
        // 格式化UTC时间
        currentUTCTime.textContent = now.toUTCString();
        
        // 当前时间戳（秒）
        currentTimestamp.textContent = Math.floor(now.getTime() / 1000);
        
        // 当前时间戳（毫秒）
        currentTimestampMs.textContent = now.getTime();
    }
    
    // 初始更新当前时间
    updateCurrentTime();
    
    // 每秒更新一次当前时间
    setInterval(updateCurrentTime, 1000);
    
    // 时间戳转日期时间
    convertToDateBtn.addEventListener('click', function() {
        try {
            let timestamp = timestampInput.value.trim();
            
            if (!timestamp) {
                dateResult.textContent = '请输入有效的时间戳';
                return;
            }
            
            timestamp = Number(timestamp);
            
            if (isNaN(timestamp)) {
                dateResult.textContent = '请输入有效的数字时间戳';
                return;
            }
            
            // 根据选择的类型处理时间戳
            if (timestampType.value === 'seconds') {
                timestamp = timestamp * 1000; // 转换为毫秒
            }
            
            const date = new Date(timestamp);
            
            if (date.toString() === 'Invalid Date') {
                dateResult.textContent = '无效的时间戳';
                return;
            }
            
            // 处理时区转换
            const timezone = parseInt(timezoneSelect.value);
            const utcTime = date.getTime() + (date.getTimezoneOffset() * 60000);
            const tzTime = new Date(utcTime + (3600000 * timezone));
            
            const formattedDate = formatDate(tzTime);
            dateResult.textContent = formattedDate;
        } catch (error) {
            dateResult.textContent = '转换出错：' + error.message;
        }
    });
    
    // 日期时间转时间戳
    convertToTimestampBtn.addEventListener('click', function() {
        try {
            const dateTimeStr = dateTimeInput.value;
            
            if (!dateTimeStr) {
                timestampResult.textContent = '请输入有效的日期时间';
                return;
            }
            
            const localDate = new Date(dateTimeStr);
            
            if (localDate.toString() === 'Invalid Date') {
                timestampResult.textContent = '无效的日期时间';
                return;
            }
            
            // 处理时区转换
            const timezone = parseInt(outputTimezoneSelect.value);
            const utcTime = localDate.getTime() - (timezone * 3600000) + (localDate.getTimezoneOffset() * 60000);
            
            const timestampSeconds = Math.floor(utcTime / 1000);
            const timestampMilliseconds = utcTime;
            
            timestampResult.innerHTML = `
                <div>秒级时间戳：${timestampSeconds}</div>
                <div>毫秒级时间戳：${timestampMilliseconds}</div>
            `;
        } catch (error) {
            timestampResult.textContent = '转换出错：' + error.message;
        }
    });
    
    // 辅助函数：格式化日期
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
        
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
    }
    
    // 示例时间戳
    timestampInput.placeholder = '例如：1700000000';
}); 