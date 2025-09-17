// 动画工具函数
export const animations = {
  // 淡入动画
  fadeIn: {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    duration: 300,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
  },
  
  // 淡出动画
  fadeOut: {
    from: { opacity: 1, transform: 'translateY(0)' },
    to: { opacity: 0, transform: 'translateY(-20px)' },
    duration: 200,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
  },
  
  // 缩放进入动画
  scaleIn: {
    from: { opacity: 0, transform: 'scale(0.9)' },
    to: { opacity: 1, transform: 'scale(1)' },
    duration: 250,
    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
  },
  
  // 滑入动画
  slideIn: {
    from: { opacity: 0, transform: 'translateX(-30px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
    duration: 300,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
  },
  
  // 弹跳动画
  bounce: {
    from: { transform: 'scale(1)' },
    to: { transform: 'scale(1.05)' },
    duration: 150,
    easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  },
  
  // 脉冲动画
  pulse: {
    from: { transform: 'scale(1)' },
    to: { transform: 'scale(1.02)' },
    duration: 200,
    easing: 'ease-in-out'
  }
}

// 创建动画样式对象
export const createAnimationStyle = (animation, isVisible = true) => {
  const { from, to, duration, easing } = animation
  
  return {
    opacity: isVisible ? to.opacity : from.opacity,
    transform: isVisible ? to.transform : from.transform,
    transition: `all ${duration}ms ${easing}`,
    willChange: 'opacity, transform'
  }
}

// 卡片进入动画（错开时间）
export const getCardAnimationDelay = (index) => {
  return Math.min(index * 100, 500) // 最多延迟500ms
}

// 搜索输入框动画
export const searchInputAnimation = {
  focus: {
    transform: 'scale(1.02)',
    boxShadow: '0 0 0 3px rgba(90, 168, 255, 0.2)',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
  },
  blur: {
    transform: 'scale(1)',
    boxShadow: '0 0 0 0px rgba(90, 168, 255, 0.2)',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
  }
}

// 按钮悬停动画
export const buttonHoverAnimation = {
  hover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
  },
  normal: {
    transform: 'translateY(0)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
  }
}

// 统计卡片动画
export const statCardAnimation = {
  hover: {
    transform: 'translateY(-4px) scale(1.02)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  },
  normal: {
    transform: 'translateY(0) scale(1)',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  }
}
