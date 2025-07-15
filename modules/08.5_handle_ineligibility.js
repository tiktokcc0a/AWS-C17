// ===================================================================================
// ### modules/08.5_handle_ineligibility.js (V1.0 - 新增模块) ###
// ===================================================================================
const config = require('../shared/config');
const { humanLikeClick } = require('../shared/utils');

async function handleIneligibility(page, data, config) { // 接受config以保持接口一致性
    console.log("[模块8.5] 检测到不符合资格页面，开始处理...");

    try {
        // 使用config中定义的统一选择器
        const confirmButtonSelector = config.INELIGIBILITY_CONFIRM_SELECTOR;

        console.log(`[模块8.5] 正在等待 'Confirm' 按钮可见 (选择器: ${confirmButtonSelector})...`);
        await page.waitForSelector(confirmButtonSelector, { visible: true, timeout: 30000 });
        
        console.log("[模块8.5] 'Confirm' 按钮已找到，准备点击...");
        // 此处可根据需要选择humanLikeClick或更直接的点击方式
        await humanLikeClick(page, confirmButtonSelector);
        
        console.log("[模块8.5] 'Confirm' 按钮点击完毕，流程将继续...");

    } catch (error) {
        console.error(`[模块8.5] 处理不符合资格页面时发生错误: ${error.message}`);
        // 将错误重新抛出，以便主控制器可以捕获并根据其重试逻辑进行处理
        throw new Error(`模块 8.5 执行失败: ${error.message}`);
    }
}

module.exports = { handleIneligibility };