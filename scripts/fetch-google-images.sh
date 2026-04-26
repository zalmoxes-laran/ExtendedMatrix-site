#!/usr/bin/env bash
# ============================================================
# Fetch covers from extendedmatrix.org (Google Sites) and drop
# them into src/assets/{news,projects}/ with the slugs that the
# .md frontmatter references.
#
# Run this once on your Mac. The build sandbox cannot reach
# googleusercontent.com, so this lives outside CI.
#
#   chmod +x scripts/fetch-google-images.sh
#   ./scripts/fetch-google-images.sh
#
# Re-run safely: existing files are skipped (use -f to force).
# ============================================================
set -euo pipefail

cd "$(dirname "$0")/.."

FORCE=0
[[ "${1:-}" == "-f" ]] && FORCE=1

mkdir -p src/assets/news src/assets/projects

fetch() {
  local url="$1"
  local out="$2"
  if [[ -f "$out" && $FORCE -eq 0 ]]; then
    echo "skip  $out (exists — use -f to overwrite)"
    return
  fi
  echo "  →   $out"
  curl -sSL -A "Mozilla/5.0" -o "$out" "$url"
  # If we got a tiny HTML instead of an image, warn
  if [[ $(stat -f%z "$out" 2>/dev/null || stat -c%s "$out") -lt 5000 ]]; then
    echo "WARN  $out is suspiciously small — check the URL manually."
  fi
}

# -------- News covers --------
echo "fetching news covers..."

fetch "https://lh3.googleusercontent.com/sitesv/AA5AbUDqT3j2iwbxhqFjSnT3TWivStHfKwrYco4l69aGiz6lYwFKQDa3bBwj-B6KLdJjcEh-_1atBi6mrlx95tlE91VpaveES5s3JduQUhy1Mt1FqERsBb80frWpS0F2-HtbELzCNOYdY1Uy8ajnMKysPWzwVrzbO69M9cqo-xcY_uMHUd6j0N_YMZk32_E=w1280" \
  src/assets/news/em-at-dh2025.jpg

fetch "https://lh3.googleusercontent.com/sitesv/AA5AbUDqT3j2iwbxhqFjSnT3TWivStHfKwrYco4l69aGiz6lYwFKQDa3bBwj-B6KLdJjcEh-_1atBi6mrlx95tlE91VpaveES5s3JduQUhy1Mt1FqERsBb80frWpS0F2-HtbELzCNOYdY1Uy8ajnMKysPWzwVrzbO69M9cqo-xcY_uMHUd6j0N_YMZk32_E=w1280" \
  src/assets/news/em-1-4-is-out.jpg

fetch "https://lh3.googleusercontent.com/sitesv/AA5AbUBSz7iT8db-U9rkWUUwm_G7CpRB-zCiVfGQs5nFQjL02Uj9hCzwVy2MDnngXg8Et1lUQEnnAHBcxSxsZmZAa1I0XVTQ_2uSd42Rn2i1EL8d3RnJ8fWyoIXYuyn0AxwgbmjdkhzGjajHeqTLSErLcLxrntQ8TkqhHYxV9C3tVAVI36wdM-WpLBx0ny8=w1280" \
  src/assets/news/em-conference-2024.jpg

fetch "https://lh3.googleusercontent.com/sitesv/AA5AbUBQdLJBFpxLQD_4R-3JfiAOzTBrGbBnI53085gGXBqIaVIuY_pNV5vxsGCbXLw0a8bbKeKi8aJ2zR1xk333Ao_JqgMxPOkAROt7WJh1CntPnrOWpEO0K3XMAlrWPi7dnV6fGSqtsa7fpGaQtvCSSBOBb6Xd77ozbn0L0rz_guZ9R0GR3dkowEGxNvg=w1280" \
  src/assets/news/em-ssh.jpg

fetch "https://lh3.googleusercontent.com/sitesv/AA5AbUAcWJOSJyfYVgAyaIa4LDxHNCkjyhC_L0nev_qgwLVa6w-NzINzy4P14S7kuxBlLgbQ1mkVFRoJNk9u0BDy_iC7t9CX0kVzYD6LHtWJhajqEgnrw7g9QP6KBHV9Dflc36iVAiYM1LTHTO0xFKu8tS1ag8kKXImQmZ-acSbw5c-mmamXI_Gkn5bUMX0=w1280" \
  src/assets/news/em-bazaar-2.jpg

