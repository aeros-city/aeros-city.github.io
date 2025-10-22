document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav-link");
  const contentArea = document.getElementById("content-area");

  // ページ切り替え処理
  links.forEach(link => {
    link.addEventListener("click", async (e) => {
      e.preventDefault();
      const page = e.target.getAttribute("data-page");

      // dataフォルダから読み込む（GitHub Pages対応）
      const baseURL = `${window.location.origin}${window.location.pathname.replace(/\/$/, "")}`;
      const targetURL = `${baseURL}/data/${page}.html`;

      try {
        const response = await fetch(targetURL);
        if (!response.ok) throw new Error(`ページが見つかりません: ${targetURL}`);
        const html = await response.text();

        // 中身を挿入して表示
        contentArea.innerHTML = html;
        contentArea.style.display = "block"; // ✅ 表示をONにする！

        // スクロールを上に戻す
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (error) {
        console.error("ページ読み込みエラー:", error);
        contentArea.innerHTML = `<p>ページを読み込めませんでした。</p>`;
        contentArea.style.display = "block"; // ✅ エラー時も表示ON
      }
    });
  });
});
