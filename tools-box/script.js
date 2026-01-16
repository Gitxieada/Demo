document.addEventListener('DOMContentLoaded', function() {
    // 卡片悬停效果增强
    const toolCards = document.querySelectorAll('.tool-card');
    
    toolCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            setTimeout(() => {
                this.style.zIndex = '1';
            }, 300);
        });
        
        // 点击动画效果
        card.addEventListener('click', function(e) {
            if (e.target.classList.contains('tool-link')) return;
            
            const link = this.querySelector('.tool-link');
            
            // 添加点击涟漪效果
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size/2}px`;
            ripple.style.top = `${e.clientY - rect.top - size/2}px`;
            
            ripple.classList.add('active');
            
            setTimeout(() => {
                ripple.remove();
                
                // 如果不是链接本身被点击，则触发链接
                if (link) {
                    window.open(link.href, '_blank');
                }
            }, 500);
        });
    });
    
    // 添加页面加载动画
    document.body.classList.add('loaded');
    
    // 添加搜索功能
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = '搜索工具...';
    searchInput.classList.add('search-input');
    
    const header = document.querySelector('header');
    header.appendChild(searchInput);
    
    // 搜索功能
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        toolCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
    
    // 添加返回顶部按钮
    const backToTopBtn = document.createElement('button');
    backToTopBtn.classList.add('back-to-top');
    backToTopBtn.innerHTML = '<i class="arrow-up"></i>';
    document.body.appendChild(backToTopBtn);
    
    // 监听滚动以显示/隐藏返回顶部按钮
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // 点击返回顶部
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // 为样式添加额外的CSS
    const style = document.createElement('style');
    style.textContent = `
        .loaded .tool-card {
            animation-play-state: running;
        }
        
        .ripple {
            position: absolute;
            background: rgba(255, 255, 255, 0.7);
            border-radius: 50%;
            transform: scale(0);
            pointer-events: none;
            opacity: 0.5;
        }
        
        .ripple.active {
            animation: ripple-effect 0.5s ease-out;
        }
        
        @keyframes ripple-effect {
            0% {
                transform: scale(0);
                opacity: 0.5;
            }
            100% {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .search-input {
            margin-top: 10px;
            padding: 12px 20px;
            border: 2px solid #e6eaff;
            border-radius: 30px;
            width: 100%;
            max-width: 400px;
            font-size: 16px;
            outline: none;
            transition: all 0.3s;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }
        
        .search-input:focus {
            border-color: var(--primary-color);
            box-shadow: 0 4px 15px rgba(74, 107, 255, 0.15);
        }
        
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--primary-color);
            color: white;
            border: none;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 100;
        }
        
        .back-to-top.show {
            opacity: 1;
            visibility: visible;
        }

        i.arrow-up {
            border: solid white;
            border-width: 0 3px 3px 0;
            display: inline-block;
            padding: 3px;
            transform: rotate(-135deg);
            -webkit-transform: rotate(-135deg);
        } 
        
        .back-to-top:hover {
            background-color: #3a5aee;
            transform: translateY(-3px);
        }
    `;
    
    document.head.appendChild(style);
}); 