import { AwesomeGraphQLClient, gql } from "awesome-graphql-client";
import { format } from "date-fns";
import React from "react";
//сделать запрос http://rubin.kodeks.ru:888/db/next/graphql

//посмотреть graphql запросы
const GET_LINK_INFO = gql`
  query getLinkInfo($id: Int!) {
    foundDocumentById: searchDocuments(query: { ids: [$id] }, limit: 1) {
      id
      registrations {
        number
        date
        longDoctype {
          name
        }
      }
    }
    foundDocumentByOuterDataId: searchDocuments(
      query: { outerDataIds: [$id] }
      limit: 1
    ) {
      outerData {
        id
        filename
      }
    }
  }
`;

type GetDocQuery = {
  foundDocumentById: {
    id: number;
    registrations: {
      number: string | null;
      date: string | null;
      longDoctype: { name: string } | null;
    }[];
  }[];
  foundDocumentByOuterDataId: {
    outerData: {
      id: number;
      filename: string | null;
    }[];
  }[];
};

function formatRegs(regs: {
  number: string | null;
  date: string | null;
  longDoctype: { name: string } | null;
}) {
  // regs.date && console.log(new Date(regs.date));

  return [
    regs.longDoctype?.name,
    regs.number !== null && `N\u00A0${regs.number}`,
    regs.date !== null && `от ${format(new Date(regs.date), "dd.MM.yyyy")}`,
  ]
    .filter(Boolean)
    .join(" ");
}
function extractNdFromLink(link: string) {
  // Используем регулярное выражение для извлечения значения параметра "nd"
  const match = link.match(/nd=([^&]+)/);
  if (match) {
    return match[1];
  }
}

export default async function getLinkTitle(url: string) {
  if (!url.startsWith("kodeks")) {
    return "ссылка ведет на сторонние источники";
  }
  // console.log();
  const nd = extractNdFromLink(url);

  // + сделать проверку на kodex (провалидировать ссылку)
  const graphQLClient = new AwesomeGraphQLClient({
    endpoint: "http://rubin.kodeks.ru:888/db/next/graphql",
  });
  const result = await graphQLClient.requestSafe<GetDocQuery, { id: number }>(
    GET_LINK_INFO,
    { id: Number(nd) }
  );
  let res;
  if (result.ok && result.data.foundDocumentById.length) {
    // result.data;
    const docReg = result.data.foundDocumentById[0].registrations[0];

    res = formatRegs(docReg);
  }
  console.log(result);

  return res;
}
