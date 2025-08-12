#!/usr/bin/env node

/**
 * setup-project.ts
 *
 * 用途: Marp資料用ディレクトリの初期セットアップスクリプト
 * 使い方: npm run new -- プロジェクト名
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

// プロジェクト名を引数から取得
const projectName = process.argv[2];

if (!projectName) {
  console.error('使い方: npm run new -- プロジェクト名');
  process.exit(1);
}

// ディレクトリパスの設定
const baseDir = path.join(__dirname, '..');
const projectDir = path.join(baseDir, projectName);
const imagesDir = path.join(projectDir, 'images');
const themesDir = path.join(projectDir, 'themes');

// ディレクトリが既に存在するかチェック
if (fs.existsSync(projectDir)) {
  console.error(`❌ エラー: ${projectName} ディレクトリは既に存在します`);
  process.exit(1);
}

console.log(`--- ${projectName} ディレクトリを作成します ---`);

try {
  // ディレクトリの作成
  fs.mkdirSync(projectDir, { recursive: true });
  fs.mkdirSync(imagesDir, { recursive: true });
  fs.mkdirSync(themesDir, { recursive: true });

  // package.jsonの作成
  console.log('--- package.jsonを作成しています ---');
  const packageJson = {
    name: projectName,
    version: '1.0.0',
    description: `Marp presentation for ${projectName}`,
    scripts: {
      'build': 'marp slide.md --pdf',
      'build-html': 'marp slide.md',
      'watch': 'marp slide.md --watch'
    },
    devDependencies: {
      '@marp-team/marp-cli': '^3.0.0'
    }
  };
  
  fs.writeFileSync(
    path.join(projectDir, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );

  // npmパッケージのインストール
  console.log('--- 依存関係をインストールしています ---');
  execSync('npm install', { cwd: projectDir, stdio: 'inherit' });

  // slide_template.mdをコピーしてslide.mdとして保存
  console.log('--- テンプレートファイルをコピーしています ---');
  const templateContent = fs.readFileSync(
    path.join(baseDir, 'slide_template.md'),
    'utf8'
  );
  
  // テーマ名をプロジェクト名に変更
  const slideContent = templateContent.replace(
    /theme: template/,
    `theme: ${projectName}`
  );
  
  fs.writeFileSync(
    path.join(projectDir, 'slide.md'),
    slideContent
  );

  // imagesディレクトリの内容をコピー
  const baseImagesDir = path.join(baseDir, 'images');
  if (fs.existsSync(baseImagesDir)) {
    console.log('--- 画像ファイルをコピーしています ---');
    const images = fs.readdirSync(baseImagesDir);
    images.forEach(image => {
      const src = path.join(baseImagesDir, image);
      const dest = path.join(imagesDir, image);
      if (fs.statSync(src).isFile()) {
        fs.copyFileSync(src, dest);
      }
    });
  }

  // themesディレクトリの内容をコピーし、テーマ名をカスタマイズ
  const baseThemesDir = path.join(baseDir, 'themes');
  if (fs.existsSync(baseThemesDir)) {
    console.log('--- テーマファイルをカスタマイズしてコピーしています ---');
    const themes = fs.readdirSync(baseThemesDir);
    
    themes.forEach(theme => {
      if (theme.endsWith('.css')) {
        const src = path.join(baseThemesDir, theme);
        const cssContent = fs.readFileSync(src, 'utf8');
        
        // テーマ名をプロジェクト名に変更
        const customizedContent = cssContent.replace(
          /\/\* @theme [\w-]+ \*\//,
          `/* @theme ${projectName} */`
        );
        
        // ファイル名もプロジェクト名に変更
        const dest = path.join(themesDir, `${projectName}.css`);
        fs.writeFileSync(dest, customizedContent);
        
        console.log(`  テーマ作成: ${projectName}.css`);
      }
    });
  }

  // VS Code設定を更新
  console.log('--- VS Code設定を更新しています ---');
  const vscodeDir = path.join(baseDir, '.vscode');
  const settingsPath = path.join(vscodeDir, 'settings.json');
  
  // .vscodeディレクトリが存在しない場合は作成
  if (!fs.existsSync(vscodeDir)) {
    fs.mkdirSync(vscodeDir, { recursive: true });
  }
  
  // 既存の設定を読み込み（なければ空オブジェクト）
  let settings: any = {};
  if (fs.existsSync(settingsPath)) {
    const content = fs.readFileSync(settingsPath, 'utf8');
    try {
      settings = JSON.parse(content);
    } catch (e) {
      console.warn('既存のsettings.jsonの解析に失敗しました。新規作成します。');
      settings = {};
    }
  }
  
  // 新しいテーマを追加
  const themeRelativePath = `${projectName}/themes/${projectName}.css`;
  const existingThemes = settings['markdown.marp.themes'] || [];
  
  if (!existingThemes.includes(themeRelativePath)) {
    existingThemes.push(themeRelativePath);
    settings['markdown.marp.themes'] = existingThemes;
    
    // 設定を保存
    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
    console.log(`  VS Code設定に追加: ${themeRelativePath}`);
  }

  console.log(`\n✅ 完了: ${projectName} ディレクトリがセットアップされました`);
  console.log(`\n次のステップ:`);
  console.log(`  1. cd ${projectName}`);
  console.log(`  2. code slide.md`);
  console.log(`  3. スライドを編集`);
  console.log(`  4. npm run build でPDF出力`);

} catch (error) {
  console.error(`❌ エラーが発生しました: ${(error as Error).message}`);
  process.exit(1);
}