import plugin from 'tailwindcss/plugin';

export default plugin(function ({ addUtilities, matchUtilities, theme }) {
  const defaultSize = theme('dashedLine.size', '1.5px');
  const defaultGap = theme('dashedLine.gap', '8px');
  const defaultColor = theme('dashedLine.color', '#A5A7A9');
  const defaultThickness = '1px'; // 虚线的粗细

  const baseVars = {
    '--v-dashed-size': defaultSize,
    '--v-dashed-gap': defaultGap,
    '--v-dashed-color': defaultColor
  };

  // 生成背景图片的辅助函数
  const bgVertical = 'linear-gradient(to bottom, var(--v-dashed-color) var(--v-dashed-size), transparent 0)';
  const bgHorizontal = 'linear-gradient(to right, var(--v-dashed-color) var(--v-dashed-size), transparent 0)';
  const sizeVertical = `${defaultThickness} calc(var(--v-dashed-size) + var(--v-dashed-gap))`;
  const sizeHorizontal = `calc(var(--v-dashed-size) + var(--v-dashed-gap)) ${defaultThickness}`;

  // 1. 定义核心样式逻辑
  const styles = {
    l: {
      '&::before': {
        content: '""',
        position: 'absolute',
        left: '0',
        top: '0',
        bottom: '0',
        width: defaultThickness,
        backgroundImage: bgVertical,
        backgroundSize: `100% calc(var(--v-dashed-size) + var(--v-dashed-gap))`,
        backgroundRepeat: 'repeat-y'
      }
    },
    r: {
      '&::after': {
        content: '""',
        position: 'absolute',
        right: '0',
        top: '0',
        bottom: '0',
        width: defaultThickness,
        backgroundImage: bgVertical,
        backgroundSize: `100% calc(var(--v-dashed-size) + var(--v-dashed-gap))`,
        backgroundRepeat: 'repeat-y'
      }
    },
    t: {
      '&::before': {
        content: '""',
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        height: defaultThickness,
        backgroundImage: bgHorizontal,
        backgroundSize: `calc(var(--v-dashed-size) + var(--v-dashed-gap)) 100%`,
        backgroundRepeat: 'repeat-x'
      }
    },
    b: {
      '&::after': {
        content: '""',
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        height: defaultThickness,
        backgroundImage: bgHorizontal,
        backgroundSize: `calc(var(--v-dashed-size) + var(--v-dashed-gap)) 100%`,
        backgroundRepeat: 'repeat-x'
      }
    }
  };

  // 2. 静态基础类
  addUtilities({
    '.v-dashed-l': { position: 'relative', ...baseVars, ...styles.l },
    '.v-dashed-r': { position: 'relative', ...baseVars, ...styles.r },
    '.v-dashed-t': { position: 'relative', ...baseVars, ...styles.t },
    '.v-dashed-b': { position: 'relative', ...baseVars, ...styles.b },
    '.v-dashed-x': { position: 'relative', ...baseVars, ...styles.l, ...styles.r },
    '.v-dashed-y': { position: 'relative', ...baseVars, ...styles.t, ...styles.b },
    '.v-dashed': {
      position: 'relative',
      ...baseVars,
      '&::before': {
        content: '""',
        position: 'absolute',
        inset: '0',
        pointerEvents: 'none',
        backgroundImage: `${bgHorizontal}, ${bgHorizontal}, ${bgVertical}, ${bgVertical}`,
        backgroundPosition: 'top, bottom, left, right',
        backgroundSize: `${sizeHorizontal}, ${sizeHorizontal}, ${sizeVertical}, ${sizeVertical}`,
        backgroundRepeat: 'repeat-x, repeat-x, repeat-y, repeat-y'
      }
    }
  });

  // 3. 独立配置类 (用于修改变量)
  matchUtilities(
    {
      'v-dashed-size': (value) => ({ '--v-dashed-size': value }),
      'v-dashed-gap': (value) => ({ '--v-dashed-gap': value }),
      'v-dashed-color': (value) => ({ '--v-dashed-color': value })
    },
    { values: theme('dashedLine') }
  );

  // 4. 混合简写类支持
  const generateShorthand = (dirs) => (value) => {
    const [size, gap, color] = value.split('_');
    let combinedStyles = {
      position: 'relative',
      '--v-dashed-size': size || defaultSize,
      '--v-dashed-gap': gap || defaultGap,
      '--v-dashed-color': color || defaultColor
    };
    dirs.forEach((d) => {
      Object.assign(combinedStyles, styles[d] || {});
    });

    // 特殊处理全边框
    if (dirs.includes('all')) {
      combinedStyles['&::before'] = {
        content: '""',
        position: 'absolute',
        inset: '0',
        pointerEvents: 'none',
        backgroundImage: `${bgHorizontal}, ${bgHorizontal}, ${bgVertical}, ${bgVertical}`,
        backgroundPosition: 'top, bottom, left, right',
        backgroundSize: `${sizeHorizontal}, ${sizeHorizontal}, ${sizeVertical}, ${sizeVertical}`,
        backgroundRepeat: 'repeat-x, repeat-x, repeat-y, repeat-y'
      };
    }
    return combinedStyles;
  };

  matchUtilities({
    'v-dashed-l': generateShorthand(['l']),
    'v-dashed-r': generateShorthand(['r']),
    'v-dashed-t': generateShorthand(['t']),
    'v-dashed-b': generateShorthand(['b']),
    'v-dashed-x': generateShorthand(['l', 'r']),
    'v-dashed-y': generateShorthand(['t', 'b']),
    'v-dashed': generateShorthand(['all'])
  });
});
