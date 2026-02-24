"""
科学的根拠のあるサプリメント動画 自動生成スクリプト

使用ライブラリ:
  - gTTS   : 日本語テキスト → 音声(MP3)
  - Pillow : スライド画像生成
  - moviepy: 画像+音声 → MP4動画

実行方法:
  python generate_video.py

出力:
  output_video.mp4
"""

import os
import textwrap
from pathlib import Path

from gtts import gTTS
from PIL import Image, ImageDraw, ImageFont
from moviepy import AudioFileClip, ImageClip, concatenate_videoclips

# ---------------------------------------------------------------------------
# スライドデータ定義
# ---------------------------------------------------------------------------

SLIDES = [
    {
        "title": "科学が証明したサプリTOP5",
        "subtitle": "2025年最新エビデンス版",
        "body": "",
        "bg_color": (30, 80, 160),
        "text_color": (255, 255, 255),
        "narration": (
            "薬局に行くと、何百種類ものサプリメントが並んでいますよね。"
            "今日は、査読済みの医学論文・メタ分析データをもとに、"
            "本当に買う価値があるサプリTOP5をお伝えします。"
        ),
    },
    {
        "title": "エビデンスとは?",
        "subtitle": "科学的根拠の強さ",
        "body": (
            "レベル1: システマティックレビュー・メタ分析 (最強)\n"
            "レベル2: ランダム化比較試験 (RCT)\n"
            "レベル3: コホート研究・観察研究\n"
            "レベル4: 専門家の意見・症例報告\n\n"
            "本動画はレベル1〜2の研究のみ使用"
        ),
        "bg_color": (20, 60, 120),
        "text_color": (255, 255, 255),
        "narration": (
            "まず、エビデンスについて説明します。"
            "最も信頼できるのが、世界中の研究をまとめたシステマティックレビューとメタ分析です。"
            "今日紹介するのは、このレベルの研究でエビデンスが確認されたサプリだけです。"
        ),
    },
    {
        "title": "第1位: クレアチン",
        "subtitle": "運動パフォーマンス・認知機能",
        "body": (
            "★★★★★ エビデンスレベル 最強\n\n"
            "・短時間高強度運動のパフォーマンス向上\n"
            "・高齢者の記憶力・注意力改善\n"
            "・2025年 Frontiers in Nutrition で認定\n\n"
            "推奨摂取量: 1日 3〜5g"
        ),
        "bg_color": (180, 50, 50),
        "text_color": (255, 255, 255),
        "narration": (
            "第1位はクレアチンです。"
            "サプリの中でダントツで研究数が多く、エビデンスの王様です。"
            "2025年のシステマティックレビューでも、運動パフォーマンス向上において"
            "実質的な証拠があると認定されました。"
            "さらに、高齢者の記憶力改善にも効果が確認されています。"
            "摂取量の目安は1日3から5グラムです。"
        ),
    },
    {
        "title": "第2位: オメガ3脂肪酸",
        "subtitle": "DHA / EPA — 心血管・脳・視覚",
        "body": (
            "★★★★☆ エビデンスレベル 高\n\n"
            "・99万人のメタ分析: 心筋梗塞リスク低下\n"
            "・DHA: 乳幼児・学齢期の視覚発達改善\n"
            "・脳卒中リスク低下との関連も\n\n"
            "推奨摂取量: EPA+DHA 合計 1,000〜2,000mg/日"
        ),
        "bg_color": (30, 130, 130),
        "text_color": (255, 255, 255),
        "narration": (
            "第2位はオメガ3脂肪酸、DHAとEPAです。"
            "なんと99万人以上を対象にした大規模メタ分析で、"
            "心筋梗塞や冠動脈疾患のリスク低下との関連が示されています。"
            "また、DHAは子どもの視覚発達にも重要です。"
            "青魚をあまり食べない方は、サプリで補うことをおすすめします。"
        ),
    },
    {
        "title": "第3位: ビタミンD",
        "subtitle": "免疫・骨・感染症予防",
        "body": (
            "★★★★☆ エビデンスレベル 高\n\n"
            "・日本人の半数以上が不足\n"
            "・高用量(2000IU以上)でインフルエンザ・COVID予防\n"
            "・骨粗鬆症予防にも有効\n\n"
            "推奨摂取量: 1,000〜2,000 IU/日"
        ),
        "bg_color": (180, 130, 20),
        "text_color": (255, 255, 255),
        "narration": (
            "第3位はビタミンDです。"
            "日本人の半数以上がビタミンD不足と言われています。"
            "2025年のネットワークメタ分析では、1日2000IU以上の高用量ビタミンDが"
            "インフルエンザやCOVID-19の発症率低下に最も効果的なサプリの一つとして支持されました。"
        ),
    },
    {
        "title": "第4位: カテキン",
        "subtitle": "緑茶エキス — 感染症予防",
        "body": (
            "★★★★☆ エビデンスレベル 高\n\n"
            "・呼吸器感染症・風邪の予防に中〜高エビデンス\n"
            "・2025年 ネットワークメタ分析で1位評価\n"
            "・日本人の緑茶習慣は科学的に正しかった!\n\n"
            "推奨摂取量: EGCG 200〜400mg/日(緑茶3〜5杯相当)"
        ),
        "bg_color": (40, 120, 60),
        "text_color": (255, 255, 255),
        "narration": (
            "第4位は緑茶の有効成分カテキンです。"
            "2025年の最新研究で、呼吸器感染症・風邪の予防において"
            "最も効果的なサプリの一つとして中から高品質のエビデンスで支持されました。"
            "毎日お茶を飲む日本の習慣は、科学的にも理にかなっていたんですね。"
        ),
    },
    {
        "title": "第5位: 葉酸",
        "subtitle": "脳卒中予防・妊娠サポート",
        "body": (
            "★★★★☆ エビデンスレベル 高\n\n"
            "・脳卒中リスク低下: メタ分析で確認済み\n"
            "・妊娠前〜初期: 神経管閉鎖不全症を予防\n"
            "・厚生労働省も摂取を推奨\n\n"
            "推奨摂取量: 妊娠希望女性は食事+400μg/日"
        ),
        "bg_color": (120, 50, 140),
        "text_color": (255, 255, 255),
        "narration": (
            "第5位は葉酸です。"
            "特に妊娠を考えている女性には必須の知識です。"
            "葉酸は赤ちゃんの神経管閉鎖不全症という先天異常の予防に、"
            "世界中の医療機関が推奨している栄養素です。"
            "また一般の方にも脳卒中リスク低下との関連がメタ分析で示されています。"
        ),
    },
    {
        "title": "注意: 効果が薄いサプリ",
        "subtitle": "エビデンスが不十分なもの",
        "body": (
            "グルコサミン・コンドロイチン\n"
            "  → 大規模メタ分析で偽薬と差なし\n\n"
            "コラーゲン経口摂取\n"
            "  → 消化されるため肌への効果は限定的\n\n"
            "多くのダイエット・美容系サプリ\n"
            "  → 高品質な試験が少なく根拠不十分"
        ),
        "bg_color": (80, 80, 80),
        "text_color": (255, 230, 100),
        "narration": (
            "逆に、エビデンスが弱いサプリもお伝えします。"
            "グルコサミンとコンドロイチンは関節に効くイメージがありますが、"
            "大規模メタ分析で偽薬と有意差なしという結果が出ています。"
            "コラーゲンの経口摂取も、消化されてしまうため肌への効果は科学的に疑問視されています。"
        ),
    },
    {
        "title": "まとめ",
        "subtitle": "科学的根拠のあるサプリTOP5",
        "body": (
            "1位 クレアチン    — 運動・認知機能\n"
            "2位 オメガ3脂肪酸 — 心血管・脳・視覚\n"
            "3位 ビタミンD     — 免疫・骨・感染症予防\n"
            "4位 カテキン      — 感染症予防\n"
            "5位 葉酸          — 脳卒中・妊娠サポート\n\n"
            "※ サプリは食事・運動・睡眠の補完として活用しましょう"
        ),
        "bg_color": (30, 80, 160),
        "text_color": (255, 255, 255),
        "narration": (
            "今日のまとめです。"
            "科学的根拠のあるサプリTOP5は、"
            "クレアチン、オメガ3脂肪酸、ビタミンD、カテキン、葉酸です。"
            "ただし専門家が口を揃えて言うのは、サプリより食事・運動・睡眠の改善が先ということ。"
            "サプリはあくまで補完として活用しましょう。"
            "参考にした論文は概要欄に貼っておきます。チャンネル登録・高評価お願いします!"
        ),
    },
]

