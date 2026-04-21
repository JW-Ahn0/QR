# QR 스타일러

Next.js + shadcn/ui + [`qr-code-styling`](https://www.npmjs.com/package/qr-code-styling) 로 브라우저에서 QR을 꾸미고 PNG·JPEG·WebP·SVG로 저장합니다.

## 요구사항·계획

- [docs/requirements.md](./docs/requirements.md)
- [docs/plan.md](./docs/plan.md)

## 실행 (Yarn)

```bash
yarn install
yarn dev
```

프로덕션 빌드:

```bash
yarn build
yarn start
```

## 스택

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4, shadcn/ui
- 패키지 매니저: Yarn (v1 `dlx` 미지원 환경에서는 `npx shadcn@latest …` 사용)
