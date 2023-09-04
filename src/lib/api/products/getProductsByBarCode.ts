import axios from "axios";
import { load } from "cheerio";
import { NextRequest } from "next/server";

export const getProductsByBarCode = async (request: Request) => {
  console.log("executed");
  const { searchParams } = new URL(request.url);
  const ean = searchParams.get("EAN");
  const searchUrl = `https://www.google.com/search?q=${ean}`;
  const userAgent = selectRandomAgent();
  const response = await axios.get(searchUrl, {
    headers: {
      "User-Agent": userAgent,
    },
  });
  console.log(response.data);
  if (response.data) {
    let select = load(response.data);
    let titles: string[] = [];
    let links: string[] = [];
    let snippets: string[] = [];
    let displayedLinks: string[] = [];

    select(".yuRUbf > div > a > h3").each((i, el) => {
      titles[i] = select(el).text();
    });
    select(".yuRUbf > div > a").each((i, el) => {
      links[i] = select(el).attr("href") as string;
    });
    select(".g .VwiC3b ").each((i, el) => {
      snippets[i] = select(el).text();
    });
    select(".g .yuRUbf .NJjxre .tjvcx").each((i, el) => {
      displayedLinks[i] = select(el).text();
    });

    const organicResults = [];
    for (let i = 0; i < titles.length; i++) {
      organicResults[i] = {
        title: titles[i],
        links: links[i],
        snippet: snippets[i],
        displayedLink: displayedLinks[i],
      };
    }
    console.log(organicResults);
    const functionalLink = organicResults.find((link) =>
      link.links ? true : false
    );
  }
};

const selectRandomAgent = () => {
  const userAgents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64)  AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/82.0.3491.110 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.3292.71 Safari/537.36",
  ];
  const randomNumber = Math.floor(Math.random() % userAgents.length);
  return userAgents[randomNumber];
};