fetch "https://lh3.googleusercontent.com/sitesv/AA5AbUATW4dTTZxyApwCLpNmJr8LfLKCpzu3Nb11M4PLNpDQ6Eq2v-jN6ov4P7gqg5OAnBltOTP5wFvG2ttHdsulAXqphNlgSKkIt81fGTh0VWZemNg4f0D9WJRXPiWpgIVi10IoN4whu3N1gs8xJw7kLi2hePL5H61i7niJDX7CI5eOA91T8MHsGs0eruIiho6P1Ci8YbqPzZMz19232bt3cbONvP2m67IfvR1z=w1280" \
  src/assets/news/em-1-3-is-out.jpg

# EM-TSU news has no cover image on the live site — leave it without cover.

# -------- Project covers --------
echo "fetching project covers..."

fetch "https://lh3.googleusercontent.com/sitesv/AA5AbUBUkcJsdw-75ZyRk43AsE55lTbW-heYHKA6YLyEbBkrvHkkbbkZYzVWfOXY1-1f8rfiZNfioudiycn70GKErmb2aV-Ky1IA8gDxgzRtynQL6boK3EMRxfC3yuzNSIRPGqtif_odYHetI4Fx1aWNrnfJZbQMB_IfLBUQLfiEDgpsqKV9_Sm80G30ZPVGFEQ8YrmuAenv9UA0E_MhJ5XqA3_Salak17Kr8Ize=w1600" \
  src/assets/projects/e-archeo.jpg

fetch "https://lh3.googleusercontent.com/sitesv/AA5AbUD4viTqVALH6pi_FHjHawfWAR149wbkpTZti27UIgyfOkrwEo6euueehGIJB2uzotdiM7ycPt5dPjb4i02mJKejIHNTPZcwnqmGLNDd024UsdTDfQEijewUtitzs6Fo9PLbKx7uGKdOsPg-skxFdi8Vs0KHapepmG3uhqDQ2oYt6axZUtyQD8T9XkjlEADI6oHZaL4fO1LN2ayRJrS9ZD6OWcdm0atX7sRhKgo=w1600" \
  src/assets/projects/forum-of-nora.jpg

fetch "https://lh3.googleusercontent.com/sitesv/AA5AbUDdOC4Cci9y58EwSdT-e1Yv5BDG6F0w7inBihkkjgQTg115_k56D2wsefSEwtAoiDI1QXQK78b5_TUogFML8dgBrNsQvpFRtu-Vo1sPtMRHZVWGE3CPKmSKbAOq4S1gxzCnJOmrRCFIkgXiML_VL-CH1_8UbA2Y3-FOpLrv3UfOr8aMVgW9aDyFhC5LVSZCAiT4992LZUYodB7yyQWjtaX4rCVSxMvyURQT=w1600" \
  src/assets/projects/aquileia-walls.jpg

fetch "https://lh3.googleusercontent.com/sitesv/AA5AbUC2GU1OugF4dvwa-gxOuvEsPlZ0Edy2su3AMLrHhsHqjv3A8KTw7H_bFDl16S0TlGBys0lx-jMgGh2BgJe6qtubwZIqtYGDLxzXCbKY9bm-5JvQ1H6g3snk2tQmidND_PFzIh_F7Apkt0IIMyTQsMKs4QTZgQ8MMHaXnZ0rFzXMSERttJxp8yaupwtCUIQqscyZ9LxnPBfWE5nrTssyZZWM-7i1ZQbkMMRr=w1600" \
  src/assets/projects/temple-of-segni.jpg

fetch "https://lh3.googleusercontent.com/sitesv/AA5AbUDnnEBHfqrTraxrBS0YeNj97GSSjW8omS6LJcoB-3ITSEjYygqCIa966mCIIKqEHu1wN2EiuIkQ7nO6af0V1TDS5uUsLz2UnoSAx9tSiEosPJlPoOGeknEPwX9fjjfn0aBYn59UyCXuQ5jLtufrbzAfkYymckVptrgiSLIXhU_TR240JWf9uyXboW--Ha0la4jiHqOCwHA8TyIQs6eqLpnAkZjuWP9n-ATjL-k=w1600" \
  src/assets/projects/theatre-of-catania.jpg

fetch "https://lh3.googleusercontent.com/sitesv/AA5AbUAuoLZwQwx1knlvE51UxiPU122o3Z70ers9gyuQTtYDz-aOFM9QB7JlLAbw3Gqdyxpeqne8ZVgkCP89zMso0svRxYc4PjDU4pDZ213KjLQoUVyJI72BMMNDHh59CfTvEhgdFDx4gHgVXjrGLEnhFAdTRRTBPQWgkIF_DK6BKCqzvMF1Uod9JWe7qr598m8jqOS_kR1m_LrvzikKAeJhuLT_W0voEv60Hhxp-Ts=w1600" \
  src/assets/projects/villa-of-aiano.jpg

