# 忽略错误
set -e

# 构建
npm run build

# 进入待发布的目录
cd docs/.vitepress/dist

# 如果是发布到自定义域名
# echo "hayblog.cn" > CNAME

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:sxdnbnb/sxdnbnb.github.io.git main

cd -