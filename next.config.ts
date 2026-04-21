import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  /** Hide dev-only route indicator (bottom-left N badge) */
  devIndicators: false,
  /**
   * LAN IP로 접속해 미리보기할 때 HMR이 막히지 않게 허용 출처 추가.
   * IP가 바뀌면 터미널 메시지에 나온 값으로 수정 후 `yarn dev` 재시작.
   */
  allowedDevOrigins: ["192.168.0.41"],
};

export default withNextIntl(nextConfig);