fetch "https://lh3.googleusercontent.com/sitesv/AA5AbUCYJ62uKyi8YNtx77Ta-cZs3EGqgOtkJNvPjJ82TN4L3qGkHUMGgiCYV8FwLXkpUgDAxuvtovm-pq6L4_Dg75iNSOd9WGKIrq0Ep-_HnX3DIDWaQ3pJERcHXUP0SX0w9x7yathUgAF_MMef1XPhuwFk55uxJgPyDYcYFEN22LLOhphqd1U3D34fUcGMz5YITeTekEUU--KIqNQ6_VxzdaaaRPeoatMwuCwPLTs=w1600" \
  src/assets/projects/forum-of-augustus.jpg

fetch "https://lh3.googleusercontent.com/sitesv/AA5AbUCTtMyeMC1YRl4rAwE_prm3_FMq9rFSMSpPxo1eFCnZtUHz49qjRsXG17uRvtL5maXhmL-DzRgUI0M8zcz7WMaw3QSGbwTmd_8VSthBWfFS7bnpX0KhhbmANVT_43zKOHc6PZPpplAKnsRBEiKwFxon0CdtoJCHtb5tNseA0makrj2pHkPGS6K5tF2Y7uVcuouw6GEgfoD0srMiEeqI6WozasCuF0sZxn-q=w1600" \
  src/assets/projects/forgery-of-montebelluna.jpg

fetch "https://lh3.googleusercontent.com/sitesv/AA5AbUB6De5yVnaLbGQ8uEp4_PQxoPhhlFz_RxQVkHulMLVr5M8a6O8_mzXqVN8Rtm_TxWBs6t_co3z87zNgVgH46dkkl0uQD0qY8EyWI-H6ME-kPApxxLlxDJ7zjqSpzq6V-mqdxmSW6zlmZqZh9txjEHoEHZvGj3WV-pwa24SB6BNuUVj1oepRJbDlffXL5vUB7pBfn5ox-Oj_s2QEkSYvKf2OV0gbm4g5jdfr=w1600" \
  src/assets/projects/necropolis-of-banditaccia.jpg

fetch "https://lh3.googleusercontent.com/sitesv/AA5AbUCJ6k4LViKqriAIY3E_X6rWCfufXC20ymBWzs24544VlrlAeL8B8VD0-nrnlcaoCXrV6xcFcjuaTvhV5eK1fZSC4pmXXxQba06tGraFBT4UeKA8eZG6qza5p5cC4OIdB0_9W1hnJuIJIqFgUWXLwUpfFP8kfsSOExSFG1BJFdiGKp5DeyRUZNUzqBAEZSvaX3qvYrh9SvdEQ6baN9Q1Umk7thG3FnOthKeJa4g=w1600" \
  src/assets/projects/amba-aradam-metro-c.jpg

fetch "https://lh3.googleusercontent.com/sitesv/AA5AbUBbKrKFm6TjLO8UJy3qYMF_iZK0HSSk5NlP96SKEMnUlQEGEn2mi5TdIj_67l6xmI2fL9VrEwaHm1Vy2LNs7P-TswLx0It8wJMAqCjJwyPOyj5eAXxcnOTHwcHm9hXaFlPrSpuClz2XYYJJUZfU6NtwPIUrV03CI1Yoc7toZfICnzvHnj0F16XWqNdSZOdgqbgiHGx6Zp0oZWwathZSxKcWhEaADXJuLO5CgsM=w1600" \
  src/assets/projects/villa-porta-marina.jpg

fetch "https://lh3.googleusercontent.com/sitesv/AA5AbUBpV4gtTp0gfpVrPOxcv65LH1MaDU1IcQfk6Ijyehbav9UpD6SZRdgWsIdKIzl45xnZ3mnjhwoikIN2Q0G9h4Lxcw9zUAJ6tn7iCxCYBnCzx1ma8vxz3yW2ghKNoVqVKHnfXb91tMg9NEBMChvpHbjEopBc75D3TrZZfoUGolFL8UlE1pUnHuEIz3Sf6mErLBWKcHuizS2iKy9gvVyCw9bx8ZHAfEzgmytR=w1600" \
  src/assets/projects/sarmizegetusa-great-temple.jpg

echo ""
echo "✔ done. Re-run with -f to force overwrite."
echo "  Verify: ls -la src/assets/news/ src/assets/projects/"
