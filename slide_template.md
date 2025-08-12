---
marp: true
theme: template
paginate: true
_paginate: false
themeSet: './themes'
---

<!-- 表紙テンプレート -->
<div class="sidebar"></div>
<div class="cover-main-content">
  <div class="cover-subtitle">ここにサブタイトルを入力</div>
  <div class="cover-title">スライドテンプレート<br>Marp + Custom Style</div>
  <div class="cover-date">2025/MM/DD</div>
  <div class="cover-author">発表者名</div>
</div>

---

<!-- 2カラムレイアウト -->
# <span class="slide-title">2カラムレイアウトのサンプル</span>

<div class="col-left">

### 左側のコンテンツ
- 箇条書きの項目1
- 箇条書きの項目2
- 箇条書きの項目3
- 箇条書きの項目4

左側にテキスト、右側に画像を配置する基本的なレイアウトです。

</div>

<div class="col-right">

<div style="text-align: center;">
  <img src="images/sample.jpg" alt="画像の説明" style="width: 80%; max-width: 300px; border-radius:8px;box-shadow:0 2px 8px #ccc;" />
  <p style="font-size:0.8em;color:#666;margin-top:1.2em;">画像のキャプション</p>
</div>

</div>

<div style="clear: both;"></div>

---

<!-- 1カラム＋強調ボックス -->
# <span class="slide-title">強調ボックスの使い方</span>

<div class="highlight-box">
  <strong>重要なメッセージをここに記載</strong><br>
  強調したい内容や注意事項などを目立たせるために使用します。
</div>

### 通常のコンテンツ
- 強調ボックスの下に通常のコンテンツを配置
- 箇条書きやテキストなど自由に記述可能
- 重要度に応じて使い分けることが大切

---

<!-- Mermaidフローチャート -->
# <span class="slide-title">Mermaidフローチャート</span>

<pre class="mermaid">
flowchart TD
    A[開始] --> B{条件分岐}
    B -->|Yes| C[処理A]
    B -->|No| D[処理B]
    C --> E[結果]
    D --> E[結果]
    E --> F[終了]
</pre>

<script type="module">
import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11.4.1/dist/mermaid.esm.min.mjs';
mermaid.initialize({ startOnLoad: true });
</script>

---

<!-- Mermaidガントチャート -->
# <span class="slide-title">Mermaidガントチャート</span>

<pre class="mermaid">
gantt
    title プロジェクトスケジュール
    dateFormat  YYYY-MM-DD
    
    section フェーズ1
    要件定義           :a1, 2024-01-01, 30d
    設計               :a2, after a1, 20d
    
    section フェーズ2
    実装               :b1, after a2, 45d
    テスト             :b2, after b1, 15d
    
    section フェーズ3
    デプロイ準備       :c1, after b2, 10d
    本番リリース       :milestone, c2, after c1, 1d
</pre>

---

<!-- 箇条書きリスト -->
# <span class="slide-title">箇条書きリストのパターン</span>

### 基本的な箇条書き
- 第1階層の項目
  - 第2階層の項目A
  - 第2階層の項目B
    - 第3階層の項目
- 第1階層の別の項目

### 番号付きリスト
1. 最初のステップ
2. 次のステップ
   1. サブステップ2-1
   2. サブステップ2-2
3. 最後のステップ

### チェックリスト
- [x] 完了したタスク
- [ ] 未完了のタスク
- [ ] 進行中のタスク

---

<!-- 画像配置パターン -->
# <span class="slide-title">画像配置のパターン</span>

### 中央配置
<div style="text-align: center;">
  <img src="images/sample.jpg" alt="中央配置の画像" style="width: 20%; max-width: 100px;" />
</div>

### 横並び配置
<div style="display: flex; gap: 20px; justify-content: center;">
  <img src="images/sample.jpg" alt="画像1" style="width: 20%; max-width: 100px;" />
  <img src="images/sample.jpg" alt="画像2" style="width: 20%; max-width: 100px;" />
</div>

### テキストと画像の回り込み
<div style="display: block;">
  <img src="images/sample.jpg" alt="回り込み画像" style="float: right; width: 20%; max-width: 100px; margin: 0 0 10px 20px;" />
  <p style="margin: 0;">
    ここにテキストを配置します。画像は右側に配置され、テキストが左側に回り込みます。
    この配置方法は、説明文と関連する画像を同時に表示したい場合に便利です。
    長めのテキストを配置することで、回り込みの効果がより明確に確認できます。
    画像の横にテキストが流れ込むレイアウトは、限られたスペースを効率的に使用できる利点があります。
  </p>
</div>
<div style="clear: both;"></div>

---

<!-- コード表示 -->
# <span class="slide-title">コード表示のパターン</span>

### インラインコード
プロジェクトで `npm install` を実行して、依存関係をインストールします。

### コードブロック（Python）
```python
def calculate_sum(numbers):
    """リストの合計を計算する関数"""
    total = 0
    for num in numbers:
        total += num
    return total

# 使用例
result = calculate_sum([1, 2, 3, 4, 5])
print(f"合計: {result}")
```

### コードブロック（JavaScript）
```javascript
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};
```

---

<!-- テーブル表示 -->
# <span class="slide-title">テーブル（表）のパターン</span>

<div class="col-left">

### 基本的なテーブル
| 項目 | 説明 | ステータス |
|------|------|------------|
| タスクA | 要件定義の作成 | 完了 |
| タスクB | デザイン作成 | 進行中 |
| タスクC | 実装 | 未着手 |

### 中央揃え・右揃えを含むテーブル
| 左揃え | 中央揃え | 右揃え |
|:-------|:--------:|-------:|
| データ1 | データ2 | 100 |
| データ3 | データ4 | 200 |
| データ5 | データ6 | 300 |

</div>

<div class="col-right">

### スタイル付きテーブル
<div style="font-size: 0.9em;">

| 機能 | Free | Pro | Enterprise |
|------|:----:|:---:|:----------:|
| 基本機能 | ✅ | ✅ | ✅ |
| 高度な分析 | ❌ | ✅ | ✅ |
| API アクセス | ❌ | 制限付き | 無制限 |
| サポート | コミュニティ | メール | 24/7 |

</div>
</div>

<div style="clear: both;"></div>

---

<!-- 追加ページはここから --> 