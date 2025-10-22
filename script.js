document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav-link");
  const contentArea = document.getElementById("content-area");

  // ページ切り替え処理
  links.forEach(link => {
    link.addEventListener("click", async (e) => {
      e.preventDefault();
      const page = e.target.getAttribute("data-page");

      try {
        // dataフォルダ内のページを取得
        const response = await fetch(`data/${page}.html`);
        if (!response.ok) throw new Error("ページが見つかりません");
        const html = await response.text();
        contentArea.innerHTML = html;

        // スクロール位置リセット
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (error) {
        contentArea.innerHTML = `<p>ページを読み込めませんでした。</p>`;
        console.error(error);
      }
    });
  });
});