# ---------------------------------------------------------------------------
# 設定
# ---------------------------------------------------------------------------

WIDTH, HEIGHT = 1280, 720
FONT_PATH_CANDIDATES = [
    "/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc",
    "/usr/share/fonts/truetype/noto/NotoSansCJK-Regular.ttc",
    "/usr/share/fonts/noto-cjk/NotoSansCJKjp-Regular.otf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",  # fallback (no CJK)
]
OUTPUT_FILE = "output_video.mp4"
TMP_DIR = Path("tmp_video")
TMP_DIR.mkdir(exist_ok=True)


def get_font(size: int) -> ImageFont.FreeTypeFont:
    for path in FONT_PATH_CANDIDATES:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except Exception:
                continue
    return ImageFont.load_default()


def draw_wrapped_text(
    draw: ImageDraw.ImageDraw,
    text: str,
    x: int,
    y: int,
    font: ImageFont.FreeTypeFont,
    color: tuple,
    max_width: int,
    line_spacing: int = 8,
) -> int:
    """テキストを折り返しながら描画し、次のY座標を返す"""
    lines = []
    for paragraph in text.split("\n"):
        if paragraph == "":
            lines.append("")
            continue
        wrapped = textwrap.wrap(paragraph, width=30)
        lines.extend(wrapped if wrapped else [""])

    for line in lines:
        draw.text((x, y), line, font=font, fill=color)
        bbox = draw.textbbox((0, 0), line, font=font)
        y += (bbox[3] - bbox[1]) + line_spacing
    return y


