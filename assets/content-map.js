// assets/content-map.js

const siteConfig = {
  baseUrl: "https://cnwebs-whill.com",
  siteName: "威廉希尔内容平台"
};

const contentSections = [
  {
    id: "sports",
    title: "体育竞技",
    tags: ["足球", "篮球", "网球", "威廉希尔赛事"],
    items: [
      { title: "英超联赛", url: "/sports/premier-league" },
      { title: "NBA季后赛", url: "/sports/nba-playoffs" }
    ]
  },
  {
    id: "esports",
    title: "电子竞技",
    tags: ["LOL", "DOTA2", "CSGO", "威廉希尔电竞"],
    items: [
      { title: "S13全球总决赛", url: "/esports/lol-worlds" },
      { title: "TI12", url: "/esports/ti12" }
    ]
  },
  {
    id: "casino",
    title: "娱乐场",
    tags: ["百家乐", "轮盘", "德州扑克", "威廉希尔娱乐"],
    items: [
      { title: "真人百家乐", url: "/casino/live-baccarat" },
      { title: "欧洲轮盘", url: "/casino/roulette" }
    ]
  },
  {
    id: "promotions",
    title: "优惠活动",
    tags: ["首存红利", "返水", "免费 spins", "威廉希尔优惠"],
    items: [
      { title: "新人首存礼", url: "/promotions/welcome-bonus" },
      { title: "每周返水", url: "/promotions/weekly-cashback" }
    ]
  }
];

/**
 * 根据关键词搜索内容分区和条目
 * @param {string} keyword - 搜索关键词
 * @returns {Array} 匹配的结果数组
 */
function searchContent(keyword) {
  if (!keyword || keyword.trim() === "") {
    return [];
  }

  const lowerKeyword = keyword.toLowerCase().trim();
  const results = [];

  contentSections.forEach(section => {
    // 检查分区标题和标签是否匹配
    const sectionMatch =
      section.title.toLowerCase().includes(lowerKeyword) ||
      section.tags.some(tag => tag.toLowerCase().includes(lowerKeyword));

    if (sectionMatch) {
      results.push({
        sectionId: section.id,
        sectionTitle: section.title,
        matchedItems: section.items,
        matchType: "section"
      });
    } else {
      // 检查条目是否匹配
      const matchedItems = section.items.filter(item =>
        item.title.toLowerCase().includes(lowerKeyword) ||
        item.url.toLowerCase().includes(lowerKeyword)
      );

      if (matchedItems.length > 0) {
        results.push({
          sectionId: section.id,
          sectionTitle: section.title,
          matchedItems: matchedItems,
          matchType: "items"
        });
      }
    }
  });

  return results;
}

/**
 * 根据标签筛选分区
 * @param {string} tag - 标签名称
 * @returns {Array} 匹配的分区列表
 */
function filterByTag(tag) {
  if (!tag || tag.trim() === "") {
    return contentSections;
  }

  const lowerTag = tag.toLowerCase().trim();
  return contentSections.filter(section =>
    section.tags.some(t => t.toLowerCase().includes(lowerTag))
  );
}

/**
 * 获取所有标签
 * @returns {Array} 去重的标签列表
 */
function getAllTags() {
  const tagSet = new Set();
  contentSections.forEach(section => {
    section.tags.forEach(tag => tagSet.add(tag));
  });
  return Array.from(tagSet);
}

// 导出模块（支持 CommonJS 和浏览器全局）
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    siteConfig,
    contentSections,
    searchContent,
    filterByTag,
    getAllTags
  };
}