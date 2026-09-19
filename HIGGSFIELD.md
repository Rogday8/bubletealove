# Промпты для Higgsfield (если захочется фото вместо вектора)

Я не могу сам зайти в Higgsfield и сгенерировать картинки — у меня нет доступа к нему из этой
сессии. Поэтому стакан и фрукты на сайте нарисованы вектором: они живые, перекрашиваются под вкус
и весят ноль килобайт. Если всё-таки нужен фото-реализм, вот готовые промпты — сгенерируй их сам,
положи файлы в `public/media/` и включи фото-режим (как — в конце файла).

Общий хвост для всех промптов (стиль референса):

> soft studio product photography, single key light from the upper left, deep warm gradient
> background, shallow depth of field, subtle haze, cinematic color grade, 4k, no text, no logos

---

## 1. Стакан — шесть вкусов, одна геометрия

Важно: **одинаковый ракурс и размер стакана** во всех шести кадрах, иначе при переключении вкуса
картинка будет прыгать. Проще всего сгенерировать один кадр и сделать вариации по цвету напитка.

```
Tall clear plastic cup of bubble tea, flat lid, thick cream straw, filled with layered
{ВКУС}: milk foam cap on top, {ЦВЕТ} tea gradient below, crushed ice, glossy dark tapioca pearls
at the bottom, condensation on the glass, shot straight on at eye level, centered, cut out on a
transparent background, soft studio product photography...
```

Подставить вместо `{ВКУС}` / `{ЦВЕТ}`:

| Файл | Вкус | Цвет напитка |
| --- | --- | --- |
| `cup-sakura.png` | sakura milk tea | soft cherry-blossom pink |
| `cup-strawberry.png` | strawberry cream tea | deep strawberry red fading to cream |
| `cup-mango.png` | mango passionfruit tea | golden amber to orange |
| `cup-classic.png` | classic milk tea | caramel brown to milky beige |
| `cup-peach.png` | peach oolong | apricot to warm rose |
| `cup-lagoon.png` | butterfly pea lemonade | electric blue to turquoise |

Формат: PNG с прозрачным фоном, вертикальный, длинная сторона 1600 px.

## 2. Фрукты на карточки

```
Single fresh {ФРУКТ}, floating, no stem shadow, cut out on transparent background, macro product
photo, natural texture, water droplets, soft studio product photography...
```

`{ФРУКТ}`: cherry blossom flower · strawberry · mango with leaf · cluster of tapioca pearls ·
peach with leaf · butterfly pea flower.

Формат: PNG 600×600, прозрачный фон.

## 3. Фон сцены

```
Abstract warm gradient backdrop, mound of fine sugar powder in the foreground bottom center,
dark rose and amber tones, volumetric haze, empty center for product placement,
soft studio product photography...
```

Формат: JPG 2400×1400, кладётся как `public/media/hero-bg.jpg`.

---

## Куда класть и как включить

1. Файлы — в `public/media/`.
2. В `src/data/flavors.ts` у каждого вкуса дописать поле с путём к картинке, например
   `photo: '/media/cup-sakura.png'`.
3. В `src/components/Hero.tsx` рядом с `<BobaCup />` отрисовать `<img>` с этим путём и
   `AnimatePresence` по `flavor.id` — вектор останется запасным вариантом, а кросс-фейд между
   фотографиями уже настроен той же логикой слоёв.

Совет: вектор лучше не выбрасывать — он мгновенно перекрашивается под любой новый вкус, а фото
придётся дорисовывать под каждый.
