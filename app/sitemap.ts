import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base='https://olbarun.kr';
  const now=new Date();
  return [
    {url:base,lastModified:now,changeFrequency:'weekly',priority:1},
    {url:`${base}/process`,lastModified:now,changeFrequency:'monthly',priority:.8},
    {url:`${base}/request`,lastModified:now,changeFrequency:'monthly',priority:.8},
    {url:`${base}/request/pickup`,lastModified:now,changeFrequency:'monthly',priority:.7},
    {url:`${base}/request/visit`,lastModified:now,changeFrequency:'monthly',priority:.8},
    {url:`${base}/request/free`,lastModified:now,changeFrequency:'monthly',priority:.6},
    {url:`${base}/customer/notice`,lastModified:now,changeFrequency:'weekly',priority:.6},
    {url:`${base}/customer/qna`,lastModified:now,changeFrequency:'weekly',priority:.6},
    {url:`${base}/buy/busan`,lastModified:now,changeFrequency:'monthly',priority:.8},
    {url:`${base}/buy/gyeongnam`,lastModified:now,changeFrequency:'monthly',priority:.8},
  ];
}
