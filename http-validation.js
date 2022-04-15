import fetch from "node-fetch";

async function verifyStatus(arrayUrls) {
  try {
    const arrayStatus = await Promise.all(
      arrayUrls.map(async (url) => {
        const res = await fetch(url);
        return `${res.status} - ${res.statusText}`;
      })
    );
    return arrayStatus;
  } catch (err) {
    throw new Error(err.message);
  }
}

function UrlsArray(arrayLinks) {
  return arrayLinks.map((objectLink) => Object.values(objectLink).join());
}

export default async function validateUrl(links) {
  // return links.map((ibj) => Object.values(ibj));
  const urls = UrlsArray(links[0]);
  const statusLinks = await verifyStatus(urls);

  const result = links[0].map((obj, index) => ({
    ...obj,
    status: statusLinks[index],
  }));

  return result;
}
