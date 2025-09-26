# limpiar y crear dist
rm -rf dist
mkdir -p dist/{styles,art}

# copiar art/
cp public/art/* dist/art/

# minificar HTML
npx html-minifier-terser \
  --collapse-whitespace \
  --remove-comments \
  --minify-css true \
  --minify-js true \
  public/index.html -o dist/index.html

# empaquetar y minificar JS (solo una vez)
npx esbuild public/main.js \
  --bundle \
  --minify \
  --outfile=dist/main.js \
  --format=esm

# minificar todos los CSS de /public/styles de golpe
for css in public/styles/*.css; do
  filename=$(basename "$css")
  npx esbuild "$css" --minify --outfile="dist/styles/$filename"
done