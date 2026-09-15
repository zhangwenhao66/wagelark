// 自动生成，勿手改。由 独立站/research-db/gen-responsive-images.py 生成。
// 用途：文章 hero 图的移动端小尺寸变体路径 + 实际宽高，供 [slug].astro 拼 srcset 的
// w 描述符（源图本身窄于目标宽度时不会生成变体，查不到就说明没有——模板需要容错，
// 直接退回不带 srcset 的单一 <img>，不要假设每张图都有）。

export const RESPONSIVE_HERO: Record<string, { mobile: string; w: number; h: number }> = {};