def create_slide_image(slide: dict, index: int) -> Path:
    """1枚のスライド画像を生成して保存する"""
    img = Image.new("RGB", (WIDTH, HEIGHT), slide["bg_color"])
    draw = ImageDraw.Draw(img)

    # 上部のアクセントバー
    accent = tuple(min(255, c + 40) for c in slide["bg_color"])
    draw.rectangle([0, 0, WIDTH, 10], fill=accent)
    draw.rectangle([0, HEIGHT - 10, WIDTH, HEIGHT], fill=accent)

    tc = slide["text_color"]
    margin = 80

    # タイトル
    font_title = get_font(54)
    draw.text((margin, 60), slide["title"], font=font_title, fill=tc)

    # サブタイトル
    font_sub = get_font(32)
    draw.text((margin, 130), slide["subtitle"], font=font_sub, fill=(*tc[:3], 200) if len(tc) == 3 else tc)

    # 区切り線
    draw.rectangle([margin, 175, WIDTH - margin, 178], fill=tc)

    # 本文
    font_body = get_font(28)
    if slide["body"]:
        draw_wrapped_text(draw, slide["body"], margin, 200, font_body, tc, WIDTH - margin * 2)

    # スライド番号
    font_small = get_font(22)
    draw.text((WIDTH - 60, HEIGHT - 50), f"{index + 1}", font=font_small, fill=tc)

    path = TMP_DIR / f"slide_{index:02d}.png"
    img.save(path)
    return path


def create_audio(text: str, index: int) -> Path:
    """テキストをgTTSで音声ファイルに変換する"""
    path = TMP_DIR / f"audio_{index:02d}.mp3"
    tts = gTTS(text=text, lang="ja", slow=False)
    tts.save(str(path))
    return path


def build_video():
    clips = []

    print(f"スライド数: {len(SLIDES)}")
    for i, slide in enumerate(SLIDES):
        print(f"  [{i+1}/{len(SLIDES)}] 「{slide['title']}」を処理中...")

        img_path = create_slide_image(slide, i)
        audio_path = create_audio(slide["narration"], i)

        audio_clip = AudioFileClip(str(audio_path))
        duration = audio_clip.duration + 0.5  # ナレーション終了後0.5秒余白

        img_clip = (
            ImageClip(str(img_path))
            .with_duration(duration)
            .with_audio(audio_clip)
        )
        clips.append(img_clip)

    print("動画を合成中...")
    final = concatenate_videoclips(clips, method="compose")
    final.write_videofile(
        OUTPUT_FILE,
        fps=24,
        codec="libx264",
        audio_codec="aac",
        logger=None,
    )
    print(f"\n完成! → {OUTPUT_FILE}")
    print(f"再生時間: {final.duration:.1f}秒")


if __name__ == "__main__":
    build_video()
